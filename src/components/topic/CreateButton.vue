<template>
  <div>
    <v-tooltip text="Thêm mới đề tài" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          v-model="model.isDisplay"
          variant="tonal"
          append-icon="mdi-plus"
          @click="handleOpenCreateModal"
          color="info"
          >Thêm đề tài</v-btn
        >
      </template>
    </v-tooltip>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ isDisplay: boolean; topicId: string }>();

const model = reactive({
  isDisplay: props.isDisplay,
});

const handleOpenCreateModal = () => {};
</script>
