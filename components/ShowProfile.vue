<template>
  <v-card color="cardColor">
    <v-card-title class="d-flex justify-center">
      <p class="text-subtitle-1" :class="isAuthTextColor">{{ isAuthText }}</p>
      <v-btn
        v-if="!user.isAuth"
        color="secondary"
        dark
        class="mr-2"
        small
        nuxt
        to="/dashboard/authorize"
        >احراز هویت</v-btn
      >
    </v-card-title>
    <v-card-text>
      <div>
        <div class="d-flex justify-space-between flex-wrap py-3 text-body-2">
          <p class="textColor--text">نام</p>
          <p class="titleColor--text">{{ user.fName }}</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between flex-wrap py-3 text-body-2">
          <p class="textColor--text">نام خانوادگی</p>
          <p class="titleColor--text">{{ user.lName }}</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between flex-wrap py-3 text-body-2">
          <p class="textColor--text">شماره ملی</p>
          <p class="titleColor--text">{{ user.ssn }}</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between flex-wrap py-3 text-body-2">
          <p class="textColor--text">تاریخ تولد</p>
          <p class="titleColor--text">{{ user.bDate }}</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between flex-wrap py-3 text-body-2">
          <p class="textColor--text">ایمیل</p>
          <p class="titleColor--text">{{ user.email }}</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between flex-wrap py-3 text-body-2">
          <p class="textColor--text">شماره موبایل</p>
          <p class="titleColor--text">{{ user.mobile }}</p>
        </div>
      </div>
      <v-btn
        v-if="type === 'profile'"
        class="d-block mx-auto"
        color="primary"
        dark
        @click="goToEditMode"
        >ویرایش حساب کاربری</v-btn
      >
      <v-btn
        v-else-if="type === 'dashboard'"
        class="relative-right-center"
        color="primary"
        dark
        nuxt
        to="/dashboard/profile"
        >ویرایش حساب کاربری</v-btn
      >
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'profile', // 'profile for profile page , 'dashboard' for dashboard page
    },
  },
  emits: ['set-edit-mode'],
  data() {
    return {};
  },
  computed: {
    isAuth() {
      return this.user.isAuth;
    },
    isAuthTextColor() {
      if (this.isAuth) return 'success--text';
      else return 'error--text';
    },
    isAuthText() {
      if (this.isAuth) return 'احراز هویت شده';
      else return 'احراز هویت نشده';
    },
  },
  methods: {
    goToEditMode() {
      this.$emit('set-edit-mode');
    },
  },
};
</script>
