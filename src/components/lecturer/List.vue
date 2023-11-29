<template>
  <CustomCard
    :title="'Danh sách giảng viên'"
    :subTitle="'Danh sách giảng viên hướng dẫn HKI (2023 - 2024)'"
  >
    <template v-slot:action>
      <!-- <v-btn
        v-if="user?.role === UserRoleEnum.Student"
        color="info"
        variant="tonal"
        class="ma-2"
        @click="handleOpenRegisterModal"
      >
        Đăng ký đề tài
      </v-btn> -->
    </template>
    <template v-slot:content>
      <v-card class="rounded-lg">
        <v-table>
          <thead class="font-bold text-overline">
            <tr>
              <th class="text-left">MSCB</th>
              <th class="text-left">Họ tên</th>
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
            </tr>
          </thead>
          <tbody v-if="lecturers">
            <tr
              v-for="(lecturer, index) in lecturers"
              :key="index"
              class="hover:text-blue-800 cursor-pointer text-sm"
              @click="router.push('/lecturers/' + lecturer.userId)"
            >
              <td>{{ lecturer.userId }}</td>
              <td>
                {{ lecturer.name }}
              </td>
              <td>{{ lecturer.email }}</td>
              <td class="text-center">1</td>
              <td class="text-center">1</td>
              <td class="text-center">2</td>
            </tr>
          </tbody>
        </v-table>
        <div v-if="lecturers?.length === 0" class="text-center py-3">
          Không có dữ liệu
        </div>
      </v-card>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import { LecturerDetails } from "@/apis/models/LecturerDetails";

const router = useRouter();

defineProps<{
  lecturers: LecturerDetails[];
}>();

</script>
