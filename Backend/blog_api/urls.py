from django.urls import path

# from rest_framework.routers import DefaultRouter

from .views import (
    AutorPost,
    PostDetail,
    PostList,
    PostListDetailfilter,
    CreatePost,
    EditPost,
    DeletePost,
    SinglePost,
)

app_name = "blog_api"

# router = DefaultRouter()
# router.register("", PostList, basename="post")
# urlpatterns = router.urls


urlpatterns = [
    path("posts/", PostList.as_view(), name="listcreate"),
    path("posts/<str:slug>/", PostDetail.as_view(), name="detailcreate"),
    path("author-post/", AutorPost.as_view(), name="author-post"),
    path("search/", PostListDetailfilter.as_view(), name="postsearch"),
    path("admin/create/", CreatePost.as_view(), name="createpost"),
    path(
        "admin/edit/postdetail/<int:pk>/", SinglePost.as_view(), name="admindetailpost"
    ),
    path("admin/edit/<int:pk>/", EditPost.as_view(), name="editpost"),
    path("admin/delete/<int:pk>/", DeletePost.as_view(), name="deletepost"),
]
