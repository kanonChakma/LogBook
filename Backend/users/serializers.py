from rest_framework import serializers

from users.models import NewUser


class CustomUserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(required=True)
    # user_name = serializers.CharField(required=True)
    # password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ("email", "user_name", "password", "profile_image")
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        if NewUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email already exists!.")
        return value

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
