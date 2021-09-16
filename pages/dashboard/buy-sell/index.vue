<template>
  <v-card color="cardColor">
    <v-card-text
      class="
        d-flex
        align-stretch
        flex-column flex-md-row
        align-md-start
        pa-0
        position-relative
      "
    >
      <div class="flex-grow-1 pa-4">
        <v-form
          ref="buyForm"
          v-model="buy.validity"
          class="fill-height"
          @submit.prevent="buySubmitHandler"
        >
          <h6 class="success--text text-h6 font-weight-bold text-center">
            خرید تتر
          </h6>
          <v-text-field
            v-model="buy.amount"
            type="number"
            label="تعداد درخواستی"
            dense
            outlined
            :rules="[formRuleIsRequired]"
            validate-on-blur
            class="mt-4"
          ></v-text-field>
          <v-text-field
            v-model="buy.price"
            label="مبلغ قابل پرداخت (تومان)"
            dense
            outlined
          ></v-text-field>
          <v-btn
            type="submit"
            class="mt-4 mx-auto d-block rounded-xl"
            color="success"
            dark
            :loading="loading"
            >ثبت درخواست خرید</v-btn
          >
        </v-form>
      </div>
      <div class="flex-grow-1 pa-4">
        <v-form
          ref="sellForm"
          v-model="sell.validity"
          class="fill-height"
          @submit.prevent="sellSubmitHandler"
        >
          <h6 class="error--text text-h6 font-weight-bold text-center">
            فروش تتر
          </h6>
          <v-text-field
            v-model="sell.amount"
            type="number"
            label="تعداد درخواستی"
            dense
            outlined
            :rules="[formRuleIsRequired]"
            validate-on-blur
            class="mt-4"
          ></v-text-field>
          <v-text-field
            v-model="sell.price"
            label="مبلغ قابل دریافت (تومان)"
            dense
            outlined
          ></v-text-field>
          <v-btn
            type="submit"
            class="mt-4 mx-auto d-block rounded-xl"
            color="error"
            dark
            :loading="loading"
            >ثبت درخواست فروش</v-btn
          >
        </v-form>
      </div>
      <div
        class="
          fill-height
          position-absolute
          float-part
          d-flex
          justify-center
          align-center
        "
        :style="floatPartInlineStyle"
      >
        <transition name="fade" mode="out-in">
          <div
            v-if="mode === 'buy'"
            :style="{ 'background-image': buy.gradient }"
            class="width-100 fill-height position-absolute z-index-1"
          ></div>
          <div
            v-else
            :style="{ 'background-image': sell.gradient }"
            class="width-100 fill-height position-absolute z-index-1"
          ></div>
        </transition>
        <div class="z-index-2">
          <p class="text-subtitle-1 white--text">
            قیمت لحظه ای تتر:
            {{ new Intl.NumberFormat().format(tetherPrice) }} تومان
          </p>
          <v-btn
            dark
            :color="changeModeBtnColor"
            class="mt-2 text-body-2"
            @click="toggleMode"
            >{{ changeModeBtnText }}</v-btn
          >
        </div>
      </div>
    </v-card-text>
    <v-snackbar :value="success" dark :timeout="2000" color="success">
      <p>{{ success }}</p>
    </v-snackbar>
    <v-snackbar :value="error" dark :timeout="-1" color="error">
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
import { isRequired } from '~/utils/formValidation';
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
      tetherPrice: 30, // use socket for find this value
      mode: 'buy', // 'buy','sell'
      buy: {
        validity: null,
        amount: null,
        price: null,
        gradient:
          'linear-gradient(134.6deg, rgb(201, 37, 107) 15.4%, rgb(116, 16, 124) 74.7%)',
      },
      sell: {
        validity: true,
        amount: null,
        price: null,
        gradient:
          'linear-gradient(109.6deg, rgb(61, 245, 167) 11.2%, rgb(9, 111, 224) 91.1%)',
      },
    };
  },
  head() {
    return {
      title: 'ارز فروش - خرید و فروش',
    };
  },
  computed: {
    formRuleIsRequired() {
      return isRequired;
    },
    isSmallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    changeModeBtnText() {
      if (this.mode === 'buy') return 'رفتن به حالت فروش تتر';
      else return 'رفتن به حالت خرید تتر';
    },
    changeModeBtnColor() {
      if (this.mode === 'buy') return 'error';
      else return 'success';
    },
    floatPartInlineStyle() {
      if (!this.isSmallScreen && this.mode === 'buy') {
        return {
          top: '0%',
          left: '0%',
        };
      } else if (!this.isSmallScreen && this.mode === 'sell') {
        return {
          top: '0%',
          left: '50%',
        };
      } else if (this.isSmallScreen && this.mode === 'buy') {
        return {
          left: '0%',
          bottom: '0%',
        };
      } else if (this.isSmallScreen && this.mode === 'sell') {
        return {
          left: '0%',
          bottom: '50%',
        };
      } else return null;
    },
    buyAmount() {
      return this.buy.amount;
    },
    buyPrice() {
      return this.buy.price;
    },
    sellAmount() {
      return this.sell.amount;
    },
    sellPrice() {
      return this.sell.price;
    },
  },
  watch: {
    tetherPrice: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.buy.amount = 0;
          this.buy.price = 0;
          this.sell.amount = 0;
          this.sell.price = 0;
        } else {
          if (this.buy.price) {
            this.buy.amount = +this.buy.price.replace(/,/gim, '') / +val;
          }
          if (this.buy.amount) {
            this.buy.price = new Intl.NumberFormat().format(
              +this.buy.amount * +val
            );
          }
          if (this.sell.price) {
            this.sell.amount = +this.sell.price.replace(/,/gim, '') / +val;
          }
          if (this.sell.amount) {
            this.sell.price = new Intl.NumberFormat().format(
              +this.sell.amount * +val
            );
          }
        }
      },
    },
    buyAmount: {
      immediate: true,
      handler(val) {
        if (!val || !this.tetherPrice) this.buy.price = 0;
        else
          this.buy.price = new Intl.NumberFormat().format(
            +val * +this.tetherPrice
          );
      },
    },
    buyPrice: {
      immediate: true,
      handler(val) {
        if (!val || !this.tetherPrice) this.buy.amount = 0;
        else {
          const convertedVal = val.replace(/,/gim, '');
          this.buy.amount = +convertedVal / +this.tetherPrice;
        }
      },
    },
    sellAmount: {
      immediate: true,
      handler(val) {
        if (!val || !this.tetherPrice) this.sell.price = 0;
        else
          this.sell.price = new Intl.NumberFormat().format(
            +val * +this.tetherPrice
          );
      },
    },
    sellPrice: {
      immediate: true,
      handler(val) {
        if (!val || !this.tetherPrice) this.sell.amount = 0;
        else {
          const convertedVal = val.replace(/,/gim, '');
          this.sell.amount = +convertedVal / +this.tetherPrice;
        }
      },
    },
  },
  // mounted() {
  //   setInterval(() => {
  //     // for simulate socket behaviour
  //     this.tetherPrice = Math.floor(Math.random() * 100)
  //   }, 2000)
  // },
  methods: {
    clearError() {
      this.error = '';
    },
    toggleMode() {
      this.mode = this.mode === 'buy' ? 'sell' : 'buy';
    },
    buySubmitHandler() {
      this.$refs.buyForm.validate();
      if (!this.buy.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text');
        });
      } else {
        this.loading = true;
        this.success = '';
        this.error = '';
        try {
          this.buy.amount = 0;
          this.buy.price = 0;
          this.sell.amount = 0;
          this.sell.price = 0;
          this.$refs.buyForm.resetValidation();
          this.loading = false;
          this.success = 'ثبت درخواست خرید با موفقیت انجام شد';
          this.error = '';
        } catch (err) {
          this.loading = false;
          this.success = '';
          this.error =
            err.response?.data?.message || 'ثبت درخواست با خطا مواجه شد';
        }
      }
    },
    sellSubmitHandler() {
      this.$refs.sellForm.validate();
      if (!this.sell.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text');
        });
      } else {
        this.loading = true;
        this.success = '';
        this.error = '';
        try {
          this.sell.amount = null;
          this.$refs.sellForm.resetValidation();
          this.loading = false;
          this.success = 'ثبت درخواست فروش با موفقیت انجام شد';
          this.error = '';
        } catch (err) {
          this.loading = false;
          this.success = '';
          this.error =
            err.response?.data?.message || 'ثبت درخواست با خطا مواجه شد';
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.float-part {
  width: 50%;
  height: 100%;
  transition: all 0.5s ease-in-out;
}
@media screen and (max-width: 750px) {
  .float-part {
    width: 100%;
    height: 50%;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.face-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
</style>
