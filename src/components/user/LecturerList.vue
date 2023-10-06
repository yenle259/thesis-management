<template>
  <div class="px-6 pb-8">
    <v-card variant="flat" class="py-6 px-8">
      <div class="flex justify-between">
        <div>
          <p class="font-bold text-2xl pb-2 text-blue-700">
            DANH SÁCH GIẢNG VIÊN
          </p>
          <p class="pb-2">Danh sách giảng viên hướng dẫn HKI (2022 - 2023)</p>
        </div>
        <div>
          <v-btn
            v-if="user?.role === UserRoleEnum.Student"
            color="info"
            variant="tonal"
            class="ma-2"
            @click="handleOpenRegisterModal"
          >
            Đăng ký đề tài
          </v-btn>
        </div>
      </div>
      <v-divider horizontal></v-divider>
      <div class="py-2">
        <v-table :hover="true">
          <thead>
            <tr>
              <th class="text-left">Họ tên</th>
              <th class="text-left">MSCB</th>
              <th class="text-left">SĐT</th>
              <th class="text-left">Email</th>
              <th class="text-center">
                NLCS
                <v-tooltip activator="parent" location="top"
                  >Niên luận cơ sở
                </v-tooltip>
              </th>
              <th class="text-center">
                NL<v-tooltip activator="parent" location="top"
                  >Niên luận
                </v-tooltip>
              </th>
              <th class="text-center">
                Luận văn
                <v-tooltip activator="parent" location="top"
                  >Luận văn
                </v-tooltip>
              </th>
              <th class="text-left" v-if="user?.role === UserRoleEnum.Student">
                Thực hiện
              </th>
            </tr>
          </thead>
          <hr />
          <tbody>
            <tr
              class="text-sm"
              v-for="lecturer in lecturers"
              :key="lecturer.userId"
            >
              <td>
                <a
                  class="hover:text-blue-800"
                  :href="'/lecturers/' + lecturer.userId"
                >
                  {{ lecturer.name }}
                </a>
              </td>
              <td>{{ lecturer.userId }}</td>
              <td>0706758958</td>
              <td>{{ lecturer.email }}</td>
              <td class="text-center">1</td>
              <td class="text-center">1</td>
              <td class="text-center">2</td>
              <td v-if="user?.role === UserRoleEnum.Student">
                <v-btn
                  color="info"
                  variant="tonal"
                  class="ma-2"
                  size="small"
                  @click="handleOpenRegisterModal(lecturer)"
                >
                  Đăng ký
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
    <RegisterModal
      :isShow="isOpen"
      :lecturer="lecturerSelected ?? {}"
      :lecturers="lecturers ?? []"
      @cancel="isOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { UserDetails } from "@/apis/models/UserDetails";
import axios from "axios";
import { BASE_API } from "@/constant";
import { ref } from "vue";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";

const { user } = storeToRefs(useAuthStore());

const lecturers = ref<UserDetails[]>();

const lecturerSelected = ref<UserDetails>();

const slug = ref<String[]>();

const isOpen = ref<boolean>(false);

axios({
  url: BASE_API + `/user/lecturers`,
  withCredentials: true,
})
  .then(function (res) {
    lecturers.value = res.data;
  })
  .catch(function (error) {
    console.log(error);
  });

const handleOpenRegisterModal = (lecturer?: UserDetails) => {
  lecturerSelected.value = lecturer;
  isOpen.value = true;
};
</script>
