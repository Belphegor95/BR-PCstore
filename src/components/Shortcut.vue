<!-- 顶部  个人中心 -->
<template>
  <div class="shortcut">
    <div class="leftbox">
      <p>欢迎来到开心兔</p>
      <p>
        <span>请登录</span> |
        <span>注册</span>
      </p>
    </div>
    <div class="rightbox">
      <span>我的订单</span>|
      <span class="gwcbox">
        <img src="../assets/img/home/gwc.png" alt />
        购物车
        <b>0</b>
      </span>|
      <span>个人中心</span>|
      <span>联系客服</span>
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
.shortcut {
  display: flex;
  color: #8b8b8b;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  justify-content: space-between;
  div {
    display: flex;
    p:nth-child(2) {
      > span {
        cursor: pointer;
      }
      > span:nth-child(1) {
        margin-right: 0.5rem;
      }
      > span:nth-child(2) {
        margin-left: 0.5rem;
      }
    }
  }
  .leftbox {
    p:nth-child(1) {
      color: #ff8900;
      margin-right: 1rem;
    }
  }
  .rightbox {
    .gwcbox {
      > img {
        margin-right: 0.2rem;
      }
      b {
        font-weight: 400;
        color: #ff8900;
      }
    }
    > span {
      cursor: pointer;
      margin: 0 0.5rem;
    }
    span:last-child {
      margin-right: 0;
    }
  }
}
</style>