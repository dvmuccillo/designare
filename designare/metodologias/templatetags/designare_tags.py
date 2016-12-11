from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter
@stringfilter
def addstr(str1,str2):
    return str(str1) + str(str2)