<template>
  <div class="py-5">
    <h1 class="text-center">Lista de Exercícios</h1>

    <div
      v-if="showModal"
      class="modal fade show"
      tabindex="-1"
      style="display: block; background-color: rgba(0, 0, 0, 0.5); overflow: hidden;"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastrar novo exercício</h5>
            <button
              type="button"
              class="btn-close"
              @click="toggleShowModal()"
              aria-label="Fechar"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addExercise">
              <div class="mb-3">
                <label for="name" class="form-label">Nome do Exercício</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  v-model="newExercise.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="group" class="form-label">Grupo Muscular</label>
                <input
                  type="text"
                  id="group"
                  class="form-control"
                  v-model="newExercise.group"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="img" class="form-label">URL da Imagem</label>
                <input
                  type="text"
                  id="img"
                  class="form-control"
                  v-model="newExercise.img"
                  required
                />
              </div>
              <div class="d-flex justify-content-end gap-3">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="showModal = false"
                >
                  Fechar
                </button>
                <button type="submit" class="btn btn-success">
                  Adicionar Exercício
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3 mx-auto">
      <div class="text-center d-flex justify-content-center">
        <button class="btn btn-warning d-flex mb-4" @click="toggleShowModal()">
          Adicionar exercício
        </button>
      </div>

      <div class="row row-cols-2 row-cols-sm-4 row-cols-md-3 row-cols-lg-5 g-4 mx-auto justify-content-center">
        <div v-for="exercise in exercises" :key="exercise.id" class="col">
          <router-link
            :to="`/exercise/${exercise.id}`"
            class="text-decoration-none"
          >
            <div
              class="card hover position-relative rounded"
              style="border: none; transition: 0.8s"
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
          </router-link>
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
      showModal: false,
      newExercise: {
        name: "",
        group: "",
        img: "",
      },
    };
  },
  created() {
    this.fetchExercises();
  },
  methods: {
    async fetchExercises() {
      try {
        const response = await axios.get("http://10.7.159.28:5000/exercises");
        this.exercises = response.data;
      } catch (error) {
        console.log("Erro ao buscar exercícios - ", error);
      }
    },
    toggleShowModal() {
      this.showModal = !this.showModal;
      if (this.showModal) {
        document.body.style.overflow = "hidden"; 
      } else {
        document.body.style.overflow = "auto";
      }
    },

    async addExercise() {
      try {
        const response = await axios.post(
          "http://10.7.159.28:5000/exercises",
          this.newExercise
        );

        this.exercises.push(response.data);

        this.newExercise.name = "";
        this.newExercise.group = "";
        this.newExercise.img = "";

        this.showModal = false;
      } catch (error) {
        console.log("Erro ao adicionar exercício", error);
      }
    },
  },
};
</script>

<style scoped>
h1,
h5,
p {
  font-family: "Josefin Sans", sans-serif;
}

.hover:hover {
  scale: 1.05;
  cursor: pointer;
}

.modal {
  display: block;
  z-index: 1050;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-dialog {
  max-width: 600px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 100%;
  height: 20rem;
}

@media screen and (max-width: 700px) {
  .card {
    height: 15rem;
  }

  .modal-dialog {
    max-width: 90%;
  }
}
</style>
