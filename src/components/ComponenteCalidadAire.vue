<template>
  <div class="calidad-aire">
    <h2>Calidad del aire</h2>
    <p class="resumen-texto">Resumen</p>
    <progress max="100" :value="calidadAire"></progress>
    <p class="porcentaje">{{ calidadAire }}%</p>
  </div>
</template>
<style>
.calidad-aire {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}
.calidad-aire h2 {
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 2rem;
}
.porcentaje {
  font-size: 2.7rem;
}
progress {
  width: 28rem;
  height: 0.8rem;
  border-radius: 0%;
  background-color: black;
  margin: 0.7rem 0;
}
.resumen-texto {
  font-size: 2.6rem;
  font-weight: 400;
}

progress[value]::-webkit-progress-bar {
  background-color: #d8d8d8;
}

progress[value]::-webkit-progress-value {
  background-color: #5596f6;
}
</style>

<script>
export default {
  name: "ComponenteCalidadAire",
  data() {
    return {
      calidadAire: 0,
    };
  },
  created() {
    setInterval(() => {
      this.getCalidadAire();
    }, 5000);
  },
  methods: {
    async getCalidadAire() {
      try {
        const response = await fetch(
          "https://backendproyectohumedad.azurewebsites.net/api/aire"
        );
        const data = await response.json();

        // Obtener el último valor de calidad del aire
        const ultimoValor = data[data.length - 1].value;

        // Actualizar el valor de calidad del aire
        this.calidadAire = ultimoValor;
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    },
  },
};
</script>
