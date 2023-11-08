<template>
  <CustomCard
    :title="'Đề tài đăng ký'"
    :subTitle="'Học phần đã đăng ký ở Học kì I (Năm học 2023 - 2024)'"
  >
    <template v-slot:content>
      <div v-if="module" class="mb-5">
        <v-card class="bg-white rounded-lg c-shadow" width="700px">
          <v-table>
            <thead class="text-overline">
              <tr>
                <th>
                  Học phần đăng ký /
                  <span v-if="module.semester">{{
                    getSchoolYearSemester(module.semester, true)
                  }}</span>
                </th>
                <th class="text-right">Đề tài đăng ký tương ứng</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in getRegisterModule(module.moduleType)"
                :key="index"
              >
                <th>
                  <div v-if="item">
                    <v-chip
                      :color="getTopicTypeColor(item)"
                      class="text-overline"
                    >
                      {{ getTopicTypeName(item) }}
                    </v-chip>
                  </div>
                </th>
                <th class="text-caption text-right">Chưa có đề tài</th>
              </tr>
            </tbody>
          </v-table>
          <div
            v-if="!module || module.moduleType == ''"
            class="py-4 text-center font-italic text-caption"
          >
            Chưa đăng ký học phần
          </div>
        </v-card>
      </div>
      <div v-if="topics" class="grid grid-cols-3 pb-4">
        <div v-for="topic in topics" :key="topic.slug" class="me-4">
          <v-card
            max-width="400px"
            class="rounded-lg hover:shadow-lg"
            @click="router.push('/user/topic/' + topic.slug)"
          >
            <v-card-text>
              <div>
                <div class="flex flex-row justify-between">
                  <div>
                    <v-chip
                      size="small"
                      class="text-overline mb-1"
                      :color="getStatusColor(topic.student[0].status)"
                      >{{
                        getStatusLabel(topic.student[0].status)
                      }}</v-chip
                    >
                  </div>
                  <p class="text-caption">
                    {{ getSchoolYearSemester(topic.semester, true) }}
                  </p>
                </div>
                <div class="text-h6">{{ topic.name }}</div>
                <div class="text-caption mb-1">
                  <span class="font-bold">Giảng viên hướng dẫn: </span
                  >{{ topic.pi.name }}
                </div>
                <div class="text-caption mb-1">
                  <span class="font-bold">Phân loại đề tài: </span>
                  <v-chip
                    size="small"
                    class="mb-1"
                    :color="getTopicTypeColor(topic.type)"
                    >{{ getTopicTypeName(topic.type) }}</v-chip
                  >
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
      <hr />
    </template>
  </CustomCard>
  <CustomCard
    :title="'Đề tài báo cáo'"
    :subTitle="'Đề tài đăng ký đã được giảng viên hướng dẫn phê duyệt'"
  >
    <template v-slot:content>
      <div v-if="reports" class="grid grid-cols-3 pt-4">
        <div v-for="{ topic, pi } in reports" :key="topic.slug" class="me-4">
          <v-card
            max-width="400px"
            class="rounded-lg hover:shadow-lg"
            @click="router.push('/user/topic/' + topic.slug)"
          >
            <v-card-text>
              <div>
                <div class="flex flex-row justify-between">
                  <div>
                    <v-chip
                      size="small"
                      class="text-overline mb-1"
                      :color="getStatusColor(topic.student[0].status)"
                      >{{
                        getStatusLabel(topic.student[0].status)
                      }}</v-chip
                    >
                  </div>
                  <p class="text-caption" v-if="topic.semester">
                    {{ getSchoolYearSemester(topic.semester, true) }}
                  </p>
                </div>
                <div class="text-h6">{{ topic.name }}</div>
                <div class="text-caption mb-1">
                  <span class="font-bold">Giảng viên hướng dẫn: </span
                  >{{ pi.name }}
                </div>
                <div class="text-caption mb-1">
                  <span class="font-bold">Phân loại đề tài: </span>
                  <v-chip
                    size="small"
                    class="mb-1"
                    :color="getTopicTypeColor(topic.type)"
                    >{{ getTopicTypeName(topic.type) }}</v-chip
                  >
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
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { RegisterModule } from "@/apis/models/RegisterModule";
import { ReportTopic } from "@/apis/models/ReportTopic";

import { getStatusLabel } from "@/utils/getStatusName";

const { user } = storeToRefs(useAuthStore());

const router = useRouter();

const props = defineProps<{
  topics: TopicDetails[];
  module: RegisterModule;
  reports: ReportTopic[];
}>();

watch(
  () => props.reports,
  () => {
    console.log(props.reports);
  }
);
</script>
