# Generated by Django 4.1.2 on 2022-10-23 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress_tracker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='progresstracker',
            name='date',
            field=models.DateField(default=None),
        ),
    ]
