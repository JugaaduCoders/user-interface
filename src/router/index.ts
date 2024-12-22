import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/HomePage.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Signup" */ "../views/user/UserSignup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/user/UserLogin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
