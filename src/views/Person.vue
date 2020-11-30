<!-- 个人中心 -->
<template>
  <div class="person">
    <shortcut />
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <breadcrumb :tos="tos" />
    <div class="content">
      <div>
        <ul>
          <div>交易中心</div>
          <li v-for="item in deals" :key="item.id">
            <span
              :class="personid == item.id ? 'active' : ''"
              @click="rut(item)"
              >{{ item.name }}</span
            >
          </li>
          <div>账号信息</div>
          <li v-for="item in personnames" :key="item.id">
            <span
              :class="personid == item.id ? 'active' : ''"
              @click="rut(item)"
              >{{ item.name }}</span
            >
          </li>
        </ul>
        <router-view />
      </div>
    </div>
    <div class="bottombox">
      <statement />
    </div>
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import search from "@/components/Search.vue";
import statement from "@/components/Statement.vue";
import breadcrumb from "@/components/Breadcrumb.vue";
export default {
  components: {
    shortcut,
    search,
    statement,
    breadcrumb,
  },
  data() {
    return {
      deals: [
        {
          name: "我的订单",
          site: "/orderForm",
          id: 0,
        },
        {
          name: "收货地址",
          site: "/deliveryAddress",
          id: 1,
        },
        {
          name: "我的优惠券",
          site: "/coupon",
          id: 2,
        },
      ],
      personnames: [
        {
          name: "个人中心",
          site: "/userinfo",
          id: 3,
        },
        {
          name: "修改登录密码",
          site: "/password",
          id: 4,
        },
        {
          name: "修改手机绑定",
          site: "/phone",
          id: 5,
        },
      ],
      personid: 0,
      tos: [{ name: "首页", to: "/" }],
    };
  },
  mounted() {
    this.personid = this.$store.state.personid;
    this.getTos();
    if (this.$route.path.indexOf("orderDetails") != -1) {
      this.tos.push({ name: "商品详情" });
    }
  },
  methods: {
    rut: function (item) {
      if (this.personid == item.id) return;
      (this.tos = [
        { name: "首页", to: "/" },
        { name: item.name, to: `/person${item.site}` },
      ]),
        (this.personid = item.id);
      this.$router.push(`/person${item.site}`);
    },
    // 刷新丢失问题
    getTos: function () {
      this.deals.forEach((item) => {
        if (this.personid == item.id) {
          return this.tos.push({
            name: item.name,
            to: `/person${item.site}`,
          });
        }
      });
      this.personnames.forEach((item) => {
        if (this.personid == item.id) {
          return this.tos.push({
            name: item.name,
            to: `/person${item.site}`,
          });
        }
      });
    },
  },
  watch: {
    "$route.path"(rut) {
      if (rut.indexOf("orderDetails") != -1) {
        this.tos.push({ name: "商品详情" });
      } else {
        if (this.tos.length == 3) this.tos.pop();
      }
    },
    "$store.state.personid"(id) {
      this.personid = id;
    },
  },
};
</script>

<style lang='less' scoped>
.person {
  margin-top: 2rem;
  .content {
    padding: 1.13rem 0;
    > div {
      display: flex;
      justify-content: space-between;
      > ul {
        width: 9.19rem;
        border: 1px solid #ebebeb;
        > li {
          padding: 0.5rem;
          font-size: 1rem;
          color: #999;
          > span {
            cursor: pointer;
          }
          .active {
            color: #ff8400;
          }
        }
        > div {
          height: 2.06rem;
          line-height: 2.06rem;
          background: #f3f3f3;
          font-size: 0.88rem;
          font-family: SimSun;
          font-weight: bold;
          color: #232323;
          text-indent: 0.5rem;
        }
      }
      > div {
        width: 64.88rem;
      }
    }
  }
}
</style>
<style>
.person input {
  border-radius: 0;
}
.person h4 {
  height: 2.06rem;
  background: #f3f3f3;
  border: 1px solid #ebebeb;
  color: #000;
  font-weight: 400;
  font-size: 1.2rem;
  text-indent: 1.38rem;
  margin-bottom: 1.38rem;
}
</style>