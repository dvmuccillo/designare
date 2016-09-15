from django.db import models

# Create your models here.

class Metodologia(models.Model):
	nome = models.CharField(max_length=100)
	etapa_inicial = models.ForeignKey(Etapa,on_delete=)

class Etapa(models.Model):
	nome = models.CharField(max_length=100)
	descricao = models.CharField(max_length=250)
	prox_etapa = models.ForeignKey('self',on_delete=)
	atividade_inicial = models.ForeignKey(Atividade,on_delete=)

class Atividade(models.Model):
	nome = models.CharField(max_length=100)
	descricao = models.CharField(max_length=250)
	prox_atividade = models.ForeignKey('self',on_delete=)
	
#class Projeto(models.Model):
#	nome = models.
#	descricao = models.
#	metodologia = models.
#	dt_inicio = models.
#	dt_fim = models.
#	capa = models.
#	estado = models.

#class Execução(models.Model):
#	data = models.
#	usuario = models.
#   recurso = models.

#class Recurso(models.Model)
#	acao = models.
#	nome = models.
