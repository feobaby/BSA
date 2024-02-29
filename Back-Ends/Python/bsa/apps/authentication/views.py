import bcrypt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, LoginSerializer
from apps.account.serializers import AccountSerializer
from apps.group.serializers import GroupSerializer
from .token import AuthenticationToken
from .models import UserModel
from django.contrib.auth import authenticate


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        authentication_token = AuthenticationToken()
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            # Extract the password from the serializer data
            password = user_serializer.validated_data["password"]

            # Hash the password
            hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

            # Set the hashed password back to the serializer data
            user_serializer.validated_data["password"] = hashed_password.decode("utf-8")

            # Save the user
            user = user_serializer.save()

            account_data = {"user_id": user.id}
            account_serializer = AccountSerializer(data=account_data)
            if account_serializer.is_valid():
                account = account_serializer.save()

            return Response(
                {
                    "status": status.HTTP_201_CREATED,
                    "message": "Your account has been created successfully",
                    "create_user": {
                        "id": user.id,
                        "email": user_serializer.validated_data["email"],
                        "first_name": user_serializer.validated_data["first_name"],
                        "last_name": user_serializer.validated_data["last_name"],
                        "password": hashed_password.decode("utf-8"),
                        "created_at": user.created_at,
                        "updated_at": user.created_at,
                    },
                    "create_account": {
                        "id": account.id,
                        "user_id": account.user_id.id,
                        "balance": account.balance,
                        "created_at": account.created_at,
                        "updated_at": account.updated_at,
                    },
                    "token": authentication_token.generate_token(user.id),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_login_serializer = LoginSerializer(data=request.data)
        if user_login_serializer.is_valid():
            data = user_login_serializer.validated_data
            email = data.get("email")
            password = data.get("password")

            try:
                user = UserModel.objects.get(email=email)
            except UserModel.DoesNotExist:
                return Response(
                    {
                        "status": status.HTTP_400_BAD_REQUEST,
                        "error": "Email does not exist!",
                    },
                )

            # Verify the password using bcrypt
            if bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
                authentication_token = AuthenticationToken()
                token = authentication_token.generate_token(user.pk)
                return Response({"status": status.HTTP_200_OK, "token": token})
            else:
                return Response(
                    {
                        "status": status.HTTP_400_BAD_REQUEST,
                        "error": "Incorrect Password!",
                    },
                )
        else:
            return Response(
                user_login_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class UserFetchView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request):
        if not request.user.is_authenticated:
            raise Http404("User not authenticated")

        user_pk = request.user.pk
        try:
            return UserModel.objects.get(pk=user_pk)
        except UserModel.DoesNotExist:
            raise Http404("User does not exist")

    def get(self, request, format=None):
        try:
            user = self.get_object(request)
            account = user.accountmodel_set.first()
            groups = user.groupmodel_set.all()
            user_serializer = UserSerializer(user)
            account_serializer = AccountSerializer(account)
            group_serializer = GroupSerializer(groups, many=True)
            user_data = user_serializer.data
            account_data = account_serializer.data
            group_data = group_serializer.data
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "user_data": user_data,
                    "account_data": account_data,
                    "group_data": group_data,
                }
            )
        except Exception as e:
            return Response(
                {"error": "An error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
