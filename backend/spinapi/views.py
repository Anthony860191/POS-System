from django.shortcuts import render
from rest_framework import viewsets

from .serializers import OrderSerializer, PizzaSerializer, IngredientSerializer, MenuSerializer
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
