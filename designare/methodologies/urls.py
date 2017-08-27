from django.conf.urls import url

from . import views

app_name = 'methodologies'
urlpatterns = [
    # /methodologies/
    url(r'^$', views.index, name='index'),
    # /methodologies/id/
    url(r'^(?P<methodology_id>[0-9]+)/$', views.details, name='details'),
    # /methodologies/id/delete/
    url(r'^(?P<methodology_id>[0-9]+)/delete/$', views.delete_methodology, name='delete_methodology'),
    # /methodologies/id/update/
    url(r'^(?P<methodology_id>[0-9]+)/update/$', views.update_methodology, name='update_methodology'),
    # /methodologies/id/stage/delete/
    url(r'^(?P<methodology_id>[0-9]+)/stage/delete/$', views.delete_stage, name='delete_stage'),
    # /methodologies/id/stage/register/
    url(r'^(?P<methodology_id>[0-9]+)/stage/register/$', views.register_stage, name='register_stage'),
    # /methodologies/id/export-json
    url(r'^(?P<methodology_id>[0-9]+)/export-json/$', views.export_json, name='export_json'),
    # /methodologies/new/
    url(r'^new/$', views.new, name='new'),
    # /methodologies/new/register/
    url(r'^new/register/$', views.register_methodology, name='register_methodology'),
    
]