<!-- 步进器 -->
<template>
  <div class="stepper" :style="{ width: stepperObj.width,height: stepperObj.height }">
    <div
      class="stepper-"
      @click="NumReduce"
      :style="{ color: stepperObj.num <= 1 ? '#dcdee2' : '#000' }"
    >
      -
    </div>
    <InputNumber :max="maxNum" :min="1" v-model="stepperObj.num" />
    <div class="stepper_" @click="NumAdd">+</div>
  </div>
</template>

<script>
export default {
  props: {
    stepperObj: Object,
  },
  data() {
    return {
      value1: 0,
      maxNum: 999,
    };
  },
  methods: {
    NumAdd: function () {
      if (this.stepperObj.num >= this.maxNum) return;
      this.$emit("getstepperObj", {
        num: this.stepperObj.num + 1,
        index: this.stepperObj.index,
      });
    },
    NumReduce: function () {
      if (this.stepperObj.num <= 1) return;
      this.$emit("getstepperObj", {
        num: this.stepperObj.num - 1,
        index: this.stepperObj.index,
      });
    },
  },
};
</script>

<style lang='less' scoped>
.stepper {
  border: 1px solid #dcdcdc;
  justify-content: center;
  display: flex;
  .stepper-,
  .stepper_ {
    width: 25%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #f9f9f9;
  }
  .stepper- {
    border-right: 1px solid #dcdcdc;
  }
  .stepper_ {
    border-left: 1px solid #dcdcdc;
  }
}
</style>
<style>
.stepper .ivu-input-number {
  border: 0;
  height: 100%;
  /* width: 50px; */
}
.stepper .ivu-input-number-input-wrap {
  height: 100%;
}
.stepper .ivu-input-number-handler-wrap {
  /* opacity: 0; */
  display: none;
}
.stepper .ivu-input-number:hover,
.stepper .ivu-input-number-focused {
  border-color: #fff;
  box-shadow: none;
}
.stepper .ivu-input-number-input {
  height: 100%;
  font-size: 1rem;
  text-align: center;
}
</style>