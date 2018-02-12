# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-02-09 23:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wethos_project', '0002_auto_20180209_0045'),
    ]

    operations = [
        migrations.CreateModel(
            name='Freelancer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('bio', models.TextField()),
                ('city', models.TextField()),
                ('state', models.TextField()),
                ('country', models.TextField()),
                ('personal_website_url', models.TextField(blank=True, null=True)),
                ('previous_work_urls', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
