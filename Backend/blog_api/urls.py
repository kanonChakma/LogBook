from django.urls import path

from .views import (
    AutorPost,
    CategoryList,
    CommentDetail,
    CommentList,
    CreateComment,
    CreatePost,
    DeletePost,
    EditPost,
    GetPostByPostId,
    PostDetail,
    PostList,
    PostListDetailfilter,
)

# from rest_framework.routers import DefaultRouter


app_name = "blog_api"

# router = DefaultRouter()
# router.register("", PostList, basename="post")
# urlpatterns = router.urls


urlpatterns = [
    path("posts/", PostList.as_view(), name="listcreate"),
    path("post/<str:slug>/", PostDetail.as_view(), name="detailcreate"),
    path("author-post/", AutorPost.as_view(), name="author-post"),
    path("search/", PostListDetailfilter.as_view(), name="postsearch"),
    # admin
    path("admin/post/", CreatePost.as_view(), name="createpost"),
    path("admin/post/<int:pk>/", GetPostByPostId.as_view(), name="admindetailpost"),
    path("admin/edit/<int:pk>/", EditPost.as_view(), name="editpost"),
    path("admin/delete/<int:pk>/", DeletePost.as_view(), name="deletepost"),
    # category
    path("categories/", CategoryList.as_view(), name="categories"),
    # comments
    path("comment/", CreateComment.as_view(), name="create-comment"),
    path("comment/<int:post_id>", CommentList.as_view(), name="comment-list"),
    path(
        "post/<int:post_id>/comment/<int:comment_id>/",
        CommentDetail.as_view(),
        name="comment-details",
    ),
]
