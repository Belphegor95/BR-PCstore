<!-- 标签目录 -->
<template>
  <div class="tab">
    <span></span>
    <p>精品推荐</p>
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
.tab {
  display: flex;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f4f4f4;
  > span {
    width: 0.3rem;
    border-radius: 0.2rem;
    background-color: #ff8900;
  }
  > p {
    text-indent: 0.8rem;
    font-weight: 700;
    font-size: 1.1rem;
  }
}
</style>