<template>
  <v-card color="cardColor" dark>
    <v-card-title class="text-subtitle-1 font-weight-bold white--text">
      سفارشات در حال انجام
    </v-card-title>
    <v-card-text>
      <v-data-table
        class="transparent"
        :loading="loading"
        :headers="table.headers"
        :items="table.items"
        :page="table.page"
        :items-per-page="table.pageSize"
        hide-default-footer
      >
        <template #footer>
          <div class="d-flex flex-column flex-md-row justify-md-space-between">
            <v-pagination
              v-model="table.page"
              circle
              color="secondary"
              :total-visible="5"
              :length="totalPages"
            ></v-pagination>
            <div
              :style="{ width: '20em', 'max-width': '100%' }"
              class="mt-4 mt-md-0 mx-auto"
            >
              <v-select
                v-model="table.pageSize"
                :items="table.pageSizes"
                dense
                outlined
                label="تعداد نتیجه در هر صفحه"
              ></v-select>
            </div>
          </div>
        </template>
        <template #loading>
          <p class="text-body-2">در حال بارگذاری</p>
        </template>
        <template #no-data>
          <p class="text-body-2">داده ای برای نمایش وجود ندارد</p>
        </template>
        <template #item.type="{ value }">
          <v-chip
            :color="getChildColor(value.val)"
            dark
            class="rounded-xl text-body-2 px-6"
            >{{ value.text }}</v-chip
          >
        </template>
      </v-data-table>
    </v-card-text>
    <v-snackbar :value="error" color="error" dark :timeout="-1">
      <p>{{ error }}</p>
      <template #action="{ on, attrs }">
        <v-btn v-bind="attrs" text v-on="on" @click="clearError">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      error: '',
      table: {
        headers: [
          {
            text: 'کد پیگیری',
            value: 'id',
            align: 'start',
            sortable: false,
          },
          {
            text: 'تعداد',
            value: 'quantity',
            align: 'start',
            sortable: true,
          },
          {
            text: 'مبلغ هر تتر',
            value: 'unitPrice',
            align: 'start',
            sortable: true,
          },
          {
            text: 'مبلغ کل',
            value: 'totalPrice',
            align: 'start',
            sortable: true,
          },
          {
            text: 'نوع',
            value: 'type',
            align: 'start',
            sortable: true,
          },
          {
            text: 'تاریخ',
            value: 'date',
            align: 'start',
            sortable: true,
          },
        ],
        items: [],
        page: 1,
        pageSizes: [10, 25, 50, 100],
        pageSize: 10,
        totalLength: 0,
      },
    }
  },
  fetch() {
    this.loading = true
    this.error = ''
    try {
      this.table.items = []
      this.table.totalLength = 0
      this.table.totalLength = 100
      for (let i = 0; i < 100; i++) {
        const rand = Math.random()
        this.table.items.push({
          id: i,
          quantity: 10,
          unitPrice: `${new Intl.NumberFormat().format(5000000)} تومان`,
          totalPrice: `${new Intl.NumberFormat().format(10 * 5000000)} تومان`,
          type: {
            text: rand < 0.5 ? 'خرید تتر' : 'فروش تتر',
            val: rand < 0.5 ? 'buy' : 'sell',
          },
          date: '10 / 10 / 1400',
        })
      }
      this.loading = false
      this.error = ''
    } catch (err) {
      this.loading = false
      this.error =
        err.response?.data?.message || 'خطایی در حین دریافت اطلاعات رخ داد'
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.table.totalLength / this.table.pageSize)
    },
  },
  methods: {
    clearError() {
      this.error = ''
    },
    getChildColor(val) {
      switch (val) {
        case 'buy':
          return 'success'
        case 'sell':
          return 'error'
        default:
          return 'grey'
      }
    },
  },
}
</script>
