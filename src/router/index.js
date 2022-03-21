import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from "@/views/HomeView";
import SearchView from "@/views/SearchView";
import UsersListView from "@/views/UsersListView";
import PrivateChat from "@/views/PrivateChat";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registro/',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/clase/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/usuarios/',
    name: 'usersList',
    component: UsersListView
  },
  {
    path: '/chat/',
    name: 'privateChat',
    component: PrivateChat
  },
  {
    path: '/buscar/',
    name: 'search',
    component: SearchView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
