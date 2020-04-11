<template>
  <div>
    <tabbar></tabbar>
    <van-swipe :autoplay="3000" class="topswipe">
      <van-swipe-item class="topswipeitem" v-for="(item,i) in imglist" :key="i+1">
        <img :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
    <div class="nav">
      <ul>
        <router-link :to="item.path" tag="li" v-for="(item,i) in navlist" :key="i">
          <van-icon size="0.7rem" :name="item.icon" />
          <!-- <   tag="van-icon" ></router-link> -->
          <p>{{item.name}}</p>
        </router-link>
      </ul>
    </div>
    <div class="recomond">
      <p style="text-align:left;">推荐歌单</p>
      <div style="height:40px;">
        <span style="float:left;font-size:0.5rem;">为你精挑细选</span>
        <van-button
          round
          style="float:right;width:100px;height:0.6rem;line-height:0.6rem;"
          type="default"
          @click="golist('/playlist')"
        >查看更多</van-button>
      </div>
      <swiper
        :dataone="{
          slidesPerView: 3,
          spaceBetween: 10,
          freeMode: true
        }"
        :key="recomondlist.length"
        randomid="photos"
      >
        <div class="swiper-slide swiperbig"  v-for="item in recomondlist" :key="item.id">
          <img :src="item.picUrl" />
          <p>{{item.name}}</p>
        </div>
      </swiper>
    </div>
    <div class="stylerecomond">
      <p style="text-align:left;">风格推荐</p>
      <div style="height:40px;">
        <span style="float:left;font-size:0.4rem;">{{recommendsongs.name}}</span>
        <van-button
          round
          style="float:right;width:2rem;height:0.6rem;line-height:0.6rem;"
          type="default"
          icon="play-circle-o"
        >播放全部</van-button>
      </div>
      <div class="recomondlist">
        <swiper
          :dataone="{
          slidesPerColumn: 3,
        }"
          :key="recommendsongs.list.length"
          randomid="recommendsongs"
        >
          <div
            class="swiper-slide swiperbigbotom"
            v-for="item in recommendsongs.list"
            :key="item.id"
            @click='play(item)'
          >
            <div class="left">
              <img :src="item.picUrl" />
            </div>
            <div class="middle">
               <p>{{item.name}}</p>
            <p>{{item.song.artists[0].name}}</p>
            </div>
           <div class="right">
             <van-icon name="play-circle-o" />
           </div>
          </div>
        </swiper>
      </div>
      <div class="bottom">到底了</div>
    </div>
    
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";

import http from "@/util/http";
import { Lazyload } from "vant";
import swiper from "@/components/swiper";
import { VideoPlayer } from "vue-video-player";
import { mapMutations, mapState , mapActions} from "vuex";
export default {
  data() {
    return {
      imglist: [],
      recomondlist: [],
      song: "",
      flag: false,
      navlist: [
        {
          icon: "music-o",
          name: "每日推荐",
          path: "/toplist"
        },
        {
          icon: "todo-list-o",
          name: "歌单",
          path: "/playlist"
        },
        {
          icon: "bar-chart-o",
          name: "排行榜",
          path: "/toplist"
        },
        {
          icon: "gift-o",
          name: "电台",
          path: "/toplist"
        },
        {
          icon: "passed",
          name: "直播",
          path: "/toplist"
        }
      ],
      recommendsongs: {
        name: "在民谣里听诗和远方",
        list: []
      }
    };
  },

  methods: {
    ...mapMutations("main", ["getimgList"]),
    ...mapMutations('toplistdetail',['getsong','getflag','playm']),
    ...mapActions('toplistdetail',['geturl','getsongdetail','getlyric']),
    golist(path) {
      this.$router.push(path);
    },
    play(data){
      console.log(data)
      this.getflag()
      this.geturl(data.id)
      this.getsongdetail(data.id)
      this.getlyric(data.id)
      this.playm()
    
    },
    
  },
  components: {
    tabbar,
    swiper,
    VideoPlayer,
    
  },
  mounted() {
    http.request("/banner").then(res => {
      this.imglist = res.data.banners;
    });

    http.request("/personalized?limit=5").then(res => {
      this.recomondlist = res.data.result;
    });

    http.request("/personalized/newsong").then(res => {
      console.log(res.data.result)
      this.recommendsongs.list = res.data.result.slice(0,9);
    });
  },
  computed: {
    // 直接当做普通属性调用不加括号
    // 任何data中数据变化立即重新计算
    // 计算属性会缓存
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.topswipe {
  .topswipeitem {
    width: 100%;
    img {
      width: 100%;
    }
  }
}

.nav {
  width: 100%;
  height: 1.8rem;
  ul {
    display: flex;
    li {
      width: 20%;
      p {
        font-size: 0.28rem;
      }
    }
  }
}
.recomond {
  width: 100%;
  height: 4rem;
  .swiper-slide {
    width: 30%;
    height: 2.46rem;
    img {
      width: 80%;
      border-radius: 5%;
    }
    p {
      font-size: 0.32rem;
    }
  }
}
.recomondlist{
  display: flex;
  position: relative;
  height: 5.8rem;
  margin-bottom: 1.2rem;
  background: #fff;
  .swiperbigbotom {
    width: 100%;
    text-align: left;
    background: #fff;
    height: calc(100% / 3);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0.04rem;
    .left{
      float: left;
      width: 20%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .middle{
      float: left;
      width: 70%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 10px;
      p{
        font-size: 0.32rem;
        height: 0.4rem;
        text-indent: 0.1rem;
        &:first-child{
          overflow: hidden;
          font-size: 0.3rem;
        }
      }
      
    }
    .right{
      float: right;
      color: red;
    }
}
} 

</style>