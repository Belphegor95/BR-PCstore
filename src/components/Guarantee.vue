<!-- 底部 保证 -->
<template>
  <div class="guarantee">
    <div>
      <img src="../assets/img/home/zp.png" alt />
      <div>
        <p>正品保障</p>
        <p>Authentic guarantee</p>
      </div>
    </div>
    <div>
      <img src="../assets/img/home/y.png" alt />
      <div>
        <p>全场包邮</p>
        <p>Full package mail</p>
      </div>
    </div>
    <div>
      <img src="../assets/img/home/jg.png" alt />
      <div>
        <p>价格保证</p>
        <p>Price guarantee</p>
      </div>
    </div>
    <div>
      <img src="../assets/img/home/sd.png" alt />
      <div>
        <p>闪电发货</p>
        <p>Lightning delivery</p>
      </div>
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
.guarantee {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #f0f0f0;
  > div {
    display: flex;
    padding: 1rem;
    > div {
      display: flex;
      //   align-items: center;
      flex-direction: column;
      justify-content: center;
      > p {
        text-indent: 1rem;
      }
      > p:nth-child(2) {
        color: #999;
        font-size: 0.9rem;
      }
    }
  }
}
</style>