from django.db import models
from apps.authentication.models import UserModel

class AccountModel(models.Model):

    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)