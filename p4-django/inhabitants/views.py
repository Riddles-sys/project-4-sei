from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Inhabitant
from rest_framework import status
from .serializers.common import InhabitantSerializer

# Create your views here.
class InhabitantListView(APIView):
#* Get all reviews
  def get(self, request):

    inhabitants = Inhabitant.objects.all()
    print('inhabitants -->', inhabitants)
    serialized_inhabitants = InhabitantSerializer(inhabitants, many=True)
    print(serialized_inhabitants.data)
    return Response(serialized_inhabitants.data, status=status.HTTP_200_OK)