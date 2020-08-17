<!-- 商品卡 -->
<template>
  <div class="commodityCard" @click="rut">
    <img src="../assets/img/home/a.png" alt />
    <div class="contentbox">
      <p>打印机</p>
      <p>会员价: 90.00￥</p>
      <p>
        <price :priceNum="27.12" :size="1" />
        <span>原价 ￥90.00</span>
      </p>
    </div>
  </div>
</template>

<script>
import price from "./Price";
export default {
  components: {
    price,
  },
  data() {
    return {};
  },
  methods: {
    rut: function () {
      this.$router.push("/details")
    }
  }
};
</script>

<style lang="less" scoped>
.commodityCard {
  border: 1px solid #e9e9e9;
  cursor: pointer;
  > img {
    width: 100%;
  }
  .contentbox {
    padding: 0 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.25rem;
    > p:nth-child(1) {
      //   font-weight: 700;
      font-size: 1.05rem;
    }
    > p:nth-child(2) {
      color: #999;
    }
    > p:nth-child(3) {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      > span:nth-child(1) {
        color: #ff9d2b;
        font-size: 1rem;
      }
      > span:nth-child(2) {
        color: #999;
        font-size: 0.9rem;
        text-decoration: line-through;
      }
    }
  }
}
.commodityCard:hover {
  border: 1px solid #ff8900;
}
</style>