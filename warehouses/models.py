from django.db import models

# Create your models here.
class Warehouses(models.Model):
  name = models.CharField(max_length=100)
  location = models.CharField(max_length=200)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.name} in {self.location}"
  
  class Meta:
    verbose_name = 'Warehouse'
    verbose_name_plural = 'Warehouses'