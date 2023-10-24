<template>
  <v-card v-if="props.students" class="rounded-lg">
    <v-table :hover="true">
      <thead>
        <tr>
          <th class="text-left">MSSV</th>
          <th class="text-left">Tên sinh viên</th>
          <th class="text-left">Email</th>
          <th class="text-left">Học phần đăng kí</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-sm"
          v-for="student in props.students"
          :key="student._id"
        >
          <td class="uppercase">
            {{ student.userId }}
          </td>
          <td>
            {{ student.name }}
          </td>
          <td class="text-caption">
            {{ student.email }}
          </td>
          <td v-if="student.registerModule[0].moduleType">
            <span
              v-for="(item, index) in getRegisterModule(
                student.registerModule[0].moduleType
              )"
              :key="index"
            >
              <v-chip
                class="me-1"
                v-if="item"
                size="small"
                :color="getTopicTypeColor(item)"
              >
                {{ getTopicTypeName(item) }}
              </v-chip>
            </span>
          </td>
          <td v-else>
            <span class="font-italic">Không có môn học đăng ký</span>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { StudentDetails } from "@/apis/models/StudentDetails";

const props = defineProps<{ students: StudentDetails[] }>();
</script>
