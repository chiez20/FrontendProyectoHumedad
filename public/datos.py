import requests
import json
import random
import time

while True:
    # Generar números enteros aleatorios para temperatura, humedad y calidad del aire entre 12 y 25 y 0 y 100 respectivamente
    temperatura = random.randint(12, 25)
    humedad = random.randint(12, 25)
    calidad_aire = random.randint(80, 100)

    # Crear los payloads en formato JSON
    payload_temperatura = {"value": temperatura}
    payload_humedad = {"value": humedad}
    payload_aire = {"value": calidad_aire}

    # Realizar las solicitudes POST a las rutas http://localhost:3000/api/temperatura, http://localhost:3000/api/humedad y http://localhost:3000/api/aire con los payloads
    try:
        response_temperatura = requests.post(
            "https://backendproyectohumedad.azurewebsites.net/api/temperatura", json=payload_temperatura)
        # Levantar excepción si la respuesta contiene un código de error HTTP
        response_temperatura.raise_for_status()
        print("Solicitud POST a temperatura exitosa. Código de estado:",
              response_temperatura.status_code)

        response_humedad = requests.post(
            "https://backendproyectohumedad.azurewebsites.net/api/humedad", json=payload_humedad)
        # Levantar excepción si la respuesta contiene un código de error HTTP
        response_humedad.raise_for_status()
        print("Solicitud POST a humedad exitosa. Código de estado:",
              response_humedad.status_code)

        response_aire = requests.post(
            "https://backendproyectohumedad.azurewebsites.net/api/aire", json=payload_aire)
        # Levantar excepción si la respuesta contiene un código de error HTTP
        response_aire.raise_for_status()
        print("Solicitud POST a calidad del aire exitosa. Código de estado:",
              response_aire.status_code)

    except Exception as e:
        print("Error en las solicitudes POST:", e)

    # Esperar 5 segundos antes de la siguiente solicitud
    time.sleep(5)
