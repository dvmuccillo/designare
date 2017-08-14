# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-08-14 02:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('order', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Methodology',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('is_copy', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('order', models.IntegerField(null=True)),
                ('methodology', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stages', to='methodologies.Methodology')),
            ],
        ),
        migrations.AddField(
            model_name='activity',
            name='stage',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='methodologies.Stage'),
        ),
    ]
