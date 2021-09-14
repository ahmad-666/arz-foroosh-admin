<template>
  <v-stepper
    v-model="step"
    color="transparent"
    :elevation="0"
    class="pa-0 pa-md-4 transparent"
  >
    <v-stepper-header
      class="d-flex align-center flex-nowrap justify-center elevation-0"
      :elevation="0"
    >
      <template v-for="s in steps">
        <div
          :key="`${s.id}-line`"
          class="line white mt-n6"
          :style="{ width: '100px', height: '2px' }"
        ></div>
        <div
          :key="`${s.id}-circle`"
          class="custom-step d-flex flex-column align-center mx-2"
        >
          <div
            class="circle rounded-circle d-flex align-center justify-center"
            :style="{
              width: '5em',
              height: '5em',
              'background-color': step !== s.step ? '#eccf8d' : '#e6b24c',
            }"
          >
            <v-icon size="25" color="white">{{ s.icon }}</v-icon>
          </div>
          <p
            class="mt-2 text-caption textColor--text text--darken-1 text-center"
            :class="{
              'titleColor--text': step === s.step,
            }"
            :style="{ width: '200%' }"
          >
            {{ s.text }}
          </p>
        </div>
      </template>
      <div
        class="line white mt-n6"
        :style="{ width: '100px', height: '2px' }"
      ></div>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content :step="1">
        <v-btn @click="step = 2">next step</v-btn>
      </v-stepper-content>
      <v-stepper-content :step="2">
        <v-form
          ref="buySellForm"
          v-model="buySellFormValidity"
          @submit.prevent="buySellSubmitHandler"
        >
          <div class="d-flex flex-column flex-sm-row">
            <v-btn
              type="button"
              :class="{
                primary: buySellMode === 'buy-tether',
                'white--text': buySellMode === 'buy-tether',
                white: buySellMode === 'sell-tether',
                'titleColor--text': buySellMode === 'sell-tether',
              }"
              class="rounded-t-xl py-4 px-8"
              @click="changeBuySellMode('buy-tether')"
              >خرید تتر</v-btn
            >
            <v-btn
              type="button"
              :class="{
                primary: buySellMode === 'sell-tether',
                'white--text': buySellMode === 'sell-tether',
                white: buySellMode === 'buy-tether',
                'titleColor--text': buySellMode === 'buy-tether',
              }"
              class="rounded-t-xl mt-2 mt-sm-0 py-4 px-8"
              @click="changeBuySellMode('sell-tether')"
              >فروش تتر</v-btn
            >
          </div>
          <div class="mt-6 d-flex justify-space-between align-center">
            <p class="titleColor--text text-body-2 font-weight-bold">
              {{ tetherText }}
            </p>
            <p
              v-if="isMdAndUp"
              class="titleColor--text text-body-2 font-weight-bold"
            >
              {{ toomanText }}
            </p>
          </div>
          <div
            class="
              d-flex
              flex-column
              align-center
              flex-md-row
              align-md-stretch
              justify-center
              position-relative
              overflow-hidden
            "
          >
            <div :style="{ width: isMdAndUp ? '50%' : '100%' }">
              <v-text-field
                v-model="tether"
                type="number"
                background-color="white"
                solo
                :rules="[formRequired]"
                prefix="تتر"
                class="mt-4 mx-0 input-direction-rtl"
                :class="{
                  'rounded-0': isMdAndUp,
                  'rounded-r-lg': isMdAndUp,
                  'rounded-lg': !isMdAndUp,
                }"
              ></v-text-field>
            </div>
            <div
              :style="{ width: isMdAndUp ? '50%' : '100%', direction: 'ltr' }"
              :class="{ 'mt-3': !isMdAndUp }"
            >
              <p
                v-if="!isMdAndUp"
                class="titleColor--text text-body-2 font-weight-bold"
              >
                {{ toomanText }}
              </p>
              <v-text-field
                v-model="tooman"
                class="mt-4 input-direction-ltr mx-0"
                :class="{
                  'rounded-0': isMdAndUp,
                  'rounded-l-lg': isMdAndUp,
                  'rounded-lg': !isMdAndUp,
                }"
                type="number"
                background-color="white"
                solo
                :rules="[formRequired]"
                prefix="تومان"
              ></v-text-field>
            </div>
            <div class="between-wrapper" :class="{ 'mt-2': !isMdAndUp }">
              <div v-if="isMdAndUp" class="between-line"></div>
              <v-btn
                small
                class="
                  d-flex
                  flex-column
                  justify-center
                  align-center
                  between-btn
                "
                :style="{ transition: 'all .3s ease-in-out' }"
                :class="{
                  'rotate-0': buySellMode === 'buy-tether',
                  'rotate-180': buySellMode === 'sell-tether',
                }"
                :color="buySellColor"
                @click="toggleMode"
              >
                <v-img
                  eager
                  src="imgs/arrow-double.png"
                  width="30px"
                  height="auto"
                ></v-img>
              </v-btn>
            </div>
          </div>

          <v-btn
            type="submit"
            class="mt-4 mx-auto pa-4 px-8 position-relative pos-center"
            color="primary"
            dark
            >پرداخت</v-btn
          >
          <v-snackbar
            v-model="buySellShowSnackbar"
            :timeout="2000"
            :color="buySellColor"
          >
            <p class="text-body-2 white--text">
              {{ buySellSnackbarText }}
            </p>
          </v-snackbar>
        </v-form>
      </v-stepper-content>
      <v-stepper-content :step="3">
        <v-btn @click="step = 4">next step</v-btn>
      </v-stepper-content>
      <v-stepper-content :step="4">
        <v-btn @click="step = 1">next step</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import { isRequired } from '~/utils/formValidation'
export default {
  data() {
    return {
      step: 1,
      steps: [],
      buySellMode: 'buy-tether',
      // 'buy-tether' for buy tether | 'sell-tether' for sell tether
      tooman: null,
      tether: null,
      buyMultiplier: null,
      sellMultiplier: null, //
      buySellShowSnackbar: false,
      buySellFormValidity: true,
    }
  },
  fetch() {
    this.steps = [
      {
        id: 1,
        icon: 'mdi-bitcoin',
        text: 'مقدار',
        step: 1,
      },
      {
        id: 2,
        icon: 'mdi-send-circle-outline',
        text: 'ارسال کوین',
        step: 2,
      },
      {
        id: 3,
        icon: 'mdi-check',
        text: 'تایید نهایی',
        step: 3,
      },
      {
        id: 4,
        icon: 'mdi-shield-check',
        text: 'پایان تراکنش',
        step: 4,
      },
    ]
    this.buyMultiplier = 1000
    this.sellMultiplier = 900
  },
  computed: {
    formRequired() {
      return isRequired
    },
    buySellSnackbarText() {
      const buyText = 'نوع تبادل به خرید تتر تغییر کرد'
      const sellText = 'نوع تبادل به فروش تتر تغییر کرد'
      return this.buySellMode === 'buy-tether' ? buyText : sellText
    },
    tetherText() {
      const buyText = 'دریافت میکنید'
      const sellText = 'پرداخت میکنید'
      return this.buySellMode === 'buy-tether' ? buyText : sellText
    },
    toomanText() {
      const buyText = 'پرداخت میکنید'
      const sellText = 'دریافت میکنید'
      return this.buySellMode === 'buy-tether' ? buyText : sellText
    },
    buySellColor() {
      return this.buySellMode === 'buy-tether' ? 'primary' : 'error'
    },
    isMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp
    },
  },
  watch: {
    buySellMode(val) {
      this.buySellShowSnackbar = true
    },
    tether(val) {
      if (this.buySellMode === 'buy-tether')
        this.tooman = val * this.buyMultiplier
      else if (this.buySellMode === 'sell-tether')
        this.tooman = val * this.sellMultiplier
    },
    tooman(val) {
      if (this.buySellMode === 'buy-tether')
        this.tether = val / this.buyMultiplier
      else if (this.buySellMode === 'sell-tether')
        this.tether = val / this.sellMultiplier
    },
  },
  methods: {
    toggleMode() {
      if (this.buySellMode === 'buy-tether') this.buySellMode = 'sell-tether'
      else if (this.buySellMode === 'sell-tether')
        this.buySellMode = 'buy-tether'
    },
    changeBuySellMode(mode) {
      this.buySellMode = mode
    },
    buySellSubmitHandler() {
      this.$refs.buySellForm.validate()
      if (this.buySellFormValidity) {
        this.step = 3
      }
    },
  },
}
</script>
<style lang="scss">
.input-direction-rtl {
  input {
    direction: rtl !important;
  }
}
.input-direction-ltr {
  input {
    direction: ltr !important;
  }
}
.rotate-0 {
  transform: translate(50%, -50%) rotate(0deg) !important;
}
.rotate-180 {
  transform: translate(50%, -50%) rotate(180deg) !important;
}
.between-wrapper {
  position: absolute;
  right: 50%;
  top: 0;
  height: 100%;
  transform: translateX(50%);
  .between-line {
    width: 1px;
    height: 50%;
    position: absolute;
    right: 50%;
    top: 43%;
    transform: translate(50%, -50%);
    background-color: teal;
    z-index: 1;
  }
  .between-btn {
    width: 3em !important;
    height: 3em !important;
    min-width: initial !important;
    border-radius: 50%;
    position: absolute;
    right: 50%;
    top: 43%;
    transform: translate(50%, -50%);
    z-index: 2;
  }
}
</style>
