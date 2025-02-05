<template>
  <div class="container mt-3">
    <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center rowscols">
      <div v-for="exercise in exercises" :key="exercise.id" class="col d-flex justify-content-center">
        <div
          class="card hover position-relative rounded"
          @click="handleExerciseSelection(exercise)"
          :class="{
            'selected-exercise':
              selectedExercises.some((selected) => selected.id === exercise.id),
          }"
          style="width: 15rem; height: 20rem; border: none; transition: 0.8s"
        >
          <img
            :src="exercise.img"
            class="card-img-top rounded"
            alt="Imagem do Card"
            style="height: 100%; object-fit: cover"
          />
          <div
            class="card-body rounded position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark bg-opacity-50 shadow"
          >
            <h4 class="card-title text-center">{{ exercise.name }}</h4>
            <p class="card-text text-center">{{ exercise.group }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      exercises: [],
      selectedExercises: [],
    };
  },
  created() {
    this.fetchExercises();
  },
  methods: {
    handleExerciseSelection(exercise) {
      const index = this.selectedExercises.findIndex(
        (selected) => selected.id === exercise.id
      );
      if (index === -1) {
        this.selectedExercises.push(exercise);
      } else {
        this.selectedExercises.splice(index, 1);
      }
      this.$emit("select-exercise", this.selectedExercises);
    },
    async fetchExercises() {
      try {
        const response = await axios.get("http://10.7.159.28:5000/exercises");
        this.exercises = response.data;
      } catch (error) {
        console.log("Erro ao buscar exercícios - ", error);
      }
    },
  },
};
</script>

<style scoped>
.selected-exercise {
  position: relative;
}

.selected-exercise::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(40, 167, 69, 0.5);
  border-radius: 0.5rem;
}

.hover:hover {
  scale: 1.05;
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .row {
    display: flex;
    justify-content: center; 
    flex-wrap: wrap;
  }

  .col {
    display: flex;
    justify-content: center;
  }

  .card {
    width: 12rem !important; 
    height: 12rem !important; 
    margin-bottom: 10px;
  }

  h4{
    font-size: 1.1em;
  }

  p{
    font-size: .9em;
  }
}
</style>
