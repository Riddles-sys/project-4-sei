from django.db import models



# danger_choices = (
#   ('1', 'Low-Risk'),
#   ('2', 'Medium-Risk'),
#   ('3', 'High-Risk')
# )

# Create your models here.
class Danger(models.Model):

  name = models.CharField(max_length=100)



  def __str__(self):
    return f'{self.name}'
