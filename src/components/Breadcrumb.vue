<!-- 路径 -->
<template>
  <div class="Breadcrumb">
    <Breadcrumb separator=">" class="Breadcrumbbox">
      <BreadcrumbItem v-for="(item,index) in tos" :key="index" :to="item.to">{{ item.name }}</BreadcrumbItem>
      <!-- <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem> -->
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    tos: Array,
  },
  data() {
    return {};
  },
  mounted() {
    // this.tos.unshift({ name: "首页", to: "/" });
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.Breadcrumb {
  width: 100%;
  height: 2.38rem;
  background: #ff9000;
  .Breadcrumbbox {
    display: flex;
    height: 100%;
    //   color: #fff;
    align-items: center;
  }
}
</style>
<style>
.Breadcrumb .ivu-breadcrumb-item-link {
  color: #fff;
}
</style>