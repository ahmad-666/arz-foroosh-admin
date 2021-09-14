<template>
  <v-container>
    <v-row align="stretch">
      <v-col cols="12" md="6">
        <v-card color="cardColor" class="fill-height">
          <v-card-title class="d-flex flex-column align-center">
            <div :style="{ width: '100%', height: '150px' }" class="mt-n10">
              <lottie-animation
                path="jsons/tether.json"
                :loop="true"
                :auto-play="true"
                :speed="1"
              >
              </lottie-animation>
            </div>
            <h6 class="primary--text font-weight-bold text-subtitle-1 mt-n6">
              تتر
            </h6>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between flex-wrap py-3">
              <p class="textColor--text text-body-2">قیمت</p>
              <div class="d-flex align-center">
                <p class="titleColor--text text-body-2">
                  {{ new Intl.NumberFormat().format(tether.price) }} تومان
                </p>
                <v-chip small :color="getPercentColor" class="mr-2">
                  {{ tether.percent }}%</v-chip
                >
              </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between flex-wrap py-3">
              <p class="textColor--text text-body-2">حداقل</p>
              <p class="titleColor--text text-body-2">
                {{ new Intl.NumberFormat().format(tether.min) }} تومان
              </p>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between flex-wrap py-3">
              <p class="textColor--text text-body-2">حداکثر</p>
              <p class="titleColor--text text-body-2">
                {{ new Intl.NumberFormat().format(tether.max) }} تومان
              </p>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex flex-column align-center">
            <v-btn color="primary" dark nuxt to="/dashboard/buy-sell"
              >خرید و فروش تتر</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <show-profile
          :user="user"
          type="dashboard"
          class="fill-height"
        ></show-profile>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card color="cardColor">
          <v-card-title class="text-subtitle-1 titleColor--text">
            تراکنش های اخیر
          </v-card-title>
          <v-card-text>
            <v-data-table
              class="transparent"
              :headers="transactions.headers"
              :items="transactions.items"
              :loading="loading"
              hide-default-footer
            >
              <template #loading>
                <p class="text-body-2">در حال بارگذاری</p>
              </template>
              <template #no-data>
                <p class="text-body-2">داده ای برای نمایش وجود ندارد</p>
              </template>
              <template #item.type="{ value }">
                <v-chip
                  class="px-6 text-body-2 rounded-xl"
                  dark
                  :color="getTableChipColor(value.value)"
                  >{{ value.text }}</v-chip
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ShowProfile from '~/components/ShowProfile.vue'
export default {
  components: {
    ShowProfile,
  },
  layout: 'dashboard',
  data() {
    return {
      loading: false,
      error: '',
      success: '',
      user: {},
      transactions: {
        headers: [
          {
            text: 'کد پیگیری',
            value: 'id',
            sortable: true,
            align: 'start',
          },
          {
            text: 'تایپ',
            value: 'type',
            sortable: true,
            align: 'start',
          },
          {
            text: 'شبکه انتقال',
            value: 'network',
            sortable: true,
            align: 'start',
          },
          {
            text: 'آدرس ولت',
            value: 'wallet',
            sortable: false,
            align: 'start',
            width: '200px',
          },
          {
            text: 'کارمزد',
            value: 'offset',
            sortable: true,
            align: 'start',
          },
          {
            text: 'کد تراکنش',
            value: 'code',
            sortable: false,
            align: 'start',
          },
          {
            text: 'مقدار درخواستی',
            value: 'amount',
            sortable: true,
            align: 'start',
          },
          {
            text: 'تاریخ',
            value: 'date',
            sortable: true,
            align: 'start',
          },
        ],
        items: [],
      },
      tether: {
        price: null,
        percent: null,
        min: null,
        max: null,
      },
    }
  },
  fetch() {
    this.loading = true
    this.success = ''
    this.error = ''
    try {
      this.user = {
        fName: 'John',
        lName: 'Doe',
        email: 'something@gmail.com',
        mobile: '09150000000',
        ssn: '1234567890',
        bDate: '1400/10/10',
        isAuth: true,
      }
      this.transactions.items = []
      for (let i = 0; i < 6; i++) {
        const randVal = Math.random()
        this.transactions.items.push({
          id: i,
          type: {
            text: randVal < 0.5 ? 'واریز' : 'برداشت',
            value: randVal < 0.5 ? 'deposit' : 'withdraw',
          },
          network: randVal < 0.5 ? 'TRC20' : 'BEP2',
          wallet:
            randVal < 0.5 ? 'fdjf543&^%&%gggfh343223' : 'ffsHHFGH3423fFSD',
          offset: '0.1 تتر',
          code: randVal < 0.5 ? '123#456' : null,
          amount: '10000 تتر',
          date: '1400/10/10',
        })
      }
      this.tether = {
        price: 30000,
        min: 28000,
        max: 32000,
        percent: 5,
      }
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
    getPercentColor() {
      if (this.tether.percent < 0) return 'error'
      else return 'success'
    },
  },
  methods: {
    getTableChipColor(val) {
      switch (val) {
        case 'deposit':
          return 'success'
        case 'withdraw':
          return 'error'
        default:
          return 'grey'
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
