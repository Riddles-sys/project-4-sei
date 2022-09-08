from django.urls import path
from .views import DangerListView

urlpatterns = [
  path('', DangerListView.as_view())
]