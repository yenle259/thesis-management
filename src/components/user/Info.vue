<template>
  <div class="px-6 pb-8">
    <v-card variant="flat" class="py-6 px-8">
      <p class="font-bold text-2xl pb-4 text-blue-700">
        THÔNG TIN CÁ NHÂN
      </p>
      <div class="py-3" v-for="item in newsList" :key="item" href="#">
        <a class="hover:text-blue-700" href="#">{{ item }}</a>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const newsList = ref([
  "1. Thông báo mở lại website kế hoạch học tập",
  "3. Thông báo xóa lớp học phần HK1, năm học 2023-2024 (Đợt 1)",
  "2. Thông báo xóa lớp học phần HK1, năm học 2023-2024 (Đợt 2)",
  "4. Thông báo kế hoạch giảng dạy và đăng ký học phần HK1, 2023-2024",
  "5. Thông báo đưa, đón SV K48 học thực hành GDQP đợt 2 (đợt cuối) học kỳ 3, năm học 2022-2023",
  "6. Thông báo xóa lớp học phần HK3, năm học 2022-2023 (Đợt 1)",
  "7. Thông báo đưa, đón SV K48 học thực hành GDQP đợt 1 học kỳ 3, năm học 2022-2023",
  "8. Thông báo lịch học GDQP&AN khóa 48 học kỳ 3, năm học 2022-2023",
  "9. Thông báo lịch học GDQP&AN khóa 48 học kỳ 3, năm học 2022-2023",
  "10. Thông báo kế hoạch giảng dạy và đăng ký học phần HK3, 2022-2023",
  "11. Thông báo đưa, đón SV K48 học thực hành GDQP đợt 5 (đợt cuối) học kỳ 2, năm học 2022-2023.",
  "12. Thông báo đưa, đón SV K48 học thực hành GDQP đợt 4 học kỳ 2, năm học 2022-2023.",
]);
</script>
