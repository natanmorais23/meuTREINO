<template>
  <header>
    <div class="px-3 py-2 bg-dark shadow text-white h-100 d-flex align-items-center">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
          <button class="navbar-toggler d-lg-none" type="button" @click="toggleMenu">
            <i class="fa fa-bars" style="font-size: 2em;"></i>
          </button>
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <img :src="require('@/assets/meuTREINO.png')" width="100">
          </a>
          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small d-none d-lg-flex">
            <li>
              <router-link to="/" :class="isActiveRoute('home') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-home d-block mx-auto mb-1 is"></i>
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/myWorkout" :class="isActiveRoute('myWorkout') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-dumbbell d-block mx-auto mb-1 is"></i>
                Meu treino
              </router-link>
            </li>
            <li>
              <router-link to="/myExercises" :class="isActiveRoute('myExercises') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-running d-block mx-auto mb-1 is"></i>
                Exercícios
              </router-link>
            </li>
            <li>
              <router-link to="/evolution" :class="isActiveRoute('evolution') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-chart-line d-block mx-auto mb-1 is"></i>
                Evolução
              </router-link>
            </li>
            <li>
              <router-link to="/profile" :class="isActiveRoute('profile') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-user d-block mx-auto mb-1 is"></i>
                Meu perfil
              </router-link>
            </li>
          </ul>

        </div>
      </div>
    </div>

    <div v-if="menuVisible" class="d-lg-none bg-dark text-white p-3" 
         style="position: absolute; top: 14vh; left: 0; width: 50%; height: 100vh; z-index: 999; background-color: rgba(0, 0, 0, 0.8); transition: transform 0.3s ease;">
      <ul class="nav flex-column">
        <li>
          <router-link to="/" :class="isActiveRoute('home') ? 'text-white' : 'text-secondary'" class="nav-link">
            <i class="fas fa-home d-block mx-auto mb-1 is"></i>
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/myWorkout" :class="isActiveRoute('myWorkout') ? 'text-white' : 'text-secondary'" class="nav-link">
            <i class="fas fa-dumbbell d-block mx-auto mb-1 is"></i>
            Meu treino
          </router-link>
        </li>
        <li>
          <router-link to="/myExercises" :class="isActiveRoute('exercises') ? 'text-white' : 'text-secondary'" class="nav-link">
            <i class="fas fa-running d-block mx-auto mb-1 is"></i>
            Exercícios
          </router-link>
        </li>
        <li>
          <router-link to="/evolution" :class="isActiveRoute('evolution') ? 'text-white' : 'text-secondary'" class="nav-link">
            <i class="fas fa-chart-line d-block mx-auto mb-1 is"></i>
            Evolução
          </router-link>
        </li>
        <li>
          <router-link to="/profile" :class="isActiveRoute('profile') ? 'text-white' : 'text-secondary'" class="nav-link">
            <i class="fas fa-user d-block mx-auto mb-1 is"></i>
            Meu perfil
          </router-link>
        </li>
      </ul>
    </div>

  </header>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false, 
    };
  },
  methods: {
    isActiveRoute(routeName) {
      return this.$route.name === routeName;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible; 
    },
  },
};
</script>

<style scoped>
.navbar-toggler-icon {
  background-color: white;
}

a {
  text-align: center;
}

@media (max-width: 991px) {
  header {
    height: 14vh; 
    border: 1px solid;
  }

  li{
    font-size: 1.5em;
    margin-bottom: .7em;
  }
  

  .navbar-toggler {
    display: block;
  }

}

@media (min-width: 992px) {
  .navbar-toggler {
    display: none;
  }

  .is{
    font-size: 18px;
  }

  .nav {
    display: flex; 
  }
}
</style>
