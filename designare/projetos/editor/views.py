from django.shortcuts import render
from django.shortcuts import get_object_or_404,render,redirect
from django.http import HttpResponse,JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from projetos.models import Execucao
from projetos.editor.models import Texto
from django.contrib.auth.decorators import login_required

@login_required
def salvar(request,execucao_id):
    execucao = get_object_or_404(Execucao,pk=execucao_id)
    conteudo = request.POST.get('conteudo')
    if (execucao.editor.all().count() == 0):
        editor = Texto(
                conteudo=conteudo,
                execucao=execucao,
            )
    else:
        editor = execucao.editor.all()[0]
        editor.conteudo = conteudo
    editor.save()
    return JsonResponse({'sucesso': True})

