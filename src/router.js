import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    alias: "/surveys",
    name: "surveys",
    component: () => import("./views/surveysList/SurveysList.vue")
  },
  {
    path: "/users",
    alias: "/users",
    name: "users",
    component: () => import("./views/usersList/UsersList.vue")
  },
  {
    path: "/signin",
    name: "signIn",
    component: () => import("./views/signin/SignIn.vue"),
    props: true
  },
  {
    path: "/create-user",
    name: "createUser",
    component: () => import("./views/createUser/CreateUser.vue"),
    props: true
  },
  {
    path: "/create-survey",
    name: "createSurvey",
    component: () => import("./views/createSurvey/CreateSurvey.vue"),
    props: true
  },
  {
    path: "/view-survey/:id",
    name: "viewSurvey",
    component: () => import("./views/viewSurvey/ViewSurvey.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-admin/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;