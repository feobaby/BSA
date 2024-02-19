from rest_framework import serializers
from .models import UserModel

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        max_length=7,
        write_only=True,
        required=True,
        error_messages={
            "required": "Password is required.",
        }
    )
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = UserModel
        fields = ['email', 'password', 'first_name', 'last_name', 'created_at', 'updated_at']

    def validate_email(self, email):
        if UserModel.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists.")
        return email                