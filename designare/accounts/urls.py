from django.conf.urls import url
from . import views

app_name = 'accounts'
urlpatterns = [
    url(r'^login/$', views.login_view, name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^my/profile/$', views.user_profile, name='user_profile'),
    url(r'^my/profile/update-personal-info/$', views.update_personal_info, name='update_personal_info'),
    url(r'^my/profile/update-password/$', views.update_password, name='update_password'),
    url(r'^my/contacts/$', views.user_contacts, name='user_contacts'),
    url(r'^my/contacts/send-invite/$', views.user_send_invite, name='user_send_invite'),
    url(r'^my/contacts/resend-invite/$', views.user_resend_invite, name='user_resend_invite'),
    url(r'^redeem-invite/$', views.redeem_invite, name='redeem_invite'),
]
   