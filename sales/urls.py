from django.urls import path, include
from rest_framework import routers
from .views import SaleViewSet, SaleDetailViewSet

router = routers.DefaultRouter()

router.register('sales', SaleViewSet)
router.register('sales-detail', SaleDetailViewSet)

urlpatterns = [
    path('', include(router.urls)),
]