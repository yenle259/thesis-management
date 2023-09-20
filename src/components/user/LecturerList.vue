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
              <th class="text-left">Name</th>
              <th class="text-left">MSCB</th>
              <th class="text-left">Phone</th>
              <th class="text-left">Email</th>
              <th class="text-left">NLCS</th>
              <th class="text-left">NL</th>
              <th class="text-left">Tiểu luận</th>
              <th class="text-left">Luận văn</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-sm"
              v-for="lecturer in lecturers"
              :key="lecturer.mscb"
            >
              <td>
                <a :href="'/lecturers/' + lecturer.email.split('@')[0]">
                  {{ lecturer.name }}
                </a>
              </td>
              <td>{{ lecturer.mscb }}</td>
              <td>{{ lecturer.phone }}</td>
              <td>{{ lecturer.email }}</td>
              <td>{{ lecturer.nlcs }}</td>
              <td>{{ lecturer.nl }}</td>
              <td>{{ lecturer.tl }}</td>
              <td>{{ lecturer.lv }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
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
const headers = ref([
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories" },
  { title: "Fat (g)", key: "fat" },
  { title: "Carbs (g)", key: "carbs" },
  { title: "Protein (g)", key: "protein" },
  { title: "Iron (%)", key: "iron" },
]);
const lecturers = ref([
  {
    name: "Vũ Duy Linh",
    mscb: "1042",
    phone: "0907856907",
    email: "vdlinh@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Nguyễn Nhị Gia Vinh",
    mscb: "1044",
    phone: "0918494491",
    email: "nngvinh@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Nguyễn Hữu Hòa",
    mscb: "1048",
    phone: "0844639999",
    email: "nhhoa@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Nguyễn Đức Khoa",
    mscb: "1112",
    phone: "0918371183",
    email: "duckhoa@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Hoàng Minh Trí",
    mscb: "1169",
    phone: "0939365999",
    email: "hmtri@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Nguyễn Thị Thùy Linh",
    mscb: "1170",
    phone: "0918351623",
    email: "nttlinh@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Lê Thị Diễm",
    mscb: "1322",
    phone: "0989224286",
    email: "ltdiem@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Trần Hoàng Việt",
    mscb: "1455",
    phone: "0939000097",
    email: "thviet@ctu.edu.vn,",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Huỳnh Phụng Toàn",
    mscb: "1602",
    phone: "0918515718",
    email: "hptoan@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Hồ Văn Tú",
    mscb: "1603",
    phone: "0908461046",
    email: "hvtu@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Lê Minh Lý",
    mscb: "2301",
    phone: "0939304700",
    email: "leminhly@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Võ Hải Đăng",
    mscb: "2302",
    phone: "0939109119",
    email: "vhdang@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Đặng Mỹ Hạnh",
    mscb: "2395",
    phone: "0949748479",
    email: "dmhanh@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Phạm Trương Hồng Ngân",
    mscb: "2454",
    phone: "0384307629",
    email: "pthngan@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
  {
    name: "Lê Văn Quan",
    mscb: "2455",
    phone: "0983969444",
    email: "lvquan@ctu.edu.vn",
    nlcs: "1",
    nl: "3",
    tl: "1",
    lv: "2",
  },
]);

const slug = ref<String[]>();
slug.value = lecturers.value.map((item) => item.email.split("@")[0]);
console.log(slug.value);
</script>
