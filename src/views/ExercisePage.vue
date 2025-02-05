<template>
  <div class="d-flex flex-column flex-lg-row text-center" style="min-height: 90vh;">
    <!-- Imagem -->
    <div class="position-relative" style=" overflow: hidden; width: 100%;">
      <img
        :src="exercise.img"
        alt="Imagem do Card"
        class="bg-dark bg-opacity-50"
        style="height: 100%; width: 100%; object-fit: cover; object-position: center;"
      />
    </div>
    
    <!-- Conteúdo -->
    <div class="d-flex flex-column align-items-center content p-5" style="width: 100%;">
      <div v-if="exercise">
        <h1>{{ exercise.name }}</h1>
        <p class="mt-4"><strong>Grupo Muscular:</strong> {{ exercise.group }}</p>
      </div>
      <div v-else>
        <p>Carregando detalhes...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      exerciseId: null,
      exercise: null,  
    };
  },
  mounted() {
    this.exerciseId = this.$route.params.id;
    this.fetchExerciseDetails();
  },
  methods: {
    async fetchExerciseDetails() {
      try {
        const response = await axios.get(`http://10.7.159.28:5000/exercises/${this.exerciseId}`);
        this.exercise = response.data;  
      } catch (error) {
        console.log('Erro ao buscar detalhes do exercício:', error);
      }
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .d-flex {
    flex-direction: column;
  }

  .position-relative {
    height: 40%;
  }

  .d-flex.flex-column.align-items-center {
    width: 100%;
    padding: 2rem;
  }
}

@media screen and (min-width: 768px) {
  .d-flex {
    flex-direction: row;
  }

  .content{
    margin: auto;
  }
}
</style>
