<!-- 我的订单 -->
<template>
  <div class="orderForm">
    <h4>我的订单</h4>
    <Tabs class="tabsbox" :animated="false" @on-click="getOrderList">
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

      <TabPane
        :label="item"
        v-for="(item, index) in ['所有订单', '待付款', '待收货', '已完成']"
        :key="index"
        ><ul>
          <li v-for="(item, index) in orderList" :key="index">
            <div>
              {{ item.sendProgress ? item.sendProgress[0].time : "暂无" }}
              订单号:
              {{ item.tradeNo }}
            </div>
            <div class="orderlist">
              <div>
                <div
                  class="imgbox"
                  v-for="(itemJ, indeJ) in item.plistDetail"
                  :key="indeJ"
                  @click="ordetails(item)"
                  :style="
                    item.plistDetail.length != 1
                      ? 'border-right:none'
                      : 'border-right: 1px solid #ffd39b;'
                  "
                >
                  <img :src="itemJ.picUrl" />
                  <div>
                    <h6>这是商品名称</h6>
                    <span v-if="itemJ.cateName"
                      >颜色:
                      {{ itemJ.cateName ? itemJ.cateName : "暂无" }}</span
                    >
                    <span>单位: {{ itemJ.priceName | unit }}</span>
                  </div>
                </div>
              </div>
              <div>
                <div
                  v-for="(itemJ, indeJ) in item.plistDetail"
                  :style="
                    item.plistDetail.length != 1
                      ? 'border-right:none'
                      : 'border-right: 1px solid #ffd39b;'
                  "
                  :key="indeJ"
                >
                  {{ itemJ.priceName }}
                </div>
              </div>
              <div>
                <div
                  v-for="(itemJ, indeJ) in item.plistDetail"
                  style="border-right: 1px solid #ffd39b"
                  :key="indeJ"
                >
                  {{ itemJ.buyNum }}
                </div>
              </div>
              <div>￥ {{ item.money }}</div>
              <div>
                <p>{{ item.state | typename }}</p>
              </div>
              <div>
                <Button
                  v-if="item.state == 0"
                  type="warning"
                  @click="onGopay(item)"
                  >立即付款</Button
                >
                <Button
                  @click="onEditOrder(item.tradeNo)"
                  v-if="item.state == 0"
                  >修改订单</Button
                >
              </div>
            </div>
          </li>
        </ul></TabPane
      >
      <!-- <TabPane label="待付款">标签二的内容</TabPane>
      <TabPane label="待收货">标签三的内容</TabPane>
      <TabPane label="已完成">标签三的内容</TabPane> -->
    </Tabs>
    <!-- <div class="ordertypebox">
      <span :class="formid == 0 ? 'active' : ''" @click="getOrderList(0)"
        >所有订单</span
      >
      <span :class="formid == 1 ? 'active' : ''" @click="getOrderList(1)"
        >待付款</span
      >
      <span :class="formid == 2 ? 'active' : ''" @click="getOrderList(2)"
        >待收货</span
      >
      <span :class="formid == 3 ? 'active' : ''" @click="getOrderList(3)"
        >已完成</span
      >
    </div>
     -->
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
    this.$store.commit("show_personid", 0);
    this.getOrderList(0);
  },
  methods: {
    // 详情页
    ordetails: function (item) {
      this.$store.commit("show_orderDetails", item);
      this.$router.push("/person/orderDetails");
    },
    // 获取列表
    getOrderList: function (type) {
      // console.info(type)
      this.axios
        .post(this.$api.getOrderList, {
          type: type,
        })
        .then((data) => {
          if (data.code == 200) {
            this.formid = type;
            this.orderList = [];
            for (var i = data.data.length - 1; i >= 0; i--) {
              this.orderList.push(data.data[i]);
            }
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 点击 去支付
    onGopay: function (item) {
      this.$router.push({
        path: "/payment",
        query: {
          pitchon: 1,
          tradeNo: item.tradeNo,
          money: item.money,
        },
      });
    },
    onEditOrder: function (tradeNo) {
      this.$layer.confirm(
        "你确定要修改订单吗?",
        {
          btn: ["确定", "取消"], //按钮
        },
        (index) => {
          this.axios
            .post(this.$api.editOrder, {
              tradeNo: tradeNo,
            })
            .then((data) => {
              if (data.code == 200) {
                this.$router.push("/cart");
              } else {
                this.$toast(this.ErrCode(data.msg));
              }
            })
            .catch(() => {
              this.$toast(this.$api.monmsg);
            });
          this.$layer.close(index);
        },
        (index) => {
          this.$layer.close(index);
        }
      );
    },
  },
  filters: {
    unit: function (value) {
      // 替换地址 /
      let arr = value.split("/");
      if (arr[1]) return arr[1];
      return value;
    },
    typename: function (val) {
      if (val == -1) {
        return "已取消";
      } else if (val == 0) {
        return "未支付";
      } else if (val == 1) {
        return "已支付";
      } else if (val == 2) {
        return "商家已接单";
      } else if (val == 3) {
        return "仓库正在打包商品";
      } else if (val == 4) {
        return "骑手正在赶往仓库";
      } else if (val == 5) {
        return "骑手正在配送";
      } else if (val == 6) {
        return "配送完成";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.orderForm {
  // flex: 4;
  > div {
    margin-top: 1rem;
    border: 1px solid #ececec;
  }
  .tabsbox {
    padding: 0.5rem 1rem;
    .listtop {
      display: flex;
      padding: 0.5rem 0;
      background-color: #f5f5f5;
      border: 1px solid #ebebeb;
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
        background: #ffffff;
        border: 1px solid #ffd39b;
        margin-bottom: 1rem;
        > div:nth-child(1) {
          background: #ffecd4;
          border-bottom: 1px solid #ffd39b;
          padding: 0.5rem;
          color: #666;
        }
        .orderlist {
          display: flex;
          // padding: 1rem;
          > div {
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 1.5rem 0;
            // justify-content: center;
            > div {
              flex: 1;
              display: flex;
            }
            .imgbox {
              width: 100%;
              display: flex;
              justify-content: center;
              padding: 1rem 0;
              border-bottom: 1px solid #ffd39b;
              > img {
                width: 6.13rem;
                height: 6.13rem;
                cursor: pointer;
              }
              > div {
                display: flex;
                cursor: pointer;
                font-size: 0.9rem;
                margin-left: 0.5rem;
                flex-direction: column;
                // justify-content: space-between;
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
              // margin: 0;
              border-bottom: none;
            }
          }
          > div:nth-child(2) > div,
          > div:nth-child(3) > div {
            width: 100%;
            display: flex;
            // padding-top: 1rem;
            justify-content: center;
            border-bottom: 1px solid #ffd39b;
          }
          > div:nth-child(2) > div:last-child,
          > div:nth-child(3) > div:last-child {
            border-bottom: none;
          }
          > div:nth-child(1) {
            flex: 2;
          }
          > div:nth-child(1),
          > div:nth-child(2),
          > div:nth-child(3) {
            padding: 0;
            > div {
              padding: 1.5rem 0;
            }
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
  .ordertypebox {
    display: flex;
    padding: 1rem;
    justify-content: center;
    > span {
      cursor: pointer;
      flex: 1;
      text-align: center;
      border-right: 1px solid #dddddd;
    }
    > span:last-child {
      border-right: none;
    }
    .active {
      color: #ff8400;
    }
  }
}
</style>

<style>
.tabsbox .ivu-tabs-tab {
  font-size: 0.88rem;
  font-family: SimSun;
  font-weight: bold;
  color: #000000;
}
.tabsbox .ivu-tabs-nav .ivu-tabs-tab-active {
  font-size: 0.88rem;
  font-family: SimSun;
  font-weight: bold;
  color: #ff9000;
}
.tabsbox .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: #ff9000;
}
.tabsbox .ivu-tabs-ink-bar {
  background-color: #ff9000;
}
</style>