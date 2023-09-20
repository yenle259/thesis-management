<template>
  <div>
    <div class="bg-blue-800 px-20 text-white">
      <Navbar />
    </div>
    <div class="px-20 pt-8 bg-sky-50">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <LoginForm />
        </div>
        <div class="col-span-2">
          <InformationUpdate />
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";

import { BASE_API } from "../../constant";
const users = ref();

axios
  .get(BASE_API + `/user`)
  .then((res) => {
    users.value = res.data;
    // console.log(users.value)
  })
  .catch(function (error: any) {
    console.log(error);
  });


</script>
