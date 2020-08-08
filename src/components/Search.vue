<!-- 搜索框 -->
<template>
  <div class="searchBox">
    <div>
      <div class="happyname">开心兔商城</div>
      <div class="serachbox">
        <div class="serachinput">
          <input type="text" v-model="search" />
          <span>搜索</span>
        </div>
        <div class="btnbox">
          <span>打印机</span>|
          <span>打印机</span>|
          <span>A4纸</span>|
          <span>办公桌</span>|
          <span>办公产品</span>
        </div>
      </div>
      <div class="visitbox">
        <button>
          <img src="../assets/img/home/sm.png" alt />
          <p>上门服务</p>
        </button>
        <!-- <Button size="large">上门服务</Button> -->
      </div>
    </div>
    <div v-show="false">123</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style lang="less" scoped>
.searchBox {
  > div:nth-child(1) {
    display: flex;
    height: 10rem;
    .happyname {
      flex: 2.5;
      display: flex;
      align-items: center;
      font-size: 2rem;
      font-weight: 700;
      color: #ff8400;
      text-indent: 1rem;
    }
    .serachbox {
      flex: 2.2;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .serachinput {
        display: flex;
        input {
          outline: 0px;
          width: 20rem;
          height: 2.5rem;
          padding-left: 0.8rem;
          border: 0.1rem solid #ff8900;
        }
        span {
          cursor: pointer;
          color: #fff;
          line-height: 2.5rem;
          padding: 0 1.2rem;
          background-color: #ff8900;
        }
      }
      .btnbox {
        margin-top: 0.5rem;
        > span {
          margin: 0 0.5rem;
          cursor: pointer;
        }
        > span:first-child {
          margin-left: 0;
        }
        > span:last-child {
          margin-right: 0;
        }
      }
    }
    .visitbox {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        display: flex;
        padding: 0.5rem 1rem;
        border: 1px solid #e6e6e6;
        > img {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>