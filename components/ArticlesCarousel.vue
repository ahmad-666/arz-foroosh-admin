<template>
  <base-slider
    :config="carouselConfig"
    :slides-num="slides.length"
    :show-bullets="false"
    :show-arrows="true"
  >
    <li v-for="slide in slides" :key="slide.id" class="glide__slide">
      <article-card
        :title="slide.title"
        :text="slide.text"
        :img-src="slide.imgSrc"
        :route="slide.route"
      ></article-card>
    </li>
  </base-slider>
</template>
<script>
import ArticleCard from '~/components/ArticleCard.vue';
import BaseSlider from '~/components/BaseSlider.vue';
import { articlesCarousel } from '~/config/slider';
export default {
  components: {
    ArticleCard,
    BaseSlider,
  },
  data() {
    return {
      slides: [],
      slider: null,
    };
  },
  fetch() {
    for (let i = 0; i < 10; i++) {
      this.slides[i] = {};
      this.slides[i].id = i;
      this.slides[i].title = 'درباره کلاهبرداران اینترنتی بدانید';
      this.slides[i].text =
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, adipisci distinctio, qui facilis quae nostrum libero temporibus ';
      this.slides[i].route = `/articles/${i}`;
      const randVal = Math.random();
      this.slides[i].imgSrc =
        randVal < 0.33
          ? '/imgs/slide1.jpg'
          : randVal > 0.33 && randVal < 0.66
          ? '/imgs/slide2.jpg'
          : '/imgs/slide3.jpg';
    }
  },
  computed: {
    carouselConfig() {
      return articlesCarousel;
    },
  },
};
</script>
<style lang="scss">
.custom-carousel {
  .v-window__prev,
  .v-window__next {
    background-color: teal;
    opacity: 0.8;
    color: white;
  }
}
</style>
