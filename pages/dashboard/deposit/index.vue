<template>
  <v-card color="cardColor">
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <v-row align="center" align-lg="stretch" class="width-100 ma-0">
          <v-col cols="12" lg="4" xl="3" class="pa-0">
            <div class="fill-height position-relative">
              <v-img
                width="100%"
                height="100%"
                class="position-relative z-index-1"
                src="/imgs/deposit.jpg"
              ></v-img>
              <v-overlay
                color="rgb(0,0,0)"
                opacity=".5"
                z-index="2"
                absolute
              ></v-overlay>
            </div>
          </v-col>
          <v-col cols="12" lg="8" xl="9">
            <v-stepper v-model="step" class="transparent" elevation="0">
              <v-stepper-items>
                <v-stepper-content :step="1" class="pa-0">
                  <v-form
                    ref="deposit"
                    v-model="deposit.validity"
                    class="fill-height"
                    @submit.prevent="depositSubmitHandler"
                  >
                    <h6 class="text-h6 font-weight-bold titleColor--text">
                      واریز
                    </h6>
                    <v-container class="mt-4">
                      <v-row>
                        <v-col cols="12">
                          <p class="text-body-2 textColor--text">
                            ابتدا شبکه انتقال را انتخاب کنید و آدرس ولت را بر
                            اساس شبکه انتقال انتخابی کپی کنید
                          </p>
                        </v-col>
                        <v-col cols="12" md="6" lg="9">
                          <v-select
                            v-model="deposit.network"
                            :items="deposit.networkItems"
                            dense
                            outlined
                            label="شبکه انتقال"
                            :rules="[formRuleIsRequired]"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="deposit.wallet"
                            dense
                            outlined
                            :label="walletLabel"
                            :rules="[formRuleIsRequired]"
                            class="with-copy-icon"
                            readonly
                          >
                            <template #append>
                              <v-btn
                                small
                                color="info"
                                dark
                                :style="{
                                  'margin-left': '-12px',
                                  height: '39px',
                                }"
                                @click="copyToClipboard"
                              >
                                <v-icon size="20"
                                  >mdi-clipboard-edit-outline</v-icon
                                >
                              </v-btn>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-divider class="mt-4"></v-divider>
                      <v-row class="mt-6">
                        <v-col cols="12">
                          <p class="text-body-2 textColor--text">
                            پس از انتقال یک کد تراکنش (txId) دریافت میکنید که در
                            باکس زیر وارد کنید
                          </p>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="deposit.code"
                            dense
                            outlined
                            label="کد تراکنش"
                            :rules="[formRuleIsRequired]"
                            validate-on-blur
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="deposit.amount"
                            dense
                            outlined
                            label="مقدار(اختیاری)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-btn
                        type="submit"
                        class="mt-2 mx-auto d-block"
                        color="primary"
                        dark
                      >
                        مرحله بعد
                      </v-btn>
                    </v-container>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content :step="2" class="pa-0">
                  <div
                    class="mx-auto"
                    :style="{ width: '500px', 'max-width': '100%' }"
                  >
                    <h6
                      class="
                        text-center text-subtitle-1
                        font-weight-bold
                        titleColor--text
                      "
                    >
                      اطلاعات واریز شما
                    </h6>
                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">شبکه انتقال</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ deposit.network }}
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">آدرس ولت</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ deposit.wallet }}
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">کد تراکنش</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ deposit.code }}
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">مقدار</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ deposit.amount }}
                      </p>
                    </div>
                    <div class="mt-4 d-flex justify-center align-center">
                      <v-btn color="secondary" dark @click="prevStep"
                        >مرحله قبل</v-btn
                      >
                      <v-btn
                        color="primary"
                        dark
                        :loading="loading"
                        class="mr-4"
                        @click="sendDepositReq"
                        >ثبت درخواست واریز</v-btn
                      >
                    </div>
                  </div>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-snackbar :value="success" color="success" dark :timeout="2000">
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
import { isRequired } from '~/utils/formValidation'
export default {
  layout: 'dashboard',

  data() {
    return {
      loading: false,
      success: '',
      error: '',
      step: 1,
      deposit: {
        validity: true,
        network: 'TRC20',
        networkItems: [
          {
            text: 'TRC20',
            value: 'TRC20',
          },
          {
            text: 'BEP2',
            value: 'BEP2',
          },
          {
            text: 'ERC20',
            value: 'ERC20',
          },
          {
            text: 'BEP20',
            value: 'BEP20',
          },
        ],
        wallet: null,
        walletItems: [],
        code: null,
        amount: null,
      },
    }
  },
  fetch() {
    this.loading = true
    this.success = ''
    this.error = ''
    try {
      this.deposit.walletItems = [
        {
          network: 'TRC20',
          wallet: '4236575ggf333454@#$#vv334442',
        },
        {
          network: 'BEP2',
          wallet: '6546ghh$%#vc2214fDSFds',
        },
        {
          network: 'ERC20',
          wallet: '3221VVMghj65756DDFFFsss',
        },
        {
          network: 'BEP20',
          wallet: 'Nfd3434DSFDS23123fdfsdf##',
        },
      ]
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
    formRuleIsRequired() {
      return isRequired
    },
    walletLabel() {
      const msg1 = 'آدرس ولت در شبکه'
      const msg2 = this.deposit.network
      return msg1 + msg2
    },
    depositNetWorkWallet() {
      return {
        network: this.deposit.network,
        walletItems: this.deposit.walletItems,
      }
    },
  },
  watch: {
    depositNetWorkWallet: {
      immediate: true,
      deep: true,
      handler({ network, walletItems }) {
        this.deposit.wallet =
          walletItems.find(wallet => wallet.network === network)?.wallet || null
      },
    },
  },
  methods: {
    clearError() {
      this.error = ''
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.deposit.wallet)
      this.success = 'با موفقیت کپی شد'
    },
    depositSubmitHandler() {
      this.$refs.deposit.validate()
      if (!this.deposit.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text')
        })
      } else {
        this.step = 2
      }
    },
    prevStep() {
      this.step = 1
    },
    sendDepositReq() {
      this.loading = true
      this.success = ''
      this.error = ''
      try {
        this.step = 1
        // this.$refs.deposit.reset()
        this.deposit.network = 'TRC20'
        this.deposit.code = null
        this.deposit.amount = null
        this.loading = false
        this.success = 'درخواست واریز با موفقیت ثبت شد'
        this.error = ''
      } catch (err) {
        this.loading = false
        this.success = ''
        this.error =
          err.response?.data?.message || 'مشکلی در ثبت درخواست بوجود آمد'
      }
    },
  },
}
</script>
