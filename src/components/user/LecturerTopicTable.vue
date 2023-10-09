<template>
  <div>
    <div class="py-3">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Tên đề tài</th>
            <th class="text-left">Phân loại</th>
            <th class="text-center" width="200px">
              Số sinh viên
              <br />
              <span class="text-caption">(Số lượng SV đã đăng ký/Tổng SV)</span>
            </th>
            <th class="text-center">Sinh viên đăng ký</th>

            <th class="text-left">Thực hiện</th>
          </tr>
        </thead>
        <hr />
        <tbody>
          <tr class="text-sm" v-for="topic in props.topics" :key="topic.slug">
            <td width="420px">
              <a :href="'/topics/' + topic.slug">
                {{ topic.name }}
              </a>
            </td>
            <td>
              <v-chip :color="getTopicTypeColor(topic.type)" size="small">
                {{ getTopicTypeName(topic.type) }}
              </v-chip>
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
            <td class="text-center">
              <v-row>
                <TopicDisplayStatusButton
                  :is-display="topic.isDisplay"
                  :topic-id="topic._id"
                  @updated="handleUpdated"
                />
                <TopicEditInfoButton @is-edit="handleOpenEditForm" />
                <TopicDeleteButton />
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-table>
      <!-- <v-divider></v-divider>
        <div class="flex ">
          <v-pagination
            density="comfortable"
            v-model="page"
            :length="props.totalPages"
            rounded="circle"
            :uodate="handleUpdate"
          ></v-pagination>
        </div> -->
    </div>
    <div v-if="props.topics.length == 0">
      <p class="py-2 italic text-center">Không có đề tài</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

const emit = defineEmits(["updatedStatus", "isEdit"]);

const props = defineProps<{ topics: TopicDetails[] }>();

const handleUpdated = () => {
  emit("updatedStatus");
};

const handleOpenEditForm = (topic: TopicDetails) => {
  emit("isEdit", topic);
};
</script>
