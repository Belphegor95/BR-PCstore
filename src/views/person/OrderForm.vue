<!-- 我的订单 -->
<template>
  <div class="orderForm">
    <h4>我的订单</h4>
    <div class="ordertypebox">
      <span>所有订单</span>
      <span>待付款</span>
      <span>待收货</span>
      <span>已完成</span>
    </div>
    <div class="listtop">
      <span>宝贝</span>
      <span>单价</span>
      <span>数量</span>
      <span>实付款</span>
      <span>交易状态</span>
      <span>交易操作</span>
    </div>
    <div class="btnbox">
      <Button size="small">上一页</Button>
      <Button size="small">下一页</Button>
    </div>
    <ul>
      <li v-for="(item,index) in 5" :key="index">
        <div>2020-08-07 订单号: 123456789</div>
        <div class="orderlist">
          <div>
            <div class="imgbox" v-for="(itemJ,indeJ) in index" :key="indeJ">
              <img src="../../assets/img/home/a.png" alt @click="ordetails" />
              <div @click="ordetails">
                <h6>这是商品名称</h6>
                <span>颜色: 白色</span>
                <span>单位: 件</span>
              </div>
            </div>
          </div>
          <div>￥ 30.00</div>
          <div>1</div>
          <div>￥ 30.00</div>
          <div>
            <p>订单已取消</p>
            <p>订单已取消</p>
          </div>
          <div>
            <Button type="warning">再次购买</Button>
            <Button>再次购买</Button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formid: 0,
      orderList: [],
    };
  },
  mounted() {
    this.$store.commit("show_personid", 2);
    this.getOrderList();
  },
  methods: {
    // 详情页
    ordetails: function () {
      this.$router.push("/person/orderDetails");
    },
    // 获取列表
    getOrderList: function () {
      this.orderList = [];
      this.axios
        .post(this.$api.getOrderList, {
          type: this.formid,
        })
        .then((data) => {
          if (data.code == 200) {
            this.orderList = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
  },
};
</script>

<style lang='less' scoped>
.orderForm {
  flex: 4;
  > div {
    margin-top: 1rem;
    border: 1px solid #ececec;
  }
  .ordertypebox {
    display: flex;
    padding: 1rem;
    justify-content: center;
    > span {
      flex: 1;
      text-align: center;
      border-right: 1px solid #dddddd;
    }
    > span:last-child {
      border-right: none;
    }
  }
  .listtop {
    display: flex;
    padding: 0.5rem 0;
    background-color: #f5f5f5;
    > span {
      text-align: center;
      flex: 1;
    }
    > span:nth-child(1) {
      flex: 2;
    }
  }
  .btnbox {
    border: none;
    display: flex;
    margin-top: 0.5rem;
    flex-direction: row-reverse;
    > button {
      margin-left: 0.5rem;
    }
  }
  ul {
    margin-top: 0.5rem;
    li {
      border: 1px solid #ececec;
      margin-bottom: 1rem;
      > div:nth-child(1) {
        background-color: #f5f5f5;
        padding: 0.5rem;
        color: #666;
      }
      .orderlist {
        display: flex;
        padding: 1rem;
        > div {
          flex: 1;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          .imgbox {
            display: flex;
            margin-bottom: 3rem;
            > img {
              width: 5rem;
              height: 5rem;
              cursor: pointer;
            }
            > div {
              display: flex;
              cursor: pointer;
              font-size: 0.9rem;
              margin-left: 0.5rem;
              flex-direction: column;
              justify-content: space-between;
              > h6 {
                font-size: 0.9rem;
                color: #333333;
              }
              > span {
                color: #999999;
              }
            }
          }
          .imgbox:last-child {
            margin: 0;
          }
        }
        > div:nth-child(1) {
          flex: 2;
        }
        > div:nth-child(5),
        > div:nth-child(6) {
          align-items: center;
          > button,
          > p {
            margin-bottom: 0.4rem;
          }
        }
      }
    }
  }
}
</style>