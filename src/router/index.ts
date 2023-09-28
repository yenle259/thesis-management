// Composables
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("@/layouts/default/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/login.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Trang chủ",
        component: () => import("@/views/login.vue"),
      },
      {
        path: "/signup",
        name: "Sign Up",
        component: () => import("@/views/signup.vue"),
      },
      {
        path: "/user",
        name: "User Profile",
        components: {
          default: () => import("@/views/user.vue"),
          Navbar: () => import("@/components/core/Navbar.vue"),
          Sidebar: () => import("@/components/core/Sidebar.vue"),
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/lecturers",
        name: "Danh sách giảng viên",
        components: {
          default: () => import("@/views/lecturers.vue"),
          Navbar: () => import("@/components/core/Navbar.vue"),
          Sidebar: () => import("@/components/core/Sidebar.vue"),
        },
      },
      {
        path: "/lecturers/:id",
        name: "Thông tin giảng viên",
        component: () => import("@/views/lecturers.[id].vue"),
      },
      {
        path: "/topic-list",
        name: "Danh sách đề tài",
        component: () => import("@/views/user.topic.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();
  const { user, token } = storeToRefs(auth);

  if (to.meta.requiresAuth && !user) {
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
  console.log(user.value);
});

export default router;
