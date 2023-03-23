from blog.models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "title", "slug", "author", "excerpt", "content", "status")
        model = Post
