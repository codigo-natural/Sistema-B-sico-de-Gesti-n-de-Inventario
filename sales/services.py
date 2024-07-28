from django.db import transaction
from .models import Sale, SaleDetail
from inventory.models import Inventory

class SaleService:
  @staticmethod
  @transaction.atomic
  def create_sale(sale_detail):
    total = sum(detail['quantity'] * detail['unit_price'] for detail in sale_detail)
    sale = Sale.objects.create(total=total)

    for detail in sale_detail:
      SaleDetail.objects.create(
        sale=sale,
        product_id=detail['product_id'],
        warehouse_id=detail['warehouse_id'],
        quantity=detail['quantity'],
        unit_price=detail['unit_price'],
        subtotal=detail['quantity'] * detail['unit_price']
      )

      # Update inventory
      inventory = Inventory.objects.get(product_id=detail['product_id'], warehouse_id=detail['warehouse_id'])
      if inventory.quantity < detail['quantity']:
        raise ValueError(f"Insufficient stock fro product {detail['product_id']} in warehouse {detail['warehouse_id']}")
      inventory.quantity -= detail['quantity']
      inventory.save()
    
    return sale