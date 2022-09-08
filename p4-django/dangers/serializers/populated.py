from .common import DangerSerializer

from locations.serializers.common import LocationSerializer

class PopulatedDangerSerializer(DangerSerializer):
  
  locations = LocationSerializer(many=True)
