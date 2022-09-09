# Generated by Django 4.1.1 on 2022-09-09 12:45

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='location_like', to=settings.AUTH_USER_MODEL),
        ),
    ]
