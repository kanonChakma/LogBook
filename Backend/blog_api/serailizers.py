from blog.models import Category, Comment, Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.user_name", read_only=True)
    author_profile_image = serializers.ImageField(
        source="author.profile_image", read_only=True
    )
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        fields = (
            "id",
            "title",
            "slug",
            "author",
            "excerpt",
            "author_name",
            "author_profile_image",
            "content",
            "status",
            "category",
            "category_name",
        )
        model = Post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "name")
        model = Category


class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source="user. user_name", read_only=True)
    user_profile_image = serializers.ImageField(
        source="user.profile_image", read_only=True
    )

    class Meta:
        model = Comment
        fields = [
            "id",
            "content",
            "post",
            "user",
            "created_at",
            "user_username",
            "user_profile_image",
        ]
