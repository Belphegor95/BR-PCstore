<!-- 价格  展示 -->
<template>
  <span class="price" :style="{'font-size': size + 'rem'}">
    ¥
    <b :style="{'font-size': size + 0.3 + 'rem'}">{{ integer }}</b>
    <p>.{{ decimals | decimalsNum}}</p>
  </span>
</template>

<script>
export default {
  name: "price",
  props: {
    priceNum: [Number, String],
    size: [Number, String],
  },
  data() {
    return {
      integer: 0,
      decimals: 0,
    };
  },
  mounted() {
    if (typeof this.priceNum == "string") {
      this.str(this.priceNum);
    } else if (typeof this.priceNum == "number") {
      this.str(this.priceNum.toString());
    }
  },
  methods: {
    str: function (num) {
      let arr = num.split(".");
      if (arr.length == 2) {
        this.integer = arr[0];
        this.decimals = arr[1];
      } else {
        this.integer = arr[0];
      }
    },
  },
  filters: {
    decimalsNum: function (value) {
      if (value == 0) return "00";
      return value;
    },
  },
};
</script>

<style lang='less' scoped>
.price {
  color: #ff9d2b;
  display: flex;
  align-items: baseline;
  > b {
    margin-left: 0.2rem;
  }
}
</style>