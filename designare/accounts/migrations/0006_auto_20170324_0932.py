# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-24 12:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20170315_0900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invite',
            name='code',
            field=models.CharField(blank=True, max_length=30, unique=True),
        ),
    ]