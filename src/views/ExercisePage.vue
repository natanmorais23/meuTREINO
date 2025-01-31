<template>
  <div>
    <h2>Detalhes do Exercício</h2>
    <div v-if="exercise">
      <p><strong>Nome:</strong> {{ exercise.name }}</p>
      <p><strong>Grupo Muscular:</strong> {{ exercise.group }}</p>
      <p><strong>Carga:</strong> {{ exercise.kg }} kg</p>
    </div>
    <div v-else>
      <p>Carregando detalhes...</p>
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
        const response = await axios.get(`http://localhost:5000/exercises/${this.exerciseId}`);
        this.exercise = response.data;  
      } catch (error) {
        console.log('Erro ao buscar detalhes do exercício:', error);
      }
    }
  }
};
</script>
