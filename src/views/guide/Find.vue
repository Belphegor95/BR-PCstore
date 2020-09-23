<!-- 找回密码 -->
<template>
  <div class="find">
    <div>
      <span @click="rut">免费注册</span>
    </div>
    <div class="content">
      <h5>
        <img src="../../assets/img/guide/mm.png" />
        重置密码
      </h5>
      <div class="stepsbox">
        <div :class="pitchon >= 0? 'active':''">
          <span>
            <b>1</b>
          </span>
          <p>设置密码</p>
        </div>
        <div :class="pitchon >= 1? 'active_':''"></div>
        <div :class="pitchon >= 1? 'active':''">
          <span>
            <b>2</b>
          </span>
          <p>完成</p>
        </div>
        <!-- <div :class="pitchon >= 2? 'active_':''"></div>
        <div :class="pitchon >= 2? 'active':''">
          <span>
            <b>3</b>
          </span>
          <p>完成</p>
        </div>-->
      </div>
      <div class="formbox">
        <div class="verifybox" v-if="pitchon == 0">
          <div>
            <span>我的手机号:</span>
            <!-- <Input v-model="phoneNum" placeholder="Enter something..." style="width: 300px" /> -->
            <input type="text" v-model="phoneNum" />
          </div>
          <div>
            <span>验证码:</span>
            <input type="text" v-model="yzm" />
            <captcha :phoneNum="phoneNum" apiurl="getYzmForFindPwd" />
          </div>
          <div>
            <span>新密码:</span>
            <input type="password" v-model="pwd" onpaste="return false" />
          </div>
          <div>
            <span>再次输入新密码:</span>
            <input type="password" v-model="pwd_" onpaste="return false" />
          </div>
          <Button type="primary" class="okbtn" @click="phoneNumOk(1)">确定</Button>
          <!-- <p>其他方法验证</p> -->
        </div>
        <div class="accomplishbox" v-else-if="pitchon == 1">
          <div>
            <img src="../../assets/img/guide/cg.png" />
            <h6>重置成功,请牢记新的登录密码</h6>
          </div>
          <Button type="primary" class="okbtn btn" @click="$router.push('/guide/login')">去登陆</Button>
          <!-- <p @click="$router.push('/')">进入商城</p> -->
        </div>
      </div>
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
      pitchon: 0,
      phoneNum: "",
      yzm: "",
      pwd: "",
      pwd_: "",
    };
  },
  watch: {
    phoneNum(val) {
      this.phoneNum = val.replace(/[^\d]/g, "");
    },
    yzm(val) {
      this.yzm = val.replace(/[^\d]/g, "");
    },
    $route(to) {
      if (to.query.pitchon) {
        this.pitchon = to.query.pitchon;
      } else {
        this.pitchon = 0;
      }
    },
  },
  mounted() {
    let id = this.$route.query.pitchon;
    if (id) this.pitchon = id;
  },
  methods: {
    rut: function () {
      this.$router.push("/guide/register");
    },
    phoneNumOk: function (id) {
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
            this.pitchon = id;
            this.$router.push(`/guide/find?pitchon=${this.pitchon}`);
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
.find {
  > div:nth-child(1) {
    display: flex;
    flex-direction: row-reverse;
    > span {
      cursor: pointer;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 1rem;
    height: 36rem;
    > h5 {
      text-align: center;
      color: #bdbdbd;
      font-weight: 400;
      font-size: 1.4rem;
      padding-top: 2rem;
      padding-bottom: 2rem;
      > img {
        margin-right: 1rem;
        vertical-align: middle;
      }
    }
  }
  //   步骤条
  .stepsbox {
    display: flex;
    // align-items: center;
    justify-content: center;
    > div:nth-child(odd) {
      margin: 0 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      > span {
        display: block;
        text-align: center;
        color: #fff;
        width: 2.2rem;
        height: 2.2rem;
        line-height: 2.2rem;
        border-radius: 0.2rem;
        background-color: #bdbdbd;
        transform: rotate(45deg);
        > b {
          display: flex;
          font-size: 1.2rem;
          justify-content: center;
          transform: rotate(-45deg);
        }
      }
      > p {
        font-size: 1.2rem;
        margin-top: 1.5rem;
        color: #bdbdbd;
        // text-indent: -1rem;
      }
    }
    > div:nth-child(even) {
      margin-top: 0.9rem;
      width: 15rem;
      height: 0.5rem;
      background-color: #bdbdbd;
    }
    > div:nth-child(5) {
      margin-left: 1.5rem;
    }
    .active {
      > span {
        background-color: #ff8400 !important;
      }
      > p {
        color: #ff8400 !important;
      }
    }
    .active_ {
      background: #ff8400 !important;
    }
  }
  //   底部输入区
  .formbox {
    flex: auto;
    display: flex;
    padding-top: 3rem;
    justify-content: center;
    .verifybox {
      width: 40rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      > div {
        width: 38rem;
        margin-bottom: 1rem;
        > span {
          width: 8rem;
          font-size: 1rem;
          text-align: right;
          display: inline-block;
          margin-right: 0.5rem;
        }
        > input {
          width: 15rem;
          height: 2rem;
          text-indent: 0.5rem;
        }
        > button {
          margin-left: 1rem;
          padding: 0 2rem;
          border-radius: 0;
          color: #ff8400;
          border: 1px solid #ff8400;
        }
      }
      > p {
        margin-top: 4rem;
        color: #aeaeae;
        font-size: 1rem;
      }
    }
    .setbox {
      width: 40rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      > div {
        width: 33rem;
        margin-bottom: 1rem;
        > span {
          width: 8rem;
          font-size: 1rem;
          text-align: right;
          display: inline-block;
          margin-right: 0.5rem;
        }
        > input {
          width: 15rem;
          height: 2rem;
          text-indent: 0.5rem;
        }
      }
    }
    .accomplishbox {
      width: 40rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      > div {
        display: flex;
        align-items: center;
        > img {
          height: 3rem;
        }
        > h6 {
          text-indent: 1rem;
          font-size: 1.2rem;
        }
      }
      > p {
        cursor: pointer;
        margin-top: 1.2rem;
        color: #aeaeae;
        font-size: 1rem;
      }
    }
    // 确认按钮
    .okbtn {
      width: 20rem;
      height: 2.3rem;
      border: 0;
      font-size: 1.1rem;
      margin-top: 1.5rem;
      background-color: #ff8400;
    }
    .btn {
      width: 7rem;
      margin-top: 3.3rem;
      height: 2rem;
      // padding: 0 1rem;
    }
  }
}
</style>