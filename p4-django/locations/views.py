from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Location
from .serializers.common import LocationSerializer

# Create your views here.
class LocationListView(APIView):

  def get(self, _request):

    locations = Location.objects.all()
    print('locations -->', locations)
    serialized_locations = LocationSerializer(locations, many=True)
    print(serialized_locations)
    print(serialized_locations.data)
    return Response(serialized_locations.data, status=status.HTTP_200_OK)