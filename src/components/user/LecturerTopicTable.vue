<template>
  <div>
    <div class="py-3">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Tên đề tài</th>
            <th class="text-left">Phân loại</th>
            <th class="text-center">HK - Năm học</th>
            <v-tooltip text="(SV đã đăng ký/Tổng SV)" location="top">
              <template v-slot:activator="{ props }">
                <th class="text-center" width="100px" v-bind="props">Số SV</th>
              </template></v-tooltip
            >
            <th class="text-center">Sinh viên đăng ký</th>

            <th class="text-left" v-if="user?._id === route.params.id">
              Thực hiện
            </th>
          </tr>
        </thead>
        <hr />
        <tbody>
          <tr class="text-sm" v-for="topic in props.topics" :key="topic.slug">
            <td width="400px">
              <a :href="'/topics/' + topic.slug">
                {{ topic.name }}
              </a>
            </td>
            <td>
              <v-chip :color="getTopicTypeColor(topic.type)" size="small">
                {{ getTopicTypeName(topic.type) }}
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
            <td class="text-center">
              <v-col>
                <v-chip
                  v-for="student in topic.student"
                  :key="student._id"
                  size="small"
                  >{{ student.name }}</v-chip
                >
              </v-col>
            </td>
            <td class="text-center" v-if="user?._id === route.params.id">
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
    </div>
    <div v-if="props.topics.length == 0">
      <p class="py-2 italic text-center">Không có đề tài</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { useAuthStore } from "@/stores/useAuthStore";
import { getSchoolYearSemester } from "@/utils/getSchoolYearSemester";
import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import { getTopicTypeName } from "@/utils/getTopicTypeName";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();

const { user } = storeToRefs(useAuthStore());

const emit = defineEmits(["updatedStatus", "open", "delete"]);

const props = defineProps<{ topics: TopicDetails[] }>();

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
