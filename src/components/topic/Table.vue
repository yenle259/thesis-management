<template>
  <div class="px-4 mb-8">
    <div variant="flat" class="py-6 px-4">
      <div class="flex justify-between">
        <div class="mb-4">
          <span class="font-bold text-2xl pb-4 text-indigo">
            {{ props.title }}
          </span>
          <span> </span>
          <p class="font-light text-sm text-black text-caption">
            Danh sách các đề tài đã báo cáo
          </p>
        </div>
        <slot name="action"></slot>
      </div>
      <slot name="filter">
      </slot>
      <v-card class="mb-3 bg-white rounded-b-lg overflow-hidden">
        <div>
          <v-table>
            <thead class="font-bold text-overline">
              <tr>
                <th class="text-left">Tên đề tài</th>
                <th class="text-left">Học phần</th>
                <v-tooltip text="(SV đã đăng ký/Tổng SV)" location="top">
                  <template v-slot:activator="{ props }">
                    <th class="text-center" v-bind="props">Số SV</th>
                  </template></v-tooltip
                >
                <th class="text-left">Học kì - Năm học</th>
                <th class="text-center">Giảng viên</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-sm"
                v-for="topic in props.topics"
                :key="topic.slug"
              >
                <td
                  class="max-w-xs hover:text-blue-800 cursor-pointer"
                  @click="openInfoModal(topic)"
                >
                  {{ topic.name }}
                </td>
                <td>
                  <v-chip
                    :color="getTopicModuleColor(topic.module.moduleId)"
                    size="small"
                  >
                    {{ topic.module.name }}
                  </v-chip>
                </td>
                <td class="text-center">
                  <span v-if="topic.student">
                    {{ topic.student.length + "/" + topic.numberOfStudent }}
                  </span>
                  <span v-else>{{ "0/" + topic.numberOfStudent }}</span>
                </td>
                <td>
                  <div v-if="topic.semester">
                    {{ getSchoolYearSemester(topic.semester, true) }}
                  </div>
                </td>
                <td>
                  <v-list-item
                    class="rounded-lg w-38"
                    @click="router.push('/lecturers/' + topic.pi.userId)"
                  >
                    <p class="text-grey-800 text-xs">
                      {{ topic.pi.name }}
                    </p>
                    <p class="text-caption text-xs text-grey">
                      {{ topic.pi.email }}
                    </p>
                  </v-list-item>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div v-if="props.topics.length === 0">
            <p class="my-3 italic text-center text-caption">Không có đề tài</p>
          </div>
          <div v-if="props.topics.length !== 0">
            <slot name="pagination"></slot>
          </div>
        </div>
      </v-card>
    </div>
    <TopicInfoModal
      v-model="model.info"
      :isShow="model.info"
      :topic="openTopic || {}"
      :isRegister="false"
      @cancel="model.info = false"
      @register="handleConfirmModal"
    />
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { ModuleDetails } from "@/apis/models/ModuleDetails";

const router = useRouter();

const props = defineProps<{
  topics: TopicDetails[];
  title: string;
  subTitle?: string;
  modules?: ModuleDetails[];
}>();

const model = reactive({
  piId: "",
  info: false,
  commonModuleType: "",
});

const isOpen = ref(false);

const selectedTopic = ref<TopicDetails>();

const openTopic = ref<TopicDetails>();

const openInfoModal = (topic: TopicDetails) => {
  model.info = true;
  openTopic.value = topic;
};

const handleConfirmModal = (topic: TopicDetails) => {
  isOpen.value = !isOpen.value;
  selectedTopic.value = topic;
};

</script>
