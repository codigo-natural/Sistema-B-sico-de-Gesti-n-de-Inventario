from rest_framework import viewsets
from .models import Inventory
from .serializers import InventorySerializer

# Create your views here.
class InventoryViewSet(viewsets.ModelViewSet):
  queryset = Inventory.objects.all()
  serializer_class = InventorySerializer
