<template>
  <div class="pb-5">
    <div v-for="(workout, workoutIndex) in workouts" :key="workoutIndex">
      <h4 class="mt-5 text-center">
        <template v-if="isEditing && currentWorkoutIndex === workoutIndex">
          <div class="border w-50 mx-auto rounded">
            <input v-model="editWorkoutName" class="form-control text-center" />
          </div>
        </template>
        <template v-else>
          {{ workout.name }}
        </template>
      </h4>

      <div class="d-flex justify-content-end mb-3" style="margin: auto; width: 90vw">
        <button
          @click="toggleShowModal(workout)"
          class="btn btn-success me-2"
          style="font-size: 0.8em"
        >
          <i class="fas fa-plus"></i>
        </button>
        <button @click="toggleEdit(workout, workoutIndex)" class="btn btn-warning">
          <template v-if="isEditing && currentWorkoutIndex === workoutIndex">
            Salvar
          </template>
          <template v-else>
            <i class="fas fa-pencil-alt"></i>
          </template>
        </button>
      </div>

      <div
        v-if="showModal && currentWorkout === workout"
        class="modal fade show"
        tabindex="-1"
        style="display: block; background-color: rgba(0, 0, 0, 0.5)"
      >
        <div class="modal-dialog" style="max-width: 90vw; margin: 5vh auto">
          <div class="modal-content" style="max-width: 90vw; margin: 5vh auto">
            <div class="modal-header">
              <h5 class="modal-title">Adicionar exercícios</h5>
              <button
                type="button"
                class="btn-close"
                @click="toggleShowModal()"
                aria-label="Fechar"
              ></button>
            </div>
            <div class="modal-body">
              <ExercisesList @select-exercise="handleExerciseSelection" />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="toggleShowModal()"
              >
                Fechar Modal
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="addExerciseToWorkout(currentWorkout)"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="wrap-table100 m-auto shadow" style="overflow-x: auto; width: 90vw; border-radius: .7em; ">
        <div
          class="table100 ver2 m-b-110 text-center shadow"
          style="border-radius: 0.7em; overflow: hidden;"
        >
          <table data-vertable="ver2 ">
            <thead>
              <tr class="row100 head">
                <th class="column100 column1" data-column="column1">Exercício</th>
                <th class="column100 column1" data-column="column1">Grupo muscular</th>
                <th class="column100 column1" data-column="column1">Séries</th>
                <th class="column100 column1" data-column="column1">Repetições</th>
                <th class="column100 column1" data-column="column1">Carga</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(exercise, index) in workout.exercises" :key="index" class="row100" style="position: relative;">
                <router-link :to="`/exercise/${exercise.id}`" class="text-decoration-none text-white column100 column1">
                  <td class="column100 column1" data-column="column1">
                    {{ exercise.name }}
                  </td>
                </router-link>
                <td class="column100 column1" data-column="column1">
                  {{ exercise.groups.join(", ") }}
                </td>
                <td class="column100 column1" data-column="column1">
                  {{ exercise.sets }}
                </td>
                <td class="column100 column1" data-column="column1">
                  {{ exercise.reps }}
                </td>
                <td class="column100 column1" data-column="column1">
                  {{ exercise.kg }}
                </td>
                <template v-if="isEditing && currentWorkoutIndex === workoutIndex">
                  <i 
                    class="fas fa-trash" 
                    @click="deleteExercise(workout, exercise.id)" 
                    style="position: absolute; top: 10px; right: 10px; cursor: pointer;">
                  </i>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import ExercisesList from "./ExercisesList.vue";
import apiUrl from "@/apiUrl";

export default {
  components: {
    ExercisesList,
  },
  data() {
    return {
      workouts: [],
      isEditing: false,
      showModal: false,
      currentWorkoutIndex: null,
      editWorkoutName: "",
      selectedExercises: [],
    };
  },
  created() {
    this.fetchWorkouts();
  },
  props: {
    msg: String,
  },
  methods: {
    handleExerciseSelection(selectedExercises) {
      this.selectedExercises = selectedExercises.map((exercise) => ({
        id: exercise.id,
      }));

      const exerciseNames = this.selectedExercises.map(
        (exercise) => exercise.name
      );
      console.log(exerciseNames)
      console.log(selectedExercises)
    },
    async addExerciseToWorkout(workout) {
      this.selectedExercises.forEach((exercise) => {
        workout.exercises.push({
          exercise_id: exercise.id,
          sets: 3,
          reps: 12,
          kg: 20,
        });
      });

      try {
        await this.updateWorkout(workout.id, workout);
        this.selectedExercises = [];
        this.toggleShowModal();
      } catch (error) {
        console.log("Erro ao adicionar exercícios ao treino", error);
      }
    },
    async updateWorkout(workoutId, workoutData) {
      try {
        const updatedExercises = workoutData.exercises.map((exercise) => ({
          exercise_id: exercise.id || exercise.exercise_id, 
          sets: exercise.sets,
          reps: exercise.reps,
          kg: exercise.kg,
        }));

        const workoutToUpdate = {
          ...workoutData,
          exercises: updatedExercises,
        };

        await axios.patch(
          `${apiUrl}/workouts/${workoutId}`,
          workoutToUpdate
        );

        this.fetchWorkouts();
      } catch (error) {
        console.log("Erro ao atualizar treino - ", error);
      }
    },
    async fetchWorkouts() {
      try {
        const response = await axios.get(`${apiUrl}/workouts`);

        const workoutsData = Array.isArray(response.data)
          ? response.data
          : response.data.workouts;

        const workouts = await Promise.all(
          workoutsData.map(async (workout) => {
            const exercises = await Promise.all(
              workout.exercises.map(async (exercise) => {
                const exerciseResponse = await axios.get(
                  `${apiUrl}/exercises/${exercise.exercise_id}`
                );
                const exerciseData = exerciseResponse.data;

                return {
                  ...exerciseData,
                  sets: exercise.sets,
                  reps: exercise.reps,
                  kg: exercise.kg,
                };
              })
            );

            return {
              ...workout,
              exercises:
                exercises.length > 0
                  ? exercises
                  : [{ name: "Nenhum exercício cadastrado" }],
            };
          })
        );

        this.workouts = workouts;
      } catch (error) {
        console.log("Erro ao puxar dados - ", error);
      }
    },
    toggleEdit(workout, index) {
      if (this.isEditing && this.currentWorkoutIndex === index) {
        this.saveWorkout(workout.id);
      } else {
        this.isEditing = true;
        this.currentWorkoutIndex = index;
        this.editWorkoutName = workout.name;
      }
    },
    async saveWorkout(workoutId) {
      try {
        const updateWorkout = {
          name: this.editWorkoutName,
        };
        await axios.patch(
          `${apiUrl}/workouts/${workoutId}`,
          updateWorkout
        );
        this.workouts[this.currentWorkoutIndex].name = this.editWorkoutName;
        this.isEditing = false;
        this.currentWorkoutIndex = null;
      } catch (error) {
        console.log("Erro ao salvar treino - ", error);
      }
    },
    toggleShowModal(workout = null) {
      this.showModal = !this.showModal;
      if (workout) {
        this.currentWorkout = workout;
      }
      console.log(workout.name);
      console.log(this.showModal);
    },
    async deleteExercise(workout, exerciseId) {
      try{

        workout.exercises = workout.exercises.filter(exercise => exercise.id !== exerciseId)

        await this.updateWorkout(workout.id, workout)
      }
      catch(error) {
        console.log('Erro ao deletar exercício - ', error)
      }
    }
  },
};
</script>

<style scoped>


.modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
}


.selected-exercise {
  background-color: #28a745;
  color: white;
}
.exercise-item {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}
.exercise-item:hover {
  background-color: #f0f0f0;
}

@media screen and (max-width: 767px) {
  .table100{
    width: 200%;
  }
}



/*//////////////////////////////////////////////////////////////////
[ TEMPLATE CSS PRONTO (tabela) ]
 */

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.container-table100 {
  width: 100%;
  min-height: 100vh;
  background: #d1d1d1;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 33px 30px;
}

.wrap-table100 {
  width: 1300px;
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: sans-serif;
}

a {
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

input {
  display: block;
  outline: none;
  border: none !important;
}

textarea {
  display: block;
  outline: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

iframe {
  border: none !important;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-table100 {
  width: 100%;
  min-height: 100vh;
  background: #d1d1d1;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 33px 30px;
}

.wrap-table100 {
  width: 1300px;
}

table {
  width: 100%;
  background-color: #fff;
}

th,
td {
  font-weight: unset;
}

.column100 {
  width: 130px;
}

.column100.column1 {
  width: 465px;
}

.row100.head th {
  padding-top: 24px;
  padding-bottom: 20px;
}

.row100 td {
  padding-top: 18px;
  padding-bottom: 14px;
}

.table100.ver2 td {
  font-family: Montserrat-Regular;
  font-size: 16px;
  color: #808080;
  line-height: 1.4;
}

.table100.ver2 th {
  font-family: Montserrat-Medium;
  font-size: 14px;
  color: #fff;
  line-height: 1.4;
  text-transform: uppercase;

  background-color: #333333;
}

.table100.ver2 .row100:hover td {
  background-color: #ffdd57;
  color: #000;
}

.table100.ver2 .hov-column-ver2 {
  background-color: #ffdd57;
  color: #000;
}

.table100.ver2 .hov-column-head-ver2 {
  background-color: #484848 !important;
}

.table100.ver2 .row100 td:hover {
  background-color: #ffc107;
  color: #000;
}
</style>
