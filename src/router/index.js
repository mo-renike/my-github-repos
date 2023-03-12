import { createRouter, createWebHashHistory } from "vue-router";
import RepoList from "../views/RepoList.vue";
import RepoDetails from "../views/SingleRepo.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  { path: "/", redirect: "/repos" },
  { path: "/repos", component: RepoList },
  { path: "/repos/:id", component: RepoDetails },
  { path: "/404", component: NotFound },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, 
});



export default router;


