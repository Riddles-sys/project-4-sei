from .common import LocationSerializer
from dangers.serializers.common import DangerSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from creatures.serializers.common import CreatureSerializer
from inhabitants.serializers.common import InhabitantSerializer



class PopulatedLocationSerializer(LocationSerializer):
  reviews = PopulatedReviewSerializer(many=True)
  dangers = DangerSerializer(many=True)
  creatures = CreatureSerializer(many=True)
  inhabitants = InhabitantSerializer(many=True)

class PopulatedLocationDangerSerializer(LocationSerializer):
  dangers = DangerSerializer(many=True)
  creatures = CreatureSerializer(many=True)
  inhabitants = InhabitantSerializer(many=True)
