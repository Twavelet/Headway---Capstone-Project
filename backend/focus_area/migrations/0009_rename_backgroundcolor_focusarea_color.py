# Generated by Django 4.1.2 on 2022-10-21 22:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('focus_area', '0008_alter_focusarea_backgroundcolor'),
    ]

    operations = [
        migrations.RenameField(
            model_name='focusarea',
            old_name='backgroundColor',
            new_name='color',
        ),
    ]