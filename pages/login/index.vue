<template>
  <div
    class="width-100 d-flex justify-center align-center"
    :style="{ 'min-height': '100vh' }"
  >
    <v-card color="cardColor" width="400" max-width="100%">
      <v-card-title
        class="text-subtitle-1 accent--text font-weight-bold justify-center"
      >
        ورود به حساب کاربری
      </v-card-title>
      <v-card-text>
        <v-form
          ref="loginForm"
          v-model="validity"
          @submit.prevent="submitHandler"
        >
          <v-text-field
            v-model="mobile"
            type="tel"
            dense
            outlined
            label="شماره موبایل"
            prepend-icon="mdi-cellphone"
            :rules="formRules.mobile"
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            dense
            outlined
            label="رمز عبور"
            prepend-icon="mdi-shield-lock-outline"
            :rules="formRules.password"
          ></v-text-field>
          <v-btn
            color="primary"
            :loading="loading"
            dark
            type="submit"
            class="mx-auto d-block"
            >ورود به حساب کاربری</v-btn
          >
        </v-form>
      </v-card-text>
      <v-card-actions
        class="
          d-flex
          flex-column
          align-center
          flex-sm-row
          justify-sm-space-between
        "
      >
        <v-btn text color="secondary" nuxt to="/register"> ثبت نام </v-btn>
        <v-btn text color="secondary" nuxt to="/forget-password">
          فراموشی رمز عبور
        </v-btn>
      </v-card-actions>
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
    </v-snackbar>
  </div>
</template>
<script>
import { isRequired, isMobile, is6MinLength } from '~/utils/formValidation';
export default {
  layout: 'empty',
  meta: {
    auth: 'not-required',
  },
  data() {
    return {
      validity: true,
      mobile: null,
      password: null,
      formRules: {
        mobile: [],
        password: [],
      },
    };
  },
  head() {
    return {
      title: 'ارز فروش - ورود',
    };
  },
  computed: {
    loading() {
      return this.$store.getters['auth/loading'];
    },
    success() {
      return this.$store.getters['auth/success'];
    },
    error() {
      return this.$store.getters['auth/error'];
    },
  },
  methods: {
    clearError() {
      this.$store.commit('auth/clearError');
    },
    async submitHandler() {
      this.formRules = {
        mobile: [isRequired, isMobile],
        password: [isRequired, is6MinLength],
      };
      await this.$nextTick();
      this.$refs.loginForm.validate();
      if (!this.validity) {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text');
        });
      } else {
        try {
          const redirectUrl = await this.$store.dispatch('auth/login', {
            mobile: this.mobile,
            password: this.password,
          });
          this.$refs.loginForm.reset();
          this.$router.push(redirectUrl);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    },
  },
};
</script>
