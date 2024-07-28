from rest_framework import serializers
from .models import Warehouses

class WarehouseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Warehouses
    fields = '__all__'