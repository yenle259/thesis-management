<template>
  <div class="px-6 pb-8">
    <v-card variant="flat" class="py-6 px-8">
      <p class="font-bold text-2xl pb-2 text-blue-700">DANH SÁCH GIẢNG VIÊN</p>
      <p class="pb-4">Danh sách giảng viên hướng dẫn HKI (2022 - 2023)</p>
      <v-divider horizontal></v-divider>
      <div class="py-3">
        <v-table :hover="true">
          <thead>
            <tr>
              <th class="text-left">Họ tên</th>
              <th class="text-left">MSCB</th>
              <th class="text-left">SĐT</th>
              <th class="text-left">Email</th>
              <th class="text-left">NLCS</th>
              <th class="text-left">NL</th>
              <th class="text-left">Tiểu luận</th>
              <th class="text-left">Luận văn</th>
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
                <a :href="'/lecturers/' + lecturer.userId">
                  {{ lecturer.name }}
                </a>
              </td>
              <td>{{ lecturer.userId }}</td>
              <td>0706758958</td>
              <td>{{ lecturer.email }}</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { UserDetails } from "@/apis/models/UserDetails";
import axios from "axios";
import { BASE_API } from "@/constant";
import { ref } from "vue";

// const headers = ref([
//   { title: "Họ và Tên", key: "name" },
//   { title: "Mã số CB", key: "mscb" },
//   { title: "Số điện thoại", key: "phone" },
//   { title: "Email", key: "email " },
//   { title: "Niên luận cơ sở (CT270)", key: "NLCS" },
//   { title: "Niên luận - THUD (TN408)", key: "NL" },
//   { title: "Tiểu luận tốt nghiệp (TN396)", key: "TL" },
//   { title: "Luận văn tốt nghiệp (TN418)", key: "LV" },
// ]);

const lecturers = ref<UserDetails[]>();

const slug = ref<String[]>();

// slug.value = lecturers.value.map((item) => item.email.split("@")[0]);

axios({
  url: BASE_API + `/user/lecturers`,
  withCredentials: true,
})
  .then(function (res) {
    console.log(res.data);
    lecturers.value = res.data;
  })
  .catch(function (error) {
    console.log(error);
  });
</script>
