from django.conf.urls import url

from . import views

app_name = 'projetos'
urlpatterns = [
    # /projetos/
    url(r'^$', views.index, name='index'),
    # /projetos/novo/
    url(r'^novo/$', views.novo, name='novo'),
    # /projetos/id/excluir-projeto/
    url(r'^(?P<projeto_id>[0-9]+)/excluir-projeto/$', views.excluir_projeto, name='excluir_projeto'),
]