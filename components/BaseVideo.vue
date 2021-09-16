<template>
  <v-card class="fill-height position-relative">
    <div v-if="showPreviewData" class="position-absolute fill-height width-100">
      <v-img
        :src="previewSrc"
        width="100%"
        height="100%"
        cover
        :style="{ 'z-index': 1, right: 0, top: 0 }"
        class="position-absolute"
      ></v-img>
      <v-overlay
        color="rgb(0,0,0)"
        opacity=".75"
        :style="{ 'z-index': 2, right: 0, top: 0 }"
        class="position-absolute"
      ></v-overlay>
      <v-btn
        text
        :style="{ 'z-index': 3 }"
        class="pos-center position-absolute"
        @click="playClick"
      >
        <v-icon size="80" color="primary">mdi-play-circle</v-icon>
      </v-btn>
    </div>
    <video
      ref="videoElm"
      class="position-absolute fill-height"
      controls
      :src="videoSrc"
      width="100%"
      height="100%"
      @pause="pauseVideo"
    ></video>
  </v-card>
</template>
<script>
export default {
  props: {
    previewSrc: {
      type: String,
      default: '',
    },
    videoSrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showPreviewData: true,
    };
  },
  watch: {
    showPreviewData(val) {
      if (val) this.$refs.videoElm.pause();
      else this.$refs.videoElm.play();
    },
  },
  methods: {
    playClick() {
      this.showPreviewData = false;
    },
    pauseVideo() {
      // this.showPreviewData = true
    },
  },
};
</script>
