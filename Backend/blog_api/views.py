from blog.models import Post
from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets
from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
    DjangoModelPermissions,
    DjangoModelPermissionsOrAnonReadOnly,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response

from .serailizers import PostSerializer


class PostUserUpdatePermission(BasePermission):
    message = ""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        slug = self.kwargs["slug"]
        return Post.objects.filter(slug=slug)


class AutorPost(generics.ListAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Post.objects.filter(author=user.id)


""""
# Model Viewset
class ModelPostList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get("pk")
        return get_object_or_404(Post, slug=item)

    def get_queryset(self):
        return Post.objects.all()


# View set
class ViewSetPostList(viewsets.ViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()

    def list(self, request):
        serializer_class = PostSerializer(self.queryset, many=True)
        return Response(serializer_class.data)

    def retrieve(self, request, pk=None):
        post = get_object_or_404(self.queryset, pk=pk)
        serializer_class = PostSerializer(post)
        return Response(serializer_class.data)


# def list(self, request):
# def create(self, request):
# def retrieve(self, request, pk=None):
# def update(self, request, pk=None):
# def partial_update(self, request, pk=None):
# def destroy(self, request, pk=None):
"""

"""
# Generic View
class PostList(generics.ListCreateAPIView):
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(
    generics.RetrieveUpdateDestroyAPIView, PostUserUpdatePermission
):
    permission_classes = [PostUserUpdatePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
"""
