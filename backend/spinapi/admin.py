from django.contrib import admin
from .models import Pizzas, Ingredients, Orders, Menu
# Register your models here.

admin.site.register(Pizzas)
admin.site.register(Ingredients)
admin.site.register(Orders)
admin.site.register(Menu)
