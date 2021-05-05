# Create your models here.
from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.urls import reverse

class Item(models.Model):
    def __str__(self):
        return self.name

    name = models.TextField()
    color = models.TextField(null=True)
    weight = models.DecimalField(
        max_digits=10,
        decimal_places=3,
        null=True
    )
    price = models.DecimalField(
        max_digits=7,
        decimal_places=2
    )

class Review(models.Model):
    text = models.TextField()
    item = models.ForeignKey(
        'Item',
        on_delete=models.CASCADE
    )