from .models import Item
from .serializers import ItemSerializer
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
@api_view()
def get_stock_inventory(request, item_name):
    try:
        i = Item.objects.get(name=item_name)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(data={"current_stock": i.current_stock}, status=status.HTTP_200_OK)

@api_view()
def get_item_by_category(request, item_category):
    items = Item.objects.filter(primary_category=item_category)

    if item_category not in map(lambda x:x[0], Item.PRIMARY_CHOICES):
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(data=ItemSerializer(items, many=True).data, status=status.HTTP_200_OK)
