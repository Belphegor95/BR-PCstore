
<!-- 注册 -->
<template>
  <div class="registerOk">
    <div class="cg">
      <img src="../../assets/img/guide/cg.png" alt />
      <p>恭喜你账号注册成功</p>
    </div>
    <Button type="primary" size="default" @click="$router.push('/')">进入商城</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    rut: function (name) {
      this.$router.push(`/guide/${name}`);
    },
  },
};
</script>

<style lang='less' scoped>
.registerOk {
  display: flex;
  height: 37rem;
  padding-top: 2rem;
  padding-bottom: 10rem;
  overflow: hidden;
  border-radius: 2rem;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  justify-content: space-evenly;
  .cg {
    display: flex;
    font-weight: 700;
    font-size: 1.6rem;
    align-items: center;
    > p {
      text-indent: 1rem;
    }
  }
  button {
    border: none;
    background-color: #ff8400;
  }
}
b {
  cursor: pointer;
}
</style>