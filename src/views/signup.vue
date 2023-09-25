<template>
  <div>
    <div class="bg-blue-800 px-20 text-white">
      <Navbar />
    </div>
    <div class="px-20 pt-8 bg-sky-50">
      <div class="w-2/5">
        <div>
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SignupForm from "@/components/core/SignupForm.vue";
</script>
