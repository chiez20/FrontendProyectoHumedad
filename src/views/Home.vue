<template>
  <div class="contenedor-global">
    <div class="contenedor-resumen">
      <div class="contenido-resumen">
        <div class="contenedor-elegir-laboratorio">
          <h3 class="tipo-laboratorio">Laboratorios PortoAguas</h3>
          <select
            class="seleccion-tipos-laboratorios"
            name="tipos"
            id="id_tipos_laboratorios"
          >
            <option value="bodega">Bodega</option>
            <option value="reactivos">Reactivos</option>
          </select>
        </div>
        <p class="fecha-hora">{{ fecha }}</p>
        <ComponenteTemperatura></ComponenteTemperatura>
        <ComponenteCalidadAire></ComponenteCalidadAire>
      </div>
    </div>
    <div class="contenedor-grafico-tarjetas">
      <div class="contenedor-contenido-grafico">
        <ComponenteGrafico></ComponenteGrafico>
        <ComponenteTarjetas></ComponenteTarjetas>
      </div>
    </div>
  </div>
</template>

<style>
.contenedor-contenido-grafico {
  width: 87%;
  height: 93%;
  margin-top: 5%;
  background-color: white;
}
.contenedor-grafico-tarjetas {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 135%;
}

html,
body {
  display: flex;
  padding: 0;
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  font-size: 62.5%;
  font-family: 'Poppins', sans-serif;
  font-family: 'Roboto', sans-serif;
}

.contenedor-global {
  display: flex;
  height: 100%;
  width: 100vh;
}

h1,
h2,
h3,
h4,
h5,
p {
  padding: 0;
  margin: 0;
}

.contenedor-resumen {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  min-width: 80%;
}

.tipo-laboratorio {
  font-size: 2.8rem;
  font-weight: 400;
  margin-right: 3rem;
}
.contenedor-elegir-laboratorio {
  display: flex;
  align-items: center;
}
.seleccion-tipos-laboratorios {
  border-style: solid;
  border-color: #b2b2b2;
  border-width: 2px;
  border-radius: 0.5rem;
  color: #a1a1a1;
  padding: 1rem;
  height: 4.5rem;
  width: 100%;
  font-size: 1.8rem;
}

.seleccion-tipos-laboratorios:focus {
  outline: none;
  border-radius: 0.5rem;
}

.fecha-hora {
  margin-top: 4rem;
  font-size: 2.5rem;
  font-weight: 300;
  color: #5e5e5e;
}
</style>

<script>
import ComponenteTemperatura from '../components/ComponenteTemperatura.vue';
import ComponenteCalidadAire from '../components/ComponenteCalidadAire.vue';
import ComponenteGrafico from '../components/ComponenteGrafico.vue';
import ComponenteTarjetas from '../components/ComponenteTarjetas.vue';

export default {
  name: 'HomeView',
  components: {
    ComponenteTemperatura,
    ComponenteCalidadAire,
    ComponenteGrafico,
    ComponenteTarjetas,
  },
  data() {
    return {
      fecha: '',
    };
  },
  created() {
    this.updateFecha();
  },
  methods: {
    updateFecha() {
      const diasSemana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ];
      const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      const fecha = new Date();
      const diaSemana = diasSemana[fecha.getDay()];
      const mes = meses[fecha.getMonth()];
      const diaMes = fecha.getDate();
      const anio = fecha.getFullYear();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes();
      this.fecha = `${hora}:${minutos} ${diaSemana}, ${mes} ${diaMes}, ${anio}`;
      setTimeout(this.updateFecha, 60000); // Actualiza la fecha cada 60 segundos
    },
  },
};
</script>
