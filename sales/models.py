from django.db import models
from products.models import Product
from warehouses.models import Warehouses

# Create your models here.
class Sale(models.Model):
  sale_date = models.DateTimeField(auto_now_add=True)
  total = models.DecimalField(max_digits=10, decimal_places=2)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"Sale {self.id} - {self.sale_date}"
  
  class Meta:
    verbose_name = 'Sale'
    verbose_name_plural = 'Sales'

class SaleDetail(models.Model):
  sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='details')
  product = models.ForeignKey(Product, on_delete=models.CASCADE)
  warehouse = models.ForeignKey(Warehouses, on_delete=models.CASCADE)
  quantity = models.IntegerField()
  unit_price = models.DecimalField(max_digits=10, decimal_places=2)
  total = models.DecimalField(max_digits=10, decimal_places=2)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"Detail of sale {self.id} - Sale {self.sale.id}"
  
  class Meta:
    verbose_name = 'Sale Detail'
    verbose_name_plural = 'Sale Details'

