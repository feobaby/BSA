from django.urls import path, include
from .views import (
    GroupCreateView,
    GroupByUserFetchView,
    GroupDetailView,
    GroupPartOfView,
    GroupUpdateView,
    DepositMoneyToGroup,
)

urlpatterns = [
    path("create", GroupCreateView.as_view()),
    path("user", GroupByUserFetchView.as_view()),
    path("<int:pk>", GroupDetailView.as_view()),
    path("", GroupPartOfView.as_view()),
    path("update/<int:pk>", GroupUpdateView.as_view()),
    path("deposit-group/<int:pk>", DepositMoneyToGroup.as_view()),
]
