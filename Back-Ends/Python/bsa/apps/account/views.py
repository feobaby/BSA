import random
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.account.serializers import AccountSerializer
from apps.transaction.serializers import TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from .models import AccountModel
from decimal import Decimal


class DepositMoneyToWallet(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, user):
        try:
            return user.accountmodel_set.first()
        except AccountModel.DoesNotExist:
            raise NotFound("Account not found for this user.")

    def put(self, request, format=None):
        user = request.user
        account = self.get_object(user)
        deposited_amount = request.data.get("amount")

        if deposited_amount is None:
            return Response(
                {
                    "status": status.HTTP_400_BAD_REQUEST,
                    "error": "An amount is required.",
                }
            )

        # Generate a random number
        random_number = random.randint(10**9, (10**10) - 1)

        transaction_data = {
            "user_id": request.user.id,
            "account_id": account.id,
            "amount": deposited_amount,
            "referenceNo": random_number,
            "category": "wallet-deposit",
            "created_at": user.created_at,
            "updated_at": user.updated_at,
        }

        transaction_serializer = TransactionSerializer(data=transaction_data)

        if transaction_serializer.is_valid():
            transaction_serializer.save()
        else:
            return Response(
                {
                    "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "error": "Transaction creation failed.",
                }
            )
        deposited_amount_decimal = Decimal(str(deposited_amount))
        account.balance += deposited_amount_decimal
        account.save()

        account_serializer = AccountSerializer(account)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "message": "Wallet updated successfully!",
                "updated_balance": account_serializer.data,
                "transaction": transaction_serializer.data,
            },
            status=status.HTTP_200_OK,
        )
