
<!-- 购物车 -->
<template>
  <div class="cart">
    <shortcut />
    <div class="content">
      <div>
        <h5>我的购物车</h5>
      </div>
      <div class="listbox">
        <span>
          <div>
            <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
          </div>
          <div class="namebox">商品信息</div>
          <div>单价</div>
          <div>金额</div>
          <div>数量</div>
          <div>操作</div>
        </span>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <span v-for="(item,index) in shoppings" :key="index">
            <div>
              <Checkbox :label="index" />
            </div>
            <div class="namebox">
              <img :src="item.picUrl" />
              <p>{{ item.plistName }}</p>
            </div>
            <div>颜色分类: {{ item.priceName[1] ? item.priceName[1]: "暂无" }}</div>
            <div>￥ {{ item.orderPrice }}</div>
            <div>
              <stepper :stepperObj="{num:item.buyNum,index:index}" @getstepperObj="getstepperObj" />
            </div>
            <div>
              <span @click="delShopping(item,index)">删除</span>
            </div>
          </span>
        </CheckboxGroup>
      </div>
      <div class="operationbox">
        <div>
          <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
        </div>
        <div class="btnbox">
          <div>
            <P>总价:</P>
            <div>
              <p @click="is_imgbox = !is_imgbox">
                已选中
                <b>{{ checkAllGroup.length }}</b> 件商品
                <Icon type="ios-arrow-down" v-if="!is_imgbox" />
                <Icon type="ios-arrow-up" v-else />
              </p>
              <div>
                ￥
                <p>{{ totalPrice.toFixed(2) }}</p>
              </div>
            </div>
          </div>
          <div>
            <Button type="warning" @click="downOrder">去结算</Button>
          </div>
        </div>
        <div class="imgbox" v-show="is_imgbox">
          <div v-for="(item,index) in checkAllGroup" :key="index">
            <img :src="shoppings[item].picUrl" />
            <p @click="delPitch(index)">取消选择</p>
          </div>
          <span></span>
        </div>
      </div>
    </div>
    <div class="bottombox">
      <statement />
    </div>
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import statement from "@/components/Statement.vue";
import stepper from "@/components/Stepper.vue";
export default {
  components: {
    shortcut,
    statement,
    stepper,
  },
  data() {
    return {
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      value1: 0,
      is_imgbox: false,
      shoppings: [], // 购物车商品
      totalPrice: 0, // 总价
    };
  },
  mounted() {
    this.getShoppingCart();
  },
  methods: {
    // 获取购物车商品
    getShoppingCart: function () {
      this.axios
        .post(this.$api.getShoppingCart)
        .then((data) => {
          if (data.code == 200) {
            this.shoppings = [];
            for (let i = 0; i < data.data.length; i++) {
              let item = data.data[i];
              for (let j = 0; j < item.unit.length; j++) {
                let itemj = item.unit[j];
                let obj = new Object();
                obj.picUrl = item.picUrl;
                obj.plistId = item.plistId;
                obj.plistName = item.plistName;
                obj.buyNum = itemj.buyNum;
                obj.cateId = itemj.cateId;
                obj.orderPrice = itemj.orderPrice;
                obj.plistId = itemj.plistId;
                obj.priceId = itemj.priceId;
                obj.priceName = itemj.priceName.split("  ");
                this.shoppings.push(obj);
              }
            }
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => this.$toast(this.$api.monmsg));
    },
    // 修改购物车商品数量
    shoppingCarCount: function (item) {
      this.axios
        .post(this.$api.editShoppingCarCount, {
          plistId: item.plistId,
          priceId: item.priceId,
          cateId: item.cateId,
          buyNum: item.buyNum,
        })
        .then((data) => {
          if (data.code == 200) {
            this.gettotalPrice();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => this.$toast(this.$api.monmsg));
    },
    // 删除商品
    delShopping: function (item, index_) {
      // 处理数据
      let arr = [];
      let obj = {};
      obj.unit = [];
      obj.plistId = item.plistId;
      let obj_ = {};
      obj_.cateId = item.cateId;
      obj_.priceId = item.priceId;
      obj.unit.push(obj_);
      arr.push(obj);
      this.$layer.confirm(
        "你确定要删除吗?",
        {
          btn: ["确定", "取消"], //按钮
        },
        (index) => {
          this.axios
            .post(this.$api.delSelectShoppingCart, {
              plistIds: JSON.stringify(arr),
            })
            .then((data) => {
              if (data.code == 200) {
                this.checkAllGroup = this.checkAllGroup.filter(
                  (x, index, self) => x != index_
                );
                this.getShoppingCart();
              } else {
                this.$toast(this.ErrCode(data.msg));
              }
            })
            .catch(() => {
              this.$toast(this.$api.monmsg);
            });
          this.$layer.close(index);
        },
        (index) => this.$layer.close(index)
      );
    },
    // 下单
    downOrder: function () {
      if (this.checkAllGroup.length == 0) {
        return this.$toast("没有需要结算的商品");
      } else if (this.totalPrice < 50) {
        return this.$toast("总价 < 50元,无法结算");
      }
      this.axios
        .post(this.$api.downOrder, {
          plistIds: JSON.stringify(this.getdownOrderArr()),
        })
        .then((data) => {
          if (data.code == 200) {
            this.$store.commit("show_order", data.data);
            this.$router.push("/payment");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => this.$toast(this.$api.monmsg));
    },
    // 处理 数据
    getdownOrderArr: function () {
      let arr = [];
      for (let i = 0; i < this.checkAllGroup.length; i++) {
        let index = this.checkAllGroup[i];
        let item = this.shoppings[index];
        let obj = {};
        obj.plistId = item.plistId;
        obj.unit = [];
        let obj_ = {};
        obj_.cateId = item.cateId;
        obj_.priceId = item.priceId;
        for (let j = 0; j < arr.length; j++) {
          let itemj = arr[j];
          if (itemj.plistId == item.plistId) {
            itemj.unit.push(obj_);
            break;
          } else {
            obj.unit.push(obj_);
            arr.push(obj);
            break;
          }
        }
        if (arr.length == 0) {
          obj.unit.push(obj_);
          arr.push(obj);
        }
      }
      return arr;
    },
    // 获取总价
    gettotalPrice: function () {
      this.totalPrice = 0;
      for (let i = 0; i < this.checkAllGroup.length; i++) {
        let index = this.checkAllGroup[i];
        let item = this.shoppings[index];
        let num = item.orderPrice * item.buyNum;
        this.totalPrice += num;
      }
    },
    // 数量改变
    getstepperObj: function (obj) {
      this.shoppings[obj.index].buyNum = obj.num;
      this.shoppingCarCount(this.shoppings[obj.index]);
      this.$forceUpdate();
    },
    // 取消选中
    delPitch: function (index) {
      this.checkAllGroup.splice(index, "1");
      if (this.checkAllGroup.length == 0) {
        this.indeterminate = false;
      } else {
        this.indeterminate = true;
      }
      this.checkAll = false;
    },
    // 全选
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      //  全选  储存所有索引
      if (this.checkAll) {
        this.checkAllGroup = [];
        for (let i = 0; i < this.shoppings.length; i++) {
          this.checkAllGroup.push(i);
        }
      } else {
        this.checkAllGroup = [];
      }
      this.gettotalPrice();
    },
    // 单选
    checkAllGroupChange(data) {
      if (data.length === this.shoppings.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
      this.gettotalPrice();
    },
  },
};
</script>

<style lang='less' scoped>
.content {
  padding-top: 5rem;
  h5 {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 0.3rem;
  }
  .listbox {
    font-size: 0.8rem;
    span {
      display: flex;
      > div {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      > div:nth-child(1) {
        flex: 1;
      }
      .namebox {
        flex: 3;
        display: flex;
        align-items: stretch;
        > img {
          width: 6rem;
          height: 6rem;
        }
        > p {
          width: 10rem;
          padding-left: 0.5rem;
          margin-top: 0.5rem;
        }
      }
    }
    > span:nth-child(1) {
      padding: 0.5rem 0;
      border: 1px solid #e6e6e6;
      background-color: #f5f5f5;
    }
    > div > span {
      font-size: 0.8rem;
      padding: 1rem 0;
      border-bottom: 1px dashed #f2f2f2;
      > div:nth-child(3) {
        color: #999;
      }
      > div:nth-child(6) > span {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        color: #ff8400;
      }
    }
    > div > span:last-child {
      border-bottom: none;
    }
  }
  .operationbox {
    display: flex;
    padding: 1rem 2rem;
    position: relative;
    justify-content: space-between;
    .btnbox {
      display: flex;
      > div:nth-child(1) {
        display: flex;
        align-items: flex-end;
        > p:nth-child(1) {
          margin-bottom: 0.3rem;
          margin-right: 0.5rem;
        }
        > div:nth-child(2) {
          // 已选中
          > p:nth-child(1) {
            color: #999;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            > b {
              font-weight: 400;
              color: #ff8400;
            }
          }
          > div:nth-child(2) {
            display: flex;
            align-items: baseline;
            color: #ff8400;
            > P {
              font-size: 1.6rem;
            }
          }
        }
      }
      //   去结算
      > div:nth-child(2) {
        display: flex;
        margin-left: 2rem;
        align-items: center;
        > button {
          padding: 0 2rem;
        }
      }
    }
    //
    .imgbox {
      position: absolute;
      width: 100%;
      // height: 8rem;
      display: flex;
      flex-wrap: wrap;
      // top: -8rem;
      bottom: 5.5rem;
      padding: 1rem;
      background: #fff;
      border: 1px solid #ff8400;
      > div {
        position: relative;
        margin-right: 1rem;
        height: 6rem;
        > img {
          width: 6rem;
          height: 6rem;
        }

        > p {
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          align-items: center;
          justify-content: center;
          opacity: 0;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.1);
        }
        > p:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
      > div:last-child {
        margin-right: 0;
      }
      // > span {
      //   display: inline-block;
      //   position: absolute;
      //   right: 16.5rem;
      //   bottom: -1rem;
      //   width: 0;
      //   height: 0;
      //   border-left: 0.5rem solid transparent;
      //   border-right: 0.5rem solid transparent;
      //   border-top: 1rem solid #ff8400;
      // }
    }
    .imgbox:before {
      box-sizing: content-box;
      width: 0px;
      height: 0px;
      position: absolute;
      bottom: -16px;
      right: 16.55rem;
      padding: 0;
      border-top: 8px solid #ffffff;
      border-bottom: 8px solid transparent;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      display: block;
      content: "";
      z-index: 12;
    }
    .imgbox:after {
      box-sizing: content-box;
      width: 0px;
      height: 0px;
      position: absolute;
      bottom: -18px;
      right: 16.5rem;
      padding: 0;
      border-top: 9px solid #ff8400;
      border-bottom: 9px solid transparent;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      display: block;
      content: "";
      z-index: 10;
    }
  }
}
</style>

<style lang="less">
.cart {
  .ivu-checkbox + span,
  .ivu-checkbox-wrapper + span {
    display: none;
  }
}
</style>

