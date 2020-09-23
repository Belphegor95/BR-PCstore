<!-- 订单详情 -->
<template>
  <div class="orderDetails">
    <h4>订单详情</h4>
    <div class="stepsbox">
      <div :class="pitchon >= 0? 'active':''">
        <span>
          <b>1</b>
        </span>
      </div>
      <div :class="pitchon >= 1? 'active_':''"></div>
      <div :class="pitchon >= 1? 'active':''">
        <span>
          <b>2</b>
        </span>
      </div>
      <div :class="pitchon >= 2? 'active_':''"></div>
      <div :class="pitchon >= 2? 'active':''">
        <span>
          <b>3</b>
        </span>
      </div>
      <div :class="pitchon >= 3? 'active_':''"></div>
      <div :class="pitchon >= 3? 'active':''">
        <span>
          <b>4</b>
        </span>
      </div>
    </div>
    <div class="orderbox">
      <div class="orderinfo">
        <div>
          <div>订单信息</div>
          <div>
            <div>
              <span>收货地址:</span>
              <p>{{ data.address.linkman }} {{ data.address.phone }}, {{ data.address.address + data.address.address_detail | site }}</p>
            </div>
            <div>
              <span>订单编号:</span>
              <p>{{ data.tradeNo }}</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src="../../assets/img/person/！.png" />
            <p>订单状态: {{ data.sendProgress[pitchon].content }}</p>
          </div>
          <!-- <p v-show="false">您还有17小时46分3秒来付款,超时订单自动关闭</p> -->
          <div>
            <span>您可以</span>
            <Button>立即支付</Button>
            <Button>取消订单</Button>
          </div>
        </div>
      </div>
      <div class="orderlist">
        <div>
          <div>商品</div>
          <div>单价</div>
          <div>数量</div>
          <div>优惠</div>
          <div>状态</div>
        </div>
        <div v-for="(item,index) in data.plistDetail" :key="index">
          <div class="imgbox">
            <img :src="item.picUrl" />
            <div>
              <h6>{{ item.plistName }}</h6>
              <span>颜色: {{ item.cateName ?item.cateName : "暂无" }}</span>
              <span>单位: {{ item.priceName | unit }}</span>
            </div>
          </div>
          <div>{{ item.priceName | price }}</div>
          <div>{{ item.buyNum }}</div>
          <div></div>
          <div>
            <p>未支付</p>
            <p>17时45分</p>
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
      pitchon: 0,
      data: this.$store.state.orderDetails,
    };
  },
  mounted() {
    this.pitchon = this.data.type - 1;
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
  },
};
</script>

<style lang='less' scoped>
.orderDetails {
  flex: 4;
  > div {
    margin-top: 1rem;
  }
  //   步骤条
  .stepsbox {
    display: flex;
    margin-top: 2.5rem;
    justify-content: center;
    > div:nth-child(odd) {
      margin: 0 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      > span {
        display: block;
        text-align: center;
        color: #fff;
        width: 2.2rem;
        height: 2.2rem;
        line-height: 2.2rem;
        border-radius: 0.2rem;
        background-color: #bdbdbd;
        transform: rotate(45deg);
        > b {
          display: flex;
          font-size: 1.2rem;
          justify-content: center;
          transform: rotate(-45deg);
        }
      }
      > p {
        font-size: 1.2rem;
        margin-top: 1.5rem;
        color: #bdbdbd;
        // text-indent: -1rem;
      }
    }
    > div:nth-child(even) {
      margin-top: 0.9rem;
      width: 12rem;
      height: 0.5rem;
      background-color: #bdbdbd;
    }
    > div:nth-child(5) {
      margin-left: 1.5rem;
    }
    .active {
      > span {
        background-color: #ff8400 !important;
      }
      > p {
        color: #ff8400 !important;
      }
    }
    .active_ {
      background: #ff8400 !important;
    }
  }
  //   订单盒子
  .orderbox {
    padding-top: 2rem;
    .orderinfo {
      display: flex;
      > div:nth-child(1) {
        width: 18rem;
        border: 1px solid #e6e6e6;
        > div:nth-child(1) {
          padding: 0.5rem;
          color: #666666;
          background: #f5f5f5;
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
            }
            > p {
              width: 100%;
            }
          }
        }
      }
      > div:nth-child(2) {
        flex: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
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
        // > p {
        //   font-size: 1.1rem;
        //   color: #a9a9a9;
        //   margin: 2rem 0;
        // }
        > div:nth-child(2) {
          margin-top: 4rem;
          font-size: 1.1rem;
          color: #000;
          display: flex;
          align-items: center;
          padding: 0 2rem;
          > button {
            margin-left: 2rem;
          }
        }
      }
    }
    .orderlist {
      margin-top: 1rem;
      margin-bottom: 2rem;
      border: 1px solid #e6e6e6;
      > div {
        display: flex;
        padding: 0.5rem;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        .imgbox {
          display: flex;
          > img {
            width: 6rem;
            height: 6rem;
          }
          > div {
            display: flex;
            text-align: left;
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
      }
      .imgbox {
        display: flex;
        //   flex-direction: column;
      }
      > div:nth-child(1) {
        background-color: #f5f5f5;
      }
      > div:last-child {
        border: none;
      }
    }
  }
}
</style>