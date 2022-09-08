from urllib import request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

# Create your views here.
class RegisterView(APIView):

  def post(self, request):
    print('registration req --->', request.data)
    return Response(request.data)