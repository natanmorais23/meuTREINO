<template>
    <div class="py-5">
      <h1 class="text-center">Lista de Exercícios</h1>

      <div class="text-center d-flex justify-content-end" style="margin-right: 7em;">
        <button class="btn btn-warning" @click="toggleShowModal()">Adicionar exercício</button>
      </div>

      <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Cadastrar novo exercício</h5>
                <button type="button" class="btn-close" @click="toggleShowModal()" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="addExercise">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nome do Exercício</label>
                        <input type="text" id="name" class="form-control" v-model="newExercise.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="group" class="form-label">Grupo Muscular</label>
                        <input type="text" id="group" class="form-control" v-model="newExercise.group" required>
                    </div>
                    <div class="mb-3">
                        <label for="img" class="form-label">URL da Imagem</label>
                        <input type="text" id="img" class="form-control" v-model="newExercise.img" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showModal = false">Fechar</button>
                        <button type="submit" class="btn btn-success">Adicionar Exercício</button>
                    </div>
                    </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="toggleShowModal()">Fechar Modal</button>
            </div>
            </div>
        </div>
        </div>

  
      <div class="container mt-3">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          <div v-for="exercise in exercises" :key="exercise.id" class="col">
            <router-link :to="`/exercise/${exercise.id}`" class="text-decoration-none">
              <div class="card hover position-relative rounded" style="width: 15rem; height: 20rem; border: none; transition: .8s;">
                <img :src="exercise.img" class="card-img-top rounded" alt="Imagem do Card" style="height: 100%; object-fit: cover;">
                <div class="card-body rounded position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark bg-opacity-50 shadow">
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
  import axios from 'axios';
  
  export default {
    data() {
      return {
        exercises: [],
        showModal: false,
        newExercise: {
            name: '',
            group: '',
            img: ''
        }
      };
    },
    created() {
      this.fetchExercises();
    },
    methods: {
      async fetchExercises() {
        try {
          const response = await axios.get('http://localhost:5000/exercises');
          this.exercises = response.data;
        } catch (error) {
          console.log('Erro ao buscar exercícios - ', error);
        }
      },
      toggleShowModal(){
        this.showModal = !this.showModal;
      },

      async addExercise(){
        try{
            const response = await axios.post('http://localhost:5000/exercises', this.newExercise)

            this.exercises.push(response.data)

            this.newExercise.name = ''
            this.newExercise.group = ''
            this.newExercise.img = ''

            this.showModal = false
        }
        catch(error){
            console.log('Erro ao adicionar exercício', error)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  h1, h5, p {
    font-family: 'Josefin Sans', sans-serif;
  }

  .hover:hover{
    scale: 1.05;
    cursor: pointer;
  }

  .modal {
  display: block;
  z-index: 1050;
}

.modal-dialog {
  max-width: 600px; 
  margin: 10% auto; 
}

  </style>
  