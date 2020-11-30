<!-- 个人资料 -->
<template>
  <div class="userinfo">
    <h4>个人中心</h4>
    <div class="contentbox">
      <div>
        <span>昵称:</span>
        <Input
          v-model="model"
          placeholder="请输入昵称"
          style="width: 12.5rem"
        />
        <p>你的昵称你做主,想改随时改.</p>
      </div>
      <div>
        <span>注册手机号:</span>
        <div>1380395648</div>
      </div>
      <div>
        <span>头像:</span>
        <div class="imgbox">
          <img src="../../assets/img/person/webp_0.png" alt="" />
          <img src="../../assets/img/person/webp_1.png" alt="" />
          <img src="../../assets/img/person/webp_2.png" alt="" />
          <img src="../../assets/img/person/webp_3.png" alt="" />
        </div>
      </div>
      <div>
        <span>性别:</span>
        <RadioGroup v-model="animal">
          <Radio label="0">男</Radio>
          <Radio label="1">女</Radio>
          <Radio label="2">保密</Radio>
        </RadioGroup>
      </div>
      <div>
        <span>邮箱:</span>
        <Input
          v-model="model"
          placeholder="请输入有效邮箱"
          style="width: 12.5rem"
        />
        <p>将用于接收电子发票,请正确填写.</p>
      </div>
      <div>
        <span>公司全称:</span>
        <Input
          v-model="model"
          placeholder="请输入公司全称"
          style="width: 14.5rem"
        />
        <p>建议填写公司全称.例：郑州***有限公司.</p>
      </div>
      <Button type="warning">保存</Button>
    </div>
    <!-- <div class="userbox">
      <div>
        <div>
          <span class="tximg"></span>
          <div class="usernamebox">
            <div>
              {{ user.companyName ? user.companyName: '暂无' }}
              <div :style="is ? 'background-color:#fff':''" class="xgbox">
                <b @click="is= !is">修改</b>
                <div v-if="is">
                  <div>
                    <Input v-model="name" style="width:11rem" placeholder="用户名" />
                    <Button @click="editAccOrderName">确定</Button>
                    <Button @click="is = false">取消</Button>
                  </div>
                  <div>
                    <img src="../../assets/img/guide/i.png" />
                    <p>建议输入公司名称</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p style="cursor: pointer;" @click="rut('/person/deliveryAddress')">我的收货地址</p>
        </div>
        <div style="cursor: pointer;" @click="rut('/person/coupon')">我的优惠券</div>
      </div>
      <div>
        <div>
          <span>
            <b style="cursor: pointer;" @click="rut('/person/orderForm')">待付款</b>
          </span>
        </div>
        <div>
          <span>
            <b style="cursor: pointer;" @click="rut('/person/orderForm')">待收货</b>
          </span>
        </div>
        <div>
          <span>
            <b style="cursor: pointer;" @click="rut('/person/orderForm')">上门维修单</b>
          </span>
        </div>
      </div>
    </div>
    <div class="usersign">
      <img src="../../assets/img/person/wl.png" />
      <p>我的物流</p>
    </div>
    <div class="userorder">
      <div v-for="(item,index) in 2" :key="index">
        <div>
          <p>订单号: 34234648945641</p>
          <p>商品号: 12312345874554</p>
          <p>收货地址: 河南省郑州市中原区科学大道</p>
        </div>
        <div>
          <div class="waybox">
            <span></span>
            <span></span>
          </div>
          <div>
            <div>
              <p>时间: 11:00</p>
              <p>动态: 骑手已接单</p>
            </div>
            <div>
              <p>时间: 11:00</p>
              <p>动态: 仓库打包</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: "",
      animal: 0,
      user: this.$store.state.user,
      name: "",
      is: false,
    };
  },
  mounted() {
    this.$store.commit("show_personid", 3);
  },
  methods: {
    editAccOrderName: function () {
      if (this.name.trim().length == 0) return this.$toast("名字输入不符合!");
      this.axios
        .post(this.$api.editAccOrderName, {
          companyName: this.name,
        })
        .then((data) => {
          if (data.code == 200) {
            this.user.companyName = this.name;
            this.$store.commit("show_user", this.user);
            this.is = false;
            this.name = "";
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    rut: function (name, name1) {
      if (this.$route.path == name) return;
      if (!this.user && name != "/cart")
        return this.$router.push("/guide/login");
      this.$router.push(name);
    },
  },
};
</script>

<style lang='less' scoped>
b {
  font-weight: 400;
}
.userinfo {
  // flex: 4;
  > div {
    margin-top: 1rem;
    border: 1px solid #ececec;
  }
  .contentbox {
    border: 1px solid #ebebeb;
    min-height: 15.7rem;
    padding: 0.65rem;
    > div {
      display: flex;
      margin-top: 1rem;
      align-items: center;
      > span:nth-child(1) {
        margin-right: 0.5rem;
        font-size: 0.75rem;
        font-family: SimSun;
        font-weight: 400;
        color: #000000;
      }
      > p:nth-child(3) {
        margin-left: 2.5rem;
        font-size: 0.77rem;
        font-family: SimSun;
        font-weight: 400;
        color: #999;
      }
      .imgbox {
        > img {
          cursor: pointer;
          border: 1px solid #999;
          margin-right: 1.75rem;
        }
        > img:hover {
          border: 1px solid #ff9000;
        }
      }
    }
    > button {
      margin-top: 1rem;
      margin-left: 20rem;
      width: 12.81rem;
      border-radius: 0;
    }
  }
}
</style>