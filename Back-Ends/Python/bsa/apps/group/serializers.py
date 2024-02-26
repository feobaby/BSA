from rest_framework import serializers
from .models import GroupModel
from apps.authentication.models import UserModel


class GroupSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = GroupModel
        fields = [
            "id",
            "user_id",
            "name",
            "description",
            "category",
            "goalBalance",
            "groupBalance",
            "currency",
            "emails",
            "status",
            "created_at",
            "updated_at",
        ]
