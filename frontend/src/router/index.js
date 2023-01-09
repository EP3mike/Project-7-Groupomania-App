import { createRouter, createWebHistory } from 'vue-router';
import LoginComp from '../components/LoginComp.vue';
import SignupComp from '../components/SignupComp.vue';
const HomepageComp = () => import('../components/HomepageComp.vue');
const SettingsComp = () => import('../components/SettingsComp.vue');
const SubmitComp = () => import('../components/SubmitComp.vue');
const ModifyComp = () => import('../components/ModifyComp.vue');
const PostComp = () => import('../components/PostComp.vue');


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComp
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupComp
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: HomepageComp
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsComp
  },
  {
    path: '/submit',
    name: 'submit',
    component: SubmitComp
  },
  {
    path: '/modify/:id',
    name: 'modify',
    component: ModifyComp
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostComp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//auth is checked everytime navigate to new page, sends to login if no jwt read
router.beforeEach((to, from, next) => {
  const publicPages = ['/','/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  //if not logged in then redirected to login
  if(authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router
