<template>
  <v-card color="cardColor">
    <v-card-title class="d-flex justify-center">
      <p class="titleColor--text text-subtitle-1 font-weight-bold">
        <v-icon size="30" class="ml-2">mdi-data-matrix-plus</v-icon>
        ساخت کد دعوت
      </p>
    </v-card-title>
    <v-card-text>
      <p class="text-body-2 textColor--text">
        <v-icon size="7" color="secondary" class="ml-1">mdi-circle</v-icon>
        نرخ کارمزد اهدایی به شما :
        {{ yourWage }}%
      </p>
      <div class="mt-3">
        <div class="d-flex justify-space-between flex-wrap py-3">
          <p class="text-body-2 textColor--text">سهم شما</p>
          <p class="text-body-1 secondary--text">{{ yourShare }}%</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between flex-wrap py-3">
          <p class="text-body-2 textColor--text">سهم دوستان</p>
          <p class="text-body-1 secondary--text">{{ friendsShare }}%</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="textColor--text text-body-2">کارمزدهای قابل انتخاب :</p>
        <div
          class="
            d-flex
            justify-center
            align-center
            flex-wrap
            align-content-center
          "
        >
          <v-btn
            v-for="share in shares"
            :key="share"
            class="ma-2"
            elevation="0"
            :style="{
              'background-color':
                share === activeShare ? vuetifyPrimaryColor : 'transparent',
              border: share === activeShare ? 'none' : '1px solid #bbb',
              color: share === activeShare ? 'white' : '#888',
            }"
            @click="setShare(share)"
          >
            {{ share }}%
          </v-btn>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="d-block mx-auto mt-2"
        color="primary"
        dark
        :loading="loading"
        @click="createInviteCode"
      >
        ایجاد کد دعوت
      </v-btn>
    </v-card-actions>
    <v-snackbar :value="success" color="success" dark :timeout="4000">
      <p>{{ success }}</p>
    </v-snackbar>
    <v-snackbar :value="error" color="error" dark :timeout="-1">
      <template #action="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" @click="clearError">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </template>
      <p>{{ error }}</p>
    </v-snackbar>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      success: '',
      error: '',
      yourWage: null,
      yourShare: null,
      friendsShare: null,
      shares: [],
      activeShare: null,
      inviteCode: null,
    }
  },
  fetch() {
    this.loading = true
    this.success = ''
    this.error = ''
    try {
      this.yourWage = 30
      for (let i = 0; i < this.yourWage / 5 + 1; i++) {
        this.shares.push(i * 5)
      }
      this.activeShare = this.shares[0]
      this.yourShare = this.activeShare
      this.friendsShare = this.yourWage - this.yourShare
      this.loading = false
      this.success = ''
      this.error = ''
    } catch (err) {
      this.loading = false
      this.success = ''
      this.error =
        err.response?.data?.message || 'خطایی در حین دریافت اطلاعات رخ داد'
    }
  },
  computed: {
    vuetifyPrimaryColor() {
      return this.$vuetify.theme.themes.light.primary
    },
  },
  watch: {
    activeShare: {
      immediate: false,
      handler(val) {
        this.yourShare = val
        this.friendsShare = this.yourWage - val
      },
    },
  },
  methods: {
    clearError() {
      this.error = ''
    },
    setShare(share) {
      this.activeShare = share
    },
    createInviteCode() {
      this.loading = true
      this.success = ''
      this.error = ''
      try {
        this.inviteCode = `#abc${Math.random()}`
        this.loading = false
        this.success =
          'کد دعوت با موفقیت ساخته شد. میتوانید از بخش کدهای دعوت ساخته شده کد را مشاهده کنید'
        this.error = ''
      } catch (err) {
        this.loading = false
        this.success = ''
        this.error =
          err.response?.data?.message || 'خطایی در حین ایجاد کد دعوت رخ داد'
      }
    },
  },
}
</script>
