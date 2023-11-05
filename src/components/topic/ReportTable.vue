<template>
  <div>
    <div class="py-2">
      <div class="flex justify-between gap-x-2">
        <slot name="tab"></slot>
        <div></div>
        <!-- <div class="d-flex gap-x-2">
          <div class="flex flex-row content-center p-2">
            <p class="text-overline">Lọc đề tài</p>
          </div>
          <div class="w-52">
            <v-select
              v-model="model.topicType"
              :items="topicTypeOptions"
              clearable
              chips
              label="Phân loại đề tài"
              variant="outlined"
              density="compact"
              class="rounded-lg"
            ></v-select>
          </div>
          <div class="w-60">
            <v-autocomplete
              v-model="model.filterSemester"
              :items="sysOptions"
              variant="outlined"
              density="compact"
              label="HK - Năm học"
              clearable
              chips
            ></v-autocomplete>
          </div>
        </div> -->
      </div>
      <v-divider> </v-divider>
      <v-card class="overflow-hidden rounded-lg">
        <v-table>
          <thead class="font-bold text-overline">
            <tr>
              <th class="text-left" width="400px">Tên đề tài</th>
              <th class="text-left">
                <v-btn
                  id="type-menu"
                  size="small"
                  variant="text"
                  append-icon="mdi-menu-down"
                  >Phân loại</v-btn
                >
              </th>
              <th class="text-center">SV thực hiện</th>
              <th class="text-left">Thực hiện</th>
            </tr>
          </thead>
          <tbody v-if="topics">
            <tr
              class="text-sm"
              v-for="({ topic, pi, student }, index) in topics"
              :key="index"
            >
              <td
                width="400px"
                @click="router.push('/user/topic/' + topic.slug)"
                class="hover:text-blue-800 cursor-pointer"
              >
                {{ topic.name }}
              </td>
              <td>
                <v-chip :color="getTopicTypeColor(topic.type)" size="small">
                  {{ getTopicTypeName(topic.type) }}
                </v-chip>
              </td>
              <td class="text-center truncate" width="160px">
                <v-chip size="small">{{ student.name }}</v-chip>
              </td>
              <td class="text-center" v-if="user?._id === pi._id">
                <v-row>
                  <TopicDisplayStatusButton
                    :is-display="topic.isDisplay"
                    :topic-id="topic._id"
                    @updated="handleUpdated"
                  />
                  <div>
                    <v-tooltip text="Chỉnh sửa thông tin đề tài" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          size="small"
                          variant="text"
                          icon="mdi-pencil"
                          color="indigo"
                          @click="handleOpenEditForm(topic)"
                        ></v-btn>
                      </template>
                    </v-tooltip>
                  </div>
                  <div>
                    <v-tooltip text="Xóa đề tài" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          :disabled="topic.student.length !== 0"
                          v-bind="props"
                          size="small"
                          variant="text"
                          icon="mdi-delete-outline"
                          color="red-accent-1"
                          @click="handleOpenConfirmModal(topic)"
                        ></v-btn>
                      </template>
                    </v-tooltip>
                  </div>
                </v-row>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div v-if="topics.length == 0">
          <p class="py-3 italic text-center">Không có đề tài</p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { useAuthStore } from "@/stores/useAuthStore";
import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import { ReportTopic } from "@/apis/models/ReportTopic";

const router = useRouter();

const { user } = storeToRefs(useAuthStore());

const emit = defineEmits(["updatedStatus", "open", "delete"]);

const props = defineProps<{ topics: ReportTopic[] }>();

const model = reactive({
  //recent semester
  filterSemester: "6526d24c7547ab02d497a7a4",
  topicType: "",
  tab: "",
});

const semesters = ref<SchoolYearSemester[]>();

// get data for semester options
const getData = async () => {
  try {
    const { data: response } = await API.get(`/sys`);
    semesters.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getData();

const topicTypeOptions = computed(() => {
  return Object.values(TopicTypeEnum).map((item) => ({
    title: getTopicTypeName(item),
    value: item,
  }));
});

const sysOptions = computed(() => {
  return semesters.value?.map((item: any) => ({
    title: getSchoolYearSemester(item, true),
    value: item._id,
  }));
});

// const filterTopics = computed(() => {
//   if (model.filterSemester && model.topicType) {
//     return props.topics.filter(
//       (topic) =>
//         topic.semester._id === model.filterSemester &&
//         topic.type === model.topicType
//     );
//   } else if (model.filterSemester) {
//     return props.topics.filter(
//       (topic) => topic.semester._id === model.filterSemester
//     );
//   } else if (model.topicType) {
//     return props.topics.filter((topic) => topic.type === model.topicType);
//   }
//   return props.topics;
// });

watch(
  () => model.topicType,
  (value) => {
    console.log(value);
  }
);

const disabledDeleted = (topic: TopicDetails) => {
  topic.student.map(({ status }) => console.log(status));
  return false;
};

const handleUpdated = () => {
  emit("updatedStatus");
};

const handleOpenEditForm = (selectedTopic: TopicDetails) => {
  emit("open", selectedTopic);
};

const handleOpenConfirmModal = (selectedTopic: TopicDetails) => {
  emit("delete", selectedTopic);
};
</script>