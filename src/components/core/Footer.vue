<template>
  <div class="px-12 py-6 bg-blue-500 font-bevn">
    <div class="grid grid-cols-5 gap-6 border-y-2 py-2">
      <div class="col-span-3">
        <v-col class="grid gap-y-2">
          <v-avatar>
            <v-img src="@img/cit.png" alt="Logo"></v-img>
          </v-avatar>
          <p class="font-sans text-xl italic font-bold text-white">
            Trường Công nghệ Thông tin & Truyền thông - Trường Đại học Cần Thơ
          </p>
          <p class="text-blue-50 font-light">
            Khu 2, đường 3/2, Phường Xuân Khánh, <br />Quận Ninh Kiều, Thành phố
            Cần Thơ, Việt Nam
          </p>
        </v-col>
      </div>
      <div class="col-span-2 pt-4">
        <div
          class="py-2 grid grid-cols-3 text-white font-light"
          v-for="item in firstList"
          :key="item.id"
        >
          <div class="font-bold">{{ item.name }}</div>
          <div class="col-span-2">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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

<style scoped>
.font-bevn {
  font-family: "Be Vietnam Pro", sans-serif;
}
</style>
