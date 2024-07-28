from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Sale, SaleDetail
from .serializers import SaleSerializer, SaleDetailSerializer
from .services import SaleService

class SaleViewSet(viewsets.ModelViewSet):
  queryset = Sale.objects.all()
  serializer_class = SaleSerializer

  def create(self, request):
    try:
      sale = SaleService.create_sale(request.data['items'])
      return Response(SaleSerializer(sale).data, status=status.HTTP_201_CREATED)
    except ValueError as e:
      return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SaleDetailViewSet(viewsets.ModelViewSet):
  queryset = SaleDetail.objects.all()
  serializer_class = SaleDetailSerializer

