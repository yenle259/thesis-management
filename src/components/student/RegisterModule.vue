<template>
  <CustomCard
    :title="'Đề tài đăng ký'"
    :subTitle="'Học phần đã đăng ký ở Học kì I (Năm học 2023 - 2024)'"
  >
    <template v-slot:content>
      <div v-if="recentModule" width="700px">
        <v-card class="bg-white rounded-lg c-shadow" width="800px">
          <v-table>
            <thead class="text-overline">
              <tr>
                <th>Học phần đăng ký</th>
                <th class="text-right">Đề tài đăng ký</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in getRegisterModule(
                  recentModule.moduleType
                )"
                :key="index"
              >
                <th>
                  <div v-if="item">
                    <v-chip :color="getTopicTypeColor(item)" size="small">
                      {{ getTopicTypeName(item) }} {{ item }}
                    </v-chip>
                  </div>
                </th>
                <th>Chưa có đề tài</th>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </div>
      <div v-else class="text-center">
        Không có học phần đăng kí ở học kì này
      </div>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
const { registerModule } = storeToRefs(useStudentStore());

const { user } = storeToRefs(useAuthStore());

const recentSemesterId = "6526d24c7547ab02d497a7a4";

const recentModule = computed(() => {
  return registerModule.value?.find(
    (item) => item.semester._id === recentSemesterId
  );
});
</script>
