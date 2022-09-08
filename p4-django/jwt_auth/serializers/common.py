from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from rest_framework.exceptions import ValidationError 
from django.contrib.auth.hashers import make_password
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

  
# Stops passwords being revealed
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

      password = data.pop('password')
      password_confirmation = data.pop('password_confirmation')

      if password != password_confirmation:
        raise ValidationError({
          'password_confirmation': 'Passwords do not match'
        })

      
      password_validation.validate_password(password)

      data['password'] = make_password(password)
    
      return data

    class Meta:
      model = User
      fields = ('id', 'username', 'email', 'profile_image', 'password', 'password_confirmation')