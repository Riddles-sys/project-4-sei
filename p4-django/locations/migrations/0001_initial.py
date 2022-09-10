# Generated by Django 4.1.1 on 2022-09-10 14:56

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('creatures', '0001_initial'),
        ('inhabitants', '0001_initial'),
        ('dangers', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=150)),
                ('history', models.CharField(default=None, max_length=400)),
                ('trivia', models.CharField(default=None, max_length=200)),
                ('location_images', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(default=None, max_length=300), size=None)),
                ('youtube_id', models.CharField(default=None, max_length=100)),
                ('creatures', models.ManyToManyField(blank=True, related_name='location_creature', to='creatures.creature')),
                ('dangers', models.ManyToManyField(related_name='locations', to='dangers.danger')),
                ('dislikes', models.ManyToManyField(blank=True, related_name='location_dislike', to=settings.AUTH_USER_MODEL)),
                ('favourites', models.ManyToManyField(blank=True, related_name='location_favourite', to=settings.AUTH_USER_MODEL)),
                ('inhabitants', models.ManyToManyField(blank=True, related_name='location_inhabitant', to='inhabitants.inhabitant')),
                ('likes', models.ManyToManyField(blank=True, related_name='location_like', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
