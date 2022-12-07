from pathlib import Path
from django.shortcuts import render
from rest_framework import viewsets, views, response
import psycopg2
import os
from decouple import config
import pandas as pd
from rest_framework.decorators import api_view

from .constants import DB_HOST, DB_NAME, GET_PRICE_QUERY, SELECT_FROM_AVAILABLE_TOPPINGS, parse_sql_argument
from .serializers import DailySalesTotalSerializer, IngredientUsageSerializer, LastWeekSalesSerializer, OrderSerializer, PizzaCountsSerializer, PizzaSerializer, IngredientSerializer, MenuSerializer, PriceSerializer, \
    AvailableIngredientsSerializer, SalesBreakdownSerializer
from .models import Pizzas, Orders, Ingredients, Menu
BASE_DIR = Path(__file__).resolve().parent.parent

class PizzaViewSet(viewsets.ModelViewSet):
    """Pizza views. Is not used by the API. """
    queryset = Pizzas.objects.all().order_by('id')
    serializer_class = PizzaSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all().order_by('id')
    serializer_class = OrderSerializer
    

    def get_queryset(self):
        """
        Gets Orders View from database.
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        get_latest = self.request.query_params.get('latest')
        if get_latest:
            return Orders.objects.all().order_by('-id')[:1]
        return Orders.objects.all().order_by('id')
    



class MenuViewSet(viewsets.ModelViewSet):
    """
        Gets Menu table view from database. 
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
     """
    queryset = Menu.objects.all().order_by('menu_item')
    serializer_class = MenuSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredients.objects.all().order_by('ingredient_name')
    serializer_class = IngredientSerializer


    def get_queryset(self):
        """
        Gets Ingredients View from database. Possible params are ingr_type and ingredient_name to filter on. 
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        # only one parameter allowed for now

        # extract queries
        ingr_type = self.request.query_params.get('ingr_type')
        ingredient_name = self.request.query_params.get('ingredient_name')

        # `if variable` basically checks if variable is not null
        if ingr_type:
            return Ingredients.objects.filter(ingr_type=ingr_type).order_by('ingredient_name')
        if ingredient_name:
            return Ingredients.objects.filter(ingredient_name=ingredient_name)

        return Ingredients.objects.all().order_by('ingredient_name')



# Create your views here.

class PriceView(views.APIView):

    def get(self, request):
        """
        Gets Price View from database.
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        # get arguments from request object
        pizzatype = request.GET.get('pizzatype')
        crusttype = request.GET.get('crusttype')
        drinktype = request.GET.get('drinktype')
        sql_pizza = parse_sql_argument(pizzatype)
        sql_crust = parse_sql_argument(crusttype)
        sql_drink = parse_sql_argument(drinktype)
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        print(GET_PRICE_QUERY.format(sql_pizza, sql_crust, sql_drink))
        price_frame = pd.read_sql(GET_PRICE_QUERY.format(sql_pizza, sql_crust, sql_drink), conn)
        conn.close()
        price = price_frame.iloc[0, 0]
        json_obj = {"price": price}
        results = PriceSerializer(json_obj, many=False).data
        return response.Response(results)

class AvailableIngredientsView(views.APIView):

    def get(self, request):
        """
        Gets Available Ingredients view from database.
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        # just get available ingredients
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        ingr_frame = pd.read_sql(SELECT_FROM_AVAILABLE_TOPPINGS, conn)
      #  print(ingr_frame)
        conn.close()
        json_obj = [entry for entry in ingr_frame.T.to_dict().values()]

        results = AvailableIngredientsSerializer(json_obj, many=True).data
        return response.Response(results)

class DailySalesDataView(views.APIView):

    def get(self, request):
        """
        Gets daily sales data. 
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        if(start_date is None):
            conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
            df = pd.read_sql("SELECT * FROM daily_sales_total", conn)

            conn.close()
            json_obj = [entry for entry in df.T.to_dict().values()]
        
            results = DailySalesTotalSerializer(json_obj, many=True).data
            return response.Response(results)
        else:
            conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
            df = pd.read_sql(f"SELECT * FROM get_daily_sales_total('{start_date}','{end_date}')", conn)

            conn.close()
            json_obj = [entry for entry in df.T.to_dict().values()]
        
            results = DailySalesTotalSerializer(json_obj, many=True).data
            return response.Response(results)



class IngredientUsageReport(views.APIView):
    def get(self, request):
        """
        Gets Ingredients Usage report. Takes in a single date (date).
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        date = request.GET.get('date')
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        sql_date = parse_sql_argument(date)
        df = pd.read_sql("SELECT * FROM get_excess_ingredients({},100);".format(sql_date), conn)
        conn.close()
        json_obj = [entry for entry in df.T.to_dict().values()]
        results = IngredientUsageSerializer(json_obj, many=True).data
        return response.Response(results)
        

class LastWeekSalesView(views.APIView):
    """
    Last weeks sales view. 
    """

    def get(self, request):
        """
        Gets Last Weeks Sales View from database.
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        df = pd.read_sql("SELECT * FROM last_week_sales;", conn)
        conn.close()
        json_obj = [entry for entry in df.T.to_dict().values()]
        results = LastWeekSalesSerializer(json_obj[0], many=False).data
        return response.Response(results)

class LastWeekItemCounts(views.APIView):
    """
    Last Week Item counts view. Gets weekly menu  items purchased. 
    """
    def get(self, request):
        """
        Gets Last Weeks Sales View from database.
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        df = pd.read_sql("SELECT * FROM pizza_counts;", conn)
        conn.close()
        json_obj = [entry for entry in df.T.to_dict().values()]
        results = PizzaCountsSerializer(json_obj, many=True).data
        return response.Response(results)
class SalesBreakDownView(views.APIView):
    """
    Sales breakdown View. 
    """
    def get(self, request):
        """
        Gets Last Weeks Sales View from database.
        :param request: request object
        :type request: request object
        :return: Serialized response
        :rtype: JSON
        """
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        df = pd.read_sql(f"SELECT * FROM get_sales_report('{start_date}','{end_date}');", conn)

        conn.close()
        json_obj = [entry for entry in df.T.to_dict().values()]
    
        results = SalesBreakdownSerializer(json_obj, many=True).data
        return response.Response(results)
