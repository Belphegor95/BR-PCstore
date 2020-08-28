<!-- 优惠券 -->
<template>
  <div class="ticket">
    <div class="tickettop">
      <img v-if="isticket" src="../assets/img/person/cg.png" />
      <img v-else src="../assets/img/person/gq.png" />
      <div>
        <p>
          <i>¥</i>
          <span>50</span>
        </p>
        <p>2020.8.13 - 2020.8.17</p>
      </div>
    </div>
    <div class="ticketbottom">
      <div>
        <div>
          <span>优惠券名称 :</span>
          <p>50元现金券</p>
        </div>
        <div>
          <span>使 用 说 明 :</span>
          <p>可抵扣50元现金</p>
        </div>
        <div>
          <span>
            <b>有</b>
            <b>效</b>
            期:
          </span>
          <p>2020.8.13 - 2020.8.17</p>
        </div>
      </div>
      <div v-if="isticket">
        <button class="btn">立即使用</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isticket: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.ticket {
  //   display: inline-block;
  height: 18rem;
  background-color: #fafafa;
  .tickettop {
    position: relative;
    > div {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      color: #fff;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      > p {
        display: flex;
        > span {
          font-size: 3rem;
        }
        > i {
          line-height: 3rem;
          font-size: 1.5rem;
          font-style: normal;
        }
      }
      > p:nth-child(2) {
        font-size: 1rem;
      }
    }
  }
  .ticketbottom {
    > div:nth-child(1) {
      font-size: 0.7rem;
      padding: 0.8rem 0.5rem;
      > div {
        display: flex;
        margin-bottom: 0.4rem;
        > span {
          width: 4.7rem;
          text-align: justify;
          > b {
            font-weight: 400;
            margin-right: 0.72rem;
          }
        }
        > p {
          color: #999;
        }
      }
    }
    > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        color: #ff8400;
        padding: 0.3rem 1rem;
        border-radius: 2rem;
        border: 1px solid #ff8400;
      }
    }
  }
}
</style>
