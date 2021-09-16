<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" lg="6">
          <v-card color="cardColor">
            <v-card-title
              class="text-subtitle-1 font-weight-bold titleColor--text"
            >
              تغییر رمز عبور
            </v-card-title>
            <v-card-text>
              <v-form
                ref="passwordForm"
                v-model="passwordChange.validity"
                @submit.prevent="changePasswordHandler"
              >
                <v-text-field
                  v-model="passwordChange.oldPassword"
                  type="password"
                  dense
                  outlined
                  :rules="passwordFormRules.oldPassword"
                  label="رمز عبور قدیمی"
                ></v-text-field>
                <v-text-field
                  v-model="passwordChange.newPassword"
                  type="password"
                  dense
                  outlined
                  :rules="passwordFormRules.newPassword"
                  label="رمز عبور جدید"
                ></v-text-field>
                <v-text-field
                  v-model="passwordChange.repeatPassword"
                  type="password"
                  dense
                  outlined
                  :rules="passwordFormRules.newPasswordRepeat"
                  label="تکرار رمز عبور جدید"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  dark
                  class="mt-2 mx-auto d-block"
                >
                  تغییر رمز عبور
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card color="cardColor">
            <v-card-title
              class="text-subtitle-1 font-weight-bold titleColor--text"
            >
              احراز هویت دو مرحله ای
            </v-card-title>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-card class="mt-6" color="cardColor">
      <v-card-title class="text-subtitle-1 font-weight-bold titlteColor--text">
        تاریخچه لاگین
      </v-card-title>
      <v-card-text>
        <v-data-table
          class="transparent"
          :headers="loginHistory.table.headers"
          :items="loginHistory.table.items"
          :page="loginHistory.table.page"
          :items-per-page="loginHistory.table.pageSize"
          hide-default-footer
          :loading="loading"
        >
          <template #loading>
            <p class="text-body2">در حال بارگذاری</p>
          </template>
          <template #no-data>
            <p class="text-body2">داده ای برای نمایش وجود ندارد</p>
          </template>
          <template #item.status="{ value }">
            <v-chip :color="getChipColor(value.value)" class="px-6">{{
              value.text
            }}</v-chip>
          </template>
          <template #footer>
            <div
              class="d-flex flex-column flex-md-row justify-space-between mt-4"
            >
              <v-pagination
                v-model="loginHistory.table.page"
                total-visible="5"
                color="secondary"
                circle
                :length="getPaginationLength"
                @input="changePageHandler"
              ></v-pagination>
              <div
                :style="{ width: '250px', 'max-width': '100%' }"
                class="mt-4 mt-md-0"
              >
                <v-select
                  v-model="loginHistory.table.pageSize"
                  :items="loginHistory.table.pageSizes"
                  dense
                  outlined
                  label="تعداد نتیجه در هر صفحه"
                  @change="changePageSizeHandler"
                ></v-select>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { isRequired, minLength, isSamePassword } from '~/utils/formValidation';
export default {
  layout: 'dashboard',
  meta: {
    auth: 'required',
  },
  data() {
    return {
      loading: false,
      success: '',
      error: '',
      passwordChange: {
        validity: true,
        oldPassword: null,
        newPassword: null,
        repeatPassword: null,
      },
      loginHistory: {
        table: {
          headers: [
            {
              text: 'تاریخ',
              value: 'date',
              sortable: true,
              align: 'start',
            },
            {
              text: 'آدرس IP',
              value: 'ip',
              sortable: true,
              align: 'start',
            },
            {
              text: 'شناسه مرورگر',
              value: 'browser',
              sortable: true,
              align: 'start',
            },
            {
              text: 'وضعیت',
              value: 'status',
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
      },
    };
  },
  fetch() {
    this.loading = true;
    this.success = '';
    this.error = '';
    try {
      this.loginHistory.table.items = [];
      this.loginHistory.table.totalLength = 100;
      for (let i = 0; i < 100; i++) {
        const randVal = Math.random();
        this.loginHistory.table.items.push({
          id: i,
          date: '1400/10/10',
          ip: '192.168.1.1',
          browser: 'chrome',
          status: {
            value: randVal < 0.5 ? 'success' : 'fail',
            text: randVal < 0.5 ? 'ورود موفق' : 'تلاش ناموفق',
          },
        });
      }
      this.loading = false;
      this.success = '';
      this.error = '';
    } catch (err) {
      this.loading = false;
      this.success = '';
      this.error =
        err.response?.data?.message || 'خطایی در حین دریافت اطلاعات رخ داد';
    }
  },
  head() {
    return {
      title: 'ارز فروش - امنیت',
    };
  },
  computed: {
    passwordFormRules() {
      return {
        oldPassword: [
          isRequired,
          minLength(this.passwordChange.oldPassword, 6),
        ],
        newPassword: [
          isRequired,
          minLength(this.passwordChange.newPassword, 6),
        ],
        newPasswordRepeat: [
          isRequired,
          minLength(this.passwordChange.repeatPassword, 6),
          isSamePassword(
            this.passwordChange.newPassword,
            this.passwordChange.repeatPassword
          ),
        ],
      };
    },
    getPaginationLength() {
      return Math.ceil(
        this.loginHistory.table.totalLength / this.loginHistory.table.pageSize
      );
    },
  },
  methods: {
    getChipColor(val) {
      switch (val) {
        case 'success':
          return 'success';
        case 'fail':
          return 'error';
        default:
          return 'grey';
      }
    },
    changePageHandler() {
      this.$fetch();
    },
    changePageSizeHandler() {
      this.loginHistory.table.page = 1;
      this.$fetch();
    },
    changePasswordHandler() {
      this.$refs.passwordForm.validate();
      if (!this.passwordChange.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text');
        });
      } else {
        this.loading = true;
        this.success = '';
        this.error = '';
        try {
          this.$refs.passwordForm.reset();
          this.loading = false;
          this.success = 'رمز عبور با موفقیت عوض شد';
          this.error = '';
        } catch (err) {
          this.loading = false;
          this.success = '';
          this.error =
            err.response?.data?.message ||
            'خطایی در حین عوض کردن رمز عبور رخ داد';
        }
      }
    },
  },
};
</script>
