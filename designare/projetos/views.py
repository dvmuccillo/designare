from django.shortcuts import get_object_or_404,render,redirect
from django.http import HttpResponse,JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.template import loader
from django.template.loader import render_to_string
from projetos.models import Projeto, Recurso, Execucao
from metodologias.models import Metodologia,Atividade
from django.contrib.auth.decorators import login_required
import json
#from projetos import resources

# Create your views here.
@login_required
def index(request):
    metodologias = Metodologia.objects.all().filter(is_copy=False).order_by('nome')
    projetos_definidos = Projeto.objects.all().filter(estado='DE').order_by('pk')
    projetos_espera = Projeto.objects.all().filter(estado='ES').order_by('pk')
    context = {
        'titulo_da_pagina'   : "Projetos",
        'projetos_definidos' : projetos_definidos,
        'projetos_espera'    : projetos_espera,
        'metodologias'       : metodologias,
          }
    return render(request, 'projetos/index.html', context)

@login_required
def detalhes(request, projeto_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    recursos = Recurso.objects.all()
    context = {
        'projeto' : projeto,
        'recursos' : recursos,
        'titulo_da_pagina' : projeto.nome,
    }
    return render(request,'projetos/projeto.html', context)

@login_required
def novo(request):
    try:
        capa = request.FILES['capa']
    except MultiValueDictKeyError:
        capa = None

    if request.POST.get('metodologia') != "0":
        estado='ES'
        metodologia = Metodologia.get_copy(get_object_or_404(Metodologia,pk=request.POST.get('metodologia')))
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

@login_required
def excluir_projeto(request,projeto_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    metodologia = projeto.metodologia
    projeto.delete()
    metodologia.delete()
    return redirect('projetos:index')

@login_required
def atualizar_projeto(request,projeto_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)

    try:
        capa = request.FILES['capa']
    except MultiValueDictKeyError:
        #capa = 'static/img/projetos/capas/default.png'
        capa = None

    if request.POST.get('metodologia') != "0":
        estado='ES'
        metodologia = get_object_or_404(Metodologia,pk=request.POST.get('metodologia'))
    else:
        estado='DE'
        metodologia=None

    projeto.nome = request.POST.get('nome')
    projeto.descricao = request.POST.get('descricao')
    projeto.metodologia = metodologia
    projeto.estado = estado

    if capa != None:
        projeto.imagem_capa = capa;

    projeto.save()

    return redirect('projetos:index')

@login_required
def adicionar_recurso(request, projeto_id, atividade_id, recurso_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    atividade = get_object_or_404(Atividade,pk=atividade_id)
    recurso = get_object_or_404(Recurso,pk=recurso_id)
    execucao = Execucao(
                projeto = projeto,
                atividade = atividade,
                recurso = recurso
            )
    execucao.save()
    recurso.carrega_propriedades()
    #caminho = "%s/%s" % (recurso.propriedades['app_name'], recurso.propriedades['template_principal'])
    #{% include execucao.recurso.getTemplate with execucao=execucao %}
    template = render_to_string(execucao.recurso.getTemplate() ,{'execucao':execucao})
    if (recurso.propriedades['funcao_ativacao']):
        function = {
            'ativacao' : True,
            'nome' : recurso.propriedades['funcao_ativacao'],
            'argumentos' : {
                'execucao_id' : execucao.pk
            }
        }
    else:
        function = { 'ativacao' : False }

    return JsonResponse({
            'template' : template ,
            'sucesso': True, 
            'function': json.dumps(function), 
        })

@login_required
def executar_recurso(request, projeto_id, atividade_id, execucao_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    atividade = get_object_or_404(Atividade,pk=atividade_id)
    execucao = get_object_or_404(Execucao,pk=execucao_id)
    context = {
        'execucao' : execucao,
        'full_page' : True
    }
    return render(request,'projetos/execucao.html', context)

@login_required
def excluir_recurso(request, projeto_id, atividade_id, execucao_id):
    projeto = get_object_or_404(Projeto,pk=projeto_id)
    atividade = get_object_or_404(Atividade,pk=atividade_id)
    execucao = get_object_or_404(Execucao,pk=execucao_id)
    execucao.delete();
    return JsonResponse({ 'sucesso': True })