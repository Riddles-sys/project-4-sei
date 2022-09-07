from rest_framework import serializers
from ..models import Location

# Serializer for Locations
class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'