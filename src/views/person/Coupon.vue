<!-- 我的优惠券 -->
<template>
  <div class="coupon">
    <h4>我的优惠券</h4>
    <div class="content">
      <div>
        <span :class="isticket == 0 ? 'active' : ''" @click="onIs(0)"
          >可用卷</span
        >
        <span :class="isticket != 0 ? 'active' : ''" @click="onIs(1)"
          >不可用卷</span
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
    this.$store.commit("show_personid", 5);
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
  flex: 4;
  .content {
    > div:nth-child(1) {
      padding: 1rem;
      > span {
        cursor: pointer;
        font-size: 1rem;
        margin-right: 4rem;
      }
      .active {
        color: #ff8400;
      }
    }
    > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      .ticket_ {
        margin-right: 1rem;
      }
    }
  }
}
</style>