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
        path: "/notfound",
        name: "Page Not Found",
        component: () => import("@/views/error.not.found.vue"),
      },
      {
        path: "/unauthorized",
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
        component: () => import("@/views/user.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/me/profile",
        name: "Profile",
        component: () => import("@/views/account.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/lecturers",
        name: "Danh sách giảng viên",
        component: () => import("@/views/lecturers.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/lecturers/:id",
        name: "Thông tin giảng viên",
        component: () => import("@/views/lecturers.[id].vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/topic/:slug",
        name: "Thông tin đề tài",
        component: () => import("@/views/topics.[id].vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/user/topic/:slug",
        name: "Đề tài đăng ký",
        component: () => import("@/views/student.topic.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/topic-list",
        name: "Danh sách đề tài",
        component: () => import("@/views/user.topic.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/topics",
        name: "Đề tài chung",
        component: () => import("@/views/topics.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/semester",
        name: "Quản lí danh mục",
        component: () => import("@/views/manage.category.vue"),
        meta: {
          requiresAuth: true,
          allowRoles: [UserRoleEnum.Admin],
        },
      },
      // admin route
      {
        path: "/manage/student",
        name: "Quản lí Sinh viên",
        component: () => import("@/views/manage.student.vue"),
        meta: {
          requiresAuth: true,
          allowRoles: [UserRoleEnum.Admin],
        },
      },
      {
        path: "/manage/topic",
        name: "Quản lí đề tài",
        component: () => import("@/views/manage.topic.vue"),
        meta: { requiresAuth: true, allowRoles: [UserRoleEnum.Admin] },
      },
      {
        path: "/manage/lecturer",
        name: "Quản lí Giảng viên",
        component: () => import("@/views/manage.lecturer.vue"),
        meta: { requiresAuth: true, allowRoles: [UserRoleEnum.Admin] },
      },
      {
        path: "/manage/account",
        name: "Đặt lại mật khẩu người dùng",
        component: () => import("@/views/manage.account.vue"),
        meta: { requiresAuth: true, allowRoles: [UserRoleEnum.Admin] },
      },
      //
      {
        path: "/my-topic",
        name: "Đề tài của tôi",
        component: () => import("@/views/my.topic.vue"),
        meta: {
          requiresAuth: true,
          allowRoles: [UserRoleEnum.Lecturer, UserRoleEnum.Admin],
        },
      },
    ],
  },
  {
    // path: "/:notfound",
    path: "/:pathMatch(.*)*",
    component: () => import("@/layouts/default/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "Page Not Found",
        component: () => import("@/views/error.not.found.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const { user } = storeToRefs(auth);

  const allowRoles = to.meta.allowRoles as UserRoleEnum[] | undefined;
  const hasCorrectRole =
    auth.user?.role && allowRoles?.includes(auth.user?.role);

  if (to.meta.requiresAuth && !user.value) {
    next("/unauthorized");
  } else {
    //allow entering if allowRoles is undefined or has correct role
    if (!allowRoles || hasCorrectRole) {
      next();
    } else {
      next("/unauthorized");
    }
  }
});
export default router;
