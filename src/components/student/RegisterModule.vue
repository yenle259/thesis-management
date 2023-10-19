<template>
  <CustomCard
    :title="'Học phần đăng ký'"
    :subTitle="'Học phần đã đăng ký ở Học kì hiện tại'"
  >
    <template v-slot:content>
      <div v-if="registerModule" class="grid grid-cols-3">
        <p>{{ registerModule }}</p>
        <div
          v-for="(item, index) in getRegisterModule(registerModule)"
          :key="index"
        >
          <v-card width="320px" class="rounded-lg">
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
</script>
