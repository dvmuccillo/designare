from django.db import models

class Galeria(models.Model):
	nome = models.CharField(max_length=50)
	descricao = models.TextField()

	foto = models.ImageField(
        upload_to='static/img/galeria/',
    	default='static/img/projetos/capas/default.png',
    	)