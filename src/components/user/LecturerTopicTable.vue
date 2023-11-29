<template>
  <div>
    <div class="py-2">
      <div class="flex justify-between gap-x-2">
        <slot name="tab"></slot>
        <div></div>
        <div>
          <slot name="filter"></slot>
        </div>
      </div>
      <v-divider> </v-divider>
      <v-card class="overflow-hidden rounded-lg mx-1">
        <v-table>
          <thead class="font-bold text-overline">
            <tr>
              <th class="text-left" width="400px">Tên đề tài</th>
              <th class="text-left">Học phần</th>
              <th class="text-center">HK - Năm học</th>
              <v-tooltip text="(SV đã đăng ký/Tổng SV)" location="top">
                <template v-slot:activator="{ props }">
                  <th class="text-center" width="100px" v-bind="props">
                    Số SV
                  </th>
                </template></v-tooltip
              >
              <th class="text-center">SV đăng ký</th>
              <th class="text-left">Thực hiện</th>
            </tr>
          </thead>
          <tbody v-if="topics">
            <tr class="text-sm" v-for="topic in topics" :key="topic._id">
              <td
                width="400px"
                @click="router.push('/user/topic/' + topic.slug)"
                class="hover:text-blue-800 cursor-pointer"
              >
                <v-chip
                  v-if="topic.status === TopicStatusEnum.SUGGESTED"
                  label
                  size="small"
                  color="primary"
                  class="me-1"
                  >Đề xuất</v-chip
                >
                {{ topic.name }}
              </td>
              <td>
                <v-chip
                  v-if="topic.module"
                  :color="getTopicModuleColor(topic.module.moduleId)"
                  size="small"
                >
                  {{ topic.module.name }}
                </v-chip>
              </td>
              <td width="150px" class="text-center">
                <div v-if="topic.semester">
                  {{ getSchoolYearSemester(topic.semester, true) }}
                </div>
                <div v-else>#</div>
              </td>
              <td class="text-center">
                <span v-if="topic.student">
                  {{ topic.student.length + "/" + topic.numberOfStudent }}
                </span>
                <span v-else>{{ "0/" + topic.numberOfStudent }}</span>
              </td>
              <td class="text-center truncate" width="160px">
                <div class="flex flex-col gap-y-1 py-1">
                  <div
                    v-for="({ studentInfo }, index) in topic.student"
                    :key="index"
                  >
                    <v-chip size="small" v-if="studentInfo">{{
                      studentInfo.name
                    }}</v-chip>
                  </div>
                </div>
              </td>
              <td class="text-center" v-if="user?._id === topic.pi._id">
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
                          :disabled="manage?.isRegisterTopicTime"
                          @click="handleOpenEditForm(topic)"
                        ></v-btn>
                      </template>
                    </v-tooltip>
                  </div>
                  <div v-if="!topic.status">
                    <v-tooltip text="Xóa đề tài" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          :disabled="
                            topic.student.length !== 0 ||
                            manage?.isRegisterTopicTime
                          "
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

        <div v-if="topics.length !== 0">
          <hr />
          <slot name="pagination"></slot>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { ModuleDetails } from "@/apis/models/ModuleDetails";

import { useAuthStore } from "@/stores/useAuthStore";
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { TopicStatusEnum } from "@/apis/models/TopicStatusEnum";

const router = useRouter();

const { user } = storeToRefs(useAuthStore());

const emit = defineEmits(["updatedStatus", "open", "delete"]);

defineProps<{
  topics: TopicDetails[];
  modules: ModuleDetails[];
  manage?: ManageRegisterTime;
}>();

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
