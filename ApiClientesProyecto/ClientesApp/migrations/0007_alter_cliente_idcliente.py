# Generated by Django 5.1.6 on 2025-04-17 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ClientesApp', '0006_rename_edadc_cliente_edad'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='idCliente',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
    ]
