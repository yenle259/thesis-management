<template>
  <CustomCard
    :title="'Đề tài đăng ký'"
    :subTitle="'Học phần đã đăng ký ở Học kì I (Năm học 2023 - 2024)'"
  >
    <template v-slot:content>
      <div v-if="module" class="mb-5">
        <v-card class="bg-white rounded-lg c-shadow" max-width="700px">
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
            <tbody v-if="module.moduleType">
              <tr
                v-for="(moduleId, index) in module.moduleType.split('-')"
                :key="index"
              >
                <th>
                  <div v-if="moduleId">
                    <v-chip
                      :color="getTopicModuleColor(moduleId)"
                      class="text-overline"
                    >
                      {{ getModuleName(moduleId) }}
                    </v-chip>
                  </div>
                </th>
                <!-- <th class="text-caption text-right">Chưa có đề tài</th> -->
                <th>
                  <v-list-item
                    v-if="topicRegistered(moduleId)"
                    class="text-right my-2 rounded-lg"
                    @click="
                      router.push(
                        '/user/topic/' + topicRegistered(moduleId)?.slug
                      )
                    "
                  >
                    <div class="text-button text-right">
                      {{ topicRegistered(moduleId)?.name }}
                    </div>
                    <div class="text-caption mb-1">
                      <span class="font-bold">Giảng viên hướng dẫn: </span
                      >{{ topicRegistered(moduleId)?.pi.name }}
                    </div>
                  </v-list-item>
                  <div v-else class="text-caption text-right">
                    Chưa đăng ký đề tài
                  </div>
                </th>
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

      <div v-else class="text-center">Chưa đăng ký đề tài</div>
      <hr />
    </template>
  </CustomCard>
  <CustomCard
    v-if="reports.length !== 0"
    :title="'Đề tài báo cáo'"
    :subTitle="'Đề tài đăng ký đã được giảng viên hướng dẫn phê duyệt'"
  >
    <template v-slot:content>
      <div v-if="reports" class="grid grid-cols-1 gap-y-2 lg:grid-cols-3 pt-4">
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
                      >{{ getStatusLabel(topic.student[0].status) }}</v-chip
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
                    :color="getTopicModuleColor(topic.module.moduleId)"
                  >
                    {{
                      topic.module.moduleId + " | " + topic.module.name
                    }}</v-chip
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
import { ModuleDetails } from "@/apis/models/ModuleDetails";

const { user } = storeToRefs(useAuthStore());

const router = useRouter();

const props = defineProps<{
  topics: TopicDetails[];
  module: RegisterModule;
  reports: ReportTopic[];
  modules: ModuleDetails[];
}>();

watch(
  () => props.reports,
  () => {
    console.log(props.reports);
  }
);

const topicRegistered = (moduleId: string) => {
  return props.topics.find(({ module }) => module.moduleId === moduleId);
};

const getModuleName = (moduleId: string) => {
  const module = props.modules.find((module) => module.moduleId === moduleId);
  return module?.moduleId + " | " + module?.name;
};
</script>
