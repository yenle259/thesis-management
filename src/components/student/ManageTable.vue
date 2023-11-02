<template>
  <v-card v-if="props.students" class="rounded-lg">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">MSSV</th>
          <th class="text-left">Sinh viên</th>
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
            <v-list-item class="rounded-lg w-38">
              <p class="text-grey-800 text-xs">
                {{ student.name }}
              </p>
              <p class="text-caption text-xs text-grey">
                {{ student.email }}
              </p>
            </v-list-item>
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
