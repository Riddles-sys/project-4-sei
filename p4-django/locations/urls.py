from django.urls import path
from .views import LocationListView, LocationDetailView, LikesView, DislikesView

urlpatterns = [
  path('', LocationListView.as_view()),
  path('<int:pk>/', LocationDetailView.as_view()),
  # path('location_likes/', LikesView.as_view())
  # path('location_dislikes/', DislikesView.as_view())
]

