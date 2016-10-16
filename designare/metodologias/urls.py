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
    # /metodologias/nova/
    url(r'^nova/$', views.nova, name='nova'),
    # /metodologias/nova/cadastrar-metodologia/
    url(r'^nova/cadastrar-metodologia/$', views.cadastrar_metodologia, name='cadastrar_metodologia'),
]