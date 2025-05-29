from django.shortcuts import render
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Cliente
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
import json


# Create your views here.
def registroClientes(request):#Vista principal para mostrar pagina
    return render(request,"registrarCliente.html")

def mostrarClientes(request):#vista para ver tabla de todos los clientes
    return render(request,"mostrarClientes.html")


#Peticiones get,post,put,delete
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




#GET un cliente= recuperar cliente por id
@csrf_exempt
def cliente(request, idCliente):  #'clientes/<int:idCliente>/'   PONER '/' AL FINAL PARA QUE FUNCIONE
    try:
        cliente=Cliente.objects.get(idCliente=idCliente)    
    except Cliente.DoesNotExist:
            return JsonResponse({'error': 'Cliente no encontrado'}, status=404)
    
    if request.method == 'GET':
        return JsonResponse(model_to_dict(cliente))
        
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)  #Se lee el JSON
            cliente.nombre = data.get('nombre',cliente.nombre)
            cliente.correo = data.get('correo',cliente.correo)
            cliente.numeroTelefono = data.get('numeroTelefono',cliente.numeroTelefono)
            cliente.edad = data.get('edad',cliente.edad)
            cliente.save()
            return JsonResponse(model_to_dict(cliente), status=200)
        except Exception as e:
            return JsonResponse({'error': 'Error al actualizar', 'detalle': str(e)}, status=400)
    
    elif request.method == 'DELETE':
        cliente.delete()
        return JsonResponse({'message': 'Cliente eliminado'}, status=204)
    
    elif request.method == 'PATCH': #No se necesita el objeto Json completo, con que tenga un campo para actualizar basta
        try:
            data=json.loads(request.body)#se lee el json con el/los datos a actualizar
            if 'nombre' in data:
                cliente.nombre = data['nombre']
            if 'correo' in data:
                cliente.correo = data['correo']
            if 'numeroTelefono' in data:
                cliente.numeroTelefono = data['numeroTelefono']
            if 'edad' in data:
                cliente.edad = data['edad']

            cliente.save()
            return JsonResponse(model_to_dict(cliente), status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH' ,'DELETE'])

