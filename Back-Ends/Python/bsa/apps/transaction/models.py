from django.db import models
from apps.authentication.models import UserModel
from apps.account.models import AccountModel


class TransactionModel(models.Model):

    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    account_id = models.ForeignKey(AccountModel, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    referenceNo = models.CharField(max_length=20)
    category = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
