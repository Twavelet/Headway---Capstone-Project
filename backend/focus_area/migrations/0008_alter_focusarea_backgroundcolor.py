# Generated by Django 4.1.2 on 2022-10-21 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('focus_area', '0007_focusarea_backgroundcolor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='focusarea',
            name='backgroundColor',
            field=models.CharField(default='white', max_length=50),
        ),
    ]