# Create your models here.
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.urls import reverse

class Item(models.Model):
    PRIMARY_CHOICES = (
        ("FO", "Food"),
        ("HI", "Household Item"),
        ("OS", "Office Supplies")
    )
    SECONDARY_CHOICES = (
        ("FR", "Fruit"),
        ("DR", "Drink"),
        ("VEG", "Vegetables"),
        ("ME", "Meat")
    )

    name = models.TextField()
    color = models.TextField(blank=True)
    weight = models.DecimalField(
        max_digits=10,
        decimal_places=3,
        null=True,
        blank=True
    )
    price = models.DecimalField(
        validators=[MinValueValidator(0)],
        max_digits=7,
        decimal_places=2
    )
    current_stock = models.IntegerField(
        validators=[MinValueValidator(0)],
        default=0
    )
    primary_type = models.TextField(
        choices = PRIMARY_CHOICES
    )
    secondary_type = models.TextField(
        choices = SECONDARY_CHOICES,
        blank=True
    )
    image = models.ImageField(upload_to="Items")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.secondary_type and self.primary_type != "FO":
            raise ValidationError("Secondary types are not allowed for non-food items")
        self.full_clean()
        super().save(*args, **kwargs)


class Review(models.Model):
    text = models.TextField()
    item = models.ForeignKey(
        'Item',
        on_delete=models.CASCADE
    )