from ClientesApp import views
from django.urls import path

urlpatterns=[
    path('',views.registroClientes),
    path('clientes/',views.clientes),
    path('clientes/<int:idCliente>/', views.cliente),
]

