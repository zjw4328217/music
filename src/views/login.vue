<template>
  <div>
    <van-nav-bar title="注册&登陆" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active">
      <van-tab title="登陆">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          name="密码"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
         <div style="margin: 16px;">
          <van-button @click="login" type="info">马上登陆</van-button>
          <van-button style="margin-left:0.6rem;" type="danger" @click="goregister">立即注册</van-button>
        </div>
      </van-tab>
      <van-tab title="注册">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field v-model="code" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button
            @click="sendcode"
            :disabled="flag"
            slot="button"
            size="small"
            type="primary"
          >{{send}}</van-button>
        </van-field>
        <div style="margin: 0.32rem;">
          <van-button @click="onSubmit" round block type="info" native-type="submit">立即注册</van-button>
        </div>
      </van-tab>
      <van-tab title="修改密码">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field v-model="code" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button
            @click="sendcode"
            :disabled="flag"
            slot="button"
            size="small"
            type="primary"
          >{{send}}</van-button>
        </van-field>
        <div style="margin: 0.32rem;">
          <van-button @click="onSubmit" round block type="info" native-type="submit">修改密码</van-button>
        </div>
      </van-tab>
    </van-tabs>

   
  </div>
</template>
<script>
import http from "@/util/http";
import { Toast } from "vant";
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      phone: "",
      password: "",
      flag: false,
      active:0,
      username: "",
      code: "",
      send: "发送验证码",
      flag: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    login() {
      http
        .get(`/login/cellphone?phone=${this.phone}&password=${this.password}`)
        .then(res => {
          console.log(res.data.code);
          if (res.data.code === 200) {
            this.$router.push("/");
          } else {
            Toast.fail("用户名或者密码错误，请重新输入");
          }
        });
    },
    goregister() {
      // this.$router.push("/register");
      this.active=1
    },
    sendcode() {
      http.request(`/captcha/sent?phone=${this.phone}`).then(res => {
        console.log(res.data);

        if (res.data.code === 200) {
          this.flag = true;
          var _that = this;
          var temtime = 60;
          this.timer = setInterval(() => {
            temtime--;
            _that.send = temtime + "秒";
            if (temtime == 0) {
              clearInterval(_that.timer);
              _that.flag = false;
              _that.send = "发送验证码";
            }
          }, 1000);
        } else {
          Toast.fail("手机号不正确");
        }
      });
    },
    onSubmit() {
      http
        .request(`/captcha/verify?phone=${this.phone}&captcha=${this.code}`)
        .then(res => {
          console.log(res.data);
          if (res.data.code !== 200) {
            Toast.fail("验证码错误请重新输入");
            return false;
          } else {
            http
              .request(
                `/register/cellphone?phone=${this.phone}&password=${this.password}&captcha=${this.code}&nickname=${this.username}`
              )
              .then(res => {
                console.log(res.data.msg);
                if (res.data.code === 200) {
                  Toast.fail("用户注册成功,跳转登陆页面");
                  this.active=0
                } else {
                  Toast.fail("用户已存在，请重新注册");
                }
              });
          }
        });
    },
    ...mapMutations('toplistdetail',['showit','hideit'])
  },
  mounted(){
    this.hideit()
  },
  computed: {
    // 直接当做普通属性调用不加括号
    // 任何data中数据变化立即重新计算
    // 计算属性会缓存
    
  },
  destroyed(){
    this.showit()
  }
};
</script>