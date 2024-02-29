from django.urls import path
from .views import DepositMoneyToWallet

urlpatterns = [
    path("deposit-wallet", DepositMoneyToWallet.as_view()),
]
