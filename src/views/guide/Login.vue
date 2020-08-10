<!-- 登录 -->
<template>
  <div class="login">
    <img src="../../assets/img/guide/bj.png" alt />
    <div class="loginbox">
      <Tabs value="name1" size="default" class="tab">
        <TabPane label="密码登录" name="name1">
          <input type="text" placeholder="账号/手机号" class="username" />
          <input type="password" placeholder="密码" class="password" />
          <div class="prompt">
            <p>
              <img src="../../assets/img/guide/i.png" alt />
              由6~20个字母,数字和符号组成
            </p>
            <b @click="rut('find')">忘记密码?</b>
          </div>
          <button class="btn" @click="login">登录</button>
          <p class="account">
            还没有账号?
            <b @click="rut('register')">立即注册</b>
          </p>
        </TabPane>
        <TabPane label="短信登录" name="name2">
          <input type="text" placeholder="请输入手机号" class="phone" />
          <div class="captchabox">
            <input type="text" placeholder="请输入验证码" class="captcha" />
            <Button type="primary" shape="circle" size="default">获取验证码</Button>
          </div>
          <div class="prompt">
            <p>
              <img src="../../assets/img/guide/i.png" alt />
              由6~20个字母,数字和符号组成
            </p>
            <b v-show="false" @click="rut('find')">忘记密码?</b>
          </div>
          <button class="btn">登录</button>
          <p class="account">
            还没有账号?
            <b @click="rut('register')">立即注册</b>
          </p>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  mounted() {},
  methods: {
    login: function () {
      this.$router.push("/");
    },
    rut: function (name) {
      this.$router.push(`/guide/${name}`);
    },
  },
};
</script>

<style lang='less' scoped>
.username,
.password,
.phone,
.captcha {
  width: 25rem;
  border-radius: 2rem;
  border: #ededed 1px solid;
  height: 3rem;
  text-indent: 3.3rem;
}
.username {
  margin-top: 1rem;
  background: #fcf7f2 url("../../assets/img/guide/zh.png") 1rem 0.8rem no-repeat;
}
.password {
  margin-top: 2rem;
  background: #fcf7f2 url("../../assets/img/guide/mm.png") 1rem 0.8rem no-repeat;
}
.phone {
  margin-top: 1rem;
  background: #fcf7f2 url("../../assets/img/guide/sj.png") 1rem 0.8rem no-repeat;
}
.captcha {
  width: 15rem;
  background: #fcf7f2 url("../../assets/img/guide/yzm.png") 1rem 0.8rem
    no-repeat;
}
.login {
  display: flex;
  border-radius: 2rem;
  overflow: hidden;
  .loginbox {
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #fff;
    justify-content: center;
    .tab {
      width: 30rem;
      height: 25rem;
      .ivu-tabs-tabpane {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .prompt {
        display: flex;
        width: 25rem;
        padding: 0.5rem 1rem;
        justify-content: space-between;
      }
      .btn {
        margin-top: 3rem;
        width: 25rem;
        padding: 0.5rem 0;
        color: #fff;
        font-size: 1.4rem;
        border-radius: 2rem;
        text-indent: 2rem;
        letter-spacing: 2rem;
        text-align: center;
        background-color: #ff8400;
      }
      // 短信登录
      .captchabox {
        width: 25rem;
        display: flex;
        margin-top: 2rem;
        justify-content: space-between;
        > button {
          height: 3rem;
          padding: 0 2rem;
          border: none;
          background-color: #ff8400;
        }
      }
      .account {
        margin-top: 2rem;
        b {
          color: #ff8400;
        }
      }
    }
  }
}
b {
  cursor: pointer;
}
</style>

<style lang='less'>
.login {
  .ivu-tabs-nav {
    display: flex;
    width: 100%;
    font-size: 1.2rem;
    > div {
      flex: 1;
      text-align: center;
    }
    .ivu-tabs-tab:hover,
    .ivu-tabs-tab-active {
      color: #ff8400;
    }
    .ivu-tabs-ink-bar {
      background-color: #ff8400;
    }
  }
}
</style>