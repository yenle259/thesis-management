<template>
  <div>
    <div class="bg-blue-800 px-20 text-white">
      <Navbar />
    </div>
    <div class="px-20 py-8 bg-sky-50">
      <div class="grid grid-cols-4 ">
        <div>
          <UserProfile />
        </div>
        <div class="col-span-3">
          <UserLecturerList />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
