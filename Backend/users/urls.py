from django.urls import path

from .views import BlackListTokenUpdateView, CustomUserCreate

app_name = "users"

urlpatterns = [
    path("create/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/blacklist/", BlackListTokenUpdateView.as_view(), name="blacklist"),
]
