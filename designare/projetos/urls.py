from django.conf.urls import url

from . import views

urlpatterns = [
    # /projetos/
    url(r'^$', views.index, name='index'),
]