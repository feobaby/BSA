from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import GroupSerializer
from rest_framework.permissions import IsAuthenticated
from .models import GroupModel
from apps.account.models import AccountModel
from django.shortcuts import get_object_or_404
from apps.transaction.serializers import TransactionSerializer
from apps.account.serializers import AccountSerializer
import random
from django.http import Http404
from decimal import Decimal


class GroupCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.user.id
        request.data["user_id"] = user_id
        group_serializer = GroupSerializer(data=request.data)
        if group_serializer.is_valid():
            group = group_serializer.save()
            response = {
                "status": status.HTTP_201_CREATED,
                "message": "Your group has been created successfully!",
                "create_group": group_serializer.data,
            }
            return Response(response)
        return Response(group_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupByUserFetchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            groups = GroupModel.objects.filter(user_id=request.user.id)
            serializer = GroupSerializer(groups, many=True)
            response = {"status": status.HTTP_200_OK, "data": serializer.data}
            return Response(response)
        except Exception as e:
            return Response(
                {"status": status.HTTP_500_INTERNAL_SERVER_ERROR, "message": str(e)}
            )


class GroupDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return GroupModel.objects.get(pk=pk)
        except GroupModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        note = self.get_object(pk)
        serializer = GroupSerializer(note)
        return Response({"status": status.HTTP_200_OK, "data": serializer.data})


class GroupPartOfView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            email = request.GET.get("email")
            if email:
                groups = GroupModel.objects.filter(
                    emails__icontains=email, user_id=request.user.id
                )
            else:
                groups = GroupModel.objects.filter(user_id=request.user.id)

            serializer = GroupSerializer(groups, many=True)
            response = {"status": status.HTTP_200_OK, "data": serializer.data}
            return Response(response)
        except Exception as e:
            return Response(
                {"status": status.HTTP_500_INTERNAL_SERVER_ERROR, "message": str(e)}
            )


class GroupUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        group = get_object_or_404(GroupModel, pk=pk)
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "message": "Successful Update!",
                    "data": serializer.data,
                }
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        group = get_object_or_404(Group, pk=pk)
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "message": "Successful Update!",
                    "data": serializer.data,
                }
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepositMoneyToGroup(APIView):
    permission_classes = [IsAuthenticated]

    def get_group_object(self, pk):
        try:
            return GroupModel.objects.get(pk=pk)
        except GroupModel.DoesNotExist:
            raise Http404("Group does not exist")

    def get_account_object(self, user_id):
        try:
            return AccountModel.objects.get(user_id=user_id)
        except AccountModel.DoesNotExist:
            raise Http404("Account does not exist for this user")

    def put(self, request, pk, format=None):
        user_id = request.user.id
        user = request.user
        group = self.get_group_object(pk)
        account = self.get_account_object(user_id)
        deposited_amount = request.data.get("amount")

        if deposited_amount is None:
            return Response(
                {"error": "An amount is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Generate a random number
        random_number = random.randint(10**9, (10**10) - 1)

        transaction_data = {
            "user_id": user_id,
            "account_id": account.id,
            "group_id": group.id,
            "amount": deposited_amount,
            "referenceNo": random_number,
            "category": "group-deposit",
            "created_at": user.created_at,
            "updated_at": user.updated_at,
        }

        transaction_serializer = TransactionSerializer(data=transaction_data)

        if transaction_serializer.is_valid():
            transaction_serializer.save()
        else:
            print(transaction_serializer.errors)
            return Response(
                {"error": "Transaction creation failed."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        deposited_amount_decimal = Decimal(str(deposited_amount))
        change_in_balance = group.goalBalance - group.groupBalance

        if (
            deposited_amount > change_in_balance
            or group.goalBalance == group.groupBalance
        ):
            return Response(
                {
                    "error": "You are depositing more than necessary or goal met already."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            # Adjust group and account balances
            group.groupBalance += deposited_amount_decimal
            account.balance -= deposited_amount_decimal

            # Save changes to database
            group.save()
            account.save()

            # Serialize updated group and account data
            group_serializer = GroupSerializer(group)
            account_serializer = AccountSerializer(account)

        if group.goalBalance == group.groupBalance and group.status == "pending":
            group.status = "completed"
            group.save()

        return Response(
            {
                "status": status.HTTP_200_OK,
                "message": "Group balance updated successfully!",
                "updated_group_balance": group_serializer.data,
                "updated_user_balance": account_serializer.data,
                "transaction": transaction_serializer.data,
            },
            status=status.HTTP_200_OK,
        )
