
<!-- 购物车 -->
<template>
  <div class="cart">
    <div class="nav">
      <shortcut />
    </div>
    <div class="content">
      <div>
        <h5>首页 > 购物车</h5>
      </div>
      <div class="listbox">
        <span>
          <div>
            <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
          </div>
          <div class="namebox">商品信息</div>
          <div>单价</div>
          <div>数量</div>
          <div>金额</div>
          <div>操作</div>
        </span>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <span v-for="(item,index) in arr" :key="index">
            <div>
              <Checkbox :label="index" />
            </div>
            <div class="namebox">
              <img src="../../assets/img/home/a.png" alt />
              <p>这里是商品名称这里是商品名称这里是商品名称</p>
            </div>
            <div>颜色分类: 白色</div>
            <div>￥ 30.00</div>
            <div>
              <stepper :stepperObj="{num:item,index:index}" @getstepperObj="getstepperObj" />
            </div>
            <div>
              <span>删除</span>
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
              <p @click="getimgbox">
                已选中
                <b>{{ checkAllGroup.length }}</b> 件商品
                <Icon type="ios-arrow-down" v-if="!is_imgbox" />
                <Icon type="ios-arrow-up" v-else />
              </p>
              <div>
                ￥
                <p>1688.00</p>
              </div>
            </div>
          </div>
          <div>
            <Button type="warning" @click="$router.push('/payment')">去结算</Button>
          </div>
        </div>
        <div class="imgbox" v-show="is_imgbox">
          <div v-for="(item,index) in checkAllGroup" :key="index">
            <img src="../../assets/img/home/a.png" alt />
            <p>取消选择</p>
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
      arr: [1, 2, 3, 4, 5, 6],
      value1: 0,
      is_imgbox: false,
    };
  },
  methods: {
    getstepperObj: function (obj) {
      this.arr[obj.index] = obj.num;
      this.$forceUpdate();
    },
    getimgbox: function () {
      this.is_imgbox = !this.is_imgbox;
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = [0, 1, 2, 3, 4, 5];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 6) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.content {
  padding-top: 5rem;
  h5 {
    font-weight: 400;
    font-size: 0.9rem;
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
      height: 8rem;
      display: flex;
      top: -8rem;
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

