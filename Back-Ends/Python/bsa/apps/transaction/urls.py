from django.urls import path, include
from .views import TransactionFetchView

urlpatterns = [
    path("", TransactionFetchView.as_view()),
]
