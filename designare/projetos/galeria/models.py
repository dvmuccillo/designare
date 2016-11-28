from django.db import models
from projetos.models import Execucao

class Galeria(models.Model):
    nome = models.CharField(max_length=50)
    execucao = models.ForeignKey(
        Execucao,
        on_delete=models.CASCADE,
        related_name='galeria',
    )


class Imagem(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField()
    foto = models.ImageField(
        upload_to='static/img/projetos/galeria/',
        default='static/img/projetos/capas/default.png',
    )
    galeria = models.ForeignKey(
        Galeria,
        on_delete=models.CASCADE,
        related_name='imagens',
    )