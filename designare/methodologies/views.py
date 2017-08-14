from django.shortcuts import get_object_or_404,render,redirect
from django.http import HttpResponse,JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.template import loader
from django.template.loader import render_to_string
from methodologies.models import Methodology, Stage, Activity
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    methodologies = Methodology.objects.all().filter(is_copy=False).order_by('name')
    context = {
        'methodologies' : methodologies
    }
    return render(request, 'methodologies/index.html', context)