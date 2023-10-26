<template>
  <CustomCard v-if="topic">
    <template v-slot:header>
      <v-divider></v-divider>
      <p class="my-2 font-bold uppercase text-indigo text-lg tracking-wide">
        <span class="font-weight-medium pb-2 text-overline text-black"
          >Đề tài:
        </span>
        {{ topic?.name }}
      </p>
      <v-divider></v-divider>
    </template>
    <template v-slot:action>
      <slot name="action"></slot>
    </template>

    <template v-slot:content>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-3">
        <div class="col-span-2">
          <div v-if="false">
            <v-timeline direction="horizontal" truncate-line="both">
              <v-timeline-item size="small" dot-color="indigo">
                <p class="text-subtitle-2 text-indigo">Đã đăng ký</p>
                <!-- <p class="text-caption"> Đã đăng ký </p> -->
              </v-timeline-item>

              <v-timeline-item size="small" dot-color="grey">
                <template v-slot:opposite> Được duyệt </template>
              </v-timeline-item>

              <v-timeline-item size="small" dot-color="grey">
                Xác nhận báo cáo
              </v-timeline-item>

              <v-timeline-item size="small" dot-color="grey">
                <template v-slot:opposite> Nhập điểm </template>
              </v-timeline-item>
            </v-timeline>
          </div>
          <v-card class="px-4 py-3 rounded-lg">
            <p
              class="mb-2 uppercase text-indigo tracking-wide font-weight-medium"
            >
              Thông tin đề tài
            </p>
            <hr />
            <div class="mt-3">
              <v-icon icon="mdi-filter-variant" class="me-2"></v-icon>
              <span class="font-weight-medium">Phân loại đề tài: </span>
              <v-chip :color="getTopicTypeColor(topic?.type)">
                {{ getTopicTypeName(topic?.type) }}
              </v-chip>
            </div>
            <div class="my-2">
              <v-icon icon="mdi-account-multiple-outline" class="me-2"></v-icon>
              <span class="font-weight-medium">Số lượng sinh viên: </span>
              <span>
                {{ topic.numberOfStudent }}
              </span>
            </div>
            <div class="my-3">
              <v-icon icon="mdi-calendar-range" class="me-2"></v-icon>
              <span class="font-weight-medium">Học kì - Niên khóa: </span>
              <span v-if="topic.semester">
                {{ getSchoolYearSemester(topic.semester) }}
              </span>
            </div>
            <div class="my-3">
              <v-icon icon="mdi-text" class="me-2"></v-icon>
              <span class="font-weight-medium">Mô tả đề tài: </span>
              <br />
              <p class="px-3 leading-relaxed indent-7 mt-2 text-justify">
                {{ topic.description }}
              </p>
            </div>
          </v-card>
        </div>
        <div class="col-span-1 columns-1 gap-y-3">
          <div class="rounded-lg">
            <v-card-text class="text-gray-700">
              <p
                class="mb-2 uppercase text-indigo tracking-wide font-weight-medium"
              >
                Giảng viên hướng dẫn
              </p>
              <hr />
              <div class="mt-2">
                <CustomLecturerItem :lecturer="topic.pi" />
              </div>
            </v-card-text>
          </div>
          <div class="rounded-lg">
            <v-card-text>
              <p
                class="mb-2 uppercase text-indigo tracking-wide font-weight-medium"
              >
                Sinh viên đăng ký
                <v-badge
                  color="indigo"
                  :content="topic.student.length + '/' + topic.numberOfStudent"
                  inline
                ></v-badge>
              </p>
              <hr />
              <div class="mt-2" v-if="topic.student.length !== 0">
                <div v-for="user in topic.student" :key="user._id">
                  <CustomUserItem :user="user || {}">
                    <template
                      v-slot:action
                      v-if="topic.pi._id === auth.user?._id"
                    >
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
                            @click="handleApprove(user)"
                          >
                          </v-list-item>
                          <v-list-item
                            key="reject"
                            append-icon="mdi-minus-circle-outline"
                            title="Từ chối"
                            class="rounded-lg"
                            @click="handleReject(user)"
                          >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                  </CustomUserItem>
                </div>
              </div>
            </v-card-text>
          </div>
        </div>
      </div>
    </template>
  </CustomCard>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
useTitle("QLĐT - Đề tài đăng ký");

const auth = useAuthStore();

const emit = defineEmits(["approved", "reject"]);

const props = defineProps<{
  topic: TopicDetails;
}>();

const handleApprove = (user: UserDetails) => {
  emit("approved", user);
};
const handleReject = (user: UserDetails) => {
  emit("reject", user);
};
</script>
