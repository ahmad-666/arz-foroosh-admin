<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <div :style="{ height }" class="position-relative cursor-pointer">
          <div
            class="
              width-100
              fill-height
              position-relative
              z-index-1
              d-flex
              justify-center
              align-center
              grey
              darken-3
            "
          >
            <div class="d-flex align-center white--text">
              <v-icon size="20">mdi-file-upload-outline</v-icon>
              <p class="text-body-2">{{ placeholder }}</p>
            </div>
          </div>
          <v-img
            v-if="imgSrc"
            width="100%"
            height="100%"
            class="position-absolute top-right-edge z-index-2"
            :src="imgSrc"
          ></v-img>
          <label
            class="
              cursor-pointer
              width-100
              fill-height
              position-absolute
              top-right-edge
              z-index-3
            "
          >
            <input
              type="file"
              class="d-none"
              accept="image/*"
              @change="fileChangeHandler"
            />
          </label>
        </div>
      </v-col>
      <v-col v-if="helperText || rules.length" cols="12" md="6" lg="4">
        <div
          v-if="rules.length"
          class="pa-2 d-flex flex-column align-center"
          :style="{ border: `1px solid ${primaryColor}` }"
        >
          <h6 class="text-body-2 font-weight-bold primary--text">قوانین</h6>
          <div>
            <div
              v-for="rule in rules"
              :key="rule.id"
              class="d-flex align-center mt-1"
            >
              <v-icon size="10" color="primary">mdi-moon-full</v-icon>
              <p class="text-caption mr-1">{{ rule.text }}</p>
            </div>
          </div>
        </div>
        <v-dialog v-if="helperText" max-width="95%">
          <template #activator="{ on, attrs }">
            <v-btn
              class="mt-4 d-block mx-auto"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              >{{ helperBtnText }}</v-btn
            >
          </template>
          <v-card color="cardColor" class="pa-4">
            <v-card-text class="text-body-2 pa-0">{{ helperText }}</v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col v-if="sampleImg" cols="12" md="6" lg="4">
        <div
          class="d-flex flex-column align-center pa-2"
          :style="{ border: `1px solid ${primaryColor}` }"
        >
          <h6 class="text-body-2 font-weight-bold primary--text">
            نمونه عکس صحیح
          </h6>
          <v-img
            :src="sampleImg"
            class="mt-2"
            width="100%"
            height="auto"
          ></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: '15em',
    },
    placeholder: {
      type: String,
      default: 'آپلود تصویر',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    helperBtnText: {
      type: String,
      default: '',
    },
    helperText: {
      type: String,
      default: '',
    },
    sampleImg: {
      type: String,
      default: '',
    },
  },
  emits: ['change-file'],
  data() {
    return {
      file: null,
      imgSrc: null,
    }
  },
  computed: {
    primaryColor() {
      return this.$vuetify.theme.themes.light.primary
    },
  },
  methods: {
    fileChangeHandler(e) {
      this.file = e.target.files[0]
      if (this.file) this.imgSrc = URL.createObjectURL(this.file)
      this.$emit('change-file', this.file)
    },
  },
}
</script>
