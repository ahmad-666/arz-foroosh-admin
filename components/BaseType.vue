<template>
  <div>{{ result }}</div>
</template>
<script>
export default {
  props: {
    inputs: {
      type: Array,
      required: true,
    },
    timer: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      result: '',
      timerId: null,
    }
  },
  mounted() {
    let mode = 'append' // 'append' | 'remove'
    let index = 0 // on inputs array
    let i = 0 // on elements of inputs array
    this.timerId = setInterval(() => {
      if (mode === 'append') {
        this.result += this.inputs[index][i]
        i++
        if (this.result === this.inputs[index]) mode = 'remove'
      } else if (mode === 'remove') {
        this.result = this.result.slice(0, this.result.length - 1)
        i--
        if (!this.result.length) {
          mode = 'append'
          index = (index + 1) % this.inputs.length
        }
      }
    }, this.timer)
  },
  beforeDestroy() {
    clearInterval(this.timerId)
  },
}
</script>
