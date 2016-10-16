from django.shortcuts import get_object_or_404,render,redirect
from django.http import HttpResponse,JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.template import loader
from metodologias.models import Metodologia,Etapa

def index(request):
    metodologias = Metodologia.objects.all().order_by('nome')
    context = {
        'titulo_da_pagina' : "Metodologias",
        'metodologias'     : metodologias,
    }
    return render(request,'metodologias/index.html',context)

def detalhes(request, metodologia_id):
    metodologia = get_object_or_404(Metodologia,pk=metodologia_id)
    context = {
        'metodologia' : metodologia,
    }
    return render(request,'metodologias/nova.html', context)

def atualizar_nome(request, metodologia_id):
    metodologia = get_object_or_404(Metodologia,pk=metodologia_id)
    metodologia.nome =  request.POST.get('nome')
    metodologia.save();
    return JsonResponse({'sucesso': True})

def cadastrar_etapa(request, metodologia_id):
    metodologia = get_object_or_404(Metodologia,pk=metodologia_id)
    proxima_pos = Etapa.objects.all().filter(metodologia=metodologia).count() + 1
    etapa = Etapa (
                nome = request.POST.get('nome'),
                descricao = request.POST.get('descricao'),
                metodologia = metodologia,
                ordem = proxima_pos,
            )
    etapa.save()
    return JsonResponse({ 'etapa_id': etapa.pk ,'sucesso': True})

def nova(request):
    return render(request,'metodologias/nova.html')

def cadastrar_metodologia(request):
    metodologia = Metodologia (
                nome = request.POST.get('nome')
            )
    metodologia.save();
    return JsonResponse({'metodologia_id': metodologia.pk, 'sucesso': True })
