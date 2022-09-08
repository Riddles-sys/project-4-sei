from .common import LocationSerializer
from dangers.serializers.common import DangerSerializer
from reviews.serializers.populated import PopulatedReviewSerializer


class PopulatedLocationSerializer(LocationSerializer):
  reviews = PopulatedReviewSerializer(many=True)
  dangers = DangerSerializer(many=True)

class PopulatedLocationDangerSerializer(DangerSerializer):
  dangers = DangerSerializer(many=True)