<template>
  <div>
    <v-card class="mx-auto px-6 py-8 hover:shadow-md">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <p class="text-center font-bold text-xl pb-4 text-blue-500">ĐĂNG NHẬP</p>
        <v-text-field
          v-model="model.studentId"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Mã số sinh viên"
          prepend-inner-icon="mdi-account-outline"
        ></v-text-field>

        <v-text-field
          v-model="model.password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Mật khẩu"
          prepend-inner-icon="mdi-key-outline"
        ></v-text-field>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="primary"
          type="submit"
          variant="elevated"
        >
          ĐĂNG NHẬP
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref();
const onSubmit = ref();
const loading = ref();
const required = ref();
const model = ref({
  studentId: "",
  password: "",
});
</script>

<style scoped>
.bg-basil {
  background-color: #fffbe6 !important;
}
</style>
