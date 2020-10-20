<!-- 支付 -->
<template>
  <div class="pay">
    <div class="tsbox">
      <p>
        订单提交成功!请您尽快付款!订单号: <span>{{ orderOk.tradeNo }}</span>
      </p>
      <p>
        应付金额: <span>{{ orderOk.money }}元</span>
      </p>
    </div>
    <div class="payOne" v-if="orderOk.pitchon == 1">
      <div>
        <span>在线支付</span>
        <p>
          支付: <span>{{ orderOk.money }}元</span>
        </p>
      </div>
      <div class="btnbox">
        <button class="weixinbtn" @click="onPay(2)">
          <img src="../assets/img/pay/weixin.png" alt="" />
        </button>
      </div>
    </div>
    <div class="payTwo" v-else-if="orderOk.pitchon == 2">
      <div class="zfbox">
        <div class="imgbox">
          <h6>微信支付</h6>
          <img :src="bs64" alt="tgUrl" />
          <div class="mzbox">
            <img src="../assets/img/pay/weixin_mz.png" alt="" />
            <div>
              <p>请用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <img src="../assets/img/pay/weixin_zf.png" alt="" />
      </div>
      <p @click="$router.go(-1)">＜ 选择其他支付方式</p>
    </div>
    <div class="payOk" v-else-if="orderOk.pitchon == 3">
      <div>
        <div>√</div>
        <div>
          <p>购买成功</p>
          <p>我们尽快为您处理</p>
        </div>
      </div>
      <div>
        <p>订单编号：{{ orderOk.tradeNo }}</p>
        <p>微信支付：{{ orderOk.money }}元</p>
      </div>
      <div>
        <button>查看订单详情</button> |
        <button @click="$router.push('/')">继续逛逛</button>
      </div>
    </div>
  </div>
</template>

<script>
const qrcode = require("jr-qrcode");
export default {
  props: {
    orderOk: Object,
  },
  data() {
    return {
      bs64: "",
      getispay: null,
    };
  },
  watch: {
    orderOk(val) {
      if (val.pitchon == 2) {
        this.isCheckPay();
        this.bs64 = qrcode.getQrBase64(val.qrCode);
      }
    },
  },
  mounted() {
    if (this.orderOk.pitchon == 2) {
      this.isCheckPay();
      this.bs64 = qrcode.getQrBase64(this.orderOk.qrCode);
    }
  },
  methods: {
    onPay: function (index) {
      let obj = JSON.parse(JSON.stringify(this.$route.query));
      obj.pitchon = index;
      this.$emit("onPay", obj);
    },
    isCheckPay: function () {
      this.axios
        .post(this.$api.checkPay, {
          tradeNo: this.orderOk.tradeNo,
        })
        .then((data) => {
          if (data.code == 200) {
            if (data.data.state == 0) {
              this.getispay = setTimeout(() => {
                this.isCheckPay();
              }, 2000);
            } else {
              this.onPay(3);
            }
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
  },
  //离开当前页面后执行
  destroyed: function () {
    // 销毁 定时器
    clearTimeout(this.getispay);
  },
};
</script>

<style lang='less' scoped>
.pay {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  .tsbox {
    display: flex;
    padding: 0.3rem;
    justify-content: space-between;
    > p {
      > span {
        color: red;
      }
    }
    > p:nth-child(2) {
      font-size: 1.1rem;
      > span {
        font-weight: 700;
      }
    }
  }
  .payOne {
    width: 100%;
    display: flex;
    padding: 1rem 3rem;
    flex-direction: column;
    border: 1px solid #eee;
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.13);
    > div:nth-child(1) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      > span {
        font-size: 1rem;
      }
      > p {
        font-size: 1.2rem;
        > span {
          font-weight: 700;
          color: red;
        }
      }
    }
    .btnbox {
      display: flex;
      padding: 3rem 1rem;
      align-items: center;
      justify-content: center;
      .weixinbtn {
        padding: 0.2rem 1.2rem;
        border: 1px solid #ccc;
        > img {
          width: 8rem;
        }
      }
    }
  }
  .payTwo {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 1px solid #eee;
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.13);
    .zfbox {
      display: flex;
      padding: 3rem 0;
      align-items: center;
      justify-content: center;
      .imgbox {
        > h6 {
          font-size: 1.4rem;
          font-weight: 400;
          text-align: center;
        }
        .mzbox {
          margin-top: 1rem;
          display: flex;
          height: 3rem;
          align-items: center;
          justify-content: center;
          background-color: #ff7674;
          > img {
            width: 2rem;
          }
          > div {
            display: flex;
            font-size: 0.8rem;
            color: #fff;
            flex-direction: column;
            justify-content: space-around;
            padding-left: 1rem;
          }
        }
      }
      > img {
        width: 18.5rem;
        margin-left: 5rem;
      }
    }
    > P {
      color: #5599ff;
      font-size: 1rem;
      // font-weight: 700;
      cursor: pointer;
    }
  }
  .payOk {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 1px solid #eee;
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.13);
    display: flex;
    flex-direction: column;
    padding: 2rem 5rem;
    > div:nth-child(1) {
      display: flex;

      color: #3fd09e;
      > div:nth-child(1) {
        width: 3rem;
        font-size: 3rem;
      }
      > div:nth-child(2) {
        font-weight: 700;
        font-size: 1.5rem;
      }
    }
    > div:nth-child(2) {
      margin-top: 1rem;
      > p {
        margin-top: 0.5rem;
      }
    }
    > div:nth-child(3) {
      margin-top: 1rem;
      > button {
        margin: 0 0.5rem;
      }
      > button:nth-child(1) {
        margin-left: 0;
      }
      > button:hover {
        color: #ff7674;
      }
    }
  }
}
</style>