# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-12-10 01:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metodologias', '0002_metodologia_is_copy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='atividade',
            name='descricao',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='etapa',
            name='descricao',
            field=models.TextField(),
        ),
    ]
