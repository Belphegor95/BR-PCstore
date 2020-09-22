<!-- 维修 -->
<template>
  <div class="service">
    <shortcut />
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <div class="content">
      <div>
        <h4>上门维修</h4>
        <div>
          <span :class="orderType == 0?'active':''" @click="idclick(0)">维修中</span>
          <span :class="orderType == 1?'active':''" @click="idclick(1)">维修完成</span>
          <Button @click="visitClick">申请上门</Button>
        </div>
        <div v-if="orderlist.length != 0">
          <ul v-if="orderType == 0">
            <li v-for="(item,index) in orderlist" :key="index" @click="detailsClick(item)">
              <div>
                <p>订单编号:{{ item.tradeNo }}</p>
                <p>下单时间:{{ item.createTime | orderdate }}</p>
                <p>维修物品名:{{ item.goodsName }}</p>
                <p>联系人:{{ item.linkMan }}</p>
              </div>
              <div>
                <p>最新动态: 未接单</p>
              </div>
              <div>
                <p>接单状态: {{ status[item.state + 1] }}</p>
              </div>
            </li>
          </ul>
          <ul v-else>
            <li>
              <div>
                <p>订单编号:{{ item.tradeNo }}</p>
                <p>下单时间:{{ item.createTime | orderdate }}</p>
                <p>维修物品名:{{ item.goodsName }}</p>
                <p>联系人:{{ item.linkMan }}</p>
              </div>
              <div class="schedulebox">
                <p>已完成:2020-8-18 15:33:00</p>
                <p>已到达: 开始维修 2020-8-18 15:33:16</p>
                <p>已节点: 刘师傅 18656464 2020-8-18 15:33:41</p>
              </div>
            </li>
          </ul>
        </div>
        <p v-else>暂无维修记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import search from "@/components/Search.vue";
export default {
  components: {
    shortcut,
    search,
  },
  data() {
    return {
      orderType: 0,
      orderlist: [],
      status: [
        "已取消",
        "未支付",
        "已支付",
        "仓库已接单",
        "骑手已接单",
        "骑手已到达",
        "开始维修",
        "骑手维修加时",
        "维修完成",
      ],
    };
  },
  mounted() {
    this.getFixOrder();
  },
  methods: {
    idclick: function (id) {
      this.orderType = id;
      this.getFixOrder();
    },
    visitClick: function () {
      this.$router.push("/maintain/chooseType");
    },
    // 查看详情
    detailsClick: function (item) {
      this.$store.commit("show_maintainDetails", item);
      this.$router.push("/maintain/maintainDetails");
    },
    // 获取维修单列表
    getFixOrder: function () {
      this.axios
        .post(this.$api.getFixOrder, {
          orderType: this.orderType,
        })
        .then((data) => {
          if (data.code == 200) {
            this.orderlist = data.data.ordersData;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
  },
  filters: {
    orderdate: function (value) {
      // 单位
      let arr = value.split("T08");
      if (arr.length == 2) return arr[0];
    },
  },
};
</script>

<style lang='less' scoped>
.service {
  margin-top: 38px;
  .content {
    margin-bottom: 5rem;
    > div {
      padding: 0 2rem;
      > h4 {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 2.8rem;
        border-bottom: 1px solid #e5e5e5;
      }
      > div {
        padding: 1rem;
        > span {
          color: #666666;
          cursor: pointer;
          font-size: 1rem;
          margin-right: 2rem;
        }
        .active {
          color: #ff8400;
        }
        > button {
          float: right;
        }
      }
      > div {
        > ul {
          > li {
            cursor: pointer;
            display: flex;
            padding: 1rem 0;
            border: 1px solid #dddddd;
            border-bottom: 1px solid #fff;
            > div {
              flex: 1;
              display: flex;
              padding-left: 2rem;
              flex-direction: column;
              justify-content: center;
              border-right: 1px solid #ddd;
            }
            > div:last-child {
              border: none;
            }
            .schedulebox {
              > p {
                text-indent: 2rem;
                line-height: 2rem;
                position: relative;
              }
              > p:after {
                display: block;
                content: " ";
                width: 1rem;
                height: 100%;
                border-left: 2px solid #dddddd;
                position: absolute;
                left: 0;
                top: 0;
              }
              > p:before {
                display: block;
                content: " ";
                width: 0.8rem;
                height: 0.8rem;
                background: #ddd;
                border-radius: 50%;
                position: absolute;
                left: -0.3rem;
                top: 0.6rem;
              }
            }
          }
          > li:last-child {
            border-bottom: 1px solid #dddddd;
          }
          > li:hover {
            border: 1px solid #ff8500;
          }
        }
      }
    }
  }
}
</style>