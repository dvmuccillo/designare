from django.conf.urls import url

from . import views

app_name = 'metodologias'
urlpatterns = [
    # /metodologias/
    url(r'^$', views.index, name='index'),
    # /metodologias/id/
    url(r'^(?P<metodologia_id>[0-9]+)/$', views.detalhes, name='detalhes'),
    # /metodologias/id/atualizar-nome/
    url(r'^(?P<metodologia_id>[0-9]+)/atualizar-nome/$', views.atualizar_nome, name='atualizar_nome'),
    # /metodologias/id/cadastrar-etapa/
    url(r'^(?P<metodologia_id>[0-9]+)/cadastrar-etapa/$', views.cadastrar_etapa, name='cadastrar_etapa'),
    # /metodologias/id/etapa/id/atualizar-etapa/
    url(r'^(?P<metodologia_id>[0-9]+)/etapa/(?P<etapa_id>[0-9]+)/atualizar-etapa/$', views.atualizar_etapa, name='atualizar_etapa'),
    # /metodologias/id/etapa/id/excluir-etapa/
    url(r'^(?P<metodologia_id>[0-9]+)/etapa/(?P<etapa_id>[0-9]+)/excluir-etapa/$', views.excluir_etapa, name='excluir_etapa'),
    # /metodologias/id/etapa/id/cadastrar-atividade/
    url(r'^(?P<metodologia_id>[0-9]+)/etapa/(?P<etapa_id>[0-9]+)/cadastrar-atividade/$', views.cadastrar_atividade, name='cadastrar_atividade'),
    # /metodologias/id/etapa/id/atividade/id/atualizar-atividade/
    url(r'^(?P<metodologia_id>[0-9]+)/etapa/(?P<etapa_id>[0-9]+)/atividade/(?P<atividade_id>[0-9]+)/atualizar-atividade/$', views.atualizar_atividade, name='atualizar_atividade'),
    # /metodologias/id/etapa/id/atividade/id/excluir-atividade/
    url(r'^(?P<metodologia_id>[0-9]+)/etapa/(?P<etapa_id>[0-9]+)/atividade/(?P<atividade_id>[0-9]+)/excluir-atividade/$', views.excluir_atividade, name='excluir_atividade'),
    # /metodologias/nova/
    url(r'^nova/$', views.nova, name='nova'),
    # /metodologias/nova/cadastrar-metodologia/
    url(r'^nova/cadastrar-metodologia/$', views.cadastrar_metodologia, name='cadastrar_metodologia'),
    # /metodologias/id/excluir-metodologia/
    url(r'^(?P<metodologia_id>[0-9]+)/excluir-metodologia/$', views.excluir_metodologia, name='excluir_metodologia'),
]