
<!-- 注册 -->
<template>
  <div class="register">
    <div class="msgbox" v-show="msg !=''">{{ msg }}</div>
    <input type="text" placeholder="请输入手机号" class="username" v-model="phoneNum" />
    <div class="captchabox">
      <input type="text" placeholder="请输入验证码" class="captcha" v-model="yzm" @input="inputYzm" />
      <Button type="primary" shape="circle" :loading="isloading" size="default" @click="getYzm">{{ !isloading? "获取验证码": btnload + "秒后重新获取"}}</Button>
    </div>
    <!-- <div class="prompt">
      <p>
        <img src="../../assets/img/guide/i.png" />
        验证码只能输入数字
      </p>
    </div> -->
    <input type="password" placeholder="请输入初始密码" class="password" v-model="pwd" onpaste="return false" />
    <div class="prompt">
      <p>
        <img src="../../assets/img/guide/i.png" />
        由6-20个字母，数字或’_‘组成
      </p>
    </div>
    <button class="btn" @click="saveUser('registerOK')">免费注册</button>
    <p class="account">
      已有账号?
      <b @click="rut('login')">立即登录</b>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNum: "",
      pwd: "",
      yzm: "",
      msg: "",
      btnload: 60,
      isloading: false,
    };
  },
  methods: {
    rut: function (name) {
      this.$router.push(`/guide/${name}`);
    },
    // 注册账号
    saveUser: function () {
      this.msg = "";
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.msg = "手机号输入有误";
        return;
      } else if (!/[0-9]{6}/.test(this.yzm)) {
        this.msg = "验证码输入有误";
        return;
      } else if (
        !this.pwd ||
        this.pwd.trim().length < 6 ||
        this.pwd.trim().length > 16
      ) {
        this.msg = "密码输入有误";
        return;
      }
      this.axios
        .post(this.$api.regist, {
          phoneNum: this.phoneNum,
          yzm: this.yzm,
          pwd: this.pwd,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$router.push("/guide/registerOK");
            this.$store.commit("show_user", data.data);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 获取验证码
    getYzm: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.msg = "手机号输入有误";
        return;
      }
      this.axios
        .post(this.$api.getYzm, {
          phoneNum: this.phoneNum,
        })
        .then((data) => {
          if (data.result == "OK") {
            this.isloading = true;
            this.$toast("验证码已发送");
            this.setloadingNum();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 验证码倒计时
    setloadingNum: function () {
      // 倒计时
      if (this.isloading && this.btnload != -1) {
        setTimeout(() => {
          this.btnload--;
          this.setloadingNum();
        }, 1000);
      } else {
        this.btnload = 60;
        this.isloading = false;
      }
    },
    inputYzm: function (e) {
      this.yzm = e.target.value.replace(/[^\d]/g, "");
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
  margin-top: 0.7rem;
  background: #fff url("../../assets/img/guide/sj.png") 1rem 0.8rem no-repeat;
}
.password {
  margin-top: 0.7rem;
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
  .msgbox {
    width: 25rem;
    color: #e4393c;
    padding: 0.1rem 3rem;
    background-color: #ffebeb;
    border: 1px solid #faccc6;
  }
  .prompt {
    width: 23rem;
    color: #515a6e;
    margin-top: 0.4rem;
  }
  .captchabox {
    width: 25rem;
    display: flex;
    margin-top: 0.7rem;
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