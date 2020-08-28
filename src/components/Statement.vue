<!-- 底部声明 -->
<template>
  <div class="statement">
    <div>
      <h5>服务保证</h5>
      <p>正品保证</p>
      <p>7天无理由退货</p>
      <p>退货返运费</p>
      <p>24小时客服服务</p>
    </div>
    <div>
      <h5>支付方式</h5>
      <p>微信支付</p>
      <p>支付宝支付</p>
      <p>银行转账</p>
    </div>
    <div>
      <h5>关于我们</h5>
      <p>关于开心兔</p>
      <p>合作伙伴</p>
      <p>联系我们</p>
    </div>
    <div>
      <h5>物流配送</h5>
      <p>免运费</p>
      <p>骑手配送</p>
    </div>
    <div class="QRbox">
      <img src="../assets/img/home/jg.png" />
      <p>手机下单更方便</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.statement {
  display: flex;
  border-top: 1px solid #f0f0f0;
  > div {
    flex: 1;
    text-indent: 4rem;
    margin-bottom: 1.5rem;
    margin-top: 4rem;
    > h5 {
      font-size: 1.08rem;
      font-weight: 500;
      margin-bottom: 2rem;
    }
    > p {
      color: #999;
      line-height: 1.5rem;
    }
  }
  .QRbox {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    > p {
      margin-top: 1rem;
      text-indent: 0;
    }
  }
  > div:nth-child(4) {
    border-right: 1px solid #999;
  }
}
</style>