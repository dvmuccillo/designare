from django.db import models

class Metodologia(models.Model):
	nome = models.CharField(max_length=50)
	
	def __str__(self):
		return self.nome

class Etapa(models.Model):
	nome = models.CharField(max_length=50)
	descricao = models.CharField(max_length=300)
	ordem = models.IntegerField(null=True)
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
	
	


#class Execução(models.Model):
#	data = models.DateField(False)
#	usuario = models.CharField(max_length=50)
#  recurso = models.

#class Recurso(models.Model)
#	acao = models.
#	nome = models.
