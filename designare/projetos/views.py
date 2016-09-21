from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.template import loader
from projetos.models import Projeto

# Create your views here.
def index(request):
    context = {
    	'titulo_da_pagina' : "Projetos",
    }
    template = loader.get_template('projetos/index.html')
    return HttpResponse(template.render(context,request))

def novo(request):
	projeto = Projeto(
				nome=request.POST.get('nome'),
				descricao=request.POST.get('descricao')
			)
	projeto.save();
	return redirect('projetos:index')