from django.conf.urls import url

from . import views

app_name = 'galeria'

urlpatterns = [
    
    url(r'^(?P<execucao_id>[0-9]+)/nova/$', views.nova, name='nova'),
]
