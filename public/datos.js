const axios = require('axios');

async function enviarDatos() {
  // Generar números enteros aleatorios para temperatura, humedad y calidad del aire entre 12 y 25 y 0 y 100 respectivamente
  const temperatura = Math.floor(Math.random() * (25 - 12 + 1)) + 12;
  const humedad = Math.floor(Math.random() * (25 - 12 + 1)) + 12;
  const calidadAire = Math.floor(Math.random() * (100 - 80 + 1)) + 80;

  // Crear los payloads en formato JSON
  const payloadTemperatura = { value: temperatura };
  const payloadHumedad = { value: humedad };
  const payloadAire = { value: calidadAire };

  // Realizar las solicitudes POST a las rutas
  try {
    await axios.post(
      'https://backendproyectohumedad.azurewebsites.net/api/temperatura',
      payloadTemperatura
    );
    console.log('Solicitud POST a temperatura exitosa.');

    await axios.post(
      'https://backendproyectohumedad.azurewebsites.net/api/humedad',
      payloadHumedad
    );
    console.log('Solicitud POST a humedad exitosa.');

    await axios.post(
      'https://backendproyectohumedad.azurewebsites.net/api/aire',
      payloadAire
    );
    console.log('Solicitud POST a calidad del aire exitosa.');
  } catch (error) {
    console.error('Error en las solicitudes POST:', error.message);
  }
}

// Ejecutar la función enviarDatos cada 5 segundos
setInterval(enviarDatos, 5000);