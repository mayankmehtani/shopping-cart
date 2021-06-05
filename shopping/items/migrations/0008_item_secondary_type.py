# Generated by Django 3.1.5 on 2021-06-05 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0007_auto_20210603_1921'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='secondary_type',
            field=models.TextField(blank=True, choices=[('FR', 'Fruit'), ('DR', 'Drink'), ('VEG', 'Vegetables'), ('ME', 'Meat')]),
        ),
    ]
