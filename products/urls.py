from django.urls import path, include
from rest_framework import routers
from .views import ProductViewSet

router = routers.DefaultRouter()
router.register('products', ProductViewSet, 'products')

urlpatterns = [
  path('', include(router.urls)),
]