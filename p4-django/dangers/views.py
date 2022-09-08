from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Danger
from .serializers.populated import PopulatedDangerSerializer

# Create your views here.
class DangerListView(APIView):

  def get(self, _request):
    dangers = Danger.object.all()
    serialized_dangers = PopulatedDangerSerializer(dangers, many=True)
    return Response(serialized_dangers.data, status=status)