<template>
  <div class="pb-5">
    <div id="element-to-convert">
      <h1 class="mt-5 mb-5 text-center">Treinos da semana</h1>

      <div class="wrap-table100 m-auto" style="width: 90vw;">
        <div
          class="table100 ver2 m-b-110 d-flex gap-3 text-center shadow"
          style="border-radius: 0.7em; overflow: hidden;"
        >
          <table
            data-vertable="ver2"
            v-for="(workout, index) in workouts"
            style="border-radius: 0.7em; overflow: hidden"
            class="shadow"
            :key="index"
          >
            <thead>
              <tr class="row100 head">
                <th class="column100 column1" data-column="column1">
                  {{ workout.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(exercise, i) in workout.exercises"
                :key="i"
                class="row100"
              >
                <td
                  class="column100 column1 d-flex justify-content-center gap-5 m-auto"
                  data-column="column1"
                  style="width: 100%"
                >
                  <div
                    class="p-2 text-start"
                    style="
                      min-width: 150px;
                      max-width: 35%;
                      word-wrap: break-word;
                    "
                  >
                    {{ exercise.name ? exercise.name : "" }}
                  </div>

                  <div class="d-flex align-items-center">
                    <div class="p-2">
                      {{ exercise.sets ? exercise.sets : "" }}
                    </div>
                    x
                    <div class="p-2">
                      {{ exercise.reps ? exercise.reps : "" }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-5">
        <button class="btn btn-warning" @click="exportToPDF">Salvar PDF</button>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      workouts: [],
      isEditing: false,
      currentWorkoutIndex: null,
      editWorkoutName: "",
    };
  },
  created() {
    this.fetchWorkouts();
  },
  props: {
    msg: String,
  },
  methods: {
    async fetchWorkouts() {
      try {
        const response = await axios.get("http://localhost:5000/workouts");

        const workoutsData = Array.isArray(response.data)
          ? response.data
          : response.data.workouts;

        const workouts = await Promise.all(
          workoutsData.map(async (workout) => {
            const exercises = await Promise.all(
              workout.exercises.map(async (exercise) => {
                const exerciseResponse = await axios.get(
                  `http://localhost:5000/exercises/${exercise.exercise_id}`
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
    exportToPDF() {
  const element = document.getElementById('element-to-convert');
  element.classList.add('pdf-export')

  const options = {
    margin: [10, 10, 10, 10], 
    filename: 'treinos_da_semana.pdf',
    image: { type: 'jpeg', quality: 0.98 },  
    html2canvas: {
      scale: 2,  
      logging: true, 
    },
    jsPDF: {
      unit: 'mm',
      format: 'a2',  
      orientation: 'landscape', 
      afterPageContent: function (data) {
        element.classList.remove('pdf-export');
        console.log(data)
      }
    },
  };

  html2pdf(element, options);
}


  },
};
</script>

<style scoped>

.pdf-export table {
  margin-bottom: 2%;
  width: 25vw;
  font-size: 0.5em;
}

.pdf-export .table100 {
  display: flex;
  flex-direction: row;
}





@media screen and (max-width: 767px) {
  .table100{
    display: flex;
    flex-direction: column !important;
  }

  .ver2{
    width: 90vw;
    margin: auto;
  }
}






/*//////////////////////////////////////////////////////////////////
  [ TEMPLATE CSS PRONTO (tabela) ]
   */

h1 {
  font-family: "Josefin Sans", sans-serif;
}

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
  width: 265px;
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
