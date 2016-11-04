from django.shortcuts import get_object_or_404,render,redirect
from django.http import HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.template import loader
from projetos.models import Projeto, Recurso
from metodologias.models import Metodologia
#from projetos import resources

# Create your views here.
def index(request):
    metodologias = Metodologia.objects.all().order_by('nome')
    projetos_definidos = Projeto.objects.all().filter(estado='DE').order_by('pk')
    projetos_espera = Projeto.objects.all().filter(estado='ES').order_by('pk')
    context = {
        'titulo_da_pagina'   : "Projetos",
        'projetos_definidos' : projetos_definidos,
        'projetos_espera'    : projetos_espera,
        'metodologias'       : metodologias,
          }
    return render(request, 'projetos/index.html', context)

def detalhes(request, projeto_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    recursos = Recurso.objects.all()
    context = {
        'projeto' : projeto,
        'recursos' : recursos,
        'titulo_da_pagina' : projeto.nome,
    }
    return render(request,'projetos/projeto.html', context)

def novo(request):
    try:
        capa = request.FILES['capa']
    except MultiValueDictKeyError:
        capa = 'static/img/projetos/capas/default.png'

    if request.POST.get('metodologia') != "0":
        estado='ES'
        metodologia = get_object_or_404(Metodologia,pk=request.POST.get('metodologia'))
    else:
        estado='DE'
        metodologia=None
        
    projeto = Projeto(
                nome=request.POST.get('nome'),
                descricao=request.POST.get('descricao'),
                imagem_capa=capa,
                metodologia=metodologia,
                estado=estado
            )
    projeto.save();
    return redirect('projetos:index')

def excluir_projeto(request,projeto_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    projeto.delete();
    return redirect('projetos:index')