from rest_framework import viewsets
from .models import Warehouses
from .serializers import WarehouseSerializer

# Create your views here.
class WarehouseViewSet(viewsets.ModelViewSet):
  queryset = Warehouses.objects.all()
  serializer_class = WarehouseSerializer
