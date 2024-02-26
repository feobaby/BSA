import jwt
from django.conf import settings
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
from .models import UserModel


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get("Authorization")

        if not token:
            return None

        try:
            token = token.split()[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired.")
        except jwt.DecodeError:
            raise AuthenticationFailed("Invalid token.")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token.")

        try:
            user = UserModel.objects.get(pk=payload["id"])
        except UserModel.DoesNotExist:
            raise AuthenticationFailed("No user found for token provided")

        return (user, token)
