from django.contrib import admin
from projetos.models import Projeto, Recurso, Execucao
# Register your models here.
admin.site.register(Projeto)
admin.site.register(Recurso)
admin.site.register(Execucao)
