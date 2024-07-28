from django.db import models
from products.models import Product
from warehouses.models import Warehouses

# Create your models here.
class Inventory(models.Model):
  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventory')
  warehouse = models.ForeignKey(Warehouses, on_delete=models.CASCADE, related_name='inventory')
  quantity = models.IntegerField(default=0)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.product.name} in {self.warehouse.name}: {self.quantity}"
  
  class Meta:
    verbose_name = 'Inventory'
    verbose_name_plural = 'Inventories'
    unique_together = ('product', 'warehouse')
