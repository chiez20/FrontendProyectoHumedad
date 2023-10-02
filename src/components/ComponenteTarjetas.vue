<template>
  <div class="contenedor-tarjetas">
    <div class="fondo-tarjeta-azul sombra-tarjetas">
      <h2>Ahora</h2>
      <img src="../assets/termometro-tarjeta.png" alt="" />
      <p class="texto-temperatura">Temperatura</p>
      <p class="dato-temperatura">
        {{ temperatura.value ? `${temperatura.value}°C` : "0°C" }}
      </p>
    </div>
    <div class="tarjeta sombra-tarjetas">
      <h2>Ahora</h2>
      <img src="../assets/humedad-tarjeta.png" alt="" />
      <p class="texto-temperatura">Humedad</p>
      <p class="dato-temperatura">
        {{ humedad.value ? `${humedad.value}%` : "0%" }}
      </p>
    </div>
    <div class="tarjeta sombra-tarjetas">
      <h2>Día</h2>
      <img src="../assets/termometro-dia.png" alt="" />
      <p class="texto-temperatura">Temperatura</p>
      <p class="dato-temperatura">
        {{ promedioDiaTemperatura ? `${promedioDiaTemperatura}°C` : "0°C" }}
      </p>
    </div>
    <div class="tarjeta sombra-tarjetas">
      <h2>Día</h2>
      <img src="../assets/humedad-dia.png" alt="" />
      <p class="texto-temperatura">Humedad</p>
      <p class="dato-temperatura">
        {{ promedioDiaHumedad ? `${promedioDiaHumedad}%` : "0%" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponenteTarjeta",
  data() {
    return {
      temperatura: {},
      humedad: {},
      promedioDiaTemperatura: 0,
      promedioDiaHumedad: 0,
    };
  },
  created() {
    setInterval(() => {
      this.getData();
    }, 5000);
  },
  methods: {
    async getData() {
      try {
        const responseTemperatura = await fetch(
          "https://backendproyectohumedad.azurewebsites.net/api/temperatura"
        );
        const responseHumedad = await fetch(
          "https://backendproyectohumedad.azurewebsites.net/api/humedad"
        );
        const dataTemperatura = await responseTemperatura.json();
        const dataHumedad = await responseHumedad.json();

        //obtenemos el ultimo dato del array
        this.temperatura = dataTemperatura[dataTemperatura.length - 1];
        this.humedad = dataHumedad[dataHumedad.length - 1];

        //filtramos los datos por la fecha de hoy
        const fechaHoy = "2023-10-02";

        const datosFiltrados = dataTemperatura.filter(dato =>
          dato.date.includes(fechaHoy)
        );

        let suma = 0;
        for (let i = 0; i < datosFiltrados.length; i++) {
          suma = suma + datosFiltrados[i].value;
        }

        this.promedioDiaTemperatura = suma / datosFiltrados.length;
        this.promedioDiaTemperatura = Math.floor(this.promedioDiaTemperatura);
        //filtramos los datos de humedad por la fecha de hoy
        const datosFiltradosHumedad = dataHumedad.filter(dato =>
          dato.date.includes(fechaHoy)
        );
        let sumaHumedad = 0;
        for (let j = 0; j < datosFiltradosHumedad.length; j++) {
          sumaHumedad = sumaHumedad + datosFiltradosHumedad[j].value;
        }

        this.promedioDiaHumedad = sumaHumedad / datosFiltradosHumedad.length;
        this.promedioDiaHumedad = Math.floor(this.promedioDiaHumedad);
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    },
  },
};
</script>
<style>
.dato-temperatura {
  font-size: 3rem;
}
.texto-temperatura {
  font-size: 1.5rem;
}
.contenedor-tarjetas {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26rem;
}
.sombra-tarjetas {
  box-shadow: 0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.158);
}
.tarjeta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #494f56;
  width: 16rem;
  height: 21rem;
  border-radius: 6px;
  background-color: white;
}
.fondo-tarjeta-azul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: 16rem;
  height: 21rem;
  border-radius: 6px;
  background-color: #5596f6;
}
.tarjeta img {
  width: 5rem;
  margin: 1.3rem 0;
}
.fondo-tarjeta-azul img {
  width: 5.5rem;
  margin: 1.1rem 0;
}
.fondo-tarjeta-azul {
  font-size: 1.8rem;
}
.tarjeta h2 {
  font-size: 2.5rem;
}
</style>
