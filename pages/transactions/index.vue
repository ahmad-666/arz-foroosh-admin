<template>
  <v-card color="cardColor">
    <v-card-title class="titleColor--text text-subtitle-1 font-weight-bold">
      لیست تراکنش ها
    </v-card-title>
    <v-card-text>
      <v-data-table
        class="transparent"
        :headers="table.headers"
        :items="table.items"
        :page="table.page"
        :items-per-page="table.pageSize"
        :loading="loading"
        hide-default-footer
      >
        <template #loading>
          <p class="text-body-2">در حال بارگذاری</p>
        </template>
        <template #no-data>
          <p class="text-body-2">داده ای برای نمایش وجود ندارد</p>
        </template>
        <template #footer>
          <div
            class="mt-6 d-flex flex-column flex-md-row justify-md-space-between"
          >
            <v-pagination
              v-model="table.page"
              total-visible="5"
              :length="totalPages"
              circle
              color="secondary"
              @input="changePageHandler"
            ></v-pagination>
            <div
              :style="{ width: '250px', 'max-width': '100%' }"
              class="mt-6 mt-md-0 mx-auto mx-md-0"
            >
              <v-select
                v-model="table.pageSize"
                :items="table.pageSizes"
                label="تعداد نتیجه در هر صفحه"
                dense
                outlined
                @change="changePageSizeHandler"
              ></v-select>
            </div>
          </div>
        </template>
        <template #item.type="{ value }">
          <v-chip
            class="px-6 text-body-2 rounded-xl"
            dark
            :color="getChipColor(value.value)"
            >{{ value.text }}</v-chip
          >
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      success: '',
      error: '',
      table: {
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
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100],
        totalLength: 0,
      },
    }
  },
  fetch() {
    this.loading = true
    this.success = ''
    this.error = ''
    try {
      this.table.items = []
      this.table.totalLength = 100
      for (let i = 0; i < 100; i++) {
        const randVal = Math.random()
        this.table.items.push({
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
    totalPages() {
      return Math.ceil(this.table.totalLength / this.table.pageSize)
    },
  },
  methods: {
    getChipColor(val) {
      switch (val) {
        case 'deposit':
          return 'success'
        case 'withdraw':
          return 'error'
        default:
          return 'grey'
      }
    },
    changePageHandler() {
      this.$fetch()
    },
    changePageSizeHandler() {
      this.table.page = 1
      this.$fetch()
    },
  },
}
</script>
