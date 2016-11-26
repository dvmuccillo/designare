from django.db import models
from projetos.models import Execucao

class Texto(models.Model):
    conteudo = models.TextField()
    execucao = models.ForeignKey(
        Execucao,
        on_delete=models.CASCADE,
        related_name='editor',
    )