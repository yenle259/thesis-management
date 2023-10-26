<template>
  <div>
    <v-btn
      id="menu"
      appendIcon="mdi-chevron-down"
      class="self-center me-2 rounded-lg bg-white"
      variant="flat"
      :color="actions?.color"
      >{{ actions?.label }}</v-btn
    >
    <v-menu activator="#menu" location="bottom">
      <v-list class="rounded-lg px-2" density="compact">
        <v-list-item
          v-for="item in actions?.actions"
          :key="item.title"
          :append-icon="item.icon"
          :title="item.title"
          class="rounded-lg"
          @click="handleCancelModal"
        >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["cancel", "open"]);

const props = defineProps<{
  status: "Đang chờ duyệt";
}>();

const actionList = ref([
  {
    status: "Pending",
    color: "warning",
    label: "Đang chờ duyệt",
    actions: [
      {
        icon: "mdi-minus-circle-outline",
        color: "red",
        title: "Hủy đăng ký",
        click: "handleCancelModal",
      },
    ],
  },
  {
    status: "Approved",
    color: "success",
    label: "Đã được duyệt",
    actions: [
      {
        icon: "mdi-mail",
        color: "orange",
        title: "Xin điểm I",
        click: "handleCancelModal",
      },
      {
        icon: "mdi-check-circle-outline",
        color: "green",
        title: "Xác nhận báo cáo",
        click: "handleCancelModal",
      },
    ],
  },
]);

const actions = computed(() => {
  return actionList.value.find((item) => item.status === props.status);
});

const handleCancelModal = () => {
  emit("open");
};
</script>
