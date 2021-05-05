from rest_framework import serializers

class ItemSerializer(serializers.Serializer):
    name = serializers.CharField()
    weight = serializers.DecimalField(
        max_digits=10,
        decimal_places=3
    )
    price = serializers.DecimalField(
        max_digits=7,
        decimal_places=2
    )
    color = serializers.CharField()