<template>
  <v-card elevation="3" class="rounded-lg pa-0 fill-height" color="cardColor">
    <v-img :src="imgSrc" width="100%" height="150"></v-img>
    <v-card-text>
      <h6 class="text-subtitle-1 font-weight-bold titleColor--text">
        {{ title }}
      </h6>
      <p
        class="
          textColor--text
          text--darken-2
          font-weight-light
          mt-2
          text-caption
        "
      >
        {{ text }}
      </p>
    </v-card-text>
    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn
        rounded
        color="primary"
        dark
        nuxt
        :to="route"
        class="text-subtitle-1 pa-4"
        >مطالعه</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    route: {
      type: String,
      default: '',
    },
    imgSrc: {
      type: String,
      default: '',
    },
  },
}
</script>
