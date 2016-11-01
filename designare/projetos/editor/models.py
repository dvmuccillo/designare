from django.db import models

class Editor(models.Model):
	titulo = models.CharField(max_length=50)
	texto = models.CharField()
