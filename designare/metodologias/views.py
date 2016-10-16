from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.template import loader
from metodologias.models import Metodologia

def index(request):
    metodologias = Metodologia.objects.all().order_by('nome')
    context = {
        'titulo_da_pagina' : "Metodologias",
        'metodologias'     : metodologias,
    }
    return render(request,'metodologias/index.html',context)

def detalhes(request, question_id):
    return render(request,'metodologias/nova.html')

def nova(request):
    return render(request,'metodologias/nova.html')

def cadastrar_metodologia(request):
    metodologia = Metodologia (
                nome = request.POST.get('nome')
            )
    metodologia.save();
    return JsonResponse({'metodologia_id': metodologia.pk, 'sucesso': True })
