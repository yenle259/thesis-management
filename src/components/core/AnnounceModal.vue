<template>
  <div>
    <v-dialog width="500" v-model="model.isShow">
      <v-card variant="flat" class="pt-2 px-1">
        <v-card-title class="text-h6 text-indigo">
          <span class="uppercase"> <slot name="title"></slot> </span>
          <p class="font-light text-caption text-black"></p>
        </v-card-title>
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Đóng" @click="model.isShow = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { PublishDate } from "@/apis/models/PublishDate";
import { reactive } from "vue";

const emit = defineEmits(["isPublished"]);

const props = defineProps<{ publishDate: PublishDate }>();

const model = reactive({
  isShow: false,
  publishDate: props.publishDate,
});

const handlePublish = () => {
  const recentDate = new Date(Date.now());

  if (props.publishDate) {
    if (new Date(props.publishDate.publishDate) <= recentDate) {
      emit("isPublished", true);
    } else {
      model.isShow = true;
      emit("isPublished", false);
    }
  }
};

handlePublish();
</script>
