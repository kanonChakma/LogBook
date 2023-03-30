from django.urls import path

from .views import BlackListTokenUpdateView, CustomUserCreate

app_name = "users"

urlpatterns = [
    path("create/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/", BlackListTokenUpdateView.as_view(), name="blacklist"),
]
#  path('all/', UsersListView.as_view(), name='all_users'),
#  path('user/', UserDetailView.as_view(), name='user_detail'),
