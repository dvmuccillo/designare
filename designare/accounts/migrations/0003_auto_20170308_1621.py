# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-08 19:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_invite'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invite',
            name='target_email',
            field=models.EmailField(max_length=254),
        ),
    ]
