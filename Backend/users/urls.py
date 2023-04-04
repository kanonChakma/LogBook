from django.urls import path

from .views import (
    BlackListTokenUpdateView,
    CustomUserCreate,
    GetUserByName,
    UserProfile,
)

app_name = "users"

urlpatterns = [
    path("register/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/", BlackListTokenUpdateView.as_view(), name="blacklist"),
    path("profile/", UserProfile.as_view(), name="profile"),
    path("<str:user_name>/", GetUserByName.as_view(), name="getbyusername"),
]
#  path('all/', UsersListView.as_view(), name='all_users'),
#  path('user/', UserDetailView.as_view(), name='user_detail'),
