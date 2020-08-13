<!-- 更改密码 -->
<template>
  <div class="password">
    <h4>修改登录密码</h4>
    <div class="formbox">
      <div>
        <span>我的手机号:</span>
        <Input v-model="value" />
      </div>
      <div>
        <span>验证码:</span>
        <div class="btnbox">
          <Input v-model="value" />
          <button>获取验证码</button>
        </div>
      </div>
      <div>
        <span>新密码:</span>
        <Input v-model="value" placeholder="至少包含数字、字母、符号中的两种元素" />
      </div>
      <!-- <div>
        <span>再次输入新密码:</span>
        <Input v-model="value" placeholder="Enter something..." />
      </div>-->
      <Button type="warning" size="large" class="btn">确定</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style lang='less' scoped>
.password {
  flex: 4;
  > div {
    margin-top: 1rem;
  }
  > .formbox {
      width: 27.5rem;
    > div {
      display: flex;
      
      align-items: center;
      margin-bottom: 1rem;
      > span {
        width: 5rem;
        text-align: right;
        margin-right: 0.5rem;
      }
      > div {
        width: 1px;
        flex: auto;
      }
      .btnbox {
        display: flex;
        > button {
          color: #ff8400;
          width: 8rem;
          margin-left: 1rem;
          border: 1px solid #ff8400;
        }
      }
    }
    .btn {
        width: 12rem;
        margin-top: 2rem;
        margin-left: 9rem;
    }
  }
}
</style>