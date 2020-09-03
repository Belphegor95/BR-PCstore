<!-- 修改登录密码 -->
<template>
  <div class="password">
    <h4>修改登录密码</h4>
    <div class="formbox">
      <div>
        <span>我的手机号:</span>
        <Input v-model="phoneNum" />
      </div>
      <div>
        <span>验证码:</span>

        <div class="btnbox">
          <Input v-model="yzm" />
          <captcha :phoneNum="phoneNum" apiurl="getYzmForFindPwd" />
        </div>
      </div>
      <div>
        <span>新密码:</span>
        <Input type="password" v-model="pwd" />
      </div>
      <div>
        <span>再次输入新密码:</span>
        <Input type="password" v-model="pwd_" />
      </div>
      <Button type="warning" size="large" class="btn" @click="resetPwd">确定</Button>
    </div>
  </div>
</template>

<script>
import captcha from "../../components/Captcha";
export default {
  components: {
    captcha,
  },
  data() {
    return {
      value: "",
      phoneNum: "",
      yzm: "",
      pwd: "",
      pwd_: "",
    };
  },
  mounted() {
    this.$store.commit("show_personid", 4);
  },
  methods: {
    resetPwd: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      } else if (this.yzm.trim().length != 6) {
        this.$toast("验证码输入有误");
        return;
      } else if (this.pwd != this.pwd_) {
        this.$toast("两次输入不一致!");
        return;
      } else if (this.pwd.trim() == "" || this.pwd_.trim() == "") {
        this.$toast("密码不能为空!");
        return;
      } else if (this.pwd.trim().length < 6 || this.pwd_.trim().length < 6) {
        this.$toast("密码不能小于6位!");
        return;
      }
      this.axios
        .post(this.$api.resetPwd, {
          phoneNum: this.phoneNum,
          yzm: this.yzm,
          pwd: this.pwd,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$router.push("/");
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
.password {
  flex: 4;
  > div {
    margin-top: 1rem;
  }
  > .formbox {
    width: 27.5rem;
    margin-bottom: 5rem;
    > div {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      > span {
        width: 7rem;
        text-align: right;
        margin-right: 0.5rem;
      }
      > div {
        width: 1px;
        flex: auto;
      }
      .btnbox {
        display: flex;
        > button {
          color: #ff8400;
          width: 8rem;
          margin-left: 1rem;
          border: 1px solid #ff8400;
        }
      }
    }
    .btn {
      width: 12rem;
      margin-top: 2rem;
      margin-left: 9rem;
    }
  }
}
</style>