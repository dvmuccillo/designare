from django.conf.urls import url

from . import views

app_name = 'methodologies'
urlpatterns = [
    # /methodologies/
    url(r'^$', views.index, name='index'),
]