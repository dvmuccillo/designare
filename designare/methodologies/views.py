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
    methodology = get_object_or_404(Methodology,pk=methodology_id)
    return render(request, 'methodologies/methodology.html',{'methodology' :  methodology})

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
def update_methodology(request,methodology_id):
    methodology = get_object_or_404(Methodology,pk=methodology_id)
    try:
        methodology.name = request.POST.get('methodology_name')
        methodology.save()
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
    return render(request, 'methodologies/methodology.html')

@login_required
def register_methodology(request):
    methodology = Methodology (
                name = request.POST.get('methodology_name')
            )
    methodology.save()
    return JsonResponse({'methodology_id': methodology.pk, 'success': True })