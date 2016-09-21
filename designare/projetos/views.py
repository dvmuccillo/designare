from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.template import loader
from projetos.models import Projeto

# Create your views here.
def index(request):
    projetos_definidos = Projeto.objects.all().filter(estado='DE').order_by('pk')
    context = {
    	'titulo_da_pagina' : "Projetos",
    	'projetos_definidos' : projetos_definidos,
      	}
    return render(request, 'projetos/index.html', context)

def novo(request):
	projeto = Projeto(
				nome=request.POST.get('nome'),
				descricao=request.POST.get('descricao')
			)
	projeto.save();
	return redirect('projetos:index')