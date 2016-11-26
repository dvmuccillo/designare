from django.conf.urls import url, include

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
    # /projetos/id/atividade/id/executar-recurso/id/
    url(r'^(?P<projeto_id>[0-9]+)/atividade/(?P<atividade_id>[0-9]+)/executar-recurso/(?P<execucao_id>[0-9]+)', views.executar_recurso, name='executar_recurso'),
    # /projetos/id/atividade/id/adicionar-recurso/id/
    url(r'^(?P<projeto_id>[0-9]+)/atividade/(?P<atividade_id>[0-9]+)/excluir-recurso/(?P<execucao_id>[0-9]+)', views.excluir_recurso, name='excluir_recurso'),
    # urls de recurso:
    #url(r'^recursos/(?P<recurso>[\w\-]+)/', views.recurso_acao, name='recurso_acao'),
]