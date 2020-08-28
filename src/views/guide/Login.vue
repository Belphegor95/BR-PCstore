<!-- 登录 -->
<template>
  <div class="login">
    <img src="../../assets/img/guide/bj.png" />
    <div class="loginbox">
      <Tabs value="name1" size="default" class="tab" v-if="users.length == 0">
        <TabPane label="密码登录" name="name1">
          <div class="msgbox" v-show="msg !=''">{{ msg }}</div>
          <input type="text" placeholder="账号/手机号" class="username" :class="is_phone?'false_input':''" v-model="phoneNum" />
          <input type="password" placeholder="密码" class="password" :class="is_pwd?'false_input':''" v-model="pwd" />
          <div class="prompt">
            <p>
              <img src="../../assets/img/guide/i.png" />
              由6~20个字母,数字和符号组成
            </p>
            <b @click="rut('find')">忘记密码?</b>
          </div>
          <button class="btn" @click="loginClick">登录</button>
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
              <img src="../../assets/img/guide/i.png" />
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
      <div class="userbox" v-else>
        <div>请选择要登录的ID</div>
        <ul>
          <li v-for="(item,index) in  users" :key="index" @click="userClick(item)">
            <img src="../../assets/img/guide/tx.png" />
            <div class="userName">
              <p>开心兔商城用户:{{ item.id }}</p>
              <p>昵称:{{ item.company_name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      phoneNum: "",
      pwd: "",
      btnload: false,
      is_phone: false,
      is_pwd: false,
      msg: "",
      users: [],
    };
  },
  mounted() {
    this.users = this.$store.state.user.loginData || [];
  },
  methods: {
    rut: function (name) {
      this.$router.push(`/guide/${name}`);
    },
    loginClick: function () {
      this.is_phone = false;
      this.is_pwd = false;
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.is_phone = true;
        this.msg = "手机号输入有误";
        return;
      } else if (
        !this.pwd ||
        this.pwd.trim().length < 6 ||
        this.pwd.trim().length > 16
      ) {
        this.is_pwd = true;
        this.msg = "密码输入有误";
        return;
      }
      this.btnload = true;
      this.axios
        .post(this.$api.login, {
          phoneNum: this.phoneNum,
          pwd: this.pwd,
        })
        .then((data) => {
          this.btnload = false;
          if (data.code == 200) {
            // 删除重新赋值
            localStorage.removeItem("vuex");
            this.$store.commit("resetState");
            this.$store.commit("show_user", data.data);
            if (data.data.type) {
              this.users = data.data.loginData;
            } else {
              Object.keys(this.$route.query).length == 0
                ? this.$router.push("/")
                : this.$router.go(-1);
            }
          } else {
            this.msg = this.ErrCode(data.msg);
          }
        })
        .catch(() => {
          this.btnload = false;
          this.msg = this.$api.monmsg;
        });
    },
    // 选择用户
    userClick: function (item) {
      this.axios
        .post(this.$api.selectAcc, {
          accOrderId: item.id,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$store.commit("show_user", data.data);
            this.$router.push("/")
            Object.keys(this.$route.query).length == 0
              ? this.$router.push("/")
              : this.$router.go(-2);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
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
.false_input {
  border: #e4393c 1px solid;
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
      height: 27rem;
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
      .msgbox {
        width: 25rem;
        color: #e4393c;
        padding: 0.1rem 3rem;
        background-color: #ffebeb;
        border: 1px solid #faccc6;
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
    .userbox {
      width: 36rem;
      height: 36rem;
      display: flex;
      flex-direction: column;
      > div:nth-child(1) {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        font-weight: 700;
        padding-bottom: 1rem;
        /* padding-top: 1rem; */
        background: linear-gradient(to right, #ffd8a4, #fcaa8d);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      > ul {
        flex: 7;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        > li {
          cursor: pointer;
          display: flex;
          padding: 1rem;
          width: 30rem;
          border-radius: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
        }
        > li > img {
          width: 4rem;
          margin-right: 1rem;
        }
        .userName {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
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