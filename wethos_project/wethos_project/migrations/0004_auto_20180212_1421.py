# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-02-12 14:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wethos_project', '0003_freelancer'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Post',
        ),
        migrations.AddField(
            model_name='freelancer',
            name='approved',
            field=models.BooleanField(default=False),
        ),
    ]
