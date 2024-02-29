import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import UserModel
from rest_framework import status


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get("Authorization")

        if not token:
            return None

        try:
            token = token.split()[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(
                {
                    "status": status.HTTP_403_FORBIDDEN,
                    "error": "Token has expired.",
                }
            )
        except jwt.DecodeError:
            raise AuthenticationFailed(
                {
                    "status": status.HTTP_403_FORBIDDEN,
                    "error": "Invalid token.",
                }
            )
        except jwt.InvalidTokenError:
            raise AuthenticationFailed(
                {
                    "status": status.HTTP_403_FORBIDDEN,
                    "error": "Invalid token.",
                }
            )

        try:
            user = UserModel.objects.get(pk=payload["id"])
        except UserModel.DoesNotExist:
            raise AuthenticationFailed(
                {
                    "status": status.HTTP_403_FORBIDDEN,
                    "error": "No user found for token provided.",
                }
            )

        return (user, token)
