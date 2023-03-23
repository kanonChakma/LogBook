from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import AutorPost, PostDetail, PostList

app_name = "blog_api"

# router = DefaultRouter()
# router.register("", PostList, basename="post")
# urlpatterns = router.urls


urlpatterns = [
    path("posts/", PostList.as_view(), name="listcreate"),
    path("posts/<str:slug>/", PostDetail.as_view(), name="detailcreate"),
    path("author-post/", AutorPost.as_view(), name="author-post"),
]
