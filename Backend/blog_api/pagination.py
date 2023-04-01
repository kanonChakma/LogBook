from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class LimitOffsetPagination(LimitOffsetPagination):
    default_limit = 6
    limit_query_param = "pagelimit"
    offset_query_param = "pageno"
    max_limit = 6


class PageNumberPagination(PageNumberPagination):
    page_size = 9
    page_query_param = "p"
    max_page_size = 20
