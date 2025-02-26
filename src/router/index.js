import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HomePage.vue';
import ExercisePage from '@/views/ExercisePage.vue';
import ExercicesList from '@/components/ExercisesList.vue';
import MyWorkout from '@/views/myWorkout.vue';
import MyExercises from '@/views/myExercises.vue';
import EvolutionPage from '@/views/evolutionPage.vue';
import ProfilePage from '@/views/profilePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,  
    },
    {
      path: '/exercise/:id',
      name: 'exercise',
      component: ExercisePage, 
    },
    {
      path: '/myExercises',
      name: 'myExercises',
      component: MyExercises
    },
    {
      path: '/myWorkout',
      name: 'myWorkout',
      component: MyWorkout
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: ExercicesList, 
    },
    {
      path: '/evolution',
      name: 'evolution',
      component: EvolutionPage, 
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage, 
    },
  ],
});
