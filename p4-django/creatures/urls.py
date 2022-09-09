from django.urls import path
from .views import CreatureListView

urlpatterns = [
  path('', CreatureListView.as_view()),
  # path('<int:pk>/', CreaturesDetailView.as_view()),
]