
<!-- 注册 -->
<template>
  <div class="register">
    <input type="text" placeholder="请输入手机号" class="username" />
    <input type="password" placeholder="4-20个字符,区分大小写" class="password" />
    <div class="captchabox">
      <input type="text" placeholder="请输入验证码" class="captcha" />
      <Button type="primary" shape="circle" size="default">获取验证码</Button>
    </div>
    <button class="btn" @click="rut('registerOK')">免费注册</button>
    <p class="account">
      已有账号?
      <b @click="rut('login')">立即登录</b>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    rut: function (name) {
      this.$router.push(`/guide/${name}`);
    },
  },
};
</script>

<style lang='less' scoped>
input {
  width: 25rem;
  border-radius: 2rem;
  border: #ededed 1px solid;
  height: 3rem;
  text-indent: 3.3rem;
}
.username {
  margin-top: 1.5rem;
  background: #fff url("../../assets/img/guide/zh.png") 1rem 0.8rem no-repeat;
}
.password {
  margin-top: 1.5rem;
  background: #fff url("../../assets/img/guide/mm.png") 1rem 0.8rem no-repeat;
}
.captcha {
  width: 15rem;
  background: #fff url("../../assets/img/guide/yzm.png") 1rem 0.8rem no-repeat;
}
.register {
  display: flex;
  height: 37rem;
  padding: 4rem 0;
  overflow: hidden;
  border-radius: 2rem;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  //   justify-content: space-around;
  .captchabox {
    width: 25rem;
    display: flex;
    margin-top: 1.5rem;
    justify-content: space-between;
    > button {
      height: 3rem;
      padding: 0 2rem;
      border: none;
      background-color: #ff8400;
    }
  }
  .btn {
    margin-top: 3rem;
    width: 25rem;
    padding: 0.5rem 0;
    color: #fff;
    font-size: 1.4rem;
    border-radius: 2rem;
    text-align: center;
    background-color: #ff8400;
  }
  .account {
    margin-top: 2rem;
    b {
      color: #ff8400;
    }
  }
}
b {
  cursor: pointer;
}
</style>