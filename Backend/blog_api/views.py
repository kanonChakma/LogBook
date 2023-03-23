from blog.models import Post

# from django.shortcuts import get_object_or_404
from rest_framework import generics

from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
)

from .serailizers import PostSerializer
from rest_framework import filters


class PostUserUpdatePermission(BasePermission):
    message = ""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class PostListDetailfilter(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["slug"]


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        slug = self.kwargs["slug"]
        return Post.objects.filter(slug=slug)


class AutorPost(generics.ListAPIView, PostUserUpdatePermission):
    permission_classes = [PostUserUpdatePermission]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Post.objects.filter(author=user.id)


class CreatePost(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class SinglePost(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class EditPost(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class DeletePost(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
