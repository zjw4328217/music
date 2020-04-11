<template>
  <div class="player">
    <aplayer :music="music" :showLrc='true' @canplay='one'  ref="player" :preload='preload' :autoplay="autoplay" />
    <!-- <button ref="btn" @click="one"></button> -->
  </div>
</template>

<script>
import Vue from "vue";
import Aplayer from "vue-aplayer";
Vue.component("aplayer", Aplayer);
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      autoplay: true,
      preload: "auto",
      showir: false
    };
  },
  methods: {
    playor() {
      this.getflag();
    },
    one() {
      if(this.isplay){
        this.$refs.player.audio.play();
      }
    },
    gomusic() {
      this.$router.push("/player");
    },
    ...mapMutations("toplistdetail", ["getflag"])
  },
  mounted() {
    // this.isplay && this.$refs.btn.click();
    //  this.isplay && this.$refs.player.audio.play()
    },
  updated(){
    
    console.log(this.isplay)
  },
  computed: {
    ...mapState("toplistdetail", [
      "songdetail",
      "songurl",
      "flag",
      "show",
      "toplist",
      "isplay",
      'songlyric'
    ]),
    list() {
      var temparr = [];
      var obj = {};
      this.toplist.foreach(item => {
        obj = {
          src: "",
          title: item.name,
          artist: item.ar[0].name,
          pic: item.al.picUrl,
          
        };
        temparr.push(obj);
      });
      return temparr;
    },
    music() {
      console.log(this.songlyric.lrc.lyric)
      return {
        title: this.songdetail[0].name,
        artist: this.songdetail[0].ar[0].name,
        src: this.songurl[0].url,
        pic: this.songdetail[0].al.picUrl,
        lrc	:this.songlyric.lrc.lyric,
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.player {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0;
  z-index: 11;
  .aplayer {
    margin: 0 !important;
  }
}
</style>