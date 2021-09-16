<template>
  <div>
    <v-card color="cardColor">
      <v-card-title class="d-flex justify-center">
        <p class="text-subtitle-1 font-weight-bold titleColor--text">
          <v-icon class="ml-1"> mdi-code-json</v-icon>
          کد دعوت شما
        </p>
      </v-card-title>
      <v-card-text>
        <p>میتوانید دوستان خود را با لینک زیر به ارز فرش دعوت کنید</p>
        <div class="mt-4">
          <div class="d-flex justify-space-between flex-wrap py-3">
            <p class="text-body-2 textColor--text">کد دعوت شما</p>
            <p class="text-body-2 textColor--text secondary--text">
              {{ defaultCode }}
            </p>
          </div>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between flex-wrap py-3">
            <p class="text-body-2 textColor--text">لینک دعوت شما</p>
            <p class="text-body-2 textColor--text secondary--text">
              {{ defaultLink }}
            </p>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card color="cardColor" class="mt-6">
      <v-card-title
        class="
          d-flex
          justify-center
          text-subtitle-1
          font-weight-bold
          titleColor--text
        "
      >
        <p>
          <v-icon class="ml-1" size="20">mdi-file-table-outline</v-icon>
          کدهای دعوت ایجاد شده
        </p>
      </v-card-title>
      <v-card-text>
        <v-data-table
          class="transparent"
          :headers="table.headers"
          :items="table.items"
          hide-default-footer
          :loading="loading"
        >
          <template #loading>
            <p class="text-body-2">در حال بارگذاری</p>
          </template>
          <template #no-data>
            <p class="text-body-2">داده ای برای نمایش وجود ندارد</p>
          </template>
          <template #item.link="{ value }">
            <div class="d-flex align-center flex-nowrap">
              <v-btn
                small
                color="titleColor"
                text
                @click="copyLinkToClipBoard(value)"
              >
                <v-icon size="20">mdi-clipboard-outline</v-icon>
              </v-btn>
              <p class="mr-0 text-body-2 titleColor--text">{{ value }}</p>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-snackbar :value="success" color="success" dark :timeout="2000">
      <p>{{ success }}</p>
    </v-snackbar>
    <v-snackbar :value="error" color="error" dark :timeout="-1">
      <template #action="{ on, attrs }">
        <v-btn v-bind="attrs" text v-on="on" @click="clearError">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </template>
      <p>{{ error }}</p>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      error: '',
      success: '',
      defaultCode: null,
      defaultLink: null,
      table: {
        headers: [
          {
            text: 'کد دعوت',
            value: 'code',
            sortable: false,
            align: 'start',
          },
          {
            text: 'لینک دعوت',
            value: 'link',
            sortable: false,
            align: 'start',
          },
          {
            text: 'سهم شما',
            value: 'yourShare',
            sortable: true,
            align: 'start',
          },
          {
            text: 'سهم دوستان',
            value: 'friendShare',
            sortable: true,
            align: 'start',
          },
          {
            text: 'تعداد دوستان',
            value: 'friendsQuantity',
            sortable: true,
            align: 'start',
          },
          {
            text: 'مجموع کارمزد دریافتی',
            value: 'totalWage',
            sortable: false,
            align: 'start',
          },
        ],
        items: [],
      },
    };
  },
  fetch() {
    this.loading = true;
    this.error = '';
    try {
      this.defaultCode = '#abc123';
      this.defaultLink = `www.domain.com/login?code=${this.defaultCode}`;
      this.table.items = [];
      for (let i = 0; i < 100; i++) {
        this.table.items.push({
          id: i,
          code: '#abc123',
          link: 'www.domain.com/login?code=abc123',
          yourShare: '15%',
          friendShare: '15%',
          friendsQuantity: 2,
          totalWage: `${new Intl.NumberFormat().format(5000000)} تومان`,
        });
      }
      this.loading = false;
      this.error = '';
    } catch (err) {
      this.loading = false;
      this.error =
        err.response?.data?.message || 'خطایی در حین دریافت اطلاعات رخ داد';
    }
  },
  methods: {
    clearError() {
      this.error = '';
    },
    copyLinkToClipBoard(val) {
      navigator.clipboard.writeText(val);
      this.success = 'کد با موفقیت کپی شد';
    },
  },
};
</script>
