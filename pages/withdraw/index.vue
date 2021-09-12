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
                src="/imgs/withdraw.jpg"
              ></v-img>
              <v-overlay
                color="rgb(0,0,0)"
                opacity=".5"
                z-index="2"
                absolute
              ></v-overlay>
            </div>
          </v-col>
          <v-col cols="12" lg="8" xl="9" class="pa-4">
            <v-stepper v-model="step" class="transparent" elevation="0">
              <v-stepper-items>
                <v-stepper-content :step="1" class="pa-0">
                  <v-form
                    ref="withdraw"
                    v-model="withdraw.validity"
                    class="fill-height"
                    @submit.prevent="withdrawSubmitHandler"
                  >
                    <h6 class="text-h6 font-weight-bold titleColor--text">
                      برداشت
                    </h6>
                    <v-container class="mt-4">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="withdraw.wallet"
                            dense
                            outlined
                            label="آدرس ولت"
                            :rules="[formRuleIsRequired]"
                            validate-on-blur
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="withdraw.network"
                            :items="withdraw.networkItems"
                            dense
                            outlined
                            label="شبکه انتقال"
                            :rules="[formRuleIsRequired]"
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="withdraw.amount"
                            type="number"
                            dense
                            outlined
                            label="مقدار درخواستی"
                            :rules="[formRuleIsRequired]"
                          >
                          </v-text-field>
                          <div :style="{ width: '200px', 'max-width': '100%' }">
                            <v-switch
                              v-model="withdraw.withdrawAll"
                              color="secondary"
                              label="برداشت کل موجودی"
                            ></v-switch>
                          </div>

                          <div
                            class="mx-auto"
                            :style="{ width: '500px', 'max-width': '100%' }"
                          >
                            <div
                              class="
                                d-flex
                                justify-space-between
                                flex-wrap
                                py-3
                              "
                            >
                              <p class="textColor--text text-body-2">
                                موجودی شما
                              </p>
                              <p
                                class="
                                  titleColor--text
                                  text-body-2
                                  max-width-100
                                "
                              >
                                {{ new Intl.NumberFormat().format(stock) }}
                                تتر
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div
                              class="
                                d-flex
                                justify-space-between
                                flex-wrap
                                py-3
                              "
                            >
                              <p class="textColor--text text-body-2">
                                فی تراکنش
                              </p>
                              <p
                                class="
                                  titleColor--text
                                  text-body-2
                                  max-width-100
                                "
                              >
                                {{
                                  new Intl.NumberFormat().format(priceOffset)
                                }}
                                تتر
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div
                              class="
                                d-flex
                                justify-space-between
                                flex-wrap
                                py-3
                              "
                            >
                              <p class="textColor--text text-body-2">
                                دریافتی شما
                              </p>
                              <p
                                class="
                                  titleColor--text
                                  text-body-2
                                  max-width-100
                                "
                              >
                                {{ new Intl.NumberFormat().format(receive) }}
                                تتر
                              </p>
                            </div>
                          </div>
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
                      اطلاعات برداشت شما
                    </h6>
                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">آدرس ولت</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ withdraw.wallet }}
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">شبکه انتقال</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ withdraw.network }}
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">مقدار درخواستی</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ withdraw.amount }} ‌تتر
                      </p>
                    </div>
                    <v-divider></v-divider>

                    <div class="d-flex justify-space-between flex-wrap py-3">
                      <p class="text-body-2 textColor--text">دریافتی شما</p>
                      <p class="text-body-2 titleColor--text max-width-100">
                        {{ receive }} ‌تتر
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
                        @click="sendWithdrawReq"
                        >ثبت درخواست برداشت</v-btn
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
  data() {
    return {
      loading: false,
      success: '',
      error: '',
      step: 1,
      withdraw: {
        validity: true,
        wallet: null,
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
            text: 'BEP20',
            value: 'BEP20',
          },
          {
            text: 'ERC20',
            value: 'ERC20',
          },
        ],
        amount: null,
        withdrawAll: false,
      },
      stock: null,
      priceOffset: null,
      receive: null,
    }
  },
  fetch() {
    this.loading = true
    this.success = ''
    this.error = ''
    try {
      this.stock = 10
      this.priceOffset = 0.1
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
    withdrawAmount() {
      return this.withdraw.amount
    },
    withdrawAll() {
      return this.withdraw.withdrawAll
    },
  },
  watch: {
    withdrawAmount: {
      immediate: true,
      handler(val) {
        if (this.priceOffset === 0) this.receive = val
        else {
          const totalOffset = this.priceOffset * this.withdraw.amount
          this.receive = this.withdraw.amount - totalOffset
        }
      },
    },
    withdrawAll: {
      immediate: true,
      handler(val) {
        if (!val) this.withdraw.amount = null
        else this.withdraw.amount = this.stock
      },
    },
  },
  methods: {
    clearError() {
      this.error = ''
    },
    withdrawSubmitHandler() {
      this.$refs.withdraw.validate()
      if (!this.withdraw.validity) {
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
    sendWithdrawReq() {
      this.loading = true
      this.success = ''
      this.error = ''
      try {
        this.withdraw.wallet = null
        this.withdraw.network = 'TRC20'
        this.withdraw.amount = null
        this.withdraw.withdrawAll = false
        this.withdraw.wallet = null
        this.$refs.withdraw.resetValidation()
        this.step = 1
        this.loading = false
        this.success = 'درخواست برداشت شما با موفقیت ثبت شد'
        this.error = ''
      } catch (err) {
        this.loading = false
        this.success = ''
        this.error =
          err.response?.data?.message || 'خطایی در حین ثبت درخواست رخ داد'
      }
    },
  },
}
</script>
