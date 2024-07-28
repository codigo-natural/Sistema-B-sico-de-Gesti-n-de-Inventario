from django.urls import path, include
from rest_framework import routers
from .views import InventoryViewSet

router = routers.DefaultRouter()
router.register('inventory', InventoryViewSet, 'inventory')

urlpatterns = [
  path('', include(router.urls)),
]