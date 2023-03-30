from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .renderers import UserRenderer
from .serializers import CustomUserSerializer

User = get_user_model()


class CustomUserCreate(APIView):
    renderer_classes = [UserRenderer]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, resquest):
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


class UserDeatail(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        try:
            user = User.objects.get(pk=request.user.id)
            user_serializer = CustomUserSerializer(user)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(data=user_serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response(
                data={"message": "user does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            user_serializer = CustomUserSerializer(
                instance=user, data=request.data, many=True
            )
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(
                    data={"message": "user created successfully"},
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                data={"message": user_serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except User.DoesNotExist:
            return Response(
                data={"message": "user does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request):
        try:
            user = User.objects.get(pk=request.user.id)
            User.objects.get(pk=request.user.id).blog_posts.all().delete()
            user.delete()

            return Response(
                data={"message": f"User deleted successfully"},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                data={"message": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )


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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.user_name
        token["email"] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
