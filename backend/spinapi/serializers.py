'''
Serializers class. These convert data to JSON objects. 
'''
from rest_framework import serializers
from .models import Pizzas, Ingredients, Orders, Menu


# these classes are in charge of converting the database rows to JSON objects
# Python notation is that class B(A) means that Class B extends Class A
class PizzaSerializer(serializers.HyperlinkedModelSerializer):
    """
    Pizza Serializer. 
    """
    class Meta:
        model = Pizzas
        # you can pick which fields you want to allow to be visible in the JSON file
        # this list basically says get all instance variables of the Pizza class and convert
        # them to strings
        fields = [f.name for f in Pizzas._meta.get_fields()]


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Orders
        # skip meta field for many to one relation 
        fields = [f.name for f in Orders._meta.get_fields()]
        print(fields)
        

class MenuSerializer(serializers.HyperlinkedModelSerializer):
    """

    Menu serializers. 
    """
    class Meta:
        model = Menu
        fields = [f.name for f in Menu._meta.get_fields()]


class IngredientSerializer(serializers.ModelSerializer):
    """

    IngredientSerializer for ingredients table. 
    """
    class Meta:
        model = Ingredients
        fields = [f.name for f in Ingredients._meta.get_fields()]
    
    

class PriceSerializer(serializers.Serializer):
    """
    Price serializer. Gets  price for a particular pizza. 
    """
    price = serializers.DecimalField(max_digits=4,decimal_places=2)

class AvailableIngredientsSerializer(serializers.Serializer):
    """
        Price serializer. Gets  price for a particular pizza. 
    """
    ingredient_name = serializers.CharField(max_length=100)
    ingr_type = serializers.CharField(max_length=100)

class DailySalesTotalSerializer(serializers.Serializer):
    """
    Daily Sales Total Serializer. Gets dates and sales. 
    """
    order_date = serializers.CharField(max_length=100)
    sales_total = serializers.DecimalField(max_digits=1000, decimal_places=2)

class DailySalesTotalSerializerByDate(serializers.Serializer):
    """
    Daily Sales Total Serializer. Gets  price for a particular pizza. 
    """
    order_date = serializers.CharField(max_length=100)
    sales_total = serializers.DecimalField(max_digits=1000, decimal_places=2)
class IngredientUsageSerializer(serializers.Serializer):
    """

    Excess report serializers. 
    """
    ingr_name = serializers.CharField(max_length=100)
    stock = serializers.DecimalField(max_digits=1000, decimal_places=2)
    percentage_used = serializers.DecimalField(max_digits=1000, decimal_places=2)
    amount_now = serializers.DecimalField(max_digits=1000, decimal_places=2)

class LastWeekSalesSerializer(serializers.Serializer):
    """
    Last weeks total serializer. 
    """
    last_week_total = serializers.DecimalField(max_digits=1000, decimal_places=2)

class PizzaCountsSerializer(serializers.Serializer):
    """
    Gets most popular pizza and counts. 
    """
    pizza_type = serializers.CharField(max_length=100)
    amount_purchased = serializers.IntegerField()

class SalesBreakdownSerializer(serializers.Serializer):
    """
    Gets sales breakdown serializer. 
    """
    pizzatype = serializers.CharField(max_length=100)
    crusttype = serializers.CharField(max_length=100)
    salescost = serializers.DecimalField(max_digits=1000, decimal_places=2)
    