from blog.models import Category, Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            "id",
            "title",
            "slug",
            "author",
            "excerpt",
            "content",
            "status",
            "category",
        )
        model = Post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "name")
        model = Category
