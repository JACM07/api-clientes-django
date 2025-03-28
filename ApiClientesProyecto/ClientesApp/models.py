from django.db import models

# Create your models here.
class Cliente(models.Model):#bd:registroClientes, tabla:clientesapp_cliente
    idCliente=models.IntegerField(primary_key=True)#auto_created?
    nombre=models.CharField(max_length=250)#null=False
    correo=models.CharField(max_length=100)
    numeroTelefono=models.CharField(max_length=100)
    edadc=models.IntegerField()
