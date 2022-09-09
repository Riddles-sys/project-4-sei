from django.urls import path

# from ..favourites.views import Favourite
from .views import RegisterView, LoginView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  # path('favourites/', Favourite.as_view())
]