<template>
    <header>
    <div class="px-3 py-2 bg-dark shadow text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <h5 class="mb-0">MeuTREINO</h5>
          </a>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
                <router-link to="/" :class="isActiveRoute('home') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-home d-block mx-auto mb-1" style="font-size: 18px;"></i>
                Home
                </router-link>
            </li>
            <li>
                <router-link to="/myWorkout" :class="isActiveRoute('myWorkout') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-dumbbell d-block mx-auto mb-1" style="font-size: 18px;"></i>
                Meu treino
                </router-link>
            </li>
            <li>
                <router-link to="/exercises" :class="isActiveRoute('exercises') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-running d-block mx-auto mb-1" style="font-size: 18px;"></i>
                Exercícios
                </router-link>
            </li>
            <li>
              <router-link to="/evolution" :class="isActiveRoute('evolution') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-chart-line d-block mx-auto mb-1" style="font-size: 18px;"></i>
                Evolução
                </router-link>
            </li>
            <li>
              <router-link to="/profile" :class="isActiveRoute('profile') ? 'text-white' : 'text-secondary'" class="nav-link">
                <i class="fas fa-user d-block mx-auto mb-1" style="font-size: 18px;"></i>
                Meu perfil
                </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</header>
</template>

<script>
    export default{
        methods: {
            isActiveRoute(routeName) {
                return this.$route.name === routeName
            }
        }
    }
</script>

<style scoped>
a{
    text-align: center;
}
</style>