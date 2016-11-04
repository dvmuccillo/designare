from django.db import models
from projetos.models import Recurso

class Galeria(models.Model):
    nome = models.CharField(max_length=50)
    recurso = models.ForeignKey(
        Recurso,
        on_delete=models.PROTECT,
    )


class Imagem(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField()
    foto = models.ImageField(
        upload_to='static/img/galeria/',
        default='static/img/projetos/capas/default.png',
    )
    galeria = models.ForeignKey(
        Galeria,
        on_delete=models.CASCADE,
        related_name='imagens',
    )