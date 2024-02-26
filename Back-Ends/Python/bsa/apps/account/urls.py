from django.urls import path, include
from .views import DepositMoneyToWallet

urlpatterns = [
    path("deposit-wallet", DepositMoneyToWallet.as_view()),
]
