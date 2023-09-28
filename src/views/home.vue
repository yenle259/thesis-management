<template>
  <div>
    <div class="home px-20 bg-sky-50 m-auto">
      <div class="h-screen w-2/5 m-auto flex items-center">
        <LoginForm />
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
  background-image: url("../assets/ctu_bg.png");
}
</style>
