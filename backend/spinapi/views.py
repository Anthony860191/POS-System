from django.shortcuts import render
from rest_framework import viewsets, views, response
import psycopg2
from decouple import config
import pandas as pd
from rest_framework.decorators import api_view
from .constants import DB_HOST, DB_NAME, GET_PRICE_QUERY, parse_sql_argument
from .serializers import OrderSerializer, PizzaSerializer, IngredientSerializer, MenuSerializer, PriceSerializer
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
# Create your views here.

class PriceView(views.APIView):
    queryset = [0]
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
        print(GET_PRICE_QUERY.format(sql_pizza, sql_crust, sql_drink))
        conn.close()
        print(price_frame)
        price = price_frame.iloc[0,0]
        json_obj = {"price": price}
        results = PriceSerializer(json_obj, many=False).data
        return response.Response(results)