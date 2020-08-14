<!-- 顶部  个人中心 -->
<template>
  <div class="shortcut">
    <div class="leftbox">
      <p @click="gohome">欢迎来到开心兔</p>
      <p>
        <span @click="rut('guide','login')">请登录</span> |
        <span @click="rut('guide','register')">注册</span>
      </p>
    </div>
    <div class="rightbox">
      <span @click="rut('person','orderForm')">我的订单</span>|
      <span class="gwcbox" @click="rut('cart')">
        <img src="../assets/img/home/gwc.png" alt />
        购物车
        <b>0</b>
      </span>|
      <Dropdown style="margin-left: 20px" @on-click="ok">
        <a href="javascript:void(0)">
          个人中心
          <Icon type="ios-arrow-down" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="/person/userinfo">个人中心</DropdownItem>
          <DropdownItem name="/person/orderForm">我的订单</DropdownItem>
          <DropdownItem name="/person/deliveryAddress">收货地址</DropdownItem>
          <DropdownItem name="/person/userinfo">修改登录密码</DropdownItem>
          <DropdownItem name="/person/userinfo">手机绑定</DropdownItem>
          <DropdownItem name="/person/userinfo">我的优惠券</DropdownItem>
        </DropdownMenu>
      </Dropdown>|
      <span>联系客服</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    gohome: function () {
      if (this.$route.path != "/") this.$router.push("/");
    },
    ok(name) {
      if (this.$route.path == name) return;
      this.$router.push(name);
    },
    rut: function (name, name1) {
      if (name1) return this.$router.push(`/${name}/${name1}`);
      this.$router.push(`/${name}`);
    },
  },
};
</script>

<style lang="less" scoped>
.shortcut {
  display: flex;
  color: #8b8b8b;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  justify-content: space-between;
  > div {
    display: flex;
    p:nth-child(2) {
      > span {
        cursor: pointer;
      }
      > span:nth-child(1) {
        margin-right: 0.5rem;
      }
      > span:nth-child(2) {
        margin-left: 0.5rem;
      }
    }
  }
  .leftbox {
    p:nth-child(1) {
      color: #ff8900;
      margin-right: 1rem;
      cursor: pointer;
    }
  }
  .rightbox {
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
      margin: 0 0.5rem;
    }
    span:last-child {
      margin-right: 0;
    }
  }
}
span:hover {
  color: #ff8900;
}
</style>

<style>
.shortcut .ivu-dropdown {
  margin-left: 0;
  margin: 0 0.5rem;
}
.shortcut .ivu-dropdown a {
  color: #8b8b8b;
}
.shortcut .ivu-dropdown a:hover {
  color: #ff8900;
}
</style>