<!-- 订单详情 -->
<template>
  <div class="orderDetails">
    <h4>订单详情</h4>
    <div class="orderbox">
      <div class="orderinfo">
        <div>
          <div>订单信息</div>
          <div>
            <div>
              <span>收货地址:</span>
              <p>
                {{ orderDetails.address.linkman }}
                {{ orderDetails.address.phone }},
                {{
                  (orderDetails.address.address +
                    orderDetails.address.address_detail)
                    | site
                }}
              </p>
            </div>
            <div>
              <span>订单编号:</span>
              <p>{{ orderDetails.tradeNo }}</p>
            </div>
            <div>
              <span>发票方式:</span>
              <p>{{ orderDetails.billState ? "电子发票" : "不要发票" }}</p>
            </div>
            <div>
              <span>订单备注:</span>
              <p>{{ orderDetails.notes ? orderDetails.notes : "暂无" }}</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src="../../assets/img/person/！.png" />
            <p>
              订单状态:
              {{
                orderDetails.sendProgress[orderDetails.state]
                  ? orderDetails.sendProgress[orderDetails.state].content
                  : "暂无"
              }}
            </p>
          </div>
          <p>请及时付款,下单后超过72小时未付款默认取消。</p>
          <div v-if="orderDetails.state == 0">
            <span>您可以</span>
            <Button type="warning" @click="onGopay">立即付款</Button>
          </div>
        </div>
      </div>
      <div class="orderlist">
        <div>
          <div>商品</div>
          <div>商品属性</div>
          <div>单价</div>
          <div>数量</div>
          <div>小计</div>
        </div>
        <div v-for="(item, index) in orderDetails.plistDetail" :key="index">
          <div class="imgbox">
            <img :src="item.picUrl" />
            <h6>{{ item.plistName }}</h6>
          </div>
          <div>
            <p>颜色: {{ item.cateName ? item.cateName : "暂无" }}</p>
            <p>单位: {{ item.priceName | unit }}</p>
          </div>
          <div>{{ item.priceName | price }}</div>
          <div>{{ item.buyNum }}</div>
          <p>¥{{ item.money * item.buyNum }}</p>
        </div>
        <div class="monybox">
          <div>
            <div>
              <span>商品总价：</span>
              <span>{{ orderDetails.money }}</span>
            </div>
            <div>
              <span>运送方式：普通配送快递 免邮</span>
              <span>¥0.00</span>
            </div>
            <div>
              <span>优惠券：</span>
              <span>{{ orderDetails.ticketMoney | ticketMoney }}</span>
            </div>
            <div>
              <span>需付款：</span>
              <span>¥{{ total(orderDetails.money) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderOk: {},
      orderDetails: this.$store.state.orderDetails,
    };
  },
  mounted() {
    // 判断是否是从支付跳过来的
    // if (this.$route.query.ispay == "true") {
    //   this.pitchon = this.orderDetails.type - 1;
    //   this.orderOk = {
    //     tradeNo: this.orderDetails.tradeNo,
    //     money: this.orderDetails.money,
    //     pitchon: this.pitchon,
    //   };
    // }
  },
  methods: {
    // 点击 去支付
    onGopay: function () {
      this.$router.push({
        path: "/payment",
        query: {
          pitchon: 1,
          tradeNo: this.orderDetails.tradeNo,
          money: this.orderDetails.money,
          orderType: 0,
        },
      });
    },
    // 计算总价格
    total: function (val) {
      if (this.orderDetails.ticketMoney) {
        return Number(val) - Number(this.orderDetails.ticketMoney);
      } else {
        return val;
      }
    },
  },
  filters: {
    site: function (value) {
      // 替换地址 /
      return value.replace(/\//g, "");
    },
    unit: function (value) {
      // 单位
      let arr = value.split("/");
      if (arr.length == 2) return arr[1];
    },
    price: function (value) {
      // 价格
      let arr = value.split("/");
      if (arr.length == 2) return arr[0];
    },
    ticketMoney: function (val) {
      if (!val) return "¥0";
      return `-¥${val}`;
    },
  },
};
</script>

<style lang='less' scoped>
.orderDetails {
  // flex: 4;
  > div {
    margin-top: 1rem;
  }
  //   订单盒子
  .orderbox {
    .orderinfo {
      display: flex;
      > div:nth-child(1) {
        width: 24rem;
        padding: 0.8rem 0.4rem;
        border: 1px solid #e6e6e6;
        > div:nth-child(1) {
          padding-bottom: 0.2rem;
          padding-left: 0.2rem;
          color: #666666;
          font-family: SimSun;
          font-weight: bold;
          color: #000000;
          border-bottom: 1px solid #e6e6e6;
        }
        > div:nth-child(2) {
          padding: 0.5rem;
          min-height: 12rem;
          > div {
            display: flex;
            color: #9c9b9b;
            margin-bottom: 1rem;
            > span {
              width: 5.5rem;
              font-size: 0.75rem;
              font-family: SimSun;
              font-weight: 400;
              color: #000000;
            }
            > p {
              width: 100%;
              font-size: 0.75rem;
              font-family: SimSun;
              font-weight: 400;
              color: #000000;
            }
          }
        }
      }
      > div:nth-child(2) {
        margin-left: 2rem;
        padding: 2rem 0;
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        background-color: #fef4e8;
        border: 1px solid #ff9000;
        > div:nth-child(1) {
          display: flex;
          align-items: center;
          > p {
            color: #000;
            font-size: 1.2rem;
            font-weight: 700;
            text-indent: 1.5rem;
          }
        }
        > P {
          font-size: 0.75rem;
          font-family: SimSun;
          font-weight: 400;
          color: #464545;
        }
        > div:nth-child(3) {
          // margin-top: 4rem;
          font-size: 1.1rem;
          color: #000;
          display: flex;
          align-items: center;
          padding: 0 2rem;
          > button {
            margin-left: 2rem;
            border-radius: 0;
          }
        }
      }
    }
    .orderlist {
      margin-top: 1rem;
      margin-bottom: 2rem;
      padding: 0.5rem;
      border: 1px solid #e6e6e6;
      overflow: hidden;
      background-color: #fbfbfb;
      > div {
        display: flex;
        padding: 0.5rem;
        // align-items: center;
        margin-top: 0.5rem;
        border-top: 1px solid #e6e6e6;
        .imgbox {
          display: flex;
          > img {
            width: 6rem;
            height: 6rem;
          }
          > h6 {
            padding-left: 0.5rem;
            flex-direction: column;
            justify-content: space-around;
          }
        }
        > div {
          flex: 1;
          text-align: center;
        }
        > div:nth-child(1) {
          flex: 2;
        }
        > p:nth-last-child(1) {
          flex: 1;
          text-align: center;
          font-size: 0.88rem;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #f68b00;
        }
      }
      .imgbox {
        display: flex;
        //   flex-direction: column;
      }
      > div:nth-child(1) {
        // margin-bottom: 1rem;
        background-color: #ffeed8;
      }
      > div:nth-last-child(2) {
        padding-bottom: 1rem;
        border-bottom: 1px solid #e6e6e6;
      }
      > div:last-child {
        border: none;
      }
      .monybox {
        width: 25rem;
        float: right;
        // background-color: #f3f3f3;
        display: flex;
        flex-direction: row-reverse;
        padding: 1rem 2rem;
        > div {
          width: 15rem;
          display: flex;
          flex-direction: column;
          > div {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            justify-content: space-between;
            > span:nth-child(1) {
              font-size: 0.75rem;
              font-family: SimSun;
              font-weight: 400;
              color: #000000;
            }
            > span:nth-child(2) {
              font-size: 0.88rem;
              font-family: SimSun;
              font-weight: 400;
              color: #686868;
            }
          }
          > div:last-child {
            > span:nth-child(2) {
              font-size: 1.63rem;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #e20000;
            }
          }
        }
      }
    }
  }
}
</style>