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
                  {{ item.shaba }}
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
                          @click="setActiveShaba(item)"
                        >
                          <v-icon size="20">mdi-pencil-outline</v-icon>
                        </v-btn>
                      </template>
                      <p class="text-caption titleColor--text">
                        ویرایش شماره شبا
                      </p>
                    </v-tooltip>
                  </template>
                  <template #default="dialog">
                    <v-card color="cardColor">
                      <v-card-title
                        class="pa-2 d-flex justify-space-between align-center"
                      >
                        <p class="text-body-2 titleColor--text font-weight-2">
                          ویرایش شماره شبا
                        </p>
                        <v-btn text color="error" @click="dialog.value = false">
                          <v-icon size="20">mdi-close</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-text>
                        <v-form
                          ref="editForm"
                          v-model="editShabaForm.validity"
                          @submit.prevent="editShabaHandler(item)"
                        >
                          <v-text-field
                            v-model="editShabaForm.shaba"
                            label="شماره شبا"
                            dense
                            outlined
                            :rules="[formRuleIsShaba]"
                          ></v-text-field>
                          <v-btn
                            type="submit"
                            color="primary"
                            dark
                            class="mt-2 mx-auto d-block"
                            :loading="loading"
                          >
                            ویرایش شماره شبا
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
                      @click="deleteShabaHandler(item)"
                    >
                      <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <p class="text-caption titleColor--text">
                    پاک کردن شماره شبا
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
      <v-dialog v-model="addShabaForm.showDialog" width="400" max-width="90vw">
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
                افزودن شماره شبا
              </p>
              <v-btn small text color="error" @click="dialog.value = false">
                <v-icon size="20">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="addForm"
                v-model="addShabaForm.validity"
                @submit.prevent="addShabaHandler"
              >
                <v-text-field
                  v-model="addShabaForm.shaba"
                  label="شماره شبا"
                  outlined
                  dense
                  :rules="[formRuleIsShaba]"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  dark
                  class="mt-2 mx-auto d-block"
                  :loading="loading"
                  >افزودن شماره شبا</v-btn
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
      activeShaba: {},
      editShabaForm: {
        validity: true,
        shaba: null,
      },
      addShabaForm: {
        validity: true,
        shaba: null,
        showDialog: false,
      },
    }
  },
  computed: {
    formRuleIsShaba() {
      return isShaba
    },
  },
  methods: {
    setActiveShaba(shaba) {
      this.activeShaba = shaba
      this.editShabaForm.shaba = this.activeShaba.shaba
    },
    editShabaHandler(shaba) {
      const refIndex = this.items.findIndex((sh, i) => sh.id === shaba.id)
      this.$refs.editForm[refIndex].validate()
      if (this.editShabaForm.validity) {
        this.loading = true
        this.success = ''
        this.error = ''
        try {
          const index = this.items.findIndex(sh => sh.id === shaba.id)
          const shabasCopy = [...this.items]
          const oldData = { ...shabasCopy[index] }
          shabasCopy.splice(index, 1)
          shabasCopy.splice(index, 0, {
            ...oldData,
            shaba: this.editShabaForm.shaba,
            status: { text: 'در انتظار تایید', value: 'pending' },
          })
          this.$emit('update-shabas', shabasCopy)
          this.loading = false
          this.success = 'شماره شبا با موفقیت ویرایش شد'
          this.error = ''
          // this.editShabaForm.shaba = null
          // this.activeShaba = {}
        } catch (err) {
          this.loading = false
          this.success = ''
          this.error =
            err.response?.data?.message || 'ویرایش شماره شبا با خطا مواجه شد'
        }
      }
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
    addShabaHandler() {
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
          this.addShabaForm.showDialog = false
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
