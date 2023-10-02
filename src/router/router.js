import { createRouter, createWebHistory } from "vue-router";
import SignupView from "@/views/signup/SignupView.vue";
import PageNation from "@/views/pagenation/PageView.vue";
import Main from "@/views/main/MainView.vue";
import LoginView from "@/views/login/LoginView.vue";
import CompleteLogin from "@/views/login/CompleteLogin.vue";
import SearchView from "@/views/search/SearchView.vue";
import WishListView from "@/views/wishList/WishListView.vue";
import FilteringView from "@/views/filtering/FilteringView.vue";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/signup",
    component: SignupView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/pageNation",
    component: PageNation,
  },
  {
    path: "/completelogin",
    component: CompleteLogin,
  },
  {
    path: "/search",
    component: SearchView,
  },
  {
    path: "/wishList",
    component: WishListView,
  },
  {
    path: "/filtering",
    component: FilteringView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
