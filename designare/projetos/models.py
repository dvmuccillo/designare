from django.db import models
from metodologias.models import Metodologia
import json, os

class Projeto(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.CharField(max_length=300)
    metodologia = models.ForeignKey(
            Metodologia,
            on_delete=models.SET_NULL,
            blank=True,
            null=True
    )
    DEFINIDO     = 'DE'
    EM_ESPERA     = 'ES'
    EM_EXECUCAO = 'EX'
    CONCLUIDO    = 'CO'
    ESTADOS = (
        (DEFINIDO,'Definido'),
        (EM_ESPERA,'Em espera'),
        (EM_EXECUCAO,'Em Execução'),
        (CONCLUIDO,'Concluído'),    
    )
    estado = models.CharField(
        max_length=2,
        choices=ESTADOS,
        default=DEFINIDO,
    )
    imagem_capa = models.ImageField(
        upload_to='static/img/projetos/capas/',
        default='static/img/projetos/capas/default.png',
    )
    #dt_inicio = models.DateField(False)
    #dt_fim = models.DateField(False)

    def __str__(self):
        return self.nome

class Recurso(models.Model):
    nome = None
    descricao = None
    app_name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.app_name

    def carrega_propriedades(self):
        app_path = os.path.join(os.getcwd(),os.path.join("projetos",self.app_name))
        with open(os.path.join(app_path,"propriedades.json")) as arquivo:
            propriedades = json.load(arquivo)
        self.nome = propriedades['nome']
        self.descricao = propriedades['descricao']
        return ""



