<template>
  <v-card color="cardColor">
    <v-stepper
      v-model="step"
      alt-labels
      :style="{ backgroundColor: 'transparent !important' }"
    >
      <v-stepper-header class="elevation-0">
        <v-stepper-step :step="1" :complete="step > 1" class="px-0 py-2">
          <p class="text-body-2">اطلاعات شخصی</p>
        </v-stepper-step>
        <v-divider
          :class="{ activeDividerClass: step > 1 }"
          class="mt-5"
        ></v-divider>
        <v-stepper-step :step="2" :complete="step > 2" class="px-0 py-2">
          <p class="text-body-2">اطلاعات ارتباطی</p>
        </v-stepper-step>
        <v-divider
          :class="{ activeDividerClass: step > 2 }"
          class="mt-5"
        ></v-divider>
        <v-stepper-step :step="3" :complete="step > 3" class="px-0 py-2">
          <p class="text-body-2">اطلاعات بانکی</p>
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items class="pa-0 pb-4">
        <v-stepper-content :step="1" class="pa-0">
          <v-form
            ref="infoForm"
            v-model="infoForm.validity"
            class="infoForm"
            @submit.prevent="infoSubmitHandler"
          >
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="infoForm.fName"
                    dense
                    outlined
                    :rules="[formRuleRequired]"
                    label="نام"
                    prepend-icon="mdi-account-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="infoForm.lName"
                    dense
                    outlined
                    :rules="[formRuleRequired]"
                    label="نام خانوادگی"
                    prepend-icon="mdi-account-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="infoForm.ssn"
                    dense
                    outlined
                    :rules="[formRuleRequired, formRuleSSN]"
                    label="شماره ملی"
                    prepend-icon="mdi-newspaper-variant-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" xl="4">
                  <v-select
                    v-model="infoForm.gender"
                    :items="infoForm.genderItems"
                    dense
                    outlined
                    :rules="[formRuleRequired]"
                    label="جنسیت"
                    prepend-icon="mdi-gender-male-female"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    id="bDate"
                    v-model="infoForm.bDate"
                    dense
                    outlined
                    :rules="[formRuleRequired]"
                    label="تاریخ تولد"
                    prepend-icon="mdi-calendar-blank"
                  ></v-text-field>
                  <client-only>
                    <date-picker
                      v-model="infoForm.bDate"
                      color="orange"
                      type="date"
                      element="bDate"
                      format="jYYYY/jMM/jDD"
                      display-format="jYYYY/jMM/jDD"
                    ></date-picker>
                  </client-only>
                </v-col>
                <v-col cols="12">
                  <file-uploader
                    height="20em"
                    placeholder="آپلود تصویر کارت ملی"
                    :rules="infoForm.ssnRules"
                    sample-img="/imgs/sample.jpg"
                    @change-file="changeSsnFile"
                  ></file-uploader>
                </v-col>
                <v-col cols="12">
                  <file-uploader
                    height="20em"
                    placeholder="آپلود عکس سلفی"
                    :rules="infoForm.selfieRules"
                    helper-btn-text="مشاهده متن سلفی"
                    :helper-text="infoForm.selfieHelperText"
                    sample-img="/imgs/sample.jpg"
                    @change-file="changeSelfieFile"
                  ></file-uploader>
                </v-col>
              </v-row>
            </v-container>
            <div class="d-flex justify-center align-center mt-4">
              <v-btn type="submit" color="primary" dark>مرحله بعد</v-btn>
            </div>
            <p
              v-if="infoForm.error"
              class="error--text text-body-2 text-center mt-2"
            >
              {{ infoForm.error }}
            </p>
          </v-form>
        </v-stepper-content>
        <v-stepper-content :step="2" class="pa-0">
          <v-form
            ref="contactForm"
            v-model="contactForm.validity"
            class="contactForm"
            @submit.prevent="contactFormHandler"
          >
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="contactForm.mobile"
                    type="tel"
                    dense
                    outlined
                    label="شماره موبایل"
                    :rules="[formRuleRequired, formRuleIsMobile]"
                    prepend-icon="mdi-cellphone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="contactForm.phone"
                    type="tel"
                    dense
                    outlined
                    label="شماره تلفن ثابت"
                    :rules="[formRuleRequired]"
                    prepend-icon="mdi-phone-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="contactForm.email"
                    type="email"
                    dense
                    outlined
                    label="پست الکترونیکی"
                    :rules="[formRuleRequired, formRuleIsEmail]"
                    prepend-icon="mdi-email-outline"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <div class="d-flex justify-center align-center mt-4">
              <v-btn color="secondary" dark @click="contactFormPrevStepHandler"
                >مرحله قبل</v-btn
              >
              <v-btn type="submit" color="primary" dark class="mr-6"
                >مرحله بعد</v-btn
              >
            </div>
          </v-form>
        </v-stepper-content>
        <v-stepper-content :step="3" class="pa-0">
          <v-form
            ref="bankForm"
            v-model="bankForm.validity"
            class="bankForm"
            @submit.prevent="bankFormHandler"
          >
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="bankForm.shaba"
                    v-mask="'######################'"
                    dense
                    outlined
                    label="شماره شبا"
                    :rules="[formRuleRequired, formRuleIsShaba]"
                    prepend-icon="mdi-bank-outline"
                    suffix="IR"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" xl="4">
                  <v-text-field
                    v-model="bankForm.creditCard"
                    v-mask="'####-####-####-####'"
                    dense
                    outlined
                    label="شماره کارت"
                    :rules="[formRuleRequired, formRuleIsCreditCard]"
                    prepend-icon="mdi-credit-card-outline"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <div class="d-flex justify-center align-center mt-4">
              <v-btn color="secondary" dark @click="bankFormPrevStepHandler"
                >مرحله قبل</v-btn
              >
              <v-btn type="submit" color="primary" dark class="mr-6"
                >مرحله بعد</v-btn
              >
            </div>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import FileUploader from '~/components/FileUploader.vue'
import {
  isRequired,
  isSSN,
  isEmail,
  isMobile,
  isCreditCard,
  isShaba,
} from '~/utils/formValidation'
export default {
  components: {
    FileUploader,
  },
  data() {
    return {
      step: 1,
      infoForm: {
        error: null,
        validity: true,
        fName: null,
        lName: null,
        ssn: null,
        genderItems: [
          {
            text: 'مرد',
            value: 'male',
          },
          {
            text: 'زن',
            value: 'female',
          },
        ],
        gender: 'male',
        bDate: null,
        ssnImgFile: null,
        ssnRules: [
          {
            id: 1,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 2,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 3,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 4,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 5,
            text: 'تمام رخ با نور کافی',
          },
        ],
        selfieImgFile: null,
        selfieRules: [
          {
            id: 1,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 2,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 3,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 4,
            text: 'تمام رخ با نور کافی',
          },
          {
            id: 5,
            text: 'تمام رخ با نور کافی',
          },
        ],
        selfieHelperText:
          'اینجانب (نام و نام خانوادگی صاحب حساب) قصد معامله با سایت ارز فروش را دارم . و مدارک لازم جهت احراز هویت در این سایت ارسال گردیده ضمنا متعهد میشوم که حساب بنده تحت اختیار خودم میباشد و حساب به شخصی اجاره داده نشده است و خرید را برای خودم انجام میدهم .',
      },
      contactForm: {
        validity: true,
        mobile: null,
        phone: null,
        email: null,
      },
      bankForm: {
        shaba: null,
        creditCard: null,
      },
    }
  },
  computed: {
    formRuleRequired() {
      return isRequired
    },
    formRuleSSN() {
      return isSSN
    },
    formRuleIsEmail() {
      return isEmail
    },
    formRuleIsMobile() {
      return isMobile
    },
    formRuleIsCreditCard() {
      return isCreditCard
    },
    formRuleIsShaba() {
      return isShaba
    },
  },
  methods: {
    changeSsnFile(file) {
      this.infoForm.ssnImgFile = file
    },
    changeSelfieFile(file) {
      this.infoForm.selfieImgFile = file
    },
    infoSubmitHandler() {
      this.$refs.infoForm.validate()
      if (!this.infoForm.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.infoForm .error--text')
        })
      } else if (!this.infoForm.selfieImgFile || !this.infoForm.ssnImgFile)
        this.infoForm.error = 'باید عکس کارت ملی و سلفی را آپلود کنید'
      else {
        this.infoForm.error = null
        this.step = 2
      }
    },
    contactFormHandler() {
      this.$refs.contactForm.validate()
      if (!this.contactForm.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.contactForm .error--text')
        })
      } else this.step = 3
    },
    contactFormPrevStepHandler() {
      this.step = 1
    },
    bankFormHandler() {
      this.$refs.bankForm.validate()
      if (!this.bankForm.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.bankForm .error--text')
        })
      } else {
        // submit all requests here
      }
    },
    bankFormPrevStepHandler() {
      this.step = 2
    },
  },
}
</script>
