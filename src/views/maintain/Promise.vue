<!-- 客户信息 -->
<template>
  <div class="promise">
    <h4>申请上门维修 > 客户信息</h4>
    <div class="content">
      <div class="tiembox">
        <tab name="请选择期望上门时间" />
        <ul>
          <li>
            <p>8月20日</p>
            <p>
              <b>今天</b>/周日
            </p>
          </li>
          <li>
            <p>8月20日</p>
            <p>
              <b>今天</b>/周日
            </p>
          </li>
          <li>
            <p>8月20日</p>
            <p>
              <b>今天</b>/周日
            </p>
          </li>
          <li>
            <p>8月20日</p>
            <p>
              <b>今天</b>/周日
            </p>
          </li>
          <li>
            <p>8月20日</p>
            <p>
              <b>今天</b>/周日
            </p>
          </li>
          <li>
            <p>8月20日</p>
            <p>
              <b>今天</b>/周日
            </p>
          </li>
          <li>
            <p>其他时间</p>
          </li>
        </ul>
      </div>
      <div class="sitebox">
        <tab name="上门地址" />
        <RadioGroup v-model="phone" class="radiobox">
          <div v-for="(item,index) in 4" :key="index" :class="phone == index? 'radio_active':''">
            <div style="opacity: 0;">
              <img src="../../assets/img/sundry/dw.png" alt />
              <p>寄送到</p>
            </div>
            <Radio :label="index">
              <div>
                <p>北京北京确定北京北京确定北京北京确定北京北京确定北京北京确定北京北京确定</p>
                <span v-show="phone == index">修改本地址</span>
              </div>
            </Radio>
          </div>
        </RadioGroup>
        <Button>新增地址</Button>
      </div>
      <button class="nextStep" @click="advance">下一步</button>
    </div>
  </div>
</template>

<script>
import tab from "@/components/Tab.vue";
export default {
  components: {
    tab,
  },
  data() {
    return {
      phone: 0,
    };
  },
  mounted() {
    this.$store.commit("show_maintainid", 2);
  },
  methods: {
    advance: function () {
      this.$router.push("/maintain/maintainOrders");
    },
  },
};
</script>

<style lang='less' scoped>
.promise {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    .tiembox {
      width: 100%;
      padding-top: 1.5rem;
      ul {
        display: flex;
        padding: 2rem;
        > li {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          height: 5rem;
          padding: 0.5rem;
          margin-right: 0.2rem;
          background-color: #f3f4f7;
          b {
            font-weight: 400;
          }
        }
      }
    }
    .sitebox {
      width: 100%;
      .radiobox {
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          overflow: hidden;
          margin: 0.5rem 0;
          > div {
            display: flex;
            width: 6rem;
            align-items: center;
            justify-content: center;
            > img {
              margin-right: 0.2rem;
            }
          }
          > label {
            width: 100%;
            display: flex;
            align-items: center;
            white-space: unset;
            > div {
              display: flex;
              width: 100%;
              justify-content: space-between;
              > p {
                word-wrap: break-word;
              }
              > span {
                color: #ff8400;
              }
            }
          }
        }
        .radio_active {
          border: 1px solid #ff8400;
          background-color: #fff0e8;
          > div:nth-child(1) {
            opacity: 1 !important;
          }
          > label {
            > div {
              > p {
                font-size: 1.2rem;
                font-weight: 700;
                word-wrap: break-word;
              }
            }
          }
        }
      }
      > button {
        margin-top: 0.5rem;
        margin-left: 6.5rem;
      }
    }
    .nextStep {
      margin-top: 5rem;
    }
  }
}
</style>
<style>
.ivu-radio-checked .ivu-radio-inner {
  border-color: #ff8400;
}
.ivu-radio-inner:after {
  background-color: #ff8400;
}
</style>