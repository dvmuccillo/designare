from django.db import models
from projetos.models import Recurso

class Texto(Recurso):
	conteudo = models.TextField()
