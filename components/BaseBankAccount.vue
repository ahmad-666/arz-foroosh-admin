<template>
  <v-card elevation="0" color="cardColor darken-1">
    <v-card-title class="titleColor--text text-body-2 font-weight-bold"
      >لیست کارت های بانکی ثبت شده</v-card-title
    >
    <v-card-text>
      <template v-for="(item, i) in items">
        <div :key="item.id">
          <v-container>
            <v-row dense align="stretch">
              <v-col cols="12" md="6">
                <div
                  class="
                    width-100
                    fill-height
                    d-flex
                    align-center
                    justify-center
                    cardColor
                    textColor--text
                    text-body-2
                    pa-2
                  "
                >
                  {{ item.card }}
                </div>
              </v-col>
              <v-col cols="3" md="1">
                <v-dialog width="400" max-width="90vw">
                  <template #activator="{ on: dOn, attrs: dAttrs }">
                    <v-tooltip color="cardColor darken-2" bottom>
                      <template #activator="{ on: tOn, attrs: tAttrs }">
                        <v-btn
                          class="width-100"
                          v-bind="{ ...tAttrs, ...dAttrs }"
                          color="info"
                          dark
                          :style="{ 'min-width': '0px', height: '100%' }"
                          v-on="{ ...tOn, ...dOn }"
                          @click="setActiveCard(item)"
                        >
                          <v-icon size="20">mdi-pencil-outline</v-icon>
                        </v-btn>
                      </template>
                      <p class="text-caption titleColor--text">
                        ویرایش شماره کارت
                      </p>
                    </v-tooltip>
                  </template>
                  <template #default="dialog">
                    <v-card color="cardColor">
                      <v-card-title
                        class="pa-2 d-flex justify-space-between align-center"
                      >
                        <p class="text-body-2 titleColor--text font-weight-2">
                          ویرایش شماره کارت
                        </p>
                        <v-btn text color="error" @click="dialog.value = false">
                          <v-icon size="20">mdi-close</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-text>
                        <v-form
                          ref="editForm"
                          v-model="editCardForm.validity"
                          @submit.prevent="editCardHandler(item)"
                        >
                          <v-text-field
                            v-model="editCardForm.card"
                            v-mask="'####-####-####-####'"
                            label="شماره حساب"
                            dense
                            outlined
                            :rules="[formRuleIsCreditCard]"
                          ></v-text-field>
                          <v-btn
                            type="submit"
                            color="primary"
                            dark
                            class="mt-2 mx-auto d-block"
                            :loading="loading"
                          >
                            ویرایش شماره کارت
                          </v-btn>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
              <v-col cols="3" md="1">
                <v-tooltip bottom color="cardColor darken-2">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      class="width-100"
                      color="error"
                      dark
                      v-bind="attrs"
                      :loading="loading"
                      :style="{ height: '100%', 'min-width': '0px' }"
                      v-on="on"
                      @click="deleteCardHandler(item)"
                    >
                      <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <p class="text-caption titleColor--text">
                    پاک کردن شماره کارت
                  </p>
                </v-tooltip>
              </v-col>
              <v-col cols="6" md="4">
                <div
                  class="
                    fill-height
                    cardColor
                    pa-2
                    d-flex
                    flex-column
                    justify-center
                    align-center
                  "
                >
                  <p class="text-caption titleColor--text">وضعیت</p>
                  <p
                    :class="`text-body-2 mt-2 ${getStatusColor(
                      item.status.value
                    )}`"
                  >
                    {{ item.status.text }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <v-divider v-if="i < items.length" :key="`line-${item.id}`"></v-divider>
      </template>
    </v-card-text>
    <v-card-actions>
      <v-dialog v-model="addCardForm.showDialog" width="400" max-width="90vw">
        <template #activator="{ on, attrs }">
          <v-btn text color="titleColor" v-bind="attrs" v-on="on">
            <v-icon size="30">mdi-plus</v-icon>
          </v-btn>
        </template>
        <template #default="dialog">
          <v-card color="cardColor">
            <v-card-title
              class="pa-2 d-flex justify-space-between align-center"
            >
              <p class="titleColor--text text-body-2 font-weight-bold">
                افزودن شماره کارت
              </p>
              <v-btn small text color="error" @click="dialog.value = false">
                <v-icon size="20">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="addForm"
                v-model="addCardForm.validity"
                @submit.prevent="addCardHandler"
              >
                <v-text-field
                  v-model="addCardForm.card"
                  v-mask="'####-####-####-####'"
                  label="شماره کارت"
                  outlined
                  dense
                  :rules="[formRuleIsCreditCard]"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  dark
                  class="mt-2 mx-auto d-block"
                  :loading="loading"
                  >افزودن شماره کارت</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-snackbar :value="success" color="success" dark :timeout="2000">
      <p>{{ success }}</p>
    </v-snackbar>
    <v-snackbar :value="error" color="error" dark :timeout="-1">
      <p>{{ error }}</p>
      <template #action="{ on, attrs }">
        <v-btn v-bind="attrs" text @click="clearError" v-on="on">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import { isCreditCard } from '~/utils/formValidation'
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update-cards'],
  data() {
    return {
      loading: false,
      success: '',
      error: '',
      activeCard: {},
      editCardForm: {
        validity: true,
        card: null,
      },
      addCardForm: {
        validity: true,
        card: null,
        showDialog: false,
      },
    }
  },
  computed: {
    formRuleIsCreditCard() {
      return isCreditCard
    },
  },
  methods: {
    setActiveCard(card) {
      this.activeCard = card
      this.editCardForm.card = this.activeCard.card
    },
    editCardHandler(card) {
      const refIndex = this.items.findIndex((c, i) => c.id === card.id)
      this.$refs.editForm[refIndex].validate()
      if (this.editCardForm.validity) {
        this.loading = true
        this.success = ''
        this.error = ''
        try {
          const index = this.items.findIndex(c => c.id === card.id)
          const cardsCopy = [...this.items]
          const oldData = { ...cardsCopy[index] }
          cardsCopy.splice(index, 1)
          cardsCopy.splice(index, 0, {
            ...oldData,
            card: this.editCardForm.card,
            status: { text: 'در انتظار تایید', value: 'pending' },
          })
          this.$emit('update-cards', cardsCopy)
          this.loading = false
          this.success = 'شماره کارت با موفقیت ویرایش شد'
          this.error = ''
        } catch (err) {
          this.loading = false
          this.success = ''
          this.error =
            err.response?.data?.message || 'ویرایش شماره کارت با خطا مواجه شد'
        }
      }
    },
    deleteCardHandler(card) {
      this.loading = true
      this.success = ''
      this.error = ''
      try {
        let cardsCopy = [...this.items]
        cardsCopy = cardsCopy.filter(c => card.id !== c.id)
        this.$emit('update-cards', cardsCopy)
        this.loading = false
        this.success = 'شماره کارت با موفقیت ویرایش شد'
        this.error = ''
      } catch (err) {
        this.loading = false
        this.success = ''
        this.error =
          err.response?.data?.message || 'حذف شماره کارت با خطا مواجه شد'
      }
    },
    addCardHandler() {
      this.$refs.addForm.validate()
      if (this.addCardForm.validity) {
        this.loading = true
        this.success = ''
        this.error = ''
        try {
          const cardsCopy = [...this.items]
          cardsCopy.push({
            id: Math.random(), // get it from server
            card: this.addCardForm.card,
            status: {
              text: 'در انتظار تایید',
              value: 'pending',
            },
          })
          this.$emit('update-cards', cardsCopy)
          this.loading = false
          this.success = 'شماره کارت با موفقیت افزوده شد'
          this.error = ''
          this.addCardForm.card = null
          this.addCardForm.showDialog = false
        } catch (err) {
          this.loading = false
          this.success = ''
          this.error =
            err.response?.data?.message || 'افزودن شماره کارت با خطا مواجه شد'
        }
      }
    },
    getStatusColor(val) {
      switch (val) {
        case 'pending':
          return 'warning--text'
        case 'confirm':
          return 'success--text'
        default:
          return 'grey--text'
      }
    },
    clearError() {
      this.error = ''
    },
  },
}
</script>
