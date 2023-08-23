<template>
  <div class="bg-blue-800 p-12">
    <v-col class="grid gap-8">
      <v-row class="px-4">
        <p
          class="me-6 text-white"
          v-for="item in linkedList"
          :key="item.id"
        >
          {{ item.name }}
        </p>
      </v-row>
      <hr class="bg-white-500" />
      <v-row>
        <v-col class="grid gap-y-2">
          <v-avatar>
            <v-img src="../../public/shop.png" alt="Logo"></v-img>
          </v-avatar>
          <p class="font-sans text-xl italic font-bold text-white">
            Trường Công nghệ Thông tin & Truyền thông - Trường Đại học Cần Thơ
          </p>
          <p class="text-blue-50 font-light">
            Khu 2, đường 3/2, Phường Xuân Khánh, <br />Quận Ninh Kiều, Thành phố
            Cần Thơ, Việt Nam
          </p>
        </v-col>
        <div class="flex items-center">
          <div class="flex flex-row justify-center">
            <v-row>
              <v-col>
                <p
                  v-for="item in firstList"
                  :key="item.id"
                  class="w-24 py-2 text-white font-light"
                >
                  {{ item.name }}
                </p>
              </v-col>
              <v-col>
                <p
                  v-for="item in firstList"
                  :key="item.id"
                  class="w-64 py-2 text-white font-light"
                >
                  {{ item.content }}
                </p>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-row>
      <hr class="bg-white-500" />
      <v-row class="px-2 text-white">
        <p class="flex flex-grow">2023 Shoppin Inc.</p>
        <p class="font-light pr-8">Privacy Policy</p>
        <p class="font-light">Cookies</p>
      </v-row>
    </v-col>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const firstList = ref();
const linkedList = ref();

firstList.value = [
  {
    name: "Điện thoại",
    id: 1,
    content: "84 0292 3 734713 - 0292 3 831301",
  },
  {
    name: "Fax",
    id: 2,
    content: "84 0292 3830841",
  },
  {
    name: "Email",
    id: 3,
    content: "office@cit.ctu.edu.vn",
  },
];

linkedList.value = [
  {
    name: "Sinh Viên",
    id: 1,
  },
  {
    name: "Viên Chức",
    id: 2,
  },
  {
    name: "Đào tạo chứng chỉ",
    id: 3,
  },
  {
    name: "AUN",
    id: 3,
  },
  {
    name: "ISDS 2023",
    id: 3,
  },
];

</script>
