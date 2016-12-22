from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from . import views

app_name = 'assets'
urlpatterns = [
    url(r'^faq/$', TemplateView.as_view(template_name='assets/faq.html')),
    url(r'^$', login_required(TemplateView.as_view(template_name='assets/home.html'))),
]
    