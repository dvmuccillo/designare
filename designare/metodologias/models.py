from django.db import models

# Create your models here.

class Metodologia(models.Model):
	nome = models.
	etapa_inicial = 

class Etapa(models.Model):
	nome = models.
	descricao = models.
	prox_etapa = models.
	atividade_inicial = models.


#class Projeto(models.Model):
#	nome = models.
#	descricao = models.
#	metodologia = models.
#	dt_inicio = models.
#	dt_fim = models.
#	capa = models.
#	estado = models.

class Atividade(models.Model):
	nome = models.
	descricao = models.
	prox_atividade = models.

#class Execução(models.Model):
#	data = models.
#	usuario = models.
#   recurso = models.

#class Recurso(models.Model)
#	acao = models.
#	nome = models.