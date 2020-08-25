<!-- 获取验证码 -->
<template>
  <Button :loading="isloading" :class="isloading?'active':''" @click="getYzm">{{ !isloading? "获取验证码": btnload }}</Button>
</template>

<script>
export default {
  props: {
    phoneNum: String,
  },
  data() {
    return {
      btnload: 60,
      isloading: false,
    };
  },
  mounted() {},
  methods: {
    // 获取验证码
    getYzm: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      }
      this.axios
        .post(this.$api.getYzm, {
          phoneNum: this.phoneNum,
        })
        .then((data) => {
          if (data.result == "OK") {
            this.isloading = true;
            this.$toast("验证码已发送");
            this.setloadingNum();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 验证码倒计时
    setloadingNum: function () {
      // 倒计时
      if (this.isloading && this.btnload != -1) {
        setTimeout(() => {
          this.btnload--;
          this.setloadingNum();
        }, 1000);
      } else {
        this.btnload = 60;
        this.isloading = false;
      }
    },
  },
};
</script>

<style lang='less' scoped>
button {
  border-radius: 0;
}
.active {
  border: 1px solid #999 !important;
  color: #999 !important;
}
</style>