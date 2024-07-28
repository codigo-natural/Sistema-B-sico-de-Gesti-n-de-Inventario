from django.contrib import admin
# from .models import Warehouse, InventoryItem
from .models import Inventory

# Register your models here.
admin.site.register(Inventory)
# admin.site.register(InventoryItem)