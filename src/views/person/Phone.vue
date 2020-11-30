<!-- 手机绑定 -->
<template>
  <div class="phone">
    <h4>手机绑定</h4>
    <div class="content">
      <div v-show="pitchon == -1">
        <div>
          <span>已绑定手机号:</span>
          <p v-if="user.phone">{{ user.phone }}</p>
          <p v-else>{{ user.phoneNum }}</p>
          <button @click="startphone">更换手机号</button>
        </div>
      </div>
      <div v-show="pitchon != -1">
        <div class="stepsbox">
          <div :class="pitchon >= 0 ? 'active' : ''">
            <span>
              <b>1</b>
            </span>
          </div>
          <div :class="pitchon >= 1 ? 'active_' : ''"></div>
          <div :class="pitchon >= 1 ? 'active' : ''">
            <span>
              <b>2</b>
            </span>
          </div>
          <div :class="pitchon >= 2 ? 'active_' : ''"></div>
          <div :class="pitchon >= 2 ? 'active' : ''">
            <span>
              <b>3</b>
            </span>
          </div>
        </div>
        <div v-if="pitchon == 0">
          <h6>
            <!-- 账号
            <span v-if="user.phone">{{ user.phone }}</span>
            <span v-else>{{ user.phoneNum }}</span> -->
            <p>身份认证</p>
            <!-- 为确认是你本人操作,请完成以下验证 -->
          </h6>
          <div>
            <div>
              <span>当前手机号:</span>
              <p>{{ phoneNum }}</p>
            </div>
            <div>
              <span>验证码:</span>
              <div>
                <Input v-model="yzm" style="width: 200px" />
                <captcha :phoneNum="phoneNum" apiurl="getYzmForChangePhone" />
              </div>
            </div>
            <Button type="warning" size="large" @click="applyChangePhone"
              >确定</Button
            >
          </div>
        </div>
        <div v-else-if="pitchon == 1">
          <h6>设置新手机号</h6>
          <div>
            <div>
              <span>新手机号:</span>
              <Input v-model="phoneNum_" style="width: 200px" />
            </div>
            <div>
              <span>验证码:</span>
              <div>
                <Input v-model="yzm_" style="width: 200px" />
                <captcha :phoneNum="phoneNum" apiurl="getYzm" />
              </div>
            </div>
            <Button type="warning" size="large" @click="changePhone"
              >确定</Button
            >
          </div>
        </div>
        <div class="okbox" v-else-if="pitchon == 2">
          <div>
            <img src="../../assets/img/person/ok.png" alt="" />
            <div>
              <p>更换手机号成功</p>
              <p>
                新手机号:
                <span>123******5623</span>
              </p>
            </div>
          </div>
          <Button type="warning" size="large" class="btn" @click="back"
            >返回</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import captcha from "@/components/Captcha";
export default {
  components: {
    captcha,
  },
  data() {
    return {
      user: this.$store.state.user,
      pitchon: -1,
      value: "",
      phoneNum: "",
      yzm: "",
      phoneNum_: "",
      yzm_: "",
    };
  },
  watch: {
    phoneNum(val) {
      this.$nextTick(() => {
        this.phoneNum = val.replace(/[^\d]/g, "");
      });
    },
    yzm(val) {
      this.$nextTick(() => {
        this.yzm = val.replace(/[^\d]/g, "");
      });
    },
    phoneNum_(val) {
      this.$nextTick(() => {
        this.phoneNum_ = val.replace(/[^\d]/g, "");
      });
    },
    yzm_(val) {
      this.$nextTick(() => {
        this.yzm_ = val.replace(/[^\d]/g, "");
      });
    },
    $route(to) {
      if (to.query.pitchon) {
        this.pitchon = to.query.pitchon;
      } else {
        this.pitchon = -1;
      }
    },
  },
  mounted() {
    this.$store.commit("show_personid", 5);
    if (this.$route.query.pitchon) this.pitchon = this.$route.query.pitchon;
    if (this.pitchon == 0) {
      this.phoneNum = this.user.phone ? this.user.phone : this.user.phoneNum;
    }
  },
  methods: {
    // 开始换绑手机
    applyChangePhone: function () {
      this.axios
        .post(this.$api.applyChangePhone, {
          phoneNum: this.phoneNum,
          yzm: this.yzm,
        })
        .then((data) => {
          if (data.code == 200) {
            this.pitchon = 1;
            this.$router.push(`/person/phone?pitchon=${this.pitchon}`);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 换绑手机号
    changePhone: function () {
      this.axios
        .post(this.$api.changePhone, {
          phoneNum: this.phoneNum_,
          pwd: this.pwd_,
        })
        .then((data) => {
          if (data.code == 200) {
            this.pitchon = 2;
            this.$router.push(`/person/phone?pitchon=${this.pitchon}`);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    //   开始换绑手机
    startphone: function () {
      this.pitchon = 0;
      this.phoneNum = this.user.phone ? this.user.phone : this.user.phoneNum;
      this.$router.push(`/person/phone?pitchon=${this.pitchon}`);
    },
    back: function () {
      this.$router.go(-2);
    },
  },
};
</script>

<style lang='less' scoped>
.phone {
  > div {
    margin-top: 1rem;
  }
  .content {
    border: 1px solid #ebebeb;
    min-height: 15.7rem;
    padding: 0.65rem;
    > div:nth-child(1) {
      > div {
        width: 23rem;
        display: flex;
        font-size: 1rem;
        padding: 2rem 1rem;
        justify-content: space-between;
        > span {
          color: #666666;
        }
        > p {
          color: #000;
          margin-right: 2.5rem;
        }
        > button {
          color: #fff;
          padding: 0 0.2rem;
          font-size: 0.6rem;
          border-radius: 0.2rem;
          background-color: #ff8400;
        }
      }
    }
    > div:nth-child(2) {
      //   步骤条
      .stepsbox {
        display: flex;
        margin-top: 2rem;
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
            width: 2.51rem;
            height: 2.51rem;
            line-height: 2.51rem;
            border-radius: 50%;
            background-color: #ffc273;
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
            color: #ffc273;
          }
        }
        > div:nth-child(even) {
          margin-top: 0.9rem;
          width: 20rem;
          height: 0.25rem;
          background-color: #ffc273;
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
      > div:nth-child(2) {
        padding: 2rem 3rem;
        > h6 {
          font-weight: 400;
          color: #000;
          line-height: 1.5rem;
          text-indent: 0.5rem;
          border-bottom: 1px solid #ececec;
          > span {
            color: #ff8400;
          }
        }
        > div:nth-child(2) {
          padding: 1rem 0.5rem;
          > div {
            display: flex;
            align-items: center;
            margin-top: 2rem;
            > span:nth-child(1) {
              color: #888888;
              width: 5rem;
              text-align: right;
              margin-right: 0.5rem;
            }
            > p:nth-child(2) {
              color: #ff8400;
            }
            > div:nth-child(2) {
              > button {
                // color: #ff8400;
                margin-left: 1rem;
                padding: 0.25rem 1.5rem;
                border: 1px solid #ff8400;
              }
            }
          }
          > button {
            margin-left: 5.5rem;
            margin-top: 2rem;
            width: 14rem;
            padding: 0 2rem;
          }
        }
        > p {
          font-size: 1rem;
          color: #000;
          padding: 0.5rem 5.5rem;
          > span {
            color: #ff8400;
          }
        }
        > button {
          margin-left: 5.5rem;
          margin-top: 5rem;
          width: 14rem;
          padding: 0 2rem;
        }
      }
    }
    .okbox {
      display: flex;
      align-items: center;
      flex-direction: column;
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        > img {
          margin-right: 2rem;
        }
        > div {
          > p:nth-child(1) {
            font-size: 1.29rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            margin-bottom: 0.8rem;
          }
        }
      }
    }
  }
}
button {
  border-radius: 0;
}
</style>