<template>
  <div>
    <div
      class="
        d-flex
        flex-column flex-sm-row
        justify-start
        align-center
        flex-wrap
        text-h5
        font-weight-medium
        titleColor--text
      "
      :style="{ height: '70px' }"
    >
      <div
        ref="titleRightSection"
        class="d-flex align-center flex-wrap"
        :style="{ 'margin-right': `calc(50% - ${180}px)` }"
      >
        <p class="mx-1">با صرافی</p>
        <p class="mx-1 primary--text font-weight-bold">ارز فروش</p>
        <p class="mx-1">به سرعت نور</p>
      </div>
      <div
        ref="titleLeftSection"
        class="mx-1 primary--text text-decoration-underline font-weight-bold"
      >
        <base-type :inputs="['بخرید', 'بفروشید']" :timer="200"></base-type>
      </div>
    </div>
    <index-stepper class="mt-6"></index-stepper>
    <div
      class="
        d-flex
        flex-column flex-sm-row
        align-center
        justify-space-between
        mt-6
        mx-auto
      "
      :style="{ width: '600px', 'max-width': '95vw' }"
    >
      <div
        class="
          rounded-circle
          white
          d-flex
          justify-center
          align-center
          elevation-1
        "
        :style="{ width: '12em', height: '12em' }"
      >
        <div class="d-flex flex-column align-center titleColor--text text-h6">
          <p class="font-weight-bold">
            {{ new Intl.NumberFormat().format(buyPrice) }}
          </p>
          <p>تومان</p>
        </div>
      </div>
      <div v-if="isSmallAndUp" class="d-flex align-center">
        <div>
          <p class="font-weight-bold titleColor--text text-right text-body-2">
            قیمت خرید
          </p>
          <v-img
            eager
            src="imgs/arrow.png"
            class="mt-2"
            width="100px"
            height="auto"
          ></v-img>
        </div>
        <div>
          <v-img
            eager
            src="imgs/arrow.png"
            width="100px"
            height="auto"
            :style="{ transform: 'rotate(180deg)' }"
          ></v-img>
          <p
            class="mt-2 font-weight-bold titleColor--text text-left text-body-2"
          >
            قیمت فروش
          </p>
        </div>
      </div>
      <div v-else class="d-flex align-center my-6">
        <div class="d-flex align-center">
          <p class="font-weight-bold titleColor--text text-right text-body-2">
            قیمت خرید
          </p>
          <v-img
            eager
            src="imgs/arrow.png"
            class="mr-0"
            width="60px"
            height="auto"
            :style="{ transform: 'rotate(-90deg)' }"
          ></v-img>
        </div>
        <div class="d-flex align-center">
          <v-img
            eager
            src="imgs/arrow.png"
            width="60px"
            height="auto"
            :style="{ transform: 'rotate(90deg)' }"
          ></v-img>
          <p
            class="mr-0 font-weight-bold titleColor--text text-left text-body-2"
          >
            قیمت فروش
          </p>
        </div>
      </div>
      <div
        class="
          rounded-circle
          white
          d-flex
          justify-center
          align-center
          elevation-1
        "
        :style="{ width: '12em', height: '12em' }"
      >
        <div class="d-flex flex-column align-center titleColor--text text-h6">
          <p class="font-weight-bold">
            {{ new Intl.NumberFormat().format(sellPrice) }}
          </p>
          <p class="">تومان</p>
        </div>
      </div>
    </div>
    <why-us class="mt-6"></why-us>
    <articles-carousel class="mt-6"></articles-carousel>
    <v-lazy :options="{ threshold: 0.5 }">
      <div
        class="
          d-flex
          justify-space-between
          align-center
          flex-wrap
          white
          pa-4
          mt-6
        "
      >
        <base-counter
          v-for="counter in counters"
          :key="counter.id"
          class="ma-2"
          :min="counter.min"
          :max="counter.max"
          :step="counter.step"
          :time="counter.time"
          :symbol="counter.symbol"
          :text="counter.text"
        ></base-counter>
      </div>
    </v-lazy>
  </div>
</template>
<script>
import WhyUs from '~/components/WhyUs.vue';
import ArticlesCarousel from '~/components/ArticlesCarousel.vue';
import BaseType from '~/components/BaseType.vue';
import IndexStepper from '~/components/IndexStepper.vue';
import BaseCounter from '~/components/BaseCounter.vue';
export default {
  components: {
    WhyUs,
    ArticlesCarousel,
    BaseType,
    IndexStepper,
    BaseCounter,
  },
  data() {
    return {
      sellPrice: 0,
      buyPrice: 0,
      counters: [],
    };
  },
  fetch() {
    this.sellPrice = 26000;
    this.buyPrice = 25000;
    this.counters = [
      {
        id: 1,
        min: 0,
        max: 100,
        step: 1,
        time: 3000,
        symbol: 'K',
        text: 'کاربر فعال',
      },
      {
        id: 2,
        min: 0,
        max: 5.5,
        step: 1,
        time: 3000,
        symbol: 'M',
        text: 'معاملات انجام شده',
      },
      {
        id: 3,
        min: 0,
        max: 200,
        step: 1,
        time: 3000,
        symbol: 'B',
        text: 'حجم معاملات',
      },
    ];
  },
  head() {
    return {
      title: 'ارز فروش',
    };
  },

  computed: {
    isSmallAndUp() {
      return this.$vuetify.breakpoint.smAndUp;
    },
  },
};
</script>
<style lang="scss" scoped>
.rotate-0 {
  transform: rotate(0deg);
}
.rotate-90 {
  transform: rotate(90deg);
}
</style>
