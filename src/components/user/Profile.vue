<template>
  <div>
    <v-card variant="flat" class="mx-auto px-2 py-6">
      <v-card-text>
        <div class="mx-auto">
          <div class="text-center">
            <v-avatar color="teal" size="50">
              <span class="text-h5">{{ user?.email.charAt(0).toLocaleUpperCase() }}</span>
            </v-avatar>
            <h3 class="pt-3 font-medium text-blue-700 text-lg">
              {{ user?.name }}
            </h3>
            <p class="text-caption mt-1 mb-3">
              {{ user?.email }}
            </p>
          </div>
          <!-- <v-btn rounded variant="outlined" size="small"> ĐĂNG XUẤT </v-btn> -->
          <v-divider class="my-3" thickness="2" color="info"></v-divider>

          <v-list nav>
            <v-list-item prepend-icon="mdi-account" href="/user"
              >THÔNG TIN CÁ NHÂN</v-list-item
            >
            <v-list-group value="Admin">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-supervisor-circle"
                  >ĐĂNG KÝ HƯỚNG DẪN</v-list-item
                >
              </template>

              <v-list-item
                v-for="([title, icon, href], i) in topics"
                :key="i"
                :title="title"
                :prepend-icon="icon"
                :value="title"
                :href="href"
              ></v-list-item>
            </v-list-group>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const topics = ref([
  ["DANH SÁCH GIẢNG VIÊN", "mdi-account-multiple-outline", "/lecturers"],
  ["DANH SÁCH ĐỀ TÀI", "mdi-cog-outline", "/topic-list"],
]);
</script>
