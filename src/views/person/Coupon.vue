<!-- 我的优惠券 -->
<template>
  <div class="coupon">
    <h4>我的优惠券</h4>
    <div class="content">
      <div>
        <span :class="isticket == 0 ? 'active' : ''" @click="onIs(0)"
          >可用</span
        >
        <span :class="isticket != 0 ? 'active' : ''" @click="onIs(1)"
          >不可用</span
        >
      </div>
      <div>
        <ticket
          :ticket="item"
          v-for="(item, index) in ticketList"
          :key="index"
          class="ticket_"
          v-show="item.is"
        />
        <p v-show="ticketList.length == 0">暂无优惠券记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import ticket from "@/components/Ticket";
export default {
  components: {
    ticket,
  },
  data() {
    return {
      isticket: 0,
      ticketList: [],
    };
  },
  mounted() {
    this.$store.commit("show_personid", 2);
    this.getTicket();
  },
  methods: {
    // 获取优惠券
    getTicket: function () {
      this.axios
        .post(this.$api.getTicket)
        .then((data) => {
          if (data.code == 200) {
            this.ticketList = data.data;
            this.onIs(0);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 开关
    onIs: function (index) {
      this.isticket = index;
      for (let i = 0; i < this.ticketList.length; i++) {
        let itme = this.ticketList[i];
        if (index) {
          itme.type >= 1 ? (itme.is = true) : (itme.is = false);
        } else {
          itme.type == 0 ? (itme.is = true) : (itme.is = false);
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.coupon {
  // flex: 4;
  .content {
    border: 1px solid #ebebeb;
    min-height: 15.7rem;
    padding: 0.65rem;
    > div:nth-child(1) {
      border-bottom: 1px solid #ebebeb;
      // padding: 1rem;
      > span {
        cursor: pointer;
        font-size: 1rem;
        height: 2rem;
        display: inline-block;
        padding: 0.2rem 0.69rem;
      }
      .active {
        color: #ff8400;
        position: relative;
      }
      .active:after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        top: 2rem;
        bottom: 0;
        right: 0;
        background: #FF9000;
        z-index: 1;
      }
    }
    > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      .ticket_ {
        margin-top: 1.38rem;
        margin-right: 3.1rem;
      }
    }
  }
}
</style>