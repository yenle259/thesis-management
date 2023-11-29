<template>
  <div>
    <div class="py-2">
      <div class="flex justify-between gap-x-2"></div>
      <v-divider> </v-divider>
      <v-card class="overflow-hidden rounded-lg">
        <v-table>
          <thead class="font-bold text-overline">
            <tr>
              <th class="text-left">Đề tài</th>
              <th class="text-left">Trạng thái báo cáo</th>
              <th class="text-left">Thực hiện</th>
            </tr>
          </thead>
          <tbody v-if="topics">
            <tr
              v-for="({ topic, pi, student, reportStatus }, index) in topics"
              :key="index"
            >
              <td width="550px">
                <v-list-item
                  class="text-left py-1 my-2 rounded-lg"
                  @click="router.push('/user/topic/' + topic.slug)"
                >
                  <p>
                    <v-chip
                      size="small"
                      label
                      :color="getTopicModuleColor(topic.module.moduleId)"
                    >
                      {{ topic.module.name }}
                    </v-chip>
                  </p>
                  <p class="font-weight-medium text-body-1">
                    {{ topic.name }}
                  </p>
                  <div
                    class="d-flex flex-row gap-x-1 text-blue-grey-lighten-1 text-sm"
                  >
                    <span class="text-subtitle-2">Sinh viên </span>
                    <v-divider vertical thickness="3"></v-divider>
                    <div>
                      <p class="text-grey-800 text-sm">
                        {{ student.name }}
                      </p>
                      <!-- <p class="text-caption text-sm text-grey">
                        {{ student.email }}
                      </p> -->
                    </div>
                  </div>
                  <div class="text-grey text-sm"></div>
                </v-list-item>
              </td>
              <td>
                <span v-if="reportStatus">
                  <v-btn
                    :id="`review-menu`"
                    variant="tonal"
                    size="small"
                    label
                    class="mb-1"
                    :color="
                      getRegisterReportColor(reportStatus.studentRegister)
                    "
                  >
                    {{ getRegisterReportName(reportStatus.studentRegister) }}
                  </v-btn>
                  <v-menu activator="#review-menu" density="compact">
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in [
                          'Phê duyệt',
                          'Không phê duyệt',
                        ]"
                        :key="index"
                        :value="index"
                      >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </span>
              </td>
              <td class="text-center" v-if="user?._id === pi._id">
                <v-row>
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

const props = defineProps<{
  topics: ReportTopic[];
}>();

const model = reactive({
  //recent semester
  filterSemester: "6526d24c7547ab02d497a7a4",
  topicType: "",
  tab: "",
  toggle: "",
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
