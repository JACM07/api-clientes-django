from django.shortcuts import render
from django.db import IntegrityError
from django.http import JsonResponse
from .models import Cliente
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
import json


# Create your views here.
def registroClientes(request):#Vista principal para mostrar pagina
    return render(request,"registrarCliente.html")

#Crear peticiones get,post,put,delete

@csrf_exempt #'clientes/'   PARA GET TODOS LOS CLIENTES Y POST UN CLIENTE
def clientes(request):
    if request.method == 'GET':
        clientes=Cliente.objects.all().values()
        return JsonResponse({'clientes':list(clientes)})
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)  #Se lee el JSON
            nombre = data.get('nombre')
            correo = data.get('correo')
            numeroTelefono = data.get('numeroTelefono')
            edad = data.get('edad')

            cliente = Cliente(nombre=nombre, correo=correo, numeroTelefono=numeroTelefono, edad=edad)
            cliente.save()

            return JsonResponse(model_to_dict(cliente), status=201)

        except IntegrityError:
            return JsonResponse({'error': 'true', 'message': 'falta el campo requerido'}, status=400)


#REGISTRAR VISTAS NUEVAS DE ABAJO

#GET un cliente


#PUT,DELETE un cliente
