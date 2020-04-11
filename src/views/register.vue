<template>
  <div>
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
    <div style="margin: 16px;">
      <van-button @click="onSubmit" round block type="info" native-type="submit">立即注册</van-button>
    </div>
  </div>
</template>
<script>
import http from "@/util/http";
import axios from "axios";
import { Toast } from "vant";

export default {
  data() {
    return {
      username: "",
      phone: "",
      password: "",
      code: "",
      send: "发送验证码",
      flag: false
    };
  },
  methods: {
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
                  this.$router.push("/login");
                } else {
                  Toast.fail("用户已存在，请重新注册");
                }
              });
          }
        });
    }
  }
};
</script>