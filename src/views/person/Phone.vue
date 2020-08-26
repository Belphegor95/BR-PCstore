<!-- 手机绑定 -->
<template>
  <div class="phone">
    <h4>手机绑定</h4>
    <div class="content">
      <div v-show="pitchon== -1">
        <div>
          <span>已绑定手机号:</span>
          <p>18612346789</p>
          <button @click="startphone">更换手机号</button>
        </div>
      </div>
      <div v-show="pitchon != -1">
        <div class="stepsbox">
          <div :class="pitchon >= 0? 'active':''">
            <span>
              <b>1</b>
            </span>
          </div>
          <div :class="pitchon >= 1? 'active_':''"></div>
          <div :class="pitchon >= 1? 'active':''">
            <span>
              <b>2</b>
            </span>
          </div>
          <div :class="pitchon >= 2? 'active_':''"></div>
          <div :class="pitchon >= 2? 'active':''">
            <span>
              <b>3</b>
            </span>
          </div>
        </div>
        <div v-if="pitchon == 0">
          <h6>
            账号
            <span>151******56</span>为确认是你本人操作,请完成以下验证
          </h6>
          <div>
            <div>
              <span>我的手机号:</span>
              <p>151******56</p>
            </div>
            <div>
              <span>验证码:</span>
              <div>
                <Input v-model="value" style="width: 200px" />
                <captcha :phoneNum="phoneNum" />
              </div>
            </div>
            <Button type="warning" size="large" @click="ok">确定</Button>
          </div>
        </div>
        <div v-else-if="pitchon == 1">
          <h6>我们不会泄露你的手机信息</h6>
          <div>
            <div>
              <span>新手机号:</span>
              <Input v-model="value"  style="width: 200px" />
            </div>
            <div>
              <span>验证码:</span>
              <div>
                <Input v-model="value"  style="width: 200px" />
                <captcha :phoneNum="phoneNum" />
                <!-- <button>获取验证码</button> -->
              </div>
            </div>
            <Button type="warning" size="large" @click="ok">确定</Button>
          </div>
        </div>
        <div v-else-if="pitchon == 2">
          <p>更换手机号成功</p>
          <p>
            新手机号:
            <span>123******5623</span>
          </p>
          <Button type="warning" size="large" class="btn" @click="back">返回</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import captcha from "../../components/Captcha";
export default {
  components: {
    captcha
  },
  data() {
    return {
      pitchon: -1,
      value: "",
      phoneNum: "",
    };
  },
  
  watch: {
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
    if(this.$route.query.pitchon) this.pitchon = this.$route.query.pitchon;
  },
  methods: {
    //   开始换绑手机
    startphone: function () {
      this.pitchon = 0;
      this.$router.push(`/person/phone?pitchon=${this.pitchon}`);
    },
    ok: function () {
      this.pitchon++;
      this.$router.push(`/person/phone?pitchon=${this.pitchon}`);
    },
    back: function () {
      this.pitchon = -1;
      this.$router.push("/person/phone");
    },
  },
};
</script>

<style lang='less' scoped>
.phone {
  flex: 4;
  > div {
    margin-top: 1rem;
  }
  .content {
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
          width: 20rem;
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
                color: #ff8400;
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
  }
}
</style>