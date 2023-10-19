<template>
  <div v-if="props.students">
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
          :key="student.userInfo._id"
        >
          <td class="uppercase">
            {{ student.userInfo.userId }}
          </td>
          <td>
            {{ student.userInfo.name }}
          </td>
          <td class="text-caption">
            {{ student.userInfo.email }}
          </td>
          <td v-if="getRegisterModule(student.registerModule)">
            <span
              v-for="(item, index) in getRegisterModule(student.registerModule)"
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
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { StudentDetails } from "@/apis/models/StudentDetails";

const props = defineProps<{ students: StudentDetails[] }>();
</script>
