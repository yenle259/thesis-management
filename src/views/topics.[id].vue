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
      <v-btn color="info" variant="tonal" class="ma-2" :key="topic._id">
        Đăng ký
      </v-btn>
    </template>
    <template v-slot:content>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-3">
        <v-card class="rounded-lg col-span-2">
          <v-card-text>
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
          </v-card-text>
        </v-card>
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
                  <CustomUserItem :user="user || {}" />
                </div>
              </div>
            </v-card-text>
          </div>
        </div>
      </div>
    </template>
  </CustomCard>
  <TopicCancelRegistrationModal
    :isShow="isShowCancelModal"
    :topic="topic || {}"
    @cancel="handleCancelModal"
  />
</template>

<script lang="ts" setup>
import { BASE_API } from "@/constant";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { RegisterStudent } from "@/apis/models/RegisterStudent";

useTitle("QLĐT - Thông tin đề tài");

const route = useRoute();

const topicSlug = route.params.slug;

const topic = ref<TopicDetails>();

const students = ref<RegisterStudent[]>();

const isShowCancelModal = ref(false);

console.log(topic.value?.student[0]);

axios({
  url: BASE_API + `/topic/${topicSlug}`,
  withCredentials: true,
})
  .then(function (res) {
    topic.value = res.data[0];
    students.value = topic.value?.student;
  })
  .catch(function (error) {
    console.log(error);
  });

const handleCancelModal = () => {
  isShowCancelModal.value = !isShowCancelModal.value;
};
</script>
