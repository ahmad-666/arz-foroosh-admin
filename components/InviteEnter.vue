<template>
  <v-card color="cardColor">
    <v-card-title class="d-flex justify-center">
      <p class="text-subtitle-1 titleColor--text">
        <v-icon class="ml-1" size="20">mdi-account-multiple-outline</v-icon>
        معرف شما
      </p>
    </v-card-title>
    <v-card-text>
      <p class="text-body-2 textColor--text">
        اگر شما توسط یکی از کاربران نوبیتکس با سایت ما آشنا شده‌اید، می‌توانید
        با وارد کردن کد این کاربر وی را به عنوان معرف خود تعیین نمایید. با تعیین
        معرف، بدون هیچ هزینه‌ی اضافی برای شما، درصدی از کارمزد معاملات شما به
        معرف شما اختصاص خواهد یافت.
      </p>
      <v-form
        ref="codeForm"
        v-model="validity"
        @submit.prevent="submitCodeHandler"
      >
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="5" xl="4">
              <v-text-field
                v-model="code"
                :rules="[formRuleIsRequired]"
                dense
                outlined
                label="کد معرف"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5" xl="4">
              <v-btn
                type="submit"
                color="primary"
                dark
                :loading="loading"
                class="d-block mx-auto mt-1"
              >
                ثبت کد معرف
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
      error: '',
      success: '',
      code: null,
      validity: null,
    }
  },
  computed: {
    formRuleIsRequired() {
      return isRequired
    },
  },
  methods: {
    clearError() {
      this.error = ''
    },
    submitCodeHandler() {
      this.$refs.codeForm.validate()
      if (!this.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text')
        })
      } else {
        this.loading = true
        this.success = ''
        this.error = ''
        try {
          this.$refs.codeForm.reset()
          this.loading = false
          this.success = 'کد معرف با موفقیت قبت شد'
          this.error = ''
        } catch (err) {
          this.loading = false
          this.success = ''
          this.error =
            err.response?.data?.message || 'خطایی در حین ارسال کد رخ داد'
        }
      }
    },
  },
}
</script>
