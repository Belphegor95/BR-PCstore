<!-- 个人中心 -->
<template>
  <div class="person">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <div class="content">
      <div>
        <ul>
          <li>个人中心</li>
          <li>我的购物车</li>
          <li>我的订单</li>
          <li>收货地址</li>
          <li>修改登录密码</li>
          <li>手机绑定</li>
          <li>我的优惠券</li>
        </ul>
        <router-view />
      </div>
    </div>
    <div class="bottombox">
      <statement />
    </div>
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import search from "@/components/Search.vue";
import statement from "@/components/Statement.vue";
export default {
  components: {
    shortcut,
    search,
    statement,
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.person {
  .content {
    > div {
      display: flex;
      > ul {
        width: 18rem;
        padding-top: 2rem;
        text-indent: 2rem;
        > li {
          line-height: 2.5rem;
          font-size: 1rem;
          color: #999;
        }
      }
    }
  }
}
</style>