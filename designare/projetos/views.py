from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def index(request):
    #return HttpResponse("Hello, world. You're at the polls index.")
    context = {
    	'titulo_da_pagina' : "Projetos",
    }
    template = loader.get_template('projetos/index.html')
    return HttpResponse(template.render(context,request))