import{ createRouter, createWebHashHistory } from "vue-router";

import Index from "@/pages/Index.vue";

const routes = [
  {
    path: "/",
    component: Index,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/xfzx",
    component: Index,
    meta: {
      title: "先锋在线",
    },
  },
  {
    path: "/xcgz",
    component: Index,
    meta: {
      title: "乡村共治",
    },
  },
  {
    path: "/msgx",
    component: Index,
    meta: {
      title: "民生共享",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta.title as string | "";
});

export default router;
