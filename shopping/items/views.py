from .models import Item
from .serializers import ItemSerializer
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import authentication, permissions
from rest_framework.response import Response

# Create your views here.
@api_view()
def check_item_stock(request, item):
    try:
        i = Item.objects.get(name=item)
    except Item.DoesNotExist as e:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if not i.current_stock:
        return Response(False, status=status.HTTP_200_OK)

    return Response(True, status=status.HTTP_200_OK)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]