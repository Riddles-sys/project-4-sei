# Generated by Django 4.1.1 on 2022-09-10 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Danger',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, choices=[('Low Risk', 'Low Risk'), ('Medium Risk', 'Medium Risk'), ('High Risk', 'High Risk')], max_length=100)),
            ],
        ),
    ]
