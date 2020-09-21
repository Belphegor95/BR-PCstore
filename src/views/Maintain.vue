<!--  -->
<template>
  <div class="maintain">
    <shortcut />
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <div class="content">
      <div>
        <ul>
          <li>
            <div>下单引导</div>
          </li>
          <li>
            <div>
              <img v-if="maintainid == 0" src="../assets/img/maintain/wx_.png" />
              <img v-else src="../assets/img/maintain/wx.png" />
            </div>
            <div :class="maintainid == 0?  'active':''">待修类型</div>
          </li>
          <li>
            <div>
              <img v-if="maintainid == 1" src="../assets/img/maintain/sp_.png" />
              <img v-else src="../assets/img/maintain/sp.png" />
            </div>
            <div :class="maintainid == 1?  'active':''">添加商品</div>
          </li>
          <li>
            <div>
              <img v-if="maintainid == 2" src="../assets/img/maintain/khxx_.png" />
              <img v-else src="../assets/img/maintain/khxx.png" />
            </div>
            <div :class="maintainid == 2?  'active':''">客户信息</div>
          </li>
          <!-- <li>
            <div>
              <img v-if="maintainid == 3" src="../assets/img/maintain/xd_.png" />
              <img v-else src="../assets/img/maintain/xd.png" />
            </div>
            <div :class="maintainid == 3?  'active':''">下单</div>
          </li>-->
        </ul>
        <router-view class="rightbox" />
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
      maintainid: 0,
    };
  },
  mounted() {
    this.maintainid = this.$store.state.maintainid;
  },
  watch: {
    "$store.state.maintainid"(id) {
      this.maintainid = id;
    },
  },
};
</script>

<style lang='less' scoped>
.maintain {
  margin-top: 38px;
  .content {
    > div {
      display: flex;
      > ul {
        flex: 1;
        margin-top: 2rem;
        position: relative;
        height: 36rem;
        > li {
          padding: 0.5rem;
          font-size: 1rem;
          color: #888888;

          background-color: #fff;
          > span {
            cursor: pointer;
          }
          .active {
            color: #ff8400;
          }
          > div {
            z-index: 3;
          }
        }
        > li:nth-child(1) {
          > div {
            width: 6rem;
            height: 2.5rem;
            color: #fff;
            line-height: 2.5rem;
            text-align: center;
            border-radius: 0.3rem;
            background: #ff8400;
          }
        }
        > li:not(:first-child) {
          display: flex;
          padding: 2rem 0;
          align-items: center;
          > div:nth-child(1) {
            width: 6rem;
            display: flex;
            justify-content: center;
          }
        }
      }
      > ul:after {
        box-sizing: content-box;
        width: 1px;
        height: 100%;
        background: #ff8400;
        position: absolute;
        top: 2rem;
        left: 3rem;
        padding: 0;
        display: block;
        content: "";
        z-index: 2;
      }
      .rightbox {
        flex: 4;
        h4 {
          font-size: 1.4rem;
          font-weight: 400;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
  }
}
</style>
<style>
.maintain .rightbox h4 {
  font-size: 1.4rem;
  font-weight: 400;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e5e5e5;
}
.maintain .rightbox .nextStep {
  width: 20rem;
  height: 2.5rem;
  color: #fff;
  line-height: 2.5rem;
  text-align: center;
  border-radius: 0.2rem;
  background-color: #ff8400;
}
</style>