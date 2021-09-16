<template>
  <div>
    <h6 class="text-h5 font-weight-bold titleColor--text text-center">
      چرا ارز فروش ؟
    </h6>
    <div class="mt-6 video-wrapper mx-auto">
      <base-video :preview-src="previewSrc" :video-src="videoSrc"></base-video>
    </div>

    <v-container class="mt-6">
      <v-row align="stretch">
        <v-col v-for="(card, i) in cards" :key="card.id" cols="12" md="6">
          <why-us-card
            :title="card.title"
            :desc="card.desc"
            :img-src="card.imgSrc"
            :is-reverse="i % 2 !== 0 ? true : false"
          ></why-us-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import WhyUsCard from '~/components/WhyUsCard.vue';
import BaseVideo from '~/components/BaseVideo.vue';
export default {
  components: {
    WhyUsCard,
    BaseVideo,
  },
  data() {
    return {
      cards: [],
      videoSrc: 'vids/vid.mp4',
      previewSrc: 'imgs/preview.jpg',
    };
  },
  fetch() {
    this.cards[0] = {
      id: 1,
      title: 'پشتیبانی ۲۴/۷',
      desc: `در هفت روز هفته در ۲۴ شبانه روز پاسخ گوی شما هستیم.
      <br />
در هر وضعیت از معامله و و در هر ساعت از شبانه روز با ما تماس بگیرید.
`,
      imgSrc: 'imgs/1.png',
    };
    this.cards[1] = {
      id: 2,
      title: 'سرعت بی نظیر',
      desc: `در کمال اطمینان اعلام میکنیم که کلیه امور از شروع خرید یا فروش شما تا انتقال تتر یا ریال به شما کمتر از ۱۵ دقیقه طول میکشد.
        <br />
    در ارز فروش کلیه امرور از احراز هویت کاربران تا انتقال تتر و یا ریال بصورت کاملا سیستمی و بدون دخالت اپراتور صورت میگیرد.
    `,
      imgSrc: 'imgs/2.png',
    };
    this.cards[2] = {
      id: 3,
      title: 'پشتیبانی از انواع تتر',
      desc: `در ارز فروش امکان خرید و فروش کلیه انواع تتر فراهم میباشد.
      <br />
    ERC-20 , TRC20 , EOS , Omni
    `,
      imgSrc: 'imgs/3.png',
    };
    this.cards[3] = {
      id: 4,
      title: 'اعتماد کاربران',
      desc: `هم خوشحالیم و هم مفتخر که راز ماندگاری و رشدهای تتر اعتماد کابران بوده است.
      <br />
    این اعتماد نتیجه اولویت مجموعه به رضایت کاربران از نظر کیفی بوده است.
    <br />
    بعد از هر تراکنش مالی با کاربر تماس گرفته شده و از رضایت همه عزیزان اطمینان حاصل میکنیم تا پاسخگوی این اعتماد باشیم.
    `,
      imgSrc: 'imgs/4.png',
    };
  },
};
</script>
<style lang="scss" scoped>
.video-wrapper {
  width: 65%;
  height: 380px;
}
@media screen and (max-width: 500px) {
  .video-wrapper {
    width: 95%;
    height: 300px;
  }
}
</style>
