# Generated by Django 5.1.6 on 2025-03-28 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ClientesApp', '0002_rename_clientes_cliente'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='edad',
            new_name='edad1',
        ),
    ]
