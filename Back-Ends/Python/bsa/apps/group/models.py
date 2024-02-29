from django.db import models
from apps.authentication.models import UserModel
from django.contrib.postgres.fields import ArrayField


class GroupModel(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="groups")
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=60)
    category = models.CharField(max_length=20)
    goal_balance = models.DecimalField(max_digits=10, decimal_places=2)
    group_balance = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=20, default="USD")
    emails = ArrayField(models.CharField(max_length=50), default=list)
    status = models.CharField(max_length=20, default="pending", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Group"
        verbose_name_plural = "Groups"

    def __str__(self):
        return self.name
