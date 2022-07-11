from .models import Item
from .serializers import ItemOrderRequest, ItemSerializer
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import BadRequest

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
def process_order(request) -> Response:
    if request.data == {}:
        raise BadRequest("Cannot process an empty order")

    shopping_items = Item.objects.filter(name__in=list(request.data.keys()))

    # 404 logic here
    diff = set(request.data.keys()) - set(shopping_items.values_list("name", flat=True))
    if diff:
        raise BadRequest(f"Could not find requested items - {', '.join(diff)}")

    for i in shopping_items:
        if request.data[i.name]["quantity"] > i.current_stock:
            raise BadRequest(f"{i.name} inventory is too low to complete this order")
    
    for i in shopping_items:
        i.current_stock -= request.data[i.name]["quantity"]
        i.save()

    return Response(data={}, status=status.HTTP_200_OK)