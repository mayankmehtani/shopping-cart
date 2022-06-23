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
def check_item_stock(request, item_name):
    try:
        i = Item.objects.get(name=item_name)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if not i.current_stock:
        return Response(False, status=status.HTTP_200_OK)

    return Response(True, status=status.HTTP_200_OK)

@api_view()
def get_item_by_type(request, item_type):
    items = Item.objects.filter(primary_type=item_type)

    if not items.count():
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(data=ItemSerializer(items, many=True).data, status=status.HTTP_200_OK)
