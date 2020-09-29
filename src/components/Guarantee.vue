<!-- 底部 保证 -->
<template>
  <div class="guarantee">
    <div>
      <img src="../assets/img/home/zhengpinbaozheng.png" />
      <div>
        <p>正品保障</p>
        <p>Authentic guarantee</p>
      </div>
    </div>
    <div>
      <img src="../assets/img/home/quanchangbaoyou.png" />
      <div>
        <p>全场包邮</p>
        <p>Full package mail</p>
      </div>
    </div>
    <div>
      <img src="../assets/img/home/jiagebaozheng.png" />
      <div>
        <p>价格保证</p>
        <p>Price guarantee</p>
      </div>
    </div>
    <div>
      <img src="../assets/img/home/shandianfahuo.png" />
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
  > div {
    display: flex;
    margin: 2.06rem  0 2.69rem 0;
    > img {
      width: 4.69rem;
    }
    > div {
      display: flex;
      //   align-items: center;
      flex-direction: column;
      justify-content: center;
      > p:nth-child(1) {
        font-size: 1.5rem;
        font-family: SourceHanSansCN;
        font-weight: 500;
        color: #212121;
        text-indent: 1rem;
        margin-bottom: 1rem;
      }
      > p:nth-child(2) {
        text-indent: 1rem;
        font-size: 1rem;
        font-family: SourceHanSansCN;
        font-weight: 500;
        color: #212121;
      }
    }
  }
}
</style>