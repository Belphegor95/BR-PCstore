<!-- 我的优惠券 -->
<template>
  <div class="coupon">
    <h4>我的优惠券</h4>
    <div class="content">
      <div>
        <span :class="isticket?'active':'' " @click="isticket = true">可用卷</span>
        <span :class="!isticket?'active':'' " @click="isticket = false">已过期</span>
      </div>
      <div>
        <ticket :isticket="isticket" v-for="(item,index) in ticketList" :key="index" class="ticket_" v-show="ticketList.length != 0" />
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
      isticket: true,
      ticketList: [],
    };
  },
  mounted() {
    this.$store.commit("show_personid", 6);
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
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
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
        margin-right: 1.9rem;
        margin-bottom: 2rem;
      }
      .ticket_:nth-child(4n + 4) {
        margin-right: 0;
      }
    }
  }
}
</style>