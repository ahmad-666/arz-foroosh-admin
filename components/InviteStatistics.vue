<template>
  <v-card color="cardColor">
    <v-card-title class="d-flex justify-center">
      <p class="text-subtitle-1 font-weight-bold titleColor--text">
        <v-icon size="20" class="ml-1">mdi-account-group-outline</v-icon>
        آمار کاربران معرفی شده توسط شما
      </p>
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between flex-wrap py-3">
        <p class="textColor--text text-body-2">تعداد دوستان شما</p>
        <p class="secondary--text text-body-2">
          {{ friendsNum }}
        </p>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between flex-wrap py-3">
        <p class="textColor--text text-body-2">تعداد معاملات دوستان شما</p>
        <p class="secondary--text text-body-2">
          {{ friendsTransactionsNum }}
        </p>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between flex-wrap py-3">
        <p class="textColor--text text-body-2">مجموع کارمزد دریافتی شما</p>
        <p class="secondary--text text-body-2">
          {{ new Intl.NumberFormat().format(totalWage) }} تومان
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      error: '',
      friendsNum: 0,
      friendsTransactionsNum: 0,
      totalWage: 0,
    };
  },
  fetch() {
    this.loading = true;
    this.error = '';
    try {
      this.friendsNum = 5;
      this.friendsTransactionsNum = 20;
      this.totalWage = 50000000;
      this.loading = false;
      this.error = '';
    } catch (err) {
      this.loading = false;
      this.error =
        err.response?.data?.message || 'خطایی در حین دریافت اطلاعات رخ داد';
    }
  },
};
</script>
