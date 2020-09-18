<!-- 个人中心 -->
<template>
  <div class="person">
    <shortcut />
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <div class="content">
      <div>
        <ul>
          <li v-for="(item,index) in personnames" :key="index">
            <span :class="personid == index? 'active':''" @click="rut(index, item.site)">{{ item.name }}</span>
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
export default {
  components: {
    shortcut,
    search,
    statement,
  },
  data() {
    return {
      personnames: [
        {
          name: "个人中心",
          site: "/userinfo",
        },
        {
          name: "我的购物车",
          site: "/cart",
        },
        {
          name: "我的订单",
          site: "/orderForm",
        },
        {
          name: "收货地址",
          site: "/deliveryAddress",
        },
        {
          name: "修改登录密码",
          site: "/password",
        },
        {
          name: "手机绑定",
          site: "/phone",
        },
        {
          name: "我的优惠券",
          site: "/coupon",
        },
      ],
      personid: 0,
    };
  },
  mounted() {
    this.personid = this.$store.state.personid;
  },
  methods: {
    rut: function (id, name) {
      if (this.personid == id) return;
      this.personid = id;
      if (this.personid == 1) {
        this.$router.push(name);
      } else {
        this.$router.push(`/person${name}`);
      }
    },
  },
  watch: {
    "$store.state.personid"(id) {
      this.personid = id;
    },
  },
};
</script>

<style lang='less' scoped>
.person {
  .content {
    > div {
      display: flex;
      > ul {
        flex: 1;
        // width: 18rem;
        padding-top: 2rem;
        text-indent: 2rem;
        > li {
          padding: 0.5rem;
          // line-height: 2.5rem;
          font-size: 1rem;
          color: #999;
          > span {
            cursor: pointer;
          }
          .active {
            color: #ff8400;
          }
        }
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
  color: #000;
  height: 2.5rem;
  font-weight: 400;
  font-size: 1.2rem;
  border-bottom: 1px solid #e9e9e9;
}
</style>