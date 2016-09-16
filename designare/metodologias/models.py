from django.db import models

# Create your models here.
#def get_proxima_etapa_valida():
#	etapa = Etapa.objects.get

class Metodologia(models.Model):
	nome = models.CharField(max_length=50)
	etapa_inicial = models.ForeignKey(
		'Etapa',
		on_delete=models.SET_NULL,
		blank=True,
		null=True,
		related_name='primeira_etapa'
	)

	def __str__(self):
		return self.nome

class Etapa(models.Model):
	nome = models.CharField(max_length=50)
	descricao = models.CharField(max_length=300)
	prox_etapa = models.ForeignKey(
		'self',
		on_delete=models.SET_NULL,
		blank=True,
		null=True
	)
	atividade_inicial = models.ForeignKey(
		'Atividade',
		on_delete=models.SET_NULL,
		blank=True,null=True,
		related_name='primeira_atividade'
	)
	metodologia = models.ForeignKey(
		Metodologia,
		on_delete=models.CASCADE
	)

	def __str__(self):
		return self.nome

class Atividade(models.Model):
	nome = models.CharField(max_length=50)
	descricao = models.CharField(max_length=300)
	prox_atividade = models.ForeignKey(
		'self',
		on_delete=models.SET_NULL,
		blank=True,
		null=True
	)
	etapa = models.ForeignKey(
		Etapa,
		on_delete=models.CASCADE,
		related_name='atividades'
	)

	def __str__(self):
		return self.nome

	def proximas_atividades_possiveis(self):
		return self.etapa.atividades.all().exclude(pk=self.pk)
	
	
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
