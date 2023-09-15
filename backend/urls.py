"""
URL configuration for chatti_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from articles import views as aViews
from sources import views as sViews

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/articles/$', aViews.articles_list),
    # re_path(r'^api/articles/([0-9]+)$', aViews.articles_detail),
    re_path(r'^api/articles/messages/$', aViews.message_list),
    path('api/articles/recents/', aViews.viewed_articles),
    re_path(r'^api/articles/recents/([0-9]+)$', aViews.viewed_articles_detail),
    re_path(r'^api/sources/([a-z]+)/$', sViews.is_article)
]
