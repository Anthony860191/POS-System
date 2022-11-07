from django.shortcuts import render
from rest_framework import viewsets, views, response
import psycopg2
from decouple import config
import pandas as pd
from rest_framework.decorators import api_view
from .constants import DB_HOST, DB_NAME, GET_PRICE_QUERY, SELECT_FROM_AVAILABLE_TOPPINGS, parse_sql_argument
from .serializers import OrderSerializer, PizzaSerializer, IngredientSerializer, MenuSerializer, PriceSerializer, \
    AvailableIngredientsSerializer
from .models import Pizzas, Orders, Ingredients, Menu


class PizzaViewSet(viewsets.ModelViewSet):
    queryset = Pizzas.objects.all().order_by('id')
    serializer_class = PizzaSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all().order_by('id')
    serializer_class = OrderSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all().order_by('menu_item')
    serializer_class = MenuSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredients.objects.all().order_by('ingredient_name')
    serializer_class = IngredientSerializer

    def get_queryset(self):
        ingr_type = self.request.query_params.get('ingr_type')
        if ingr_type:
            return Ingredients.objects.filter(ingr_type=ingr_type).order_by('ingredient_name')
        return Ingredients.objects.all().order_by('ingredient_name')



# Create your views here.

class PriceView(views.APIView):

    def get(self, request):
        # get arguments from request object
        pizzatype = request.GET.get('pizzatype')
        crusttype = request.GET.get('crusttype')
        drinktype = request.GET.get('drinktype')
        sql_pizza = parse_sql_argument(pizzatype)
        sql_crust = parse_sql_argument(crusttype)
        sql_drink = parse_sql_argument(drinktype)
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        price_frame = pd.read_sql(GET_PRICE_QUERY.format(sql_pizza, sql_crust, sql_drink), conn)
        conn.close()
        price = price_frame.iloc[0, 0]
        json_obj = {"price": price}
        results = PriceSerializer(json_obj, many=False).data
        return response.Response(results)

class AvailableIngredientsView(views.APIView):

    def get(self, request):
        # just get available ingredients
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=config('DB_USER'), password=config('DB_PASSWORD'))
        ingr_frame = pd.read_sql(SELECT_FROM_AVAILABLE_TOPPINGS, conn)
      #  print(ingr_frame)
        conn.close()
        json_obj = [entry for entry in ingr_frame.T.to_dict().values()]

        results = AvailableIngredientsSerializer(json_obj, many=True).data
        return response.Response(results)