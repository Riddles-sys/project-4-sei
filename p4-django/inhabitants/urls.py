from django.urls import path
from .views import InhabitantListView

urlpatterns = [
  path('', InhabitantListView.as_view())
  ]