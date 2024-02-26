from rest_framework import serializers
from .models import TransactionModel


class TransactionSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = TransactionModel
        fields = [
            "id",
            "user_id",
            "account_id",
            "amount",
            "referenceNo",
            "category",
            "created_at",
            "updated_at",
        ]
