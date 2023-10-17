<template>
  <div class="px-6 pb-6">
    <v-card variant="flat" class="py-6 px-8">
      <p class="font-bold text-2xl pb-4 text-blue-700">ĐỀ TÀI CỦA BẠN</p>
      <div v-for="topic in props.topics" :key="topic.slug">
        <v-card
          width="600px"
          class="rounded-lg hover:shadow-lg mb-4"
          :href="'/user/topics/' + topic.slug"
        >
          <v-card-item>
            <div>
              <v-chip
                size="small"
                class="text-overline mb-1"
                :color="getTopicTypeColor(topic.type)"
                >{{ getTopicTypeName(topic.type) }}</v-chip
              >
              <div class="text-h6 mb-1">{{ topic.name }}</div>
              <div class="text-caption">
                {{ topic.description }}
              </div>
              <div class="text-caption text-lg">
                <span class="font-bold">Giảng viên hướng dẫn: </span
                >{{ topic.pi.name }}
              </div>
            </div>
          </v-card-item>
          <!-- <v-card-actions>
            <v-btn variant="tonal"> Button </v-btn>
          </v-card-actions> -->
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

const props = defineProps<{ topics: TopicDetails[] }>();
</script>
