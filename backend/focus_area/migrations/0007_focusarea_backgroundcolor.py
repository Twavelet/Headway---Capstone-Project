# Generated by Django 4.1.2 on 2022-10-21 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('focus_area', '0006_alter_focusarea_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='focusarea',
            name='backgroundColor',
            field=models.CharField(default='null', max_length=50),
        ),
    ]