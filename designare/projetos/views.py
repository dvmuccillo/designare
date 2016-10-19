from django.shortcuts import get_object_or_404,render,redirect
from django.http import HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.template import loader
from projetos.models import Projeto
from metodologias.models import Metodologia

# Create your views here.
def index(request):
    metodologias = Metodologia.objects.all().order_by('nome')
    projetos_definidos = Projeto.objects.all().filter(estado='DE').order_by('pk')
    context = {
        'titulo_da_pagina'   : "Projetos",
        'projetos_definidos' : projetos_definidos,
        'metodologias'       : metodologias,
          }
    return render(request, 'projetos/index.html', context)

def detalhes(request, projeto_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    context = {
        'projeto' : projeto,
        'titulo_da_pagina' : projeto.nome,
    }
    return render(request,'projetos/projeto.html', context)

def novo(request):
    try:
        capa = request.FILES['capa']
    except MultiValueDictKeyError:
        capa = 'static/img/projetos/capas/default.png'
    metodologia = get_object_or_404(Metodologia,pk=request.POST.get('metodologia'))
    projeto = Projeto(
                nome=request.POST.get('nome'),
                descricao=request.POST.get('descricao'),
                imagem_capa=capa,
                metodologia=metodologia,
            )
    projeto.save();
    return redirect('projetos:index')

def excluir_projeto(request,projeto_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    projeto.delete();
    return redirect('projetos:index')