from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
# from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
import jwt
User = get_user_model()
from .serializers.common import UserSerializer #ChangePasswordSerializer


# Create your views here.
class RegisterView(APIView):

  def post(self, request):
    user_to_create = UserSerializer(data=request.data)

    try:
      user_to_create.is_valid(True)
      user_to_create.save()
      print('user data------->', user_to_create.data)

      return Response(user_to_create.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
  
  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
      user_to_login = User.objects.get(email=email)
    except User.DoesNotExist:
      print('Failed at email stage')
      raise PermissionDenied('Invalid Credentials')

    if not user_to_login.check_password(password):
      print('Failed at the password stage')
      raise PermissionDenied('Invalid credentials')

    dt = datetime.now() + timedelta(days=7)

    token = jwt.encode(
      {
        'sub': user_to_login.id,
        'exp': int(dt.strftime('%s'))
      },
      settings.SECRET_KEY,
      'HS256'
    )
    print('Token ---->', token)

    return Response({ 'token': token, 'message': f'Welcome back {user_to_login.username}'})

#! View User When Logged In
class LoggedInUser(APIView):

  def logged_user(self, _request, pk):
    user_to_get = User.objects.all(pk=pk)
    try:
      pass
    except Exception as e:
      pass





# ! THESE NEED WORKING
# class Logout(APIView):

#   def User_logout(request):
#     permission_classes = permission_classes(IsAuthenticated)

# #* For passwords change
# class ChangePasswordView(generics.UpdateAPIView):
  


#   def post(self, request, pk):
#     queryset = User.objects.get(pk=pk)
#     permission_classes = (IsAuthenticated,)
#     serializer_class = ChangePasswordSerializer

