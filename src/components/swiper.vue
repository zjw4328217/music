<template>
  <div class="swiper-container" :class="randomid">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  props: ["randomid", "dataone"],
  mounted() {
    let mySwiper = new Swiper("." + this.randomid, this.dataone);
  }
};
</script> 