from blog.models import Post
from rest_framework import generics
from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
    DjangoModelPermissions,
    DjangoModelPermissionsOrAnonReadOnly,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from .serailizers import PostSerializer


class PostUserUpdatePermission(BasePermission):
    message = ""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserUpdatePermission):
    permission_classes = [PostUserUpdatePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
