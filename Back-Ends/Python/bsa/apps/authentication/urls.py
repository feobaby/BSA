from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserFetchView

urlpatterns = [
    path("signup", UserRegistrationView.as_view()),
    path("signin", UserLoginView.as_view()),
    path("profile", UserFetchView.as_view()),
]
