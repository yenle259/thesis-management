// Composables
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
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
    path: "/error",
    component: () => import("@/layouts/default/LoginLayout.vue"),
    children: [
      {
        path: "/unauthorized",
        name: "Unauthorized",
        component: () => import("@/views/error.vue"),
      },
      {
        path: "/404",
        name: "Page Not Found",
        component: () => import("@/views/error.not.found.vue"),
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
        path: "/user/topics/:slug",
        name: "Đề tài của bạn",
        components: {
          default: () => import("@/views/student.topic.vue"),
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
      {
        path: "/semester",
        name: "Quản lí học kì niên khóa",
        component: () => import("@/views/manage.semester.vue"),
        meta: { requiresAuth: true, allowRoles: [UserRoleEnum.Admin, UserRoleEnum.Lecturer] },
      },
      {
        path: "/manage/student",
        name: "Quản lí Sinh viên",
        component: () => import("@/views/manage.student.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/manage/lecturer",
        name: "Quản lí Giảng viên",
        component: () => import("@/views/manage.lecturer.vue"),
        meta: { requiresAuth: true, allowRoles: [UserRoleEnum.Admin] },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to) => {
//   const auth = useAuthStore();
//   const { user } = storeToRefs(auth);

//   if (to.meta.requiresAuth && !user.value) {
//     return {
//       path: "/unauthorized",
//       // save the location we were at to come back later
//       query: { redirect: to.fullPath },
//     };
//   }
// });

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const allowRoles = to.meta.allowRoles as UserRoleEnum[] | undefined;
  const hasCorrectRole =
    auth.user?.role && allowRoles?.includes(auth.user?.role);

  if (!allowRoles || hasCorrectRole) {
    next();
  } else {
    // auth.$reset();
    next("/unauthorized");
  }
});
export default router;
