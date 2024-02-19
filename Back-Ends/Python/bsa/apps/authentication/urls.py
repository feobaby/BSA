from django.urls import path, include
from .views import UserRegistrationView

urlpatterns = [
    path('signup',UserRegistrationView.as_view()),
]
