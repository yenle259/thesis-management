<template>
  <v-btn id="menu" size="small" variant="text" append-icon="mdi-menu-down"
    >{{ props.label }}
  </v-btn>
  <v-menu activator="#menu">
    <v-list density="compact" class="rounded-lg">
      <div class="mx-1">
        <slot name="options"></slot>
        <v-list-item
          v-for="({ label, value }, index) in props.options"
          :key="index"
          :value="value"
          class="rounded-lg"
          @click="handleSelect(value)"
        >
          <span class="text-caption">
            {{ label }}
          </span>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { Option } from "@/apis/models/Option";

const emit = defineEmits(["select"]);

const props = defineProps<{ label: string; options: Option[] }>();

const handleSelect = (value: string) => {
  emit("select", value);
};
</script>
