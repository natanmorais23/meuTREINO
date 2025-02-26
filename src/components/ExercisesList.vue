<template>
  <div class="container mt-3">

    <div class="mb-3">
      <label for="searchInput" class="form-label">Pesquisar</label>
      <input type="text" id="searchInput" class="form-control"
      v-model="searchQuery" @input="filterExercises1" placeholder="Pesquisar exercícios">
    </div>

    <div class="mb-3">
      <label for="muscleGroupSelect" class="form-label"
        >Filtrar por Grupo Muscular</label
      >
      <select
        id="muscleGroupSelect"
        class="form-select"
        v-model="selectedGroup"
        @change="filterExercises2"
      >
        <option value="">Todos</option>
        <option
          :value="muscleGroup"
          v-for="muscleGroup in muscleGroups"
          :key="muscleGroup"
        >
          {{ muscleGroup }}
        </option>
      </select>
    </div>

    <div v-if="filteredExercises.length === 0" class="text-center text-muted py-5">
      <p>Nenhum exercício encontrado para o filtro selecionado.</p>
    </div>

    <div
      class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center rowscols"
    >
      <div
        v-for="exercise in filteredExercises"
        :key="exercise.id"
        class="col d-flex justify-content-center"
      >
        <div
          class="card hover position-relative rounded"
          @click="handleExerciseSelection(exercise)"
          :class="{
            'selected-exercise': selectedExercises.some(
              (selected) => selected.id === exercise.id
            ),
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
            <p class="card-text text-center">
              {{
                Array.isArray(exercise.groups) ? exercise.groups.join(", ") : ""
              }}
            </p>
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
      selectedGroup: "",
      searchQuery: "",
      muscleGroups: [
        "Peito",
        "Costas",
        "Pernas",
        "Ombros",
        "Bíceps",
        "Tríceps",
        "Posterior",
        "Quadríceps",
        "Glúteo",
        "Abdômen",
        "Panturrilha",
        "Lombar"
      ],
      filteredExercises: [],
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
        const response = await axios.get("http://localhost:5000/exercises");
        this.exercises = response.data;
        console.log(this.exercises);
        this.filteredExercises = this.exercises;
      } catch (error) {
        console.log("Erro ao buscar exercícios - ", error);
      }
    },
    filterExercises1() {
      const query = this.searchQuery.toLowerCase(); // Converte a pesquisa para minúsculas
      this.filteredExercises = this.exercises.filter((exercise) => {
        const matchesName = exercise.name.toLowerCase().includes(query); // Filtra pelo nome
        const matchesGroup =
          !this.selectedGroup || exercise.groups.includes(this.selectedGroup); // Filtra pelo grupo muscular
        return matchesName && matchesGroup;
      });
    },
    filterExercises2(){
      console.log("Grupo selecionado:", this.selectedGroup);
      if (this.selectedGroup) {
        console.log("Filtrando por grupo:", this.selectedGroup);
        this.filteredExercises = this.exercises.filter((exercise) => {
          console.log("Grupo do exercício:", exercise.groups);
          return exercise.groups.includes(this.selectedGroup);
        });
      } else {
        console.log("Nenhum grupo selecionado");
        this.filteredExercises = this.exercises;
      }
    }
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

  h4 {
    font-size: 1.1em;
  }

  p {
    font-size: 0.9em;
  }
}
</style>
