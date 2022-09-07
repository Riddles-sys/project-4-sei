from django.db import models

# Create your models here.
class Location(models.Model):
  name = models.CharField(max_length=150, default=None)
  history = models.CharField(max_length=400, default=None)
  trivia = models.CharField(max_length=200, default=None)
  location_image = models.CharField(max_length=300, default=None)
  youtube_id = models.CharField(max_length=100, default=None)
    # dangers = models.ManyToManyField(
  #   'dangers.Danger'
  #   related_name='locations;'

#* This is the one that shows up on the db folder
  def __str__(self):
    return f'{self.name}'