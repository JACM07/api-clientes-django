# Generated by Django 5.1.6 on 2025-04-04 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ClientesApp', '0005_rename_edad_cliente_edadc'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='edadc',
            new_name='edad',
        ),
    ]
