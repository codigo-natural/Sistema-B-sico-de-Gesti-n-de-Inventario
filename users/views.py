from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserSerializer

# Create your views here.
class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.AllowAny]
