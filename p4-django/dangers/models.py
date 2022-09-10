from django.contrib.postgres.fields import ArrayField

from django.db import models



danger_choices = (
  ('Low Risk', 'Low Risk'),
  ('Medium Risk', 'Medium Risk'),
  ('High Risk', 'High Risk')
)

# Create your models here.
class Danger(models.Model):

  name = models.CharField(max_length=100, blank=True, choices = danger_choices)



  def __str__(self):
    return f'{self.name}'
