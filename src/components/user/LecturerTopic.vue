<template>
  <div class="px-6 pb-6">
    <v-card variant="flat" class="py-6 px-8">
      <div class="flex justify-between">
        <p class="font-bold text-2xl pb-4 text-blue-700">DANH SÁCH ĐỀ TÀI</p>
        <v-btn color="info" variant="tonal" class="ma-2"> Thêm đề tài </v-btn>
      </div>
      <div class="py-3">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Tên đề tài</th>
              <th class="text-left">Phân loại</th>
              <th class="text-left">MSCB</th>
              <th class="text-left">Giảng viên</th>
              <th class="text-left">Email</th>
              <th class="text-left">Thực hiện</th>
            </tr>
          </thead>
          <hr />
          <tbody>
            <tr class="text-sm" v-for="topic in props.topics" :key="topic.slug">
              <td>
                <a :href="'/topics/' + topic.slug">
                  {{ topic.name }}
                </a>
              </td>
              <td>
                <v-chip :color="getTopicTypeColor(topic.type)" size="small">
                  {{ getTopicTypeName(topic.type) }}
                </v-chip>
              </td>
              <td>{{ topic.pi.userId }}</td>
              <td>{{ topic.pi.name }}</td>
              <td>{{ topic.pi.email }}</td>
              <td>
                <TopicDisplayStatusButton
                  :is-display="topic.isDisplay"
                  :topic-id="topic._id"
                  @updated="handleUpdated"
                />
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
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

const emit = defineEmits(["updatedStatus"]);

const props = defineProps<{ topics: TopicDetails[] }>();

const handleUpdated = () => {
  console.log("at LT");
  emit("updatedStatus");
};
</script>
