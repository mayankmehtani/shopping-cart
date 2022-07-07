from rest_framework import serializers

class ItemSerializer(serializers.Serializer):
    name = serializers.CharField()
    current_stock = serializers.IntegerField()
    weight = serializers.DecimalField(
        max_digits=10,
        decimal_places=3
    )
    price = serializers.DecimalField(
        max_digits=7,
        decimal_places=2
    )
    color = serializers.CharField()
    image = serializers.ImageField()


class ItemOrderRequest(serializers.Serializer):
    item_name = serializers.CharField()
    quantity_requested = serializers.IntegerField(
        min_value=1
    )