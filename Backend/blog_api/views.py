from blog.models import Category, Comment, Post

# from django.shortcuts import get_object_or_404
from rest_framework import filters, generics, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .pagination import PageNumberPagination
from .serailizers import CategorySerializer, CommentSerializer, PostSerializer


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
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PageNumberPagination


class PostDetail(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        slug = self.kwargs["slug"]
        return Post.objects.filter(slug=slug)


class AutorPost(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Post.objects.filter(author=1)


# admin
class CreatePost(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        post_serializer = PostSerializer(data=request.data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response(
                data={
                    "message": "Post created successfully",
                    "posts": post_serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            data={"message": post_serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )


class GetPostByPostId(generics.RetrieveAPIView):
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


# category
class CategoryList(APIView):
    def get(self, request, format=None):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        category_name = request.data.get("category_name", False)
        if category_name:
            category = Category.objects.get(name=category_name)
            posts = Post.objects.filter(category=category.id)
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)


# comments


class CreateComment(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            comment_serializer = CommentSerializer(data=request.data)
            if comment_serializer.is_valid():
                comment_serializer.save()
                return Response(
                    data={
                        "message": "Comment posted successfully",
                        "comment": comment_serializer.data,
                    },
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                data=comment_serializer.data, status=status.HTTP_400_BAD_REQUEST
            )

        except Post.DoesNotExist:
            return Response(
                data={"message": "Blog does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )


class CommentList(APIView):
    def get(self, request, post_id):
        comments = Comment.objects.filter(post=post_id)
        comment_serializer = CommentSerializer(instance=comments, many=True)
        return Response(data=comment_serializer.data, status=status.HTTP_200_OK)


class CommentDetail(APIView):
    def put(self, request, comment_id, post_id):
        try:
            post = Post.objects.get(pk=post_id)
            comment = Comment.objects.get(pk=comment_id)
            if request.user.id != comment.user.id:
                return Response(
                    data={"message": "You are not authorized"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            comment_serializer = CommentSerializer(
                instance=comment, data=request.data, partial=True
            )
            if comment_serializer.is_valid(raise_exception=True):
                comment_serializer.save()
                return Response(
                    data={"message": "Comment updated successfully"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                data=comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        except (Post.DoesNotExist, Comment.DoesNotExist) as e:
            if isinstance(e, Post.DoesNotExist):
                return Response(
                    data={"message": "Blog does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            else:
                return Response(
                    data={"message": "Comment does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

    def delete(self, request, comment_id, post_id):
        try:
            comment = Comment.objects.get(pk=comment_id)
            if request.user.id != comment.user.id:
                return Response(
                    data={"message": "Your are not authorized to delet"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            comment.delete()
            return Response(
                data={"message": "comment deleted successfully"},
                status=status.HTTP_200_OK,
            )

        except (Post.DoesNotExist, Comment.DoesNotExist) as e:
            if isinstance(e, Post.DoesNotExist):
                return Response(
                    data={"message": "Blog deos not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            else:
                return Response(
                    data={"message": "Comment does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
