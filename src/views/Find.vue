<template>
    <div class="find">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(data,i) in banner" :key="i">
                <div class="bannerImg">
                    <img :src="data.imageUrl" >
                    <div class="typeTitle" :style="{background:data.titleColor}">{{data.typeTitle}}</div>
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="nav">
            <ul>
                <li>
                    <i class="iconfont icon-guanzhu"></i>
                    <div>每日推荐</div>
                </li>
                <li>
                    <i class="iconfont icon-gedan"></i>
                    <div>歌单</div>
                </li>
                <li>
                    <i class="iconfont icon-paihangbang"></i>
                    <div>排行榜</div>
                </li>
                <li>
                    <i class="iconfont icon-diantai"></i>
                    <div>电台</div>
                </li>
                <li>
                    <i class="iconfont icon-zhibobofangshexiangjitianxianxianxing"></i>
                    <div>直播</div>
                </li>
            </ul>
        </div>
        <div class="gedan">
            <p>推荐歌单</p>
            <div class="title1">
                <h3>为你精挑细选</h3>
                <span>查看更多</span>
            </div>
            <div class="content" v-if="tuijiangedan">
                <swiper kerwinClass='picture' :kerwinData="{slidesPerView: 'auto',spaceBetween: 10,}">
                    <div v-for="(data,i) in tuijiangedan" :key="i" class="swiper-slide swiper1">
                        <div class="img">
                            <img :src="data.picUrl">
                            <div><i class="iconfont icon-bofang3"></i>{{data.playCount | bofangliang}}</div>
                        </div>
                        <p>{{data.name}}</p>
                    </div>
                </swiper>
            </div>
        </div>
        <div class="gequ">
            <p>歌曲推荐</p>
            <div class="title1">
                <h3>根据Let Her Go推荐</h3>
                <span> <i class="iconfont icon-bofang3"></i> 播放全部</span>
            </div>
            <div class="content" v-if="gequtuijian">
                <swiper kerwinClass='kerwin' :kerwinData="{slidesPerColumn: 3,}">
                    <div v-for="(data,i) in gequtuijian" :key="i" class="swiper-slide swiper2">
                        <div class="img">
                            <img :src="data.picUrl">
                        </div>
                        <p>{{data.name}} <span>-{{data.song.artists[0].name}}</span> </p>
                        <div class="bofang"> <i class="iconfont icon-bofang3"></i>  </div>
                    </div>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import swiper from '@/components/swiper'
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
    components:{
        swiper
    },
    data(){
        return{
            banner:[],
            tuijiangedan:null,
            gequtuijian:null,
        }
    },
    mounted() {
        this.$http.request({
            url:"/banner?type=0"
        }).then(res=>{
            this.banner = res.data.banners
        }),
        this.$http.request({
            url:"/personalized?limit=6"
        }).then(res=>{
            
            this.tuijiangedan = res.data.result;
            console.log(this.tuijiangedan)
        })
        this.$http.request({
            url:"/personalized/newsong"
        }).then(res=>{
            console.log(res.data)
            this.gequtuijian = res.data.result;
            
        })
    },
}
</script>

<style lang="scss" scoped>
.find{
    margin-top: 44px;
    padding: 0 10px;
    background: white;
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: white;
    }
    .bannerImg{
        width: 100%;
        min-height: 0;
        box-sizing: border-box;
        padding: 10px 0;
        position: relative;
        img{
            width: 100%;
            border-radius: 5px;
        }
        .typeTitle{
            position: absolute;
            right: 0;
            bottom: 10px;
            font-size: 0.2rem;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 5px 0 5px 0;
            padding: 0 5px;
        }
    }
    .nav{
        ul{
            display: flex;
            justify-content: space-between;
            li{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                i{
                    display: block;
                    width: 1rem;
                    height: 1rem;
                    text-align: center;
                    line-height: 1rem;
                    border-radius: 100%;
                    background: red;
                    font-size: 0.5rem;
                    color: white;
                }
                div{
                    height: 20px;
                    line-height: 20px;
                    font-size: 0.25rem;
                }
            }
        }
    }
    .gedan{
        margin-top: 20px;
        &>p{
            font-size: 0.12rem;
            color: #ccc;
        }
        .title1{
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
            h3{
                font-weight: 700;
            }
            span{
                display: block;
                border: 1px solid #000;
                width: 50px;
                height: 20px;
                border-radius: 10px;
                line-height: 20px;
                text-align: center;
                font-size: 0.16rem;
            }
        }
        .content{
            margin-top: 10px;
            .img{
                width: 2rem;
                height: 2rem;
                position: relative;
                img{
                    width: 100%;
                    border-radius: 5px;
                }
                div{
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 0.12rem;
                    i{
                        font-size: 0.12rem;
                    }
                }
            }
            p{
                font-size: 0.12rem;
            }
            .swiper1{
                width: 2rem;
            }
        }
    }
    .gequ{
        margin-top: 20px;
        &>p{
            font-size: 0.12rem;
            color: #ccc;
        }
        .title1{
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
            h3{
                font-weight: 700;
            }
            span{
                display: block;
                border: 1px solid #000;
                width: 60px;
                height: 20px;
                border-radius: 10px;
                line-height: 20px;
                text-align: center;
                font-size: 0.16rem;
                i{
                    font-size: 0.12rem;
                }
            }
        }
        .content{
            margin-top: 10px;
            margin-bottom: 40px;
            width: 100%;
            height: 180px;
            position: relative;
            .img{
                width: 1rem;
                height: 1rem;
                position: relative;
                img{
                    width: 100%;
                    border-radius: 5px;
                }
                div{
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 0.12rem;
                }
            }
            p{
                font-size: 0.16rem;
                text-indent: 10px;
                span{
                    font-size: 0.12rem;
                    color:#ccc;
                }
            }
            .bofang{
                width: 30px;
                height: 30px;
                border: 1px solid #000;
                border-radius: 100%;
                color:red;
                text-align: center;
                line-height: 30px;
                position: absolute;
                top: 15px;
                right: 20px;
                text-indent: 3px;
            }
            .swiper2{
                width: 100%;
                text-align: left;
                font-size: 18px;
                background: #fff;
                height: calc(100% / 3);
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-left: 2px;
            }
        }
    }
}
</style>