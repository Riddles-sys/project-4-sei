from rest_framework import serializers
from ..models import Danger

class DangerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Danger
    fields = '__all__'