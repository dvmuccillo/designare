from django.db import models
from projetos.models import Recurso

class Texto(models.Model):
    conteudo = models.TextField()
    recurso = models.ForeignKey(
        Recurso,
        on_delete=models.PROTECT,
    )