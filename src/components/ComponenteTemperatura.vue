<template>
  <div class="imagen-temperatura">
    <img src="../assets/termometro.png" alt="" />
    <p class="numero-temperatura">
      {{ temperatura.value ? `${temperatura.value}` : "0" }}
    </p>
    <p class="simbolo-temperatura">°C</p>
  </div>
</template>
<script>
export default {
  name: "ComponenteTemperatura",
  data() {
    return {
      temperatura: [],
    };
  },
  created() {
    setInterval(() => {
      this.getTemperaturas();
    }, 5000);
  },

  methods: {
    async getTemperaturas() {
      try {
        const response = await fetch(
          "https://backendproyectohumedad.azurewebsites.net/api/temperatura"
        );
        const data = await response.json();

        //optiene el ultimo dato del array
        this.temperatura = data[data.length - 1];
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    },
  },
};
</script>

<style>
.imagen-temperatura {
  color: #202020;
  display: flex;
  margin-top: 3rem;
}
.imagen-temperatura img {
  width: 10rem;
  margin-right: 3rem;
}
.numero-temperatura {
  font-size: 15rem;
  font-weight: 700;
}
.simbolo-temperatura {
  font-size: 5rem;
  font-weight: 900;
}
</style>
