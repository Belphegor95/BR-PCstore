<!-- 结算 -->
<template>
  <div class="payment">
    <div class="nav">
      <shortcut />
    </div>
    <div class="content">
      <div class="happyname">
        <h1 @click="gohome">开心兔商城</h1>
        <div class="stepsbox">
          <div :class="pitchon >= 0? 'active':''">
            <span>
              <b>1</b>
            </span>
            <p>拍下商品</p>
          </div>
          <div :class="pitchon >= 1? 'active_':''"></div>
          <div :class="pitchon >= 1? 'active':''">
            <span>
              <b>2</b>
            </span>
            <p>付款</p>
          </div>
          <div :class="pitchon >= 2? 'active_':''"></div>
          <div :class="pitchon >= 2? 'active':''">
            <span>
              <b>3</b>
            </span>
            <p>确认收货</p>
          </div>
        </div>
      </div>
      <div>
        <span>确认收货地址</span>
        <span>管理收货地址</span>
      </div>
      <div>
        <RadioGroup v-model="phone" class="radiobox">
          <div v-for="(item,index) in 4" :key="index" :class="phone == index? 'radio_active':''">
            <div style="opacity: 0;">
              <img src="../../assets/img/sundry/dw.png" alt />
              <p>寄送到</p>
            </div>
            <Radio :label="index">
              <div>
                <p>北京北京确定北京北京确定北京北京确定北京北京确定北京北京确定北京北京确定</p>
                <span v-show="phone == index">修改本地址</span>
              </div>
            </Radio>
          </div>
        </RadioGroup>
        <Button>新增地址</Button>
        <p>购物车</p>
        <div class="listbox">
          <div>
            <div>店铺宝贝</div>
            <div>商品属性</div>
            <div>单价</div>
            <div>数量</div>
            <div>金额</div>
          </div>
          <div v-for="(item,index) in 3" :key="index">
            <div>
              <img src="../../assets/img/sundry/zt.png" alt />
              <p>商品名称商品名称商品名称商品名称商品名称</p>
            </div>
            <div>
              <span>颜色:</span>
              <p>白色</p>
            </div>
            <div>30.00</div>
            <div>3</div>
            <div>30.00</div>
          </div>
        </div>
        <div class="propertybox">
          <div>
            <div>
              <span>给卖家留言</span>
              <Input v-model="value" maxlength="100" show-word-limit type="textarea" placeholder="Enter something..." style="width: 200px" />
            </div>
            <div>
              <span>发票</span>
              <Select v-model="model1" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div>
            <div>
              <span>配送方式:</span>
              <div>
                <p>免费配送</p>
                <p>0.00</p>
              </div>
            </div>
            <div>
              <span>优惠券:</span>
              <div>
                <div class="juanbox">
                  <span>卷</span>
                  <span>50</span>
                </div>
                <p>0.00</p>
              </div>
            </div>
            <div>
              <p>
                <span>合计:</span>
                137.00
              </p>
            </div>
          </div>
        </div>
        <div class="bttombox">
          <div>
            <p>
              <span>实付款:</span>
              137.83
            </p>
            <div>
              <span>寄送至:</span>
              <p>北京北京确定北京北京确定北京北京确定北京北京确定北京北京确定北京北京确定</p>
            </div>
            <span>收货人: 张三 18612346578</span>
          </div>
          <Button>提交订单</Button>
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
export default {
  components: {
    shortcut,
    statement,
  },
  data() {
    return {
      pitchon: 0,
      phone: 0,
      value: "",
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
        {
          value: "Ottawa",
          label: "Ottawa",
        },
        {
          value: "Paris",
          label: "Paris",
        },
        {
          value: "Canberra",
          label: "Canberra",
        },
      ],
      model1: "",
    };
  },
  methods: {
    gohome: function () {
      this.$router.push("/");
    },
  },
};
</script>

<style lang='less' scoped>
.payment {
  .content {
    .happyname {
      display: flex;
      height: 7rem;
      font-weight: 700;
      color: #ff8400;
      align-items: center;
      justify-content: space-between;
      > h1 {
        font-size: 2rem;
        cursor: pointer;
        text-indent: 1rem;
      }
      //   步骤条
      .stepsbox {
        display: flex;
        // align-items: center;
        justify-content: center;
        > div:nth-child(odd) {
          margin: 0 1rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          > span {
            display: block;
            text-align: center;
            color: #fff;
            width: 2.2rem;
            height: 2.2rem;
            line-height: 2.2rem;
            border-radius: 0.2rem;
            background-color: #bdbdbd;
            transform: rotate(45deg);
            > b {
              display: flex;
              font-size: 1.2rem;
              justify-content: center;
              transform: rotate(-45deg);
            }
          }
          > p {
            font-size: 1rem;
            margin-top: 1rem;
            color: #bdbdbd;
            font-weight: 400;
            // text-indent: -1rem;
          }
        }
        > div:nth-child(even) {
          margin-top: 0.9rem;
          width: 15rem;
          height: 0.3rem;
          background-color: #bdbdbd;
        }
        > div:nth-child(5) {
          margin-left: 1.5rem;
        }
        .active {
          > span {
            background-color: #ff8400 !important;
          }
          > p {
            color: #ff8400 !important;
          }
        }
        .active_ {
          background: #ff8400 !important;
        }
      }
    }
    > div:nth-child(2) {
      display: flex;
      font-size: 0.9rem;
      color: #000;
      padding: 1rem 1rem 0.5rem 1rem;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      > span:nth-child(2) {
        color: #ff8400;
      }
    }
    > div:nth-child(3) {
      padding: 1rem 0;
      .radiobox {
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          overflow: hidden;
          > div {
            display: flex;
            width: 6rem;
            align-items: center;
            justify-content: center;
            > img {
              margin-right: 0.2rem;
            }
          }
          > label {
            width: 100%;
            display: flex;
            align-items: center;
            white-space: unset;
            > div {
              display: flex;
              width: 100%;
              justify-content: space-between;
              > p {
                word-wrap: break-word;
              }
              > span {
                color: #ff8400;
              }
            }
          }
        }
        .radio_active {
          border: 1px solid #ff8400;
          background-color: #fff0e8;
          > div:nth-child(1) {
            opacity: 1 !important;
          }
          > label {
            > div {
              > p {
                font-size: 1.2rem;
                font-weight: 700;
                word-wrap: break-word;
              }
            }
          }
        }
      }
      > button {
        margin-top: 0.5rem;
        margin-left: 5.5rem;
      }
      .listbox {
        > div {
          display: flex;
          > div {
            flex: 1;
            display: flex;
            padding: 1rem 0;
            align-items: center;
            justify-content: center;
            border-bottom: 1px dashed #f1f1f1;
            > img {
              width: 5rem;
              height: 5rem;
              margin-left: 2rem;
            }
            > p {
              margin-left: 0.5rem;
            }
          }
          > div:nth-child(2) {
            color: #999;
          }
          > div:nth-child(5) {
            color: #ff8400;
          }
        }
        > div:nth-child(1) {
          border: 1px solid #e6e6e6;
          background-color: #f5f5f5;
          > div:nth-child(2),
          > div:nth-child(5) {
            color: #000;
          }
        }
      }
    }
    .propertybox {
      display: flex;
      border-bottom: 1px solid #e5e5e5;
      > div:nth-child(1) {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 2rem 0;
        border-right: 1px solid #e5e5e5;
        > div {
          width: 20rem;
          display: flex;
          margin-bottom: 1rem;
          > span {
            width: 5rem;
            margin-top: 0.3rem;
            text-align: right;
            margin-right: 1rem;
            display: inline-block;
          }
        }
      }
      > div:nth-child(2) {
        flex: 1;
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          padding: 1rem;
          color: #000;
          align-items: center;
          border-bottom: 1px solid #e5e5e5;
          > span {
            width: 7rem;
            text-align: right;
          }
          > div {
            display: flex;
            width: 100%;
            padding: 0 1rem;
            justify-content: space-between;
            .juanbox {
              display: flex;
              > span:nth-child(1) {
                color: #fff;
                padding: 0 0.3rem;
                border: 1px solid #ff8400;
                background-color: #ff8400;
              }
              > span:nth-child(2) {
                color: #ff8400;
                padding: 0 0.5rem;
                border: 1px solid #ff8400;
              }
            }
            > p:nth-child(2) {
              color: #ff8400;
            }
          }
          > p:nth-child(1) {
            width: 100%;
            padding: 0 1rem;
            text-align: right;
            color: #ff8400;
            font-size: 1.1rem;
            > span {
              color: #000;
            }
          }
        }
        > div:last-child {
          border: none;
        }
      }
    }
    .bttombox {
      display: flex;
      padding: 3rem 0;
      align-items: flex-end;
      flex-direction: column;
      > div {
        width: 30rem;
        display: flex;
        padding: 0.5rem 1rem;
        flex-direction: column;
        border: 1px solid #ff8400;
        > p,
        > span {
          text-align: right;
        }
        >p {
          color: #ff8400;
          font-size: 1.6rem;
          font-weight: 700;
          > span {
            color: #000;
            font-weight: 400;
            font-size: 1rem;
          }
        }
        > div {
          display: flex;
          margin: 0.5rem 0;
          > span {
            width: 5rem;
          }
        }
      }
      > button {
        border: 1px solid #ff8400;
        background: #ff8400;
        border-radius: 0;
        width: 12rem;
        height: 3rem;
        color: #fff;
      }
    }
  }
}
</style>

<style>
.ivu-radio-checked .ivu-radio-inner {
  border-color: #ff8400;
}
.ivu-radio-inner:after {
  background-color: #ff8400;
}
</style>