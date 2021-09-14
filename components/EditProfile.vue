<template>
  <v-card color="cardColor">
    <v-card-title
      class="d-flex justify-center text-subtitle-1 titleColor--text"
    >
      ویرایش حساب کاربری
    </v-card-title>
    <v-card-text>
      <v-form
        ref="editForm"
        v-model="localUser.validity"
        @submit.prevent="submitEditHandler"
      >
        <v-text-field
          v-model="localUser.fName"
          dense
          outlined
          label="نام"
          :rules="formRules.fName"
        ></v-text-field>
        <v-text-field
          v-model="localUser.lName"
          dense
          outlined
          label="نام خانوادگی"
          :rules="formRules.lName"
        ></v-text-field>
        <v-text-field
          v-model="localUser.ssn"
          type="number"
          dense
          outlined
          label="شماره ملی"
          :rules="formRules.ssn"
        ></v-text-field>
        <v-text-field
          id="bDate"
          v-model="localUser.bDate"
          dense
          outlined
          label="تاریخ تولد"
          :rules="formRules.bDate"
        ></v-text-field>
        <date-picker
          v-model="localUser.bDate"
          element="bDate"
          type="date"
          color="orange"
          format="jYYYY/jMM/jDD"
          display-format="jYYYY/jMM/jDD"
        ></date-picker>
        <v-text-field
          v-model="localUser.email"
          type="email"
          dense
          outlined
          label="ایمیل"
          :rules="formRules.email"
        ></v-text-field>
        <v-text-field
          v-model="localUser.mobile"
          type="tel"
          dense
          outlined
          label="موبایل"
          :rules="formRules.mobile"
        ></v-text-field>
        <v-btn
          class="d-block mx-auto"
          type="submit"
          color="primary"
          dark
          :loading="loading"
        >
          ویرایش حساب کاربری
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="mr-auto d-block"
        text
        color="secondary"
        @click="setReadMode"
      >
        برگشت
      </v-btn>
    </v-card-actions>
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
  </v-card>
</template>
<script>
import {
  isRequired,
  isMobile,
  isEnterEmail,
  isEnterSSN,
} from '~/utils/formValidation'
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  emits: ['set-read-mode', 'update-user'],
  data() {
    return {
      loading: false,
      error: '',
      success: '',
      localUser: {
        validity: true,
        fName: null,
        lName: null,
        ssn: null,
        bDate: null,
        email: null,
        mobile: null,
      },
    }
  },
  computed: {
    formRules() {
      return {
        fName: [isRequired],
        lName: [isRequired],
        ssn: [isEnterSSN],
        bDate: [],
        email: [isEnterEmail],
        mobile: [isRequired, isMobile],
      }
    },
  },
  watch: {
    user: {
      immediate: true,
      deep: true,
      handler({ fName, lName, ssn, bDate, email, mobile }) {
        this.localUser.fName = fName
        this.localUser.lName = lName
        this.localUser.ssn = ssn
        this.localUser.bDate = bDate
        this.localUser.email = email
        this.localUser.mobile = mobile
      },
    },
  },
  methods: {
    clearError() {
      this.error = ''
    },
    setReadMode() {
      this.$emit('set-read-mode')
    },
    submitEditHandler() {
      this.$refs.editForm.validate()
      if (!this.localUser.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text')
        })
      } else {
        this.loading = true
        this.success = ''
        this.error = ''
        try {
          this.$emit('set-read-mode')
          this.$emit('update-user', {
            fName: this.localUser.fName,
            lName: this.localUser.lName,
            ssn: this.localUser.ssn,
            bDate: this.localUser.bDate,
            email: this.localUser.email,
            mobile: this.localUser.mobile,
          })
          this.loading = false
          this.success = 'حساب کاربری با موفقیت ویرایش شد'
          this.error = ''
        } catch (err) {
          this.loading = false
          this.success = ''
          this.error =
            err.response?.data?.message ||
            'خطایی در حین ویرایش حساب کاربری رخ داد'
        }
      }
    },
  },
}
</script>
