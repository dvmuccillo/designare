# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-16 17:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metodologias', '0003_auto_20160921_1713'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='etapa',
            name='atividade_inicial',
        ),
        migrations.RemoveField(
            model_name='etapa',
            name='prox_etapa',
        ),
        migrations.RemoveField(
            model_name='metodologia',
            name='etapa_inicial',
        ),
        migrations.AddField(
            model_name='etapa',
            name='ordem',
            field=models.IntegerField(null=True),
        ),
    ]
