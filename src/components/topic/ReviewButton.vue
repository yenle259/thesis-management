<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          appendIcon="mdi-chevron-down"
          class="self-center me-2 rounded-lg bg-white"
          variant="tonal"
          size="small"
          color="warning"
          v-bind="props"
        >
          Phê duyệt
        </v-btn>
      </template>
      <v-list class="rounded-lg px-2" density="compact">
        <v-list-item
          key="approve"
          append-icon="mdi-check-circle-outline"
          title="Phê duyệt"
          class="rounded-lg"
          @click="handleApprove"
        >
        </v-list-item>
        <v-list-item
          key="reject"
          append-icon="mdi-minus-circle-outline"
          title="Từ chối"
          class="rounded-lg"
          @click="handleReject"
        >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["approved", "reject"]);

const handleApprove = () => {
  emit("approved");
};
const handleReject = () => {
  emit("reject");
};
</script>
