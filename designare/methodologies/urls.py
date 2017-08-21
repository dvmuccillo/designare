from django.conf.urls import url

from . import views

app_name = 'methodologies'
urlpatterns = [
    # /methodologies/
    url(r'^$', views.index, name='index'),
    # /methodologies/id/
    url(r'^(?P<methodology_id>[0-9]+)/$', views.details, name='details'),
    # /methodologies/id/delete
    url(r'^(?P<methodology_id>[0-9]+)/delete/$', views.delete_methodology, name='delete_methodology'),
    # /methodologies/id/export-json
    url(r'^(?P<methodology_id>[0-9]+)/export-json/$', views.export_json, name='export_json'),
    # /methodologies/new/
    url(r'^new/$', views.new, name='new'),
]