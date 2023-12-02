<template>
  <v-menu :close-on-content-click="false" width="280px">
    <template v-slot:activator="{ props }">
      <v-btn
        append-icon="mdi-chevron-down"
        v-bind="props"
        variant="flat"
        color="indigo"
        >Thời gian đăng ký</v-btn
      >
    </template>

    <v-card class="rounded-lg">
      <v-tabs v-model="model.tab" color="indigo" fixed-tabs>
        <v-tab value="TOPIC">Đề tài</v-tab>
        <v-tab value="REPORT">Báo cáo</v-tab>
      </v-tabs>
      <v-window v-model="model.tab" class="mb-4 px-3">
        <v-window-item key="TOPIC" value="TOPIC">
          <div class="mt-2" v-if="isSetTopicTime || model.isRegisterTopicTime">
            <v-alert
              :color="isSetTopicTime ? 'warning' : 'info'"
              variant="tonal"
              density="compact"
              class="text-caption"
            >
              <p class="text-sm font-bold">
                Thời gian đăng ký <span v-if="isSetTopicTime">đã lên lịch</span>
              </p>
              <p class="text-caption">
                {{ `Từ: ${dateViFormat(manage.registerTopicTime.beginAt)}` }}
              </p>
              <p class="text-caption">
                {{ `Đến: ${dateViFormat(manage.registerTopicTime.endAt)}` }}
              </p>
            </v-alert>
          </div>
          <v-list-item
            class="py-4"
            density="compact"
            v-if="manage.isRegisterTopicTime || isSetTopicTime"
          >
            <p>Trạng thái</p>
            <template v-slot:append>
              <v-btn
                size="small"
                variant="tonal"
                class="text-button"
                :color="
                  model.isRegisterTopicTime
                    ? 'info'
                    : isSetTopicTime
                    ? 'warning'
                    : 'grey'
                "
              >
                {{
                  model.isRegisterTopicTime
                    ? "Đã mở"
                    : isSetTopicTime
                    ? "Đã lên lịch"
                    : "Chưa có"
                }}
              </v-btn>
            </template>
          </v-list-item>
          <hr />
          <v-list-item
            v-if="model.isRegisterTopicTime"
            @click="model.destroyModal = true"
            class="rounded-lg mt-2"
            >Đóng đăng ký
          </v-list-item>
          <v-list-item
            v-else
            @click="model.publishModal = true"
            class="rounded-lg mt-2"
            >Mở đăng ký
          </v-list-item>
          <v-list-item
            :disabled="model.isRegisterTopicTime"
            @click="model.setTimeModal = true"
            class="rounded-lg"
            >Đặt thời gian
          </v-list-item>
        </v-window-item>

        <v-window-item key="REPORT" value="REPORT">
          <div class="mt-2" v-if="isSetReportTime || model.isReportTime">
            <v-alert
              :color="isSetReportTime ? 'warning' : 'info'"
              variant="tonal"
              density="compact"
              class="text-caption"
            >
              <p class="text-sm font-bold">
                Thời gian đăng ký
                <span v-if="isSetReportTime">đã lên lịch</span>
              </p>

              <p class="text-caption">
                {{ `Từ: ${dateViFormat(manage.registerReportTime.beginAt)}` }}
              </p>
              <p class="text-caption">
                {{ `Đến: ${dateViFormat(manage.registerReportTime.endAt)}` }}
              </p>
            </v-alert>
          </div>
          <v-list-item
            class="py-4"
            density="compact"
            v-if="manage.isReportTime || isSetReportTime"
          >
            <p>Trạng thái</p>
            <template v-slot:append>
              <v-btn
                size="small"
                variant="tonal"
                class="text-button"
                :color="
                  model.isReportTime
                    ? 'info'
                    : isSetReportTime
                    ? 'warning'
                    : 'grey'
                "
              >
                {{
                  model.isReportTime
                    ? "Đã mở"
                    : isSetReportTime
                    ? "Đã lên lịch"
                    : "Chưa có"
                }}
              </v-btn>
            </template>
          </v-list-item>
          <hr />
          <v-list-item
            v-if="model.isReportTime"
            @click="model.destroyModal = true"
            class="rounded-lg mt-2"
            >Đóng đăng ký
          </v-list-item>
          <v-list-item
            v-else
            @click="model.publishModal = true"
            class="rounded-lg mt-2"
            >Mở đăng ký
          </v-list-item>
          <v-list-item
            :disabled="model.isReportTime"
            @click="model.setTimeModal = true"
            class="rounded-lg"
            >Đặt thời gian
          </v-list-item>
        </v-window-item>
      </v-window>
    </v-card>
  </v-menu>

  <!-- dialog to publish topic -->
  <v-dialog v-model="model.publishModal" persistent width="500px" closeable>
    <v-card class="pt-3 rounded-lg pb-2 px-2">
      <v-card-title class="d-flex text-h5 text-indigo justify-between">
        <div>
          <span class="mb-1"
            >Mở đăng ký
            {{ model.tab === "REPORT" ? "báo cáo" : "đề tài" }}</span
          >
          <p class="font-light text-caption text-black">
            Mở thời gian đăng ký
            {{ model.tab === "REPORT" ? "báo cáo" : "danh sách đề tài" }} cho
            học kỳ hiện tại. <br />
            Hãy chọn thời gian kết thúc đăng ký.
          </p>
        </div>
        <v-btn icon @click="handleCancel" variant="flat"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form v-model="model.form">
          <v-text-field
            v-model="model.endAt"
            :rules="rules.endAt"
            type="datetime-local"
            class="mt-2"
            label="Thời gian kết thúc đăng ký"
            hint="Giá trị mặc định là 7 ngày sau thời điểm mở đăng ký"
            variant="outlined"
          ></v-text-field
        ></v-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="handleCancel()"> Hủy </v-btn>
        <v-btn
          color="green-darken-1"
          :disabled="!model.form"
          variant="tonal"
          @click="
            handleSetRegisTerTime(
              model.tab,
              getFormatDatetime(new Date(Date.now())),
              model.endAt
            )
          "
        >
          Xác nhận
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- dialog to cancel publish topic -->

  <v-dialog v-model="model.destroyModal" persistent width="500px" closeable>
    <v-card class="pt-3 rounded-lg pb-2 px-2">
      <v-card-title class="d-flex text-h5 text-indigo justify-between">
        <div>
          <span class="mb-1"
            >Kết thúc đăng ký
            {{ model.tab === "REPORT" ? "báo cáo" : "đề tài" }}</span
          >
          <p class="font-light text-caption text-black">
            Kết thúc thời gian đăng ký
            {{ model.tab === "REPORT" ? "báo cáo" : "danh sách đề tài" }}
          </p>
        </div>
        <v-btn icon @click="handleCancel" variant="flat"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Xác nhận kết thúc thời gian đăng ký.</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="handleCancel()"> Hủy </v-btn>
        <v-btn
          color="green-darken-1"
          variant="tonal"
          @click="
            handleSetRegisTerTime(
              model.tab,
              getFormatDatetime(new Date(Date.now())),
              getFormatDatetime(new Date(Date.now())),
              true
            )
          "
        >
          Xác nhận
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- dialog to setup publish date -->
  <v-dialog v-model="model.setTimeModal" persistent width="500px">
    <v-card class="pt-3 pb-2 px-2 rounded-lg">
      <v-form v-model="model.form">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1">Đặt thời gian</span>
            <p class="font-light text-caption text-black">
              Đặt thời gian để mở đăng ký
              {{ model.tab === "REPORT" ? "báo cáo" : "đề tài" }} cho học kỳ
              hiện tại
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="model.beginAt"
            :rules="rules.beginAt"
            :min="Date.now()"
            type="datetime-local"
            class="mt-2"
            label="Thời gian mở đăng ký"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="model.endAt"
            :rules="rules.endAt"
            type="datetime-local"
            class="mt-2"
            label="Thời gian kết thúc đăng ký"
            hint="Giá trị mặc định là 7 ngày sau thời điểm mở đăng ký"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
        <v-spacer> </v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn
            :disabled="!model.form"
            color="green-darken-1"
            variant="tonal"
            @click="
              handleSetRegisTerTime(model.tab, model.beginAt, model.endAt)
            "
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { parseISO, isBefore } from "date-fns";

import { dateViFormat } from "@/utils/getFormatDate";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["updated"]);

const props = defineProps<{ manage: ManageRegisterTime }>();

const model = reactive({
  tab: "TOPIC",
  form: false,
  isRegisterTopicTime: false,
  isReportTime: false,
  publishModal: false,
  destroyModal: false,
  setTimeModal: false,
  beginAt: getFormatDatetime(new Date(Date.now())),
  endAt: getFormatDatetime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
});

const rules = ref({
  beginAt: [
    (value: any) => {
      const recentDate = new Date(Date.now());
      if (parseISO(value) >= recentDate) return true;
      if (value === "") return "Hãy chọn thời điểm mở đăng ký";
      return "Thời điểm mở đăng ký phải sau thời điểm hiện tại";
    },
  ],
  endAt: [
    (value: any) => {
      const beginDate = new Date(model.beginAt);
      if (parseISO(value) >= beginDate) return true;
      return "Thời điểm kết thúc đăng ký phải sau thời điểm mở đăng ký";
    },
  ],
});

const isSetTopicTime = computed(() => {
  return isBefore(
    new Date(Date.now()),
    new Date(props.manage.registerTopicTime.beginAt)
  );
});

const isSetReportTime = computed(() => {
  return isBefore(
    new Date(Date.now()),
    new Date(props.manage.registerReportTime.beginAt)
  );
});

watch(
  () => props.manage,
  () => {
    model.isRegisterTopicTime = props.manage.isRegisterTopicTime;
    model.isReportTime = props.manage.isReportTime;
  }
);

watch(
  () => model.beginAt,
  () => {
    model.endAt = model.beginAt;
    model.endAt = getFormatDatetime(
      new Date(
        parseISO(model.endAt).setDate(parseISO(model.beginAt).getDate() + 7)
      )
    );
  }
);

const handleCancel = () => {
  model.publishModal = false;
  model.destroyModal = false;
  model.setTimeModal = false;
};

const handleSetRegisTerTime = async (
  type: string,
  beginAt: any,
  endAt: any,
  isEnd?: boolean
) => {
  const urlByType = type === "REPORT" ? "/report-time" : `/register-time`;
  const toastMsg = type === "REPORT" ? " báo cáo" : ` đề tài`;
  try {
    const { data: response } = await API.patch(urlByType, {
      beginAt,
      endAt,
    });

    if (isEnd) {
      toast.success(`Đã đóng thời gian đăng ký ${toastMsg}`);
    } else {
      toast.success(
        `Thời gian mở đăng ký ${toastMsg} bắt đầu từ ${getFormatDate(
          parseISO(beginAt)
        )} đến ${getFormatDate(parseISO(endAt))}`
      );
    }
    handleCancel();
    emit("updated");
    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>
