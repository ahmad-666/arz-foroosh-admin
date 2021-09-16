<template>
  <v-app>
    <div
      :style="{ width: '100%', 'min-height': '100vh' }"
      class="d-flex flex-column justify-center align-center"
    >
      <template v-if="error.statusCode === 404">
        <div :style="{ width: '500px', 'max-width': '100%' }">
          <lottie-animation
            path="jsons/error-404.json"
            :loop="true"
            :auto-play="true"
            :speed="1"
          >
          </lottie-animation>
        </div>
        <p class="text-h6 font-weight-bold error--text">
          صفحه مورد نظر یافت نشد
        </p>
        <v-btn class="mt-6" color="accent" dark nuxt to="/">
          برگشت به صفحه اصلی</v-btn
        >
      </template>
      <template v-else>
        <div :style="{ width: '500px', 'max-width': '100%' }">
          <lottie-animation
            path="jsons/error.json"
            :loop="true"
            :auto-play="true"
            :speed="1"
          >
          </lottie-animation>
        </div>
        <p class="mt-4 text-h6 font-weight-bold error--text">خطایی بوجود آمد</p>
        <v-btn class="mt-6" color="accent" dark nuxt to="/">
          برگشت به صفحه اصلی</v-btn
        >
      </template>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: 'صفحه خطا',
    };
  },
};
</script>
