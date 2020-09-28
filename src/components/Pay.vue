<!-- 支付 -->
<template>
  <div class="pay">
    <div class="tsbox">
      <p>订单提交成功!请您尽快付款!订单号: <span>2048456421345456</span></p>
      <p>应付金额: <span>42.00元</span></p>
    </div>
    <div class="payOne" v-if="!ispay">
      <div>
        <span>在线支付</span>
        <p>支付: <span>42.00元</span></p>
      </div>
      <div class="btnbox">
        <Button size="large" @click="ispay = true">微信支付</Button>
        <!-- <Button size="large">微信支付</Button> -->
      </div>
    </div>
    <div class="payTwo" v-else>
      <img src="../assets/img/home/a.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ispay: false, // 支付状态
    };
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
    padding:  0.3rem;
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
    }
  }
  .payTwo {
    width: 100%;
    display: flex;
    padding: 3rem 1rem;
    align-items: center;
    justify-content: center;
  }
}
</style>