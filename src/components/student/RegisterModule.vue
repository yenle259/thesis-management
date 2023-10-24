<template>
  <CustomCard
    :title="'Học phần đăng ký'"
    :subTitle="'Học phần đã đăng ký ở Học kì hiện tại'"
  >
    <template v-slot:content>
      <div v-if="recentModule" class="grid grid-cols-3">
        <div
          v-for="(item, index) in getRegisterModule(recentModule.moduleType)"
          :key="index"
        >
          <v-card width="320px" class="bg-white rounded-lg c-shadow">
            <v-card-item>
              <div>
                <p class="text-overline">#{{ index + 1 }}</p>
                <div class="flex flex-row">
                  <span class="font-bold">Học phần đăng ký:</span>
                  <v-chip
                    class="text-overline mx-1"
                    v-if="item"
                    size="small"
                    :color="getTopicTypeColor(item)"
                  >
                    {{ getTopicTypeName(item) }}
                  </v-chip>
                </div>
              </div>
            </v-card-item>
            <v-card-actions>
              <v-btn
                appendIcon="mdi-arrow-right"
                variant="tonal"
                color="blue"
                href="/topic-list"
                >Xem đề tài
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
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
