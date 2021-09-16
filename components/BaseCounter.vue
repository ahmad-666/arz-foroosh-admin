<template>
  <div class="d-flex flex-column align-center">
    <div class="d-flex align-center titleColor--text font-weight-bold text-h6">
      <p class="mx-1">{{ symbol }}</p>
      <p class="mx-1">{{ counter }}</p>
      <p>+</p>
    </div>
    <p class="mt-2 text-caption titleColor--text font-weight-light">
      {{ text }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      // should not be float like .5,.3 and always integer
      type: Number,
      default: 1,
    },
    time: {
      type: Number,
      default: 3000,
    },
    symbol: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      counter: 0,
      timerId: null,
      stepNum: 0,
    };
  },
  computed: {
    stepsNumber() {
      return Math.floor((this.max - this.min) / this.step);
    },
    timerOffset() {
      return this.time / this.stepsNumber;
    },
  },
  mounted() {
    this.timerId = setInterval(() => {
      this.stepNum++;
      this.counter += this.step;
      if (this.counter >= this.max || this.stepNum >= this.stepsNumber) {
        this.counter = this.max;
        clearInterval(this.timerId);
      }
    }, this.timerOffset);
  },
  beforeDestroy() {
    clearInterval(this.timerId);
  },
};
</script>
