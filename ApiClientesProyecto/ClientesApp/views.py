from django.shortcuts import render


# Create your views here.
def registroClientes(request):#Vista principal para mostrar pagina
    return render(request,"registrarCliente.html")

#Crear peticiones get,post,put,delete
def clientes():
    pass


