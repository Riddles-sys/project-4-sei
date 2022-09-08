import imp
from .common import DangerSerializer
from locations.serializers.common import LocationSerializer

class PopulatedDangerSerializer(LocationSerializer):
  locations = LocationSerializer(many=True)