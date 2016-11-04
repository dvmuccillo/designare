# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-11-04 23:40
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Atividade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('descricao', models.CharField(max_length=300)),
                ('ordem', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Etapa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('descricao', models.CharField(max_length=300)),
                ('ordem', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Metodologia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='etapa',
            name='metodologia',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='etapas', to='metodologias.Metodologia'),
        ),
        migrations.AddField(
            model_name='atividade',
            name='etapa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='atividades', to='metodologias.Etapa'),
        ),
    ]
