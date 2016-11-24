from django.conf.urls import url

from . import views

app_name = 'editor'

urlpatterns = [
    
    url(r'^(?P<execucao_id>[0-9]+)/salvar/$', views.salvar, name='salvar'),
]
