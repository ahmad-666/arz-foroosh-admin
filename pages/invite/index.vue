<template>
  <div>
    <v-card color="cardColor" class="not-break-title">
      <v-card-title class="pa-0">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" md="5" xl="4">
              <v-img
                width="100%"
                height="100%"
                src="/imgs/invite-1.png"
              ></v-img>
            </v-col>
            <v-col cols="12" md="7" xl="8" class="pa-4">
              <h6 class="text-h6 font-weight-bold titleColor--text">
                معرفی دوستان
              </h6>
              <p class="text-body-2 textColor--text mt-4">
                شما می‌توانید دوستان خود را با لینک اختصاصی خود به ارزفروش دعوت
                کنید. درحال حاضر براساس این طرح، 30% از کارمزد تمامی معاملات
                کسانی که با لینک شما ثبت نام کرده‌اند به شما پرداخت خواهد شد.
                همچنین می‌توانید بخشی از این سود را در هنگام ایجاد لینک به فرد
                دعوت شده اختصاص دهید.
              </p>
              <v-btn
                color="secondary"
                dark
                nuxt
                to="/invite-conditions"
                class="mt-4 text-body-2"
                >شرایط معرفی دوستان</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-divider class="mt-6"></v-divider>
      <v-card-text>
        <v-container>
          <v-row align="stretch" justify="center">
            <v-col
              v-for="action in actions"
              :key="action.compName"
              cols="6"
              md="3"
              xl="2"
            >
              <div
                class="cursor-pointer width-100 fill-height"
                @click="setVisibleComponent(action.compName)"
              >
                <div :style="{ width: '100%', height: '100px' }">
                  <lottie-animation
                    :path="action.jsonSrc"
                    :loop="true"
                    :auto-play="true"
                    :speed="1"
                  >
                  </lottie-animation>
                </div>

                <p class="secondary--text text-body-2 text-center mt-2">
                  {{ action.text }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <div
      v-if="visibleComponent === 'invite-creation'"
      class="mx-auto mt-6"
      :style="{ width: '600px', 'max-width': '100%' }"
    >
      <invite-creation></invite-creation>
    </div>
    <div v-if="visibleComponent === 'invite-codes'" class="mt-6">
      <invite-codes></invite-codes>
    </div>
    <div
      v-if="visibleComponent === 'invite-statistics'"
      class="mx-auto mt-6"
      :style="{ width: '600px', 'max-width': '100%' }"
    >
      <invite-statistics></invite-statistics>
    </div>
    <div v-if="visibleComponent === 'invite-enter'" class="mt-6">
      <invite-enter></invite-enter>
    </div>
  </div>
</template>
<script>
import InviteCreation from '~/components/InviteCreation.vue'
import InviteCodes from '~/components/InviteCodes.vue'
import InviteStatistics from '~/components/InviteStatistics.vue'
import InviteEnter from '~/components/InviteEnter.vue'
export default {
  components: {
    InviteCreation,
    InviteCodes,
    InviteStatistics,
    InviteEnter,
  },
  data() {
    return {
      visibleComponent: null,
      actions: [
        {
          compName: 'invite-creation',
          jsonSrc: 'jsons/invite-create.json',
          text: ' ایجاد کد دعوت',
        },
        {
          compName: 'invite-codes',
          jsonSrc: 'jsons/invite-code.json',
          text: ' کدهای دعوت ساخته شده',
        },
        {
          compName: 'invite-statistics',
          jsonSrc: 'jsons/invite-statistics.json',
          text: ' آمار کاربران دعوت شده',
        },
        {
          compName: 'invite-enter',
          jsonSrc: 'jsons/invite-enter.json',
          text: '  وارد کردن کد دعوت',
        },
      ],
    }
  },
  methods: {
    setVisibleComponent(comp) {
      this.visibleComponent = comp
    },
  },
}
</script>
