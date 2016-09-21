from django.conf.urls import url

from . import views

app_name = 'projetos'
urlpatterns = [
    # /projetos/
    url(r'^$', views.index, name='index'),
    # /projetos/novo/
    url(r'^novo/$', views.novo, name='novo'),
]