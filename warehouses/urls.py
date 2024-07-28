from django.urls import path, include
from rest_framework import routers
from .views import WarehouseViewSet

router = routers.DefaultRouter()
router.register('warehouse', WarehouseViewSet, 'warehouse')

urlpatterns = [
    path('', include(router.urls)),
]