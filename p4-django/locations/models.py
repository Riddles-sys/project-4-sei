from django.db import models
from django.contrib.postgres.fields import ArrayField

# import favourites

# Create your models here.
class Location(models.Model):
  name = models.CharField(max_length=150, default=None)
  history = models.CharField(max_length=400, default=None)
  trivia = models.CharField(max_length=200, default=None)
  location_images = ArrayField(models.CharField(max_length=300, default=None))
  youtube_id = models.CharField(max_length=100, default=None)
  dangers = models.ManyToManyField(
    'dangers.Danger',
    related_name = 'locations',
  )
  # favourites = models.ManyToManyField(
  #   'jwt_auth.User',
  #   related_name = 'favourite',
  #   default = None, 
  #   blank = True
  # )

  likes = models.ManyToManyField(
    'jwt_auth.User', 
    blank=True, 
    related_name = 'location_like'
    )

  dislikes = models.ManyToManyField(
    'jwt_auth.User', 
    blank=True, 
    related_name = 'location_dislike'
    )

#* This is the one that shows up on the db folder
  def __str__(self):
    return f'{self.name}'

