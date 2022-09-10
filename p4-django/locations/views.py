from gc import get_objects
from http.client import HTTPResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404
from .serializers.common import LocationSerializer
from .serializers.populated import PopulatedLocationSerializer, PopulatedLocationDangerSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Location


# Create your views here.
# * All locations
class LocationListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, request):

    locations = Location.objects.all()
    print('locations -->', locations)
    serialized_locations = PopulatedLocationDangerSerializer(locations, many=True)
    print(serialized_locations.data)
    return Response(serialized_locations.data, status=status.HTTP_200_OK)

  def post(self, request):
    print('request data ->', request.data)
    location_to_add = LocationSerializer(data=request.data)
    try:
      location_to_add.is_valid(True)
      location_to_add.save()
      return Response(location_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('Error')
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# * Detailed single location
class LocationDetailView(APIView):

  def get_location(self, pk):
    try:
      return Location.objects.get(pk=pk)
    except Location.DoesNotExist:
      raise NotFound(detail='Location not found')

  # Get single location
  def get(self, _request, pk):
      location = self.get_location(pk=pk)
      serialized_location = PopulatedLocationSerializer(location)
      return Response(serialized_location.data)

  # Delete single location
  def delete(self, request, pk):
    location_to_delete = self.get_location(pk=pk)
    location_to_delete.delete()
    print('location deleted')
    return Response(status=status.HTTP_204_NO_CONTENT)

  # Updating single location
  def put(self, request, pk):  
    location_to_update = self.get_location(pk=pk)
    updated_location = LocationSerializer(location_to_update, data=request.data)
    try: 
      updated_location.is_valid(True)
      updated_location.save()
      return Response(updated_location.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Likes
class LikesView(APIView):
  
  def LocationLike(self, request, pk):
    post = get_object_or_404(Location, id=request.POST.get('location_id'))
    if post.likes.filter(id=request.user.id).exists():
      post.likes.remove(request.user)
    else: 
      post.likes.add(request.user)
    return Response(post.likes.data, status=status.HTTP_202_ACCEPTED)

class DislikesView(APIView):

  def LocationDislike(self, request, pk):
    post = get_object_or_404(Location, id=request.POST.get('location_id'))
    if post.dislikes.filter(id=request.user.id).exists():
      post.dislikes.remove(request.user)
    else: 
      post.dislikes.add(request.user)
    return Response(post.dislikes.data, status=status.HTTP_202_ACCEPTED)

class FavouritesListView(APIView):
# creating favourites
  def favourites(self, request, pk):
    favourite_location = get_object_or_404(Location, pk=pk)
    if favourite_location.favourites.filter(id=request.user.id).exist():
      favourite_location.favourites.remove(request.user)
    else:
      favourite_location.favourites.add(request.user)
    return Response(favourite_location.data)

    