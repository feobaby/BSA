from .models import UserModel
from rest_framework import serializers
from apps.account.serializers import AccountSerializer
from apps.group.serializers import GroupSerializer


class UserSerializer(serializers.ModelSerializer):
    account_model = AccountSerializer(required=False)
    group_model = GroupSerializer(required=False)
    email = serializers.EmailField()
    password = serializers.CharField(
        max_length=7,
        write_only=True,
        required=True,
        error_messages={
            "required": "Password is required.",
        },
    )
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = UserModel
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "created_at",
            "updated_at",
            "account_model",
            "group_model",
        ]

    def validate_email(self, email):
        if UserModel.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists.")
        return email


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            raise serializers.ValidationError("Both email and password are required.")

        user = UserModel.objects.filter(email=email).first()

        if not user:
            raise serializers.ValidationError("Email does not exist.")

        return data
