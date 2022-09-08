from .common import LocationSerializer
from reviews.serializers.common import ReviewSerializer

# Extend location serializer
class PopulatedLocationSerializer(LocationSerializer):
  locations = ReviewSerializer(many=True)
  