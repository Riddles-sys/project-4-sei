from .common import LocationSerializer
from dangers.serializers.common import DangerSerializer
from reviews.serializers.populated import PopulatedReviewSerializer

class PopulateLocationSerializer(LocationSerializer):
  reviews = PopulatedReviewSerializer
  dangers = DangerSerializer(many=True)