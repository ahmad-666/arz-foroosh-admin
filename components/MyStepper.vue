<template>
  <v-card color="cardColor" class="pa-0">
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="5" xl="3" class="position-relative">
          <v-img
            width="100%"
            height="100%"
            :src="activeStepInfo.imgSrc"
            class="position-absolute z-index-1"
          ></v-img>
          <v-overlay absolute z-index="2" color="black" opacity=".6">
            <h6 class="text-h5 font-weight-bold">
              {{ activeStepInfo.title }}
            </h6>
          </v-overlay>
        </v-col>
        <v-col cols="12" md="7" xl="9">
          <v-stepper
            v-model="stepperStep"
            :style="{ backgroundColor: 'transparent !important' }"
          >
            <v-stepper-header class="position-relative z-index-3 elevation-0">
              <template v-for="step in steps">
                <v-stepper-step
                  :key="step.step"
                  :step="step.step"
                  :complete="activeStepInfo.step > step.step"
                ></v-stepper-step>
                <v-divider
                  v-if="step.step < steps.length"
                  :key="`divider-${step.step}`"
                  :class="
                    activeStepInfo.step > step.step ? activeDividerClass : null
                  "
                ></v-divider>
              </template>
            </v-stepper-header>
            <v-stepper-items class="pa-4">
              <slot></slot>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    activeStep: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {}
  },
  computed: {
    activeStepInfo() {
      return this.steps.find(step => step.step === this.activeStep)
    },
    stepperStep: {
      get(val) {
        return this.activeStep
      },
      set(val) {
        return val
      },
    },
    activeDividerClass() {
      return {
        'border-width': '3px',
        'border-color': this.$vuetify.theme.themes.dark.secondary,
      }
    },
  },
}
</script>
