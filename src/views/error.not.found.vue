<template>
  <div>
    <div class="home bg-sky-50 m-auto h-screen">
      <div>
        <div class="mx-24 pt-2 text-white border-b-2">
          <v-card-title class="text-center justify-center py-6">
            <v-row align="center" justify="start">
              <img
                src="@img/cit.png"
                width="50"
                class="rounded-full opacity-75"
                alt="logo"
              />
              <a href="/login" class="logo font-bold text-2xl indent-4">
                HỆ THỐNG QUẢN LÝ ĐỀ TÀI
              </a>
            </v-row>
          </v-card-title>
        </div>
      </div>
      <div class="h-5/6 w-2/5 m-auto flex items-center">
        <div class="w-full font-bevn">
          <v-card class="px-8 py-10 rounded-lg text-center" variant="flat">
            <p class="pt-5 pb-2 text-8xl text-red drop-shadow-2xl">404</p>
            <h1 class="pt-4 text-2xl font-semibold">KHÔNG TÌM THẤY TRANG</h1>
            <p class="p-4">
              Không thể truy cập trang vì không tìm thấy trang.
              <br />Nhấn vào nút bên dưới để quay lại trang chủ.
            </p>
            <v-btn
              class="my-1"
              prepend-icon="mdi-arrow-left"
              color="primary"
              variant="tonal"
              href="/user"
              >QUAY LẠI</v-btn
            >
          </v-card>
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.home {
  background-image: url("@img/ctu_bg.png");
  background-size: cover;
}

.logo {
  font-family: "Be Vietnam Pro", sans-serif;
}
</style>
