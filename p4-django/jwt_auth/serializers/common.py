from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    mode = User
    fields = ('id', 'email', 'profile_image', 'password', 'password_confirmation')