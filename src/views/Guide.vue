<!-- 登录模块 -->
<template>
  <div class="guide">
    <div class="search_box">
      <div @click="$router.push('/')">
        <img src="../assets/img/log.png" alt />
        <span>开心兔商城</span>
      </div>
      <!-- <search :isSearch="false" /> -->
    </div>
    <div class="content" :style="{height: this.height + 'rem'}">
      <router-view />
    </div>
  </div>
</template>

<script>
// import search from "@/components/Search.vue";  
export default {
  // components: {
  //   search,
  // },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.getheight();
  },
  methods: {
    getheight: function () {
      let height = window.innerHeight;
      this.height = (height / 16).toFixed(2) - 7;
      if (this.height < 45) this.height = 45;
    },
  },
};
</script>

<style lang='less' scoped>
.guide {
  height: 100%;
  .search_box {
    height: 7rem;
    display: flex;
    > div {
      cursor: pointer;
      display: flex;
      align-items: center;
      > span {
        margin-left: 0.5rem;
        font-weight: 700;
        color: #ff8400;
        font-size: 1.6rem;
      }
    }
  }
  .content {
    background-color: #f3f7f9;
    padding-top: 4rem;
  }
}
</style>
