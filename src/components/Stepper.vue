<!-- 步进器 -->
<template>
  <div class="stepper">
    <div class="stepper-" @click="NumReduce">-</div>
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
  border: 1px solid #dcdee2;
  justify-content: center;
  border-radius: 0.5rem;
  display: flex;
  .stepper-,
  .stepper_ {
    width: 1.5rem;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }
  .stepper- {
    border-right: 1px solid #dcdee2;
  }
  .stepper_ {
    border-left: 1px solid #dcdee2;
  }
}
</style>
<style>
.stepper .ivu-input-number {
  border: 0;
  width: 50px;
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
  text-align: center;
}
</style>