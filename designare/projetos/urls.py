from django.conf.urls import url

from . import views

app_name = 'projetos'
urlpatterns = [
    # /projetos/
    url(r'^$', views.index, name='index'),
    # /projetos/id/
    url(r'^(?P<projeto_id>[0-9]+)/$', views.detalhes, name='detalhes'),
    # /projetos/novo/
    url(r'^novo/$', views.novo, name='novo'),
    # /projetos/id/excluir-projeto/
    url(r'^(?P<projeto_id>[0-9]+)/excluir-projeto/$', views.excluir_projeto, name='excluir_projeto'),
    # /projetos/id/atualizar-projeto/
    url(r'^(?P<projeto_id>[0-9]+)/atualizar-projeto/$', views.atualizar_projeto, name='atualizar_projeto'),
    # /projetos/id/atividade/id/adicionar-recurso/id/
    url(r'^(?P<projeto_id>[0-9]+)/atividade/(?P<atividade_id>[0-9]+)/adicionar-recurso/(?P<recurso_id>[0-9]+)', views.adicionar_recurso, name='adicionar_recurso'),
]