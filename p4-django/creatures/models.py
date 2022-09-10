from django.db import models

# Create your models here.
class Creature(models.Model):
  name = models.CharField(max_length=100, default=None)
  origin = models.CharField(max_length=100, default=None)
  height = models.CharField(max_length=100, default=None)
  languages = models.CharField(max_length=100, default=None)
  images = models.CharField(max_length=300, default=None)
  about = models.CharField(max_length=400, default=None)
  dangers = models.ManyToManyField(
    'dangers.Danger',
    related_name= 'dangers'
  )
  
  def __str__(self):
      return f'{self.name}'