from django.db import models
from metodologias.models import Metodologia, Atividade
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

""" Recursos: utilizados para executar uma atividade

    - A classe contem 3 propriedades:
        - app_name: identifica um único recurso instalado e precisa ser registrado pela interface admin do Django
        - nome e descricao: preenchidos a cada execucao com base no documento propriedades.json do app registrado
                            é necessário usar carrega_propriedades() para preencher estes campos devido ao Django
                            desencorajar o uso de __init__()
                            referência:  
    - Todo app/pacote de recurso precisa ter uma classe principal que extenda a classe recurso
        referência: https://docs.djangoproject.com/pt-br/1.10/topics/db/models/#multi-table-inheritance 
"""
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

class Execucao(models.Model):
#    data
#    usuario
    projeto = models.ForeignKey(
        Projeto,
        on_delete=models.CASCADE,
        related_name='execucoes',
    )
    recurso = models.ForeignKey(
        Recurso,
        on_delete=models.CASCADE,
        related_name='execucoes',
    )
    atividade = models.ForeignKey(
       Atividade,
        on_delete=models.CASCADE,
        related_name='execucoes',
    )