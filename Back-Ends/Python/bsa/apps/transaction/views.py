from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from .models import TransactionModel


class TransactionFetchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = TransactionModel.objects.filter(user_id=request.user.id)
        serializer = TransactionSerializer(transactions, many=True)
        response = {"status": status.HTTP_200_OK, "data": serializer.data}
        return Response(response)
