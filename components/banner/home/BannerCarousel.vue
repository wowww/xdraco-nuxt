<template>
  <swiper ref="swiperTop" class="swiper" :options="swiperOptions">
    <swiper-slide>
      <banner-boss-raid />
    </swiper-slide>
    <swiper-slide>
      <banner-mirax />
    </swiper-slide>
    <swiper-slide>
      <banner-hsp-staking />
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination" />
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import BannerBossRaid from '@/components/banner/home/BannerBossRaid';
import BannerMirax from '@/components/banner/home/BannerMirax';
import BannerHspStaking from '@/components/banner/home/HspStaking';

export default {
  name: 'BannerCarousel',
  components: {
    Swiper,
    SwiperSlide,
    BannerBossRaid,
    BannerMirax,
    BannerHspStaking,
  },
  computed: {
    swiperOptions() {
      return ({
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        effect: 'fade',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      });
    },
  },
};
</script>
