from rest_framework import serializers
from .models import AccountModel


class AccountSerializer(serializers.ModelSerializer):
    balance = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = AccountModel
        fields = ["id", "user_id", "balance", "created_at", "updated_at"]
