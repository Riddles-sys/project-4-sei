# Generated by Django 4.1.1 on 2022-09-12 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Creature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=100)),
                ('origin', models.CharField(default=None, max_length=100)),
                ('height', models.CharField(default=None, max_length=100)),
                ('languages', models.CharField(default=None, max_length=100)),
                ('image1', models.CharField(default=None, max_length=300)),
                ('image2', models.CharField(default=None, max_length=300)),
                ('image3', models.CharField(default=None, max_length=300)),
                ('about', models.CharField(default=None, max_length=400)),
            ],
        ),
    ]
