<!-- 优惠券 -->
<template>
  <div
    class="ticket"
    :class="
      ticket.type == 0 ? 'ticket_0' : ticket.type == 1 ? 'ticket_1' : 'ticket_2'
    "
    @click="$router.push('/')"
  >
    <div>
      <span><i>¥</i>{{ ticket.money }}</span>
    </div>
    <div>
      <div>可抵扣{{ ticket.money }}元现金</div>
      <div>
        <span>使用期限:</span>
        <p>{{ ticket.outTime | date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ticket: Object,
  },
  data() {
    return {};
  },
  mounted() {
    console.info(this.ticket);
  },
  filters: {
    date(val) {
      let arr = val.split(" ");
      return arr[0];
    },
  },
};
</script>

<style lang='less' scoped>
.ticket {
  width: 12.6rem;
  height: 4.3rem;
  cursor: pointer;
  color: #fff;
  display: flex;
  > div:nth-child(1) {
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      font-size: 1.8rem;
      padding-left: 0.4rem;
      margin-top: -0.9rem;
      height: 2rem;
      position: relative;
      > i {
        position: absolute;
        left: 0;
        top: -0.4rem;
        font-size: 0.9rem;
        font-style: normal;
      }
    }
  }
  > div:nth-child(2) {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0.5rem;
    padding-bottom: 1.6rem;
    flex-direction: column;
    > div {
      display: flex;
    }
  }
}
.ticket_0 {
  background: url("../assets/img/person/cg.png") no-repeat;
}
.ticket_1 {
  background: url("../assets/img/person/sy.png") no-repeat;
}
.ticket_2 {
  background: url("../assets/img/person/gq.png") no-repeat;
}
</style>
