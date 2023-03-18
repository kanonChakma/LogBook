from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .renderers import UserRenderer
from .serializers import CustomUserSerializer


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [UserRenderer]

    def post(self, resquest, format="json"):
        serializer = CustomUserSerializer(data=resquest.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                data = serializer.data
                return Response(data, status=status.HTTP_201_CREATED)

        default_errors = serializer.errors
        new_error = {}
        for field_name, field_errors in default_errors.items():
            new_error[field_name] = field_errors[0]
        return Response(new_error, status=status.HTTP_400_BAD_REQUEST)


class BlackListTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [UserRenderer]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
