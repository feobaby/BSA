from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from apps.account.serializers import AccountSerializer

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            account_data = {'user_id': user.id}
            account_serializer = AccountSerializer(data=account_data)
            if account_serializer.is_valid():
                account = account_serializer.save()
            return Response({
                "status": status.HTTP_201_CREATED,
                "message": "Your account has been created successfully",
                  "create_user": {
                    "id": user.id, 
                    "email": user_serializer.validated_data["email"],
                    "first_name": user_serializer.validated_data["first_name"],
                    "last_name": user_serializer.validated_data["last_name"],
                    "password": user.password,
                    "created_at": user.created_at,
                    "updated_at": user.created_at,
                },
                "create_account": {
                    "id": account.id,
                    "user_id": account.user_id.id,
                    "balance": account.balance,
                    "created_at": account.created_at,
                    "updated_at": account.updated_at,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)
        if user:
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
