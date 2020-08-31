<!-- 维修 -->
<template>
  <div class="service">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <div class="content">
      <div>
        <h4>上门维修</h4>
        <div>
          <span :class="id == 0?'active':''" @click="idclick(0)">维修中</span>
          <span :class="id == 1?'active':''" @click="idclick(1)">维修完成</span>
          <Button @click="visitClick">申请上门</Button>
        </div>
        <ul v-if="id == 0">
          <li v-for="(item,index) in 4" :key="index" @click="detailsClick(index)">
            <div>
              <p>订单编号:3423432897</p>
              <p>下单时间:2020-8-18</p>
              <p>维修物品名:打印机</p>
              <p>联系人:刘经理</p>
            </div>
            <div>
              <p>最新动态: 未接单</p>
            </div>
            <div>
              <p>接单状态: 未接单</p>
            </div>
          </li>
          <li>
            <div>
              <p>订单编号:3423432897</p>
              <p>下单时间:2020-8-18</p>
              <p>维修物品名:打印机</p>
              <p>联系人:刘经理</p>
            </div>
            <div>
              <p>最新动态: 未接单</p>
            </div>
            <div>
              <p>接单状态: 未接单</p>
            </div>
          </li>
          <li>
            <div>
              <p>订单编号:3423432897</p>
              <p>下单时间:2020-8-18</p>
              <p>维修物品名:打印机</p>
              <p>联系人:刘经理</p>
            </div>
            <div>
              <p>最新动态: 未接单</p>
            </div>
            <div>
              <p>接单状态: 未接单</p>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li>
            <div>
              <p>订单编号:3423432897</p>
              <p>下单时间:2020-8-18</p>
              <p>维修物品名:打印机</p>
              <p>联系人:刘经理</p>
            </div>
            <div class="schedulebox">
              <p>已完成:2020-8-18 15:33:00</p>
              <p>已到达: 开始维修 2020-8-18 15:33:16</p>
              <p>已节点: 刘师傅 18656464 2020-8-18 15:33:41</p>
            </div>
          </li>
        </ul>
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
      id: 0,
    };
  },
  methods: {
    idclick: function (id) {
      this.id = id;
    },
    visitClick: function () {
      this.$router.push("/maintain/chooseType");
    },
    // 查看详情
    detailsClick: function () {
      this.$router.push("/maintain/maintainDetails");
    }
  },
};
</script>

<style lang='less' scoped>
.service {
  .content {
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
      > ul {
        border: 1px solid #dddddd;
        > li {
          cursor: pointer;
          display: flex;
          padding: 1rem 0;
          border-bottom: 1px solid #dddddd;
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
          border: none;
        }
      }
    }
  }
}
</style>