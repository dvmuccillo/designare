# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-18 00:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metodologias', '0005_auto_20161016_1654'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='atividade',
            name='prox_atividade',
        ),
        migrations.AddField(
            model_name='atividade',
            name='ordem',
            field=models.IntegerField(null=True),
        ),
    ]
