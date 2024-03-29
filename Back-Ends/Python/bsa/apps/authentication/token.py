import jwt
from datetime import datetime, timedelta
from bsa.settings import SECRET_KEY
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status


class AuthenticationToken:
    def generate_token(self, pk):
        payload = {
            "exp": datetime.utcnow() + timedelta(days=30),
            "iat": datetime.utcnow(),
            "id": pk,
        }
        return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, SECRET_KEY)
            return payload["id"]
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            raise AuthenticationFailed(
                {
                    "status": status.HTTP_403_FORBIDDEN,
                    "error": "Token invalid or expired. please login again.",
                }
            )
