# Create your models here.
from django.core.validators import MinValueValidator
from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.urls import reverse

class Item(models.Model):
    ITEM_CHOICES = (
        ("FO", "Food"),
        ("HI", "Household Item"),
        ("OS", "Office Supplies")
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
    type = models.TextField(
        choices = ITEM_CHOICES,
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class Review(models.Model):
    text = models.TextField()
    item = models.ForeignKey(
        'Item',
        on_delete=models.CASCADE
    )