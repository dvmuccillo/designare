from django.shortcuts import get_object_or_404,render
from django.http import JsonResponse
from projetos.models import Execucao
from projetos.galeria.models import Galeria,Imagem
from django.utils.datastructures import MultiValueDictKeyError
from django.template.loader import render_to_string
# Create your views here.
def nova(request,execucao_id):
    execucao = get_object_or_404(Execucao,pk=execucao_id)
    galeria = Galeria(
                nome="",
                execucao=execucao
            )
    galeria.save()
    return JsonResponse({'galeria_id': galeria.pk, 'sucesso': True})

def adicionar_imagem(request,execucao_id):
    execucao = get_object_or_404(Execucao,pk=execucao_id)
    galeria = execucao.galeria.all()[0]
    try:
        foto = request.FILES['input-fotos-'+execucao_id]
    except MultiValueDictKeyError:
        foto = 'static/img/projetos/capas/default.png'
    imagem = Imagem(
                nome="",
                descricao="",
                galeria=galeria,
                foto=foto
            )
    imagem.save();
    template = render_to_string("galeria/imagem.html",{'imagem':imagem});
    return JsonResponse({ 'template' : template ,'sucesso': True})
