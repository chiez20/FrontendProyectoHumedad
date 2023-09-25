<template>
  <div class="login-global-container">
    <div class="LoginView">
      <div class="login-container">
        <div class="login-content">
          <img src="../assets/1.png" alt="logo-epam" class="logo-epam" />
          <form class="form" action="/api/users/login" method="POST" @submit.prevent="login">
            <h1>Iniciar sesión</h1>
            <div class="text">
              <p class="login-text">
                Ingrese las credenciales correctas para visualizar el sistema de monitoreo.
              </p>
            </div>
            <label for="username">Ingresar Usuario</label>
            <input type="text" id="username" v-model="userName" />
            <label for="password">Ingresar Contraseña</label>
            <input type="password" id="password" v-model="password" />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
      <div class="image-container">
        <img src="../assets/2.png" alt="banner-imagen" class="banner-login" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      userName: '',
      password: '',
      token: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://backendproyectohumedad.azurewebsites.net/api/users/login', {
          userName: this.userName,
          password: this.password,
        });
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      localStorage.removeItem('token');
      this.token = null;
      this.$router.push('/login');
    },
  },
  created() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.$router.push('/');
    }
  },
};
</script>


<style>
h1 {
  font-size: 3rem;
  font-weight: 700;
}

label {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input {
  min-height: 4rem;
  margin-bottom: 2rem;
  border: none;
  background-color: aliceblue;
  padding-left: 1rem;
  outline: none;
  border-radius: 0.3rem;
}

button {
  font-size: 1.6rem;
  font-weight: 600;
  height: 4.5rem;
  background-color: rgb(0, 195, 255);
  border: none;
  color: white;
  border-radius: 0.3rem;
  margin-top: 2rem;
}

button:hover {
  background-color: rgb(19, 157, 199);
  cursor: pointer;
}

.login-text {
  font-size: 1.6rem;
  color: rgb(126, 126, 126);
  font-weight: 600;
  margin-top: 2rem;
}

.login-global-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d5d6f8;
  height: 100vh;
  width: 100vw;
}

.LoginView {
  display: flex;
  background-color: white;
  height: 80vh;
  width: 70vw;
  border-radius: 1.2rem;
}

.login-container {
  display: flex;
  justify-content: center;
  width: 40%;
}

.image-container {
  background-color: #f9f6fd;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-radius: 2rem;
}

.login-content {
  background-color: white;
  width: 80%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-epam {
  margin-top: 2rem;
  width: 15rem;
}

.form {
  display: flex;
  flex-direction: column;
  height: 95%;
  justify-content: center;
}

.text {
  margin: 1rem 0 2rem 0;
}

.banner-login {
  width: 95%;
}
</style>
