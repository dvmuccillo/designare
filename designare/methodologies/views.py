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

@login_required
def details(request,methodology_id):
    pass

@login_required
def delete_methodology(request,methodology_id):
    methodology = get_object_or_404(Methodology,pk=methodology_id)
    try:
        methodology.delete()
        success = True
    except:
        success = False
    return JsonResponse({'success': success})

@login_required
def export_json(request,methodology_id):
    methodology = get_object_or_404(Methodology,pk=methodology_id)
    json = Methodology.get_json(methodology)
    response = HttpResponse(json, content_type='application/json')
    response['Content-Disposition'] = 'attachment; filename="%s.json"' % (methodology.name)
    return response

@login_required
def new(request):
    pass