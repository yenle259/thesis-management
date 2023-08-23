<template>
  <div>
    <div class="bg-blue-800 px-20 text-white">
      <Navbar />
    </div>
    <div class="px-20 pt-8 bg-sky-50">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3"><LoginForm /></div>
        <div class="col-span-2 ">
          <InformationUpdate/>
        </div>
        <!-- <div class="row-span-2 col-span-2">THÔNG TIN</div> -->
      </div>
    </div>
    <div>
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
