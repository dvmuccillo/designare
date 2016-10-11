from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.template import loader
from metodologias.models import Metodologia

def index(request):
	context = {
		'titulo_da_pagina' : "Metodologias",
	}
	return render(request,'metodologias/index.html',context)

def nova(request):
    return render(request,'metodologias/nova.html')