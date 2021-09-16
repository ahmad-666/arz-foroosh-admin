<template>
  <v-card
    class="pa-1 pa-sm-4 fill-height rounded-lg"
    color="cardColor"
    elevation="5"
  >
    <div
      class="
        d-flex
        flex-column-reverse
        justify-space-between
        align-center align-sm-start
      "
      :class="{
        'flex-sm-row': !isReverse,
        'flex-sm-row-reverse': isReverse,
        'fill-height': isSmallAndUp,
      }"
    >
      <div class="flex-grow-1 d-flex flex-column justify-center fill-height">
        <v-card-title class="primary--text text-subtitle-1 font-weight-bold">{{
          title
        }}</v-card-title>
        <v-card-text class="text-body-2 titleColor--text" v-html="desc">
        </v-card-text>
      </div>
      <div
        class="flex-shrink-0 mr-4 d-flex justify-center align-center"
        :class="{ 'fill-height': isSmallAndUp }"
      >
        <v-img :src="imgSrc" width="100" height="auto"></v-img>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    imgSrc: {
      type: String,
      default: '',
    },
    isReverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isSmallAndUp() {
      return this.$vuetify.breakpoint.smAndUp;
    },
  },
};
</script>
