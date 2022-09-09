from .common import LocationSerializer
from dangers.serializers.common import DangerSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from creatures.serializers.common import CreatureSerializer


class PopulatedLocationSerializer(LocationSerializer):
  reviews = PopulatedReviewSerializer(many=True)
  dangers = DangerSerializer(many=True)
  creatures = CreatureSerializer(many=True)

class PopulatedLocationDangerSerializer(LocationSerializer):
  dangers = DangerSerializer(many=True)
  creatures = CreatureSerializer(many=True) 