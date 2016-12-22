from django import template
from django.template.defaultfilters import stringfilter
from assets.models import AssetsManager

register = template.Library()

@register.filter
@stringfilter
def addstr(str1,str2):
    return str(str1) + str(str2)

@register.filter
def registerBower(DESIGNARE_ASSETS_MANAGER, package):
    DESIGNARE_ASSETS_MANAGER.registerBower(package)
    return ""