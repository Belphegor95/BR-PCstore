<!-- 商品卡 -->
<template>
  <div class="commodityCard" @click="rut">
    <img v-if="data.plist_img_url" :src="data.plist_img_url[0]" />
    <div class="contentbox">
      <p :title="data.plist_name">{{ data.plist_name }}</p>
      <!-- <p>会员价: 90.00￥</p> -->
      <p v-if="data.price_lv.unitList">
        <price :priceNum="data.price_lv.unitList[0].orderPrice" :size="1.5" />
        <!-- <span>原价 ￥{{ data.price_lv.unitList[0].marketPrice }}</span> -->
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
  props: {
    data: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    rut: function () {
      this.$store.commit("show_detailsdata", this.data);
      this.$router.push("/details");
    },
  },
};
</script>

<style lang="less" scoped>
.commodityCard {
  width: 19%;
  overflow: hidden;
  border-radius: 1rem;
  margin: 0.5rem 0.35rem;
  background-color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  > img {
    width: 12rem;
    margin: 1.19rem 0;
  }
  .contentbox {
    padding: 0 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.25rem;
    > p:nth-child(1) {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;

      word-wrap: break-word;
      height: 50px;
      font-size: 1rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #000000;
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
  box-shadow: #999 0px 0px 1rem;
}
</style>