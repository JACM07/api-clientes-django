# Generated by Django 5.1.6 on 2025-03-28 15:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ClientesApp', '0003_rename_edad_cliente_edad1'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='edad1',
            new_name='edad',
        ),
    ]
