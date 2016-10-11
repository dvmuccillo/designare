from django.conf.urls import url

from . import views

app_name = 'metodologias'
urlpatterns = [
    # /metodologias/
    url(r'^$', views.index, name='index'),
    # /metodologias/novo/
    # url(r'^novo/$', views.novo, name='novo'),

]