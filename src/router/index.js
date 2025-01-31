import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HomePage.vue';
import ExercisePage from '@/views/ExercisePage.vue';
import ExercicesList from '@/views/ExercicesList.vue';
import MyWorkout from '@/views/myWorkout.vue';

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
      path: '/myWorkout',
      name: 'myWorkout',
      component: MyWorkout
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: ExercicesList, 
    },
  ],
});
