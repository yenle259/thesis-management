// Composables
import { useAuthStore } from "@/stores/useAuthStore";
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
    path: "/unauthorized",
    component: () => import("@/layouts/default/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "Unauthorized",
        component: () => import("@/views/error.vue"),
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
        component: () => import("@/views/home.vue"),
      },
      {
        path: "/signup",
        name: "Sign Up",
        component: () => import("@/views/signup.vue"),
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
      },
      {
        path: "/lecturers/:id",
        name: "Thông tin giảng viên",
        components: {
          default: () => import("@/views/lecturers.[id].vue"),
          Navbar: () => import("@/components/core/Navbar.vue"),
          Sidebar: () => import("@/components/core/Sidebar.vue"),
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/topics/:slug",
        name: "Thông tin đề tài",
        components: {
          default: () => import("@/views/topics.[id].vue"),
          Navbar: () => import("@/components/core/Navbar.vue"),
          Sidebar: () => import("@/components/core/Sidebar.vue"),
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/topic-list",
        name: "Danh sách đề tài",
        component: () => import("@/views/user.topic.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  const { user } = storeToRefs(auth);

  if (to.meta.requiresAuth && !user.value) {
    return {
      path: "/unauthorized",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
