<template>
  <v-card color="cardColor">
    <v-card-title class="titleColor--text text-subtitle-1 font-weight-bold">
      اطلاعات بانکی
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" xl="6">
            <base-shaba
              :items="shabas"
              @update-shabas="updateShabasHandler"
            ></base-shaba>
          </v-col>
          <v-col cols="12" xl="6">
            <base-bank-account
              :items="cards"
              @update-cards="updateCardsHandler"
            ></base-bank-account>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import BaseShaba from '~/components/BaseShaba.vue'
import BaseBankAccount from '~/components/BaseBankAccount.vue'
export default {
  components: {
    BaseShaba,
    BaseBankAccount,
  },
  data() {
    return {
      loading: true,
      error: '',
      shabas: [],
      cards: [],
    }
  },
  fetch() {
    this.loading = true
    this.error = ''
    try {
      for (let i = 0; i < 3; i++) {
        const randVal = Math.random()
        this.shabas.push({
          id: i,
          shaba: '1234567890123456789012',
          status: {
            text: randVal < 0.5 ? 'در انتظار تایید' : 'تایید شده',
            value: randVal < 0.5 ? 'pending' : 'confirm',
          },
        })
        this.cards.push({
          id: i,
          card: '1234-4567-1234-4567',
          status: {
            text: randVal < 0.5 ? 'در انتظار تایید' : 'تایید شده',
            value: randVal < 0.5 ? 'pending' : 'confirm',
          },
        })
      }
      this.loading = false
      this.error = ''
    } catch (err) {
      this.loading = false
      this.error =
        err.response?.data?.message ||
        'دریافت لیست شماره های شبا با خطا مواجه شد'
    }
  },
  methods: {
    updateShabasHandler(shabas) {
      this.shabas = shabas
    },
    updateCardsHandler(cards) {
      this.cards = cards
    },
  },
}
</script>
