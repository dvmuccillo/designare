from django.db import models
from metodologias.models import Metodologia

class Projeto(models.Model):
	nome = models.CharField(max_length=50)
	descricao = models.CharField(max_length=300)
	metodologia = models.ForeignKey(
			Metodologia,
			on_delete=models.SET_NULL,
			blank=True,
			null=True
	)
	dt_inicio = models.DateField(False)
	dt_fim = models.DateField(False)
	capa = models.CharField(max_length=300)
	estado = models.CharField(max_length=50)

