<template>
  <v-card elevation="0" color="cardColor darken-1">
    <v-card-title class="titleColor--text text-body-2 font-weight-bold"
      >لیست شماره های شبای ثبت شده</v-card-title
    >
    <v-card-text>
      <template v-for="(item, i) in items">
        <div :key="item.id">
          <v-container>
            <v-row dense align="stretch">
              <v-col cols="12" md="6">
                <div
                  class="
                    fill-height
                    cardColor
                    pa-2
                    d-flex
                    justify-center
                    align-center
                  "
                >
                  <p class="text-body-2 textColor--text">{{ item.shaba }}</p>
                </div>
              </v-col>
              <v-col cols="3" md="1">
                <v-dialog width="400" max-width="90vw">
                  <template #activator="{ on: dOn, attrs: dAttrs }">
                    <v-tooltip bottom color="cardColor darken-2">
                      <template #activator="{ on: tOn, attrs: tAttrs }">
                        <v-btn
                          class="width-100"
                          color="error"
                          dark
                          v-bind="{ ...dAttrs, ...tAttrs }"
                          :loading="loading"
                          :style="{ height: '100%', 'min-width': '0px' }"
                          v-on="{ ...dOn, ...tOn }"
                        >
                          <v-icon size="20">mdi-close</v-icon>
                        </v-btn>
                      </template>
                      <p class="text-caption titleColor--text">
                        پاک کردن شماره شبا
                      </p>
                    </v-tooltip>
                  </template>
                  <template #default="dialog">
                    <v-card color="cardColor darken-1">
                      <v-card-title class="pa-0">
                        <v-btn
                          small
                          text
                          color="error"
                          @click="dialog.value = false"
                        >
                          <v-icon size="20">mdi-close</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-text class="mt-2 text-body-2 titleColor--text">
                        آیا اطمینان دارید که میخواهید شماره شبا را پاک کنید ؟
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          color="error"
                          dark
                          class="mx-auto d-block"
                          @click="deleteShabaHandler(item)"
                          >پاک کردن</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
              <v-col cols="9" md="5">
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
      <v-tooltip v-if="!addShabaForm.show" bottom color="cardColor darken-3">
        <template #activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" @click="showAddForm">
            <v-icon size="30">mdi-plus</v-icon>
          </v-btn>
        </template>
        <p class="text-caption titleColor--text">افزودن شماره شبا</p>
      </v-tooltip>
      <v-form
        v-else
        ref="addForm"
        v-model="addShabaForm.validity"
        class="width-100"
        @submit.prevent="addSubmitHandler"
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="addShabaForm.shaba"
                outlined
                dense
                label="شماره شبا"
                :rules="[formRuleIsShaba]"
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="2" md="2">
              <v-btn color="error" dark @click="hideAddForm">
                <v-icon size="20">mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" sm="2" md="2">
              <v-btn type="submit" color="success" dark :loading="loading">
                <v-icon size="20">mdi-check</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
import { isShaba } from '~/utils/formValidation'
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update-shabas'],
  data() {
    return {
      loading: false,
      success: '',
      error: '',
      addShabaForm: {
        validity: true,
        shaba: null,
        show: false,
      },
    }
  },
  computed: {
    formRuleIsShaba() {
      return isShaba
    },
  },
  methods: {
    showAddForm() {
      this.addShabaForm.show = true
    },
    hideAddForm() {
      this.addShabaForm.show = false
    },
    deleteShabaHandler(shaba) {
      this.loading = true
      this.success = ''
      this.error = ''
      try {
        let shabasCopy = [...this.items]
        shabasCopy = shabasCopy.filter(sh => shaba.id !== sh.id)
        this.$emit('update-shabas', shabasCopy)
        this.loading = false
        this.success = 'شماره شبا با موفقیت ویرایش شد'
        this.error = ''
      } catch (err) {
        this.loading = false
        this.success = ''
        this.error =
          err.response?.data?.message || 'حذف شماره شبا با خطا مواجه شد'
      }
    },
    addSubmitHandler() {
      this.$refs.addForm.validate()
      if (this.addShabaForm.validity) {
        this.loading = true
        this.success = ''
        this.error = ''
        try {
          const shabasCopy = [...this.items]
          shabasCopy.push({
            id: Math.random(), // get it from server
            shaba: this.addShabaForm.shaba,
            status: {
              text: 'در انتظار تایید',
              value: 'pending',
            },
          })
          this.$emit('update-shabas', shabasCopy)
          this.loading = false
          this.success = 'شماره شبا با موفقیت افزوده شد'
          this.error = ''
          this.addShabaForm.shaba = null
          this.addShabaForm.show = false
        } catch (err) {
          this.loading = false
          this.success = ''
          this.error =
            err.response?.data?.message || 'افزودن شماره شبا با خطا مواجه شد'
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
