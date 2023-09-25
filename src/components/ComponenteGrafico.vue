<template>
  <div class="grafico">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "ComponenteGrafico",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "Temperatura",
          data: [],
        },
        {
          name: "Humedad",
          data: [],
        },
        {
          name: "Calidad del aire",
          data: [],
        },
      ],
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Datos de temperatura y humedad en los últimos 30 registros",
          align: "left",
        },
        xaxis: {
          categories: [],
        },
      },
    };
  },
  created() {
    setInterval(() => {
      this.getDatos();
    }, 5000);
  },
  methods: {
    async getDatos() {
      try {
        const [tempResponse, humResponse, aireResponse] = await Promise.all([
          fetch("https://backendproyectohumedad.azurewebsites.net/api/temperatura"),
          fetch("https://backendproyectohumedad.azurewebsites.net/api/humedad"),
          fetch("https://backendproyectohumedad.azurewebsites.net/api/aire"),
        ]);

        const [tempData, humData, aireData] = await Promise.all([
          tempResponse.json(),
          humResponse.json(),
          aireResponse.json(),
        ]);

        // Obtener los últimos 50 valores de temperatura, humedad y aire
        const ultimos50Temp = tempData.slice(-30);
        const ultimos50Hum = humData.slice(-30);
        const ultimos50Aire = aireData.slice(-30);

        // Actualizar los arrays de datos para el gráfico
        this.series[0].data = ultimos50Temp.map(d => d.value);
        this.series[1].data = ultimos50Hum.map(d => d.value);
        this.series[2].data = ultimos50Aire.map(d => d.value);

        // Actualizar el porcentaje en el resumen de calidad del aire
        const ultimoAire = aireData[aireData.length - 1];
        const porcentaje = Math.round((ultimoAire.value / 500) * 100);
        this.porcentajeCalidadAire = `${porcentaje}%`;
        this.valorCalidadAire = ultimoAire.value;
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    },
  },
};
</script>

<style></style>
