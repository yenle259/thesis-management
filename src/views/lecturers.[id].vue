<template>
  <div>
    <!-- Lecturer Info on route -->
    <div class="px-8 pt-6" v-if="lecturer">
      <v-card width="300px" rounded="lg">
        <v-card-text>
          <p
            class="mb-2 uppercase text-h6 text-indigo tracking-wide font-weight-medium"
          >
            GIẢNG VIÊN
          </p>
          <hr />
          <CustomLecturerItem :lecturer="lecturer || {}" class="mt-2" />
        </v-card-text>
      </v-card>
    </div>
    <div>
      <TopicList :topics="topics ?? []" :title="'Đề tài của giảng viên'">
        <template v-slot:action>
          <div class="h-16"></div>
        </template>
        <template v-slot:pagination>
          <div class="d-flex justify-between px-2 py-3">
            <div class="d-flex flex-row gap-x-3">
              <p class="self-center indent-4 text-body-2">Hiển thị</p>
              <v-btn
                id="number-per-page"
                variant="tonal"
                append-icon="mdi-menu-down"
                >{{ model.numberOfItemsPerPage }}</v-btn
              >
              <v-menu activator="#number-per-page">
                <v-list density="compact">
                  <v-list-item
                    density="compact"
                    v-for="(value, index) in PAGINATION_OPTIONS"
                    :key="index"
                    :value="value"
                    @click="model.numberOfItemsPerPage = value"
                  >
                    {{ value }}
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-divider vertical thickness="2"></v-divider>
              <p class="self-center text-body-2">
                {{
                  getPaginationText(
                    model.count,
                    model.numberOfItemsPerPage,
                    model.page
                  )
                }}
              </p>
            </div>
            <v-pagination
              v-model="model.page"
              :length="model.totalsPage"
              :total-visible="5"
              active-color="blue"
              variant="text"
              density="compact"
            ></v-pagination>
          </div>
        </template>
      </TopicList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
import { BASE_API, PAGINATION_OPTIONS } from "@/constant";

useTitle("QLĐT - Thông tin giảng viên");

const route = useRoute();

const lecturerId = route.params.id;

const lecturer = ref<UserDetails>();

const topics = ref<TopicDetails[]>();

const model = reactive({
  page: 1,
  count: 0,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
});

axios({
  url: BASE_API + `/user/lecturers/${lecturerId}`,
  withCredentials: true,
  data: {
    userId: lecturerId,
  },
})
  .then(function (res) {
    lecturer.value = res.data;
  })
  .catch(function (error) {
    console.log(error);
  });

const getTopics = async () => {
  try {
    const { page, numberOfItemsPerPage } = model;
    const { data: response } = await API.get(
      `/topic/lecturerUserId/${route.params.id}`,
      {
        params: {
          page: page,
          limit: numberOfItemsPerPage,
        },
      }
    );
    topics.value = response.topics;
    model.page = response.currentPage;
    model.totalsPage = response.totalPages;
    model.count = response.count;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getTopics();
</script>
