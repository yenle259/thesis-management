<template>
  <div>
    <v-dialog v-model="dialog" width="550px">
      <v-card
        v-if="status === RegisterStatusEnum.Approve"
        class="rounded-lg pt-2 pb-2 px-2"
        v-click-outside="handleCancel"
      >
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1 text-h6 font-weight-semibold">
              Phê duyệt sinh viên đăng ký
            </span>
            <p class="font-light text-caption text-black">
              Phê duyệt cho sinh viên với thông tin bên dưới thực hiện đề tài
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <p class="mb-1">
            <span class="text-subtitle-2">Mã số sinh viên: </span
            ><span class="uppercase">
              {{ student.studentInfo.userId }}
            </span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Tên sinh viên: </span
            ><span>
              {{ student.studentInfo.name }}
            </span>
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn color="success" variant="tonal" @click="handleApproval">
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card
        class="rounded-lg pt-2 pb-2 px-2"
        v-if="status === RegisterStatusEnum.Reject"
        v-click-outside="handleCancel"
      >
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1 text-h6 font-weight-semibold"
              >Không duyệt sinh viên đăng ký
            </span>
            <p class="font-light text-caption text-black">
              Không duyệt sinh viên với thông tin bên dưới thực hiện đề tài
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <div class="d-flex flex-row gap-x-2">
            <span class="text-subtitle-2">Thông tin sinh viên: </span>
            <v-divider vertical thickness="3"></v-divider>
            <div>
              <p class="text-grey-800 text-sm">
                {{ student.studentInfo.name }}
              </p>
              <p class="text-caption text-sm text-grey">
                {{ student.studentInfo.email }}
              </p>
            </div>
          </div>
          <span class="text-subtitle-2">Lí do:</span>
          <v-textarea
            v-model="model.reason"
            :rules="rules.reason"
            class="mt-2"
            hint="Lí do không phê duyệt sinh viên..."
            variant="outlined"
            counter
            clearable
          ></v-textarea>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn
            color="red"
            variant="tonal"
            :disabled="model.reason.length <= 15"
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { RegisterStudent } from "@/apis/models/RegisterStudent";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["cancel", "unregistered"]);

const props = defineProps<{
  isShow: boolean;
  student: RegisterStudent;
  status?: string;
}>();

const model = reactive({
  reason: "",
});

const rules = ref({
  reason: [
    (value: any) => {
      if (value?.length == 0) {
        return "Nhập vào lí do không phê duyệt đăng ký của sinh viên";
      } else if (value.length <= 25) {
        return "Nội dung phải nhiều hơn 15 kí tự";
      }
      return true;
    },
  ],
});

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const handleApproval = async () => {
  try {
    const { data: response } = await API.put(`/topic/review`, {
      status: RegisterStatusEnum.Approve,
      topicIndex: props.student._id,
    });

    toast.success("Cập nhật thông tin thành công");
    handleCancel();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleRejected = async (scheduleTime: any) => {
  const date = new Date(scheduleTime);

  try {
    const { data: response } = await API.put(`/publish/set`, {
      publishDate: date,
      id: "6526f1c4ac0072dcd9517532",
    });

    toast.success("Phê duyệt sinh viên đăng ký đề tài thành công");

    handleCancel();
    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>
