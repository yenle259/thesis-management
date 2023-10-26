<template>
  <CustomCard
    :title="'Đề tài đăng ký'"
    :subTitle="'Học phần đã đăng ký ở Học kì hiện tại'"
  >
    <template v-slot:content>
      <div v-if="props.topics" class="grid grid-cols-3">
        <div v-for="topic in props.topics" :key="topic.slug" class="me-4">
          <v-card
            max-width="400px"
            class="rounded-lg hover:shadow-lg"
            @click="router.push('/user/topic/' + topic.slug)"
          >
            <v-card-text>
              <div>
                <div class="flex flex-row justify-between">
                  <v-chip
                    size="small"
                    class="text-overline mb-1"
                    :color="getTopicTypeColor(topic.type)"
                    >{{ getTopicTypeName(topic.type) }}</v-chip
                  >
                  <p class="text-caption">
                    {{ getSchoolYearSemester(topic.semester, true) }}
                  </p>
                </div>
                <div class="text-h6">{{ topic.name }}</div>
                <div class="text-caption mb-1">
                  <span class="font-bold">Giảng viên hướng dẫn: </span
                  >{{ topic.pi.name }}
                </div>
                <div
                  class="text-caption max-h-24 truncate"
                  v-if="topic.description"
                >
                  <span class="font-bold">Mô tả đề tài: </span>
                  {{ topic.description }}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <div v-else class="text-center">Chưa đăng ký đề tài</div>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";

const props = defineProps<{ topics: TopicDetails[] }>();
const router = useRouter();
</script>
