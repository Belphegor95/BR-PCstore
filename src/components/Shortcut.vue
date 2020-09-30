<!-- 顶部  个人中心 -->
<template>
  <div class="nav">
    <div class="shortcut">
      <div class="leftbox">
        <p @click="back">欢迎来到开心兔</p>
        <p>
          <span class="userbox" v-if="user && user.companyName">
            {{ user.companyName }}
            <div>
              <img src="../assets/img/guide/tx.png" />
              <div>
                <p @click="rut('guide', 'login?is=true')">切换角色</p>
                <p @click="quit">退出</p>
              </div>
            </div>
          </span>
          <span v-else @click="rut('guide', 'login')">请登录</span>
          <span v-if="!user" @click="rut('guide', 'register')">注册</span>
        </p>
      </div>
      <div class="rightbox">
        <span @click="rut('person', 'orderForm')">我的订单</span>
        <span class="gwcbox" @click="ok('/cart')">
          <img src="../assets/img/components/topcart.png" />
          购物车 (<b>{{ count }}</b
          >)
        </span>
        <div class="myCenterbox">
          <div class="center">
            <p @click="ok('/person/userinfo')">个人中心</p>
            <Icon type="ios-arrow-up" />
          </div>
          <div class="mybox">
            <p
              v-for="(item, index) in myCenterList"
              :key="index"
              @click="ok(item.to)"
            >
              {{ item.name }}
            </p>
          </div>
        </div>
        <!-- <Dropdown style="margin-left: 20px" @on-click="ok">
          <a href="javascript:void(0)">
            个人中心
            <Icon type="ios-arrow-down" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="/person/userinfo">个人中心</DropdownItem>
            <DropdownItem name="/person/orderForm">我的订单</DropdownItem>
            <DropdownItem name="/person/deliveryAddress">收货地址</DropdownItem>
            <DropdownItem name="/person/password">修改登录密码</DropdownItem>
            <DropdownItem name="/person/phone">手机绑定</DropdownItem>
            <DropdownItem name="/person/coupon">我的优惠券</DropdownItem>
          </DropdownMenu> </Dropdown
        > -->
        <span>联系客服</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      user: this.$store.state.user,
      myCenterList: [
        {
          name: "我的订单",
          to: "/person/orderForm",
        },
        {
          name: "收货地址",
          to: "/person/deliveryAddress",
        },
        {
          name: "修改登录密码",
          to: "/person/password",
        },
        {
          name: "手机绑定",
          to: "/person/phone",
        },
        {
          name: "我的优惠券",
          to: "/person/coupon",
        },
      ],
    };
  },
  mounted() {
    this.count = this.$store.state.count || 0;
    this.getShoppingCartPlistCount();
  },
  methods: {
    // 回到首页
    back: function () {
      if (this.$route.path == "/") return;
      this.$router.push("/");
    },
    ok: function (name) {
      if (this.$route.path == name) return;
      if (!this.user && name != "/cart")
        return this.$router.push("/guide/login");
      this.$router.push(name);
    },
    rut: function (name, name1) {
      if (this.$route.path == `/${name}/${name1}`) return;
      if (name1) return this.$router.push(`/${name}/${name1}`);
      this.$router.push(`/${name}`);
    },
    // 获取购物车里商品数量
    getShoppingCartPlistCount: function () {
      this.axios
        .post(this.$api.getShoppingCartPlistCount)
        .then((data) => {
          if (data.code == 200) {
            if (data.data.count) {
              this.count = data.data.count;
            }
            this.$store.commit("show_count", data.data.count);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    quit: function () {
      this.$layer.confirm(
        "你确定要退出吗?",
        {
          btn: ["确定", "取消"], //按钮
        },
        (index) => {
          this.axios
            .post(this.$api.logout)
            .then((data) => {
              if (data.code == 200) {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("vuex");
                this.$store.commit("resetState");
                this.$router.push("/guide/login");
              } else {
                this.$toast(this.ErrCode(data.msg));
              }
            })
            .catch(() => {
              this.$toast(this.$api.monmsg);
            });
          this.$layer.close(index);
        },
        (index) => {
          this.$layer.close(index);
        }
      );
    },
  },
  // 因为购物车个数是会改变的所以要监听改变
  watch: {
    "$store.state.count"(num) {
      this.count = num;
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  width: 100% !important;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: #f1f1f1;
  .shortcut {
    display: flex;
    color: #8b8b8b;
    font-size: 0.9rem;
    height: 2rem;
    justify-content: space-between;

    > div {
      display: flex;
      p:nth-child(2) {
        > span {
          cursor: pointer;
        }
      }
    }
    .leftbox {
      color: #f39800;
      font-size: 0.75rem;
      > p:nth-child(1) {
        color: #ff8900;
        margin-right: 1.63rem;
        cursor: pointer;
        line-height: 2rem;
      }
      > p:nth-child(2) {
        display: flex;
        align-items: center;
        > span:nth-child(1) {
          color: #636363;
          margin-right: 0.95rem;
        }
        > .userbox {
          border: 1px solid #f1f1f1;
          border-bottom: none;
          height: 100%;
          display: flex;
          padding: 0 0.5rem;
          margin: 0;
          align-items: center;
          position: relative;
          > div {
            display: none;
            width: 10rem;
            height: 4rem;
            position: absolute;
            top: 2.3rem;
            left: 0;
            background-color: #fff;
            border: 1px solid #eeeeee;
            border-top: none;
            align-items: center;
            > img {
              width: 3rem;
              height: 3rem;
              margin-left: 1rem;
            }
            > div:nth-child(2) {
              height: 3rem;
              display: flex;
              text-indent: 1rem;
              flex-direction: column;
              justify-content: center;
              > p:hover {
                color: #ff8900;
              }
            }
          }
        }
        > .userbox:hover {
          background-color: #fff;
          border: 1px solid #eeeeee;
          border-bottom: none;
          > div {
            color: #8b8b8b;
            display: flex;
          }
        }
      }
    }
    .rightbox {
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      color: #838383;
      .gwcbox {
        > img {
          margin-right: 0.2rem;
        }
        b {
          font-weight: 400;
          color: #ff8900;
        }
      }
      > span {
        cursor: pointer;
        margin-left: 1.06rem;
      }
      span:last-child {
        margin-right: 0;
      }
      .myCenterbox {
        display: flex;
        height: 100%;
        position: relative;
        padding: 0 0.69rem;
        margin-left: 1.06rem;
        border: 0.06px solid #f1f1f1;
        border-bottom: none;
        .center {
          display: flex;
          height: 100%;
          cursor: pointer;
          align-items: center;
          > i {
            margin-left: 0.63rem;
          }
        }
        .center:hover {
          color: #ff9000;
        }
        .mybox {
          display: none;
          width: 100% + 3px;
          background: #fff;
          position: absolute;
          left: -1px;
          top: 1.9rem;
          border: 0.06px solid #f1f1f1;
          border-top: none;
          > p {
            font-size: 0.77rem;
            text-indent: 0.75rem;
            cursor: pointer;
            white-space: nowrap;
            height: 2rem;
            line-height: 2rem;
          }
          > p:hover {
            color: #ff9000;
          }
        }
      }
      .myCenterbox:hover {
        background-color: #fff;
        border: 0.06px solid #dcdcdc;
        border-bottom: none;
        i {
          transform: rotate(180deg);
        }
        .mybox {
          display: block;
          border: 0.06px solid #dcdcdc;
          border-top: none;
        }
      }
    }
  }
}
span:hover {
  color: #ff8900;
}
</style>

<style>
/* .shortcut .ivu-dropdown {
  margin-left: 0;
  margin: 0 0.5rem;
}
.shortcut .ivu-dropdown a {
  color: #8b8b8b;
}
.shortcut .ivu-dropdown a:hover {
  color: #ff8900;
} */
</style>