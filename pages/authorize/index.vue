<template>
  <my-stepper :steps="steps" :active-step="step">
    <v-stepper-content :step="1">
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
          </v-row>
        </v-container>
        <v-btn type="submit" color="secondary" dark class="d-block mx-auto"
          >مرحله بعد</v-btn
        >
      </v-form>
    </v-stepper-content>
    <v-stepper-content :step="2">
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
                v-model="contactForm.email"
                type="email"
                dense
                outlined
                :rules="[formRuleRequired]"
                label="پست الکترونیکی"
                prepend-icon="mdi-email-outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" xl="4">
              <v-text-field
                v-model="contactForm.mobile"
                type="tel"
                dense
                outlined
                :rules="[formRuleRequired]"
                label="موبایل"
                prepend-icon="mdi-cellphone-android"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" xl="4">
              <v-text-field
                v-model="contactForm.phone"
                type="tel"
                dense
                outlined
                :rules="[formRuleRequired]"
                label="تلفن ثابت"
                prepend-icon="mdi-phone-outline"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn type="submit" color="secondary" dark class="d-block mx-auto"
          >مرحله بعد</v-btn
        >
      </v-form>
    </v-stepper-content>
    <v-stepper-content :step="3">
      <v-form
        ref="infoForm"
        v-model="infoForm.validity"
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
          </v-row>
        </v-container>
        <v-btn type="submit" color="secondary" dark class="d-block mx-auto"
          >مرحله بعد</v-btn
        >
      </v-form>
    </v-stepper-content>
  </my-stepper>
</template>
<script>
import MyStepper from '~/components/MyStepper.vue'
import { isRequired, isSSN } from '~/utils/formValidation'
export default {
  components: {
    MyStepper,
  },
  data() {
    return {
      step: 1,
      steps: [
        {
          step: 1,
          title: 'اطلاعات شخصی',
          imgSrc: '/imgs/step-info.jpg',
        },
        {
          step: 2,
          title: 'اطلاعات ارتباطی',
          imgSrc: '/imgs/step-contact.jpg',
        },
        {
          step: 3,
          title: 'اطلاعات بانکی',
          imgSrc: '/imgs/step-bank.jpg',
        },
      ],
      infoForm: {
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
        selfieImgFile: null,
      },
      contactForm: {
        validity: true,
        mobile: null,
        phone: null,
        email: null,
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
  },
  methods: {
    infoSubmitHandler() {
      this.$refs.infoForm.validate()
      if (!this.infoForm.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.infoForm .error--text')
        })
      } else this.step = 2
    },
    contactFormHandler() {
      this.$refs.contactForm.validate()
      if (!this.contactForm.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.contactForm .error--text')
        })
      } else this.step = 3
    },
  },
}
</script>
