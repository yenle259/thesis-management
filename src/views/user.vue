<template>
  <div>
    <div class="bg-blue-800 px-20 text-white">
      <Navbar />
    </div>
    <div class="px-20 pt-8 bg-sky-50">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <div>
            <v-card class="mx-auto px-6 py-8 hover:shadow-md"></v-card>
          </div>
          <div>Danh mục chức năng</div>
        </div>
        <div class="col-span-2">
          <InformationUpdate />
        </div>
        <div>Danh mucj chuwcs nawng</div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
