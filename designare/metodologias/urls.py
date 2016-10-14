from django.conf.urls import url

from . import views

app_name = 'metodologias'
urlpatterns = [
    # /metodologias/
    url(r'^$', views.index, name='index'),
    # /metodologias/nova/
    url(r'^nova/$', views.nova, name='nova'),
    # /metodologias/nova/cadastrar-metodologia/
    url(r'^nova/cadastrar-metodologia/$', views.cadastrar_metodologia, name='cadastrar_metodologia'),
]