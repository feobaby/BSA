from django.db import models
from apps.authentication.models import UserModel


class AccountModel(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    balance = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, verbose_name="Balance"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        verbose_name = "Account"
        verbose_name_plural = "Accounts"
