from .models import Item
from .serializers import ItemOrderRequest, ItemSerializer
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def get_stock_inventory(request, item_name: str) -> Response:
    i = get_object_or_404(Item, name=item_name)
    return Response(data={"current_stock": i.current_stock}, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_item_by_category(request, item_category: Item.PRIMARY_CHOICES) -> Response:
    if item_category not in map(lambda x:x[0], Item.PRIMARY_CHOICES):
        return Response(status=status.HTTP_404_NOT_FOUND)

    items = Item.objects.filter(primary_category=item_category)
    return Response(data=ItemSerializer(items, many=True).data, status=status.HTTP_200_OK)

@api_view(["POST"])
def process_order(request, item_name: str) -> Response:
    i = get_object_or_404(Item, name=item_name)

    item_requested = ItemOrderRequest(data=request.data)
    if not item_requested.is_valid():
        return Response(status=status.HTTP_400_BAD_REQUEST)

    new_stock = i.current_stock  - item_requested.data["quantity_requested"]
    if new_stock < 0: # disallow if stock is too low
        return Response(status=status.HTTP_400_BAD_REQUEST)
    i.current_stock = new_stock
    i.save()
    
    return Response(data={"item_name": i.name, "new_stock": i.current_stock}, status=status.HTTP_200_OK)