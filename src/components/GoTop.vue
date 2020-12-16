<!-- 右侧 菜单栏 -->
<template>
  <div class="goTopbox">
    <div class="goTop" v-show="isShow">
      <!-- 回到顶部 -->
      <div class="imgbox" @click="serve('/cart')">
        <img src="../assets/img/components/cart.png" alt="" />
        <img src="../assets/img/components/cart_.png" alt="" />
        <p>购物车</p>
        <i>{{ count }}</i>
      </div>
      <Poptip placement="left-end">
        <div
          class="imgbox"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          "
        >
          <img src="../assets/img/components/service.png" alt="" />
          <img src="../assets/img/components/service_.png" alt="" />
          <p>人工客服</p>
        </div>
        <div class="api poptip" slot="content">
          <div>
            <img src="../assets/img/components/service.png" alt="" />
            <div>
              <p>客服热线</p>
              <p>0371-55688112</p>
            </div>
          </div>
          <div>
            <img src="../assets/img/components/service.png" alt="" />
            <div>
              <p>微信咨询</p>
              <p>15188377992</p>
            </div>
          </div>
          <div>
            <img src="../assets/img/components/service.png" alt="" />
            <div>
              <p>QQ咨询</p>
              <p>137797288</p>
            </div>
          </div>
        </div>
      </Poptip>

      <div class="imgbox" @click="serve('/maintain/maintainList')">
        <img src="../assets/img/components/visit.png" alt="" />
        <img src="../assets/img/components/visit_.png" alt="" />
        <p>上门服务</p>
      </div>
      <BackTop class="imgbox topbtn">
        <img src="../assets/img/components/uptop.png" />
        <img src="../assets/img/components/uptop_.png" />
        <p>TOP</p>
      </BackTop>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isHeight: 500,
      count: 0,
    };
  },
  // 因为购物车个数是会改变的所以要监听改变
  watch: {
    "$store.state.count"(num) {
      this.count = num;
    },
  },
  mounted() {
    this.count = this.$store.state.count;
    window.addEventListener("scroll", this.showbtn, true);
  },
  methods: {
    //   跳转
    serve: function (name) {
      this.$router.push(name);
    },
    // 显示回到顶部按钮
    showbtn: function () {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop > this.isHeight ? (this.isShow = true) : (this.isShow = false);
    },
  },
};
</script>

<style lang='less' scoped>
.goTopbox {
  width: auto !important;
  position: fixed;
  left: 50%;
  bottom: 5rem;
  margin-left: 600px;
  .goTop {
    width: auto !important;
    margin: 0 !important;
    display: flex;
    flex-direction: column;
    > div {
      background-color: #fff;
      width: auto !important;
      position: relative !important;
      bottom: 0 !important;
      right: 0 !important;
      display: flex;
      flex-direction: column;
      color: #999;
      border: 1px solid #bfbfbf;
      padding: 0.75rem;
      align-items: center;
      margin: 0 !important;
    }
    .topbtn {
      margin-top: 1.5rem !important;
      > p {
        margin-top: 0.2rem;
        font-size: 0.94rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
      }
    }
    .imgbox {
      > i {
        font-style: normal;
        position: absolute;
        left: 3rem;
        top: 0.3rem;
        background-color: red;
        padding: 0 0.3rem;
        color: #fff;
        border-radius: 0.3rem;
      }
      > p {
        margin-top: 0.3rem;
      }
      > img:nth-child(2) {
        display: none;
      }
    }
    .imgbox:nth-child(1),
    .imgbox:nth-child(2) {
      border-bottom: none;
    }
    .imgbox:hover {
      cursor: pointer;
      color: #f68b00;
      > img:nth-child(1) {
        display: none;
      }
      > img:nth-child(2) {
        display: inline-block;
      }
    }
    .poptip {
      padding: 0.8rem;
      > div {
        display: flex;
        // align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #ccc;
        // flex-direction: column;
        > img {
          height: 22px;
          margin-right: 0.5rem;
        }
        > div {
          > p:nth-child(1) {
            margin-bottom: 0.3rem;
          }
           > p:nth-child(2) {
             color: #f68b00;
             font-size: 1.1rem;
          }
        }
      }
      > div:last-child {
        border: none;
      }
    }
  }
}
</style>

<style lang="less">
.goTopbox .ivu-poptip-popper {
  left: -210px !important;
}
</style>