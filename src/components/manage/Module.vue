<template>
  <v-card v-if="modules" class="rounded-lg">
    <v-table>
      <thead class="font-bold text-overline">
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Mã số học phần</th>
          <th class="text-left">Tên học phần</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-sm"
          v-for="({ moduleId, name }, index) in modules"
          :key="index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <v-chip :color="getTopicModuleColor(moduleId)" size="small">
              {{ moduleId }}
            </v-chip>
          </td>
          <td>
            {{ name }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="modules.length === 0" class="text-body-2 text-center my-4">
      Không có học phần
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ModuleDetails } from "@/apis/models/ModuleDetails";

defineProps<{ modules: ModuleDetails[] }>();
</script>
