# Generated by Django 4.1.2 on 2022-10-20 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('focus_area', '0003_focusarea_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='focusarea',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]
