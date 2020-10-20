<!-- 结算 -->
<template>
  <div class="payment">
    <shortcut />
    <div class="content">
      <div class="happyname">
        <h1 @click="gohome">开心兔商城</h1>
        <div class="stepsbox">
          <div :class="pitchon >= 0 ? 'active' : ''">
            <span>
              <b>1</b>
            </span>
            <p>拍下商品</p>
          </div>
          <div :class="pitchon >= 2 ? 'active_' : ''"></div>
          <div :class="pitchon >= 2 ? 'active' : ''">
            <span>
              <b>2</b>
            </span>
            <p>付款</p>
          </div>
          <div :class="pitchon >= 3 ? 'active_' : ''"></div>
          <div :class="pitchon >= 3 ? 'active' : ''">
            <span>
              <b>3</b>
            </span>
            <p>确认收货</p>
          </div>
        </div>
      </div>
      <div class="activeOne" v-if="pitchon == 0">
        <div>
          <span>确认收货地址</span>
          <span @click="$router.push('/person/deliveryAddress?is=true')"
            >管理收货地址</span
          >
        </div>
        <div>
          <RadioGroup v-model="addressindex" class="radiobox">
            <div
              v-for="(item, index) in address"
              :key="index"
              :class="addressindex == index ? 'radio_active' : ''"
            >
              <div style="opacity: 0">
                <img src="../../assets/img/sundry/dw.png" />
                <p>寄送到</p>
              </div>
              <Radio :label="index">
                <div>
                  <p>{{ (item.address + item.address_detail) | site }}</p>
                  <span v-show="addressindex == index" @click="rut(item)"
                    >修改本地址</span
                  >
                </div>
              </Radio>
            </div>
          </RadioGroup>
          <Button @click="$router.push('/person/deliveryAddress?is=true')"
            >新增地址</Button
          >
          <p>购物车</p>
          <div class="listbox">
            <div>
              <div>店铺宝贝</div>
              <div>商品属性</div>
              <div>单价</div>
              <div>数量</div>
              <div>金额</div>
            </div>
            <div v-for="(item, index) in orderdata.plistDetail" :key="index">
              <div>
                <img :src="item.picUrl" />
                <p>{{ item.plistName }}</p>
              </div>
              <div>
                <span>颜色:</span>
                <p>{{ item.cateName ? item.cateName : "暂无" }}</p>
              </div>
              <div>{{ item.price }}</div>
              <div>{{ item.buyNum }}</div>
              <div>{{ (item.price * item.buyNum).toFixed(2) }}</div>
            </div>
          </div>
          <div class="propertybox">
            <div>
              <div>
                <span>给卖家留言</span>
                <Input
                  v-model="notes"
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                />
              </div>
              <div>
                <span>发票</span>
                <Select v-model="billState" style="width: 100px">
                  <Option
                    v-for="item in cityList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
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
                  <div>
                    <div class="juanbox">
                      <span>卷</span>
                      <span>50</span>
                    </div>
                    <p>(暂不可用)</p>
                  </div>
                  <p style="color: #000; cursor: pointer">
                    <Icon type="ios-arrow-forward" />
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <span>合计:</span>
                  {{ orderdata.totalMoney }}
                </p>
              </div>
            </div>
          </div>
          <div style="text-align: right; padding: 0.5rem 1rem">满50包邮</div>
          <div class="bttombox">
            <div v-if="address.length > 0">
              <p>
                <span>实付款:</span>
                {{ orderdata.totalMoney }}
              </p>
              <div>
                <span>寄送至:</span>
                <p>
                  {{
                    (address[addressindex].address +
                      address[addressindex].address_detail)
                      | site
                  }}
                </p>
              </div>
              <span
                >收货人: {{ address[addressindex].linkman }}
                {{ address[addressindex].phone }}</span
              >
            </div>
            <Button
              class="addbtn"
              :loading="btnload"
              @click="onSubmit"
              v-show="orderdata.totalMoney >= 50"
              >提交订单</Button
            >
            <Button
              class="forbidbtn"
              disabled
              v-show="orderdata.totalMoney < 50"
              >未满50元</Button
            >
          </div>
        </div>
      </div>
      <pay :orderOk="orderOk" @onPay="onPay" v-else />
    </div>
    <div class="bottombox">
      <statement />
    </div>
    <!-- <div class="msgbox">满50包邮</div> -->
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import statement from "@/components/Statement.vue";
import pay from "@/components/Pay.vue";
export default {
  components: {
    shortcut,
    statement,
    pay,
  },
  data() {
    return {
      pitchon: 0,
      addressindex: 0,
      notes: "",
      cityList: [
        {
          value: 0,
          label: "不要发票",
        },
        {
          value: 1,
          label: "电子发票",
        },
      ],
      billState: 0,
      orderdata: this.$store.state.order,
      orderOk: {},
      btnload: false,
      address: [],
    };
  },
  mounted() {
    this.orderOk = this.$route.query;
    this.pitchon = this.orderOk.pitchon ? this.orderOk.pitchon : 0;
    this.getAllAddress();
  },
  watch: {
    "$route.query"(val) {
      this.orderOk = val;
      this.pitchon = this.orderOk.pitchon ? this.orderOk.pitchon : 0;
    },
  },
  methods: {
    // 获取用户所有地址
    getAllAddress: function () {
      this.axios
        .post(this.$api.getAllAddress)
        .then((data) => {
          if (data.code == 200) {
            this.address = data.data;
            for (let i = 0; i < this.address.length; i++) {
              let item = this.address[i];
              // 默认地址展示
              if (item.address_default == 1) {
                // this.default_ = i;
                // 排序 把默认地址第一个
                let obj = item;
                this.address.splice(i, 1);
                this.address.unshift(obj);
                break;
              }
            }
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 回到首页
    gohome: function () {
      this.$router.push("/");
    },
    rut: function (item) {
      this.$router.push({
        path: "/person/deliveryAddress",
        query: item,
      });
    },
    // 提交订单
    onSubmit: function () {
      this.pitchon = 1;
      // 请求接口;
      if (this.address.length == 0) {
        this.$toast("请添加地址!");
        return;
      }
      this.btnload = true;
      this.axios
        .post(this.$api.submitOrder, {
          addressId: this.address[this.addressindex].id,
          plistIds: this.orderdata.plistIds,
          sendType: 0, //配送方式 0:免费配送,1:自提
          notes: this.notes,
          billState: this.billState,
        })
        .then((data) => {
          if (data.code == 200) {
            this.btnload = false;
            // this.pitchon = 1;
            this.orderOk = data.data;
            this.$router.push({
              path: "/payment",
              query: {
                pitchon: 1,
                money: data.data.money,
                qrCode: data.data.qrCode,
                tradeNo: data.data.tradeNo,
              },
            });
          } else {
            this.btnload = false;
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.btnload = false;
          this.$toast(this.$api.monmsg);
        });
    },
    // 获取支付二维码
    getWxPayQr: function (obj) {
      this.axios
        .post(this.$api.getWxPayQr, {
          tradeNo: obj.tradeNo,
        })
        .then((data) => {
          if (data.code == 200) {
            obj.qrCode = data.data.qrCode;
            this.$router.push({
              path: "/payment",
              query: obj,
            });
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 支付 操作
    onPay: function (obj) {
      if (obj.pitchon == 2) {
        this.getWxPayQr(obj);
      } else if (obj.pitchon == 3) {
        this.$router.push({
          path: "/payment",
          query: obj,
        });
      }
    },
  },
  filters: {
    site: function (value) {
      // 替换地址 /
      return value.replace(/\//g, "");
    },
  },
};
</script>

<style lang='less' scoped>
.payment {
  margin-top: 2rem;
  background-color: #f9f9f9;
  .content {
    > div {
      background: #fff;
    }
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
    // 拍下商品
    .activeOne {
      > div:nth-child(1) {
        display: flex;
        font-size: 0.9rem;
        color: #000;
        padding: 1rem 1rem 0.5rem 1rem;
        justify-content: space-between;
        border-bottom: 1px solid #f0f0f0;
        > span:nth-child(2) {
          color: #ff8400;
          cursor: pointer;
        }
      }
      > div:nth-child(2) {
        padding: 1rem 0;
        .radiobox {
          display: flex;
          flex-direction: column;
          > div {
            display: flex;
            overflow: hidden;
            padding: 0.2rem 0;
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
                align-items: center;
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
    }

    .propertybox {
      display: flex;
      border-bottom: 1px solid #e5e5e5;
      > div:nth-child(1) {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        border-right: 1px solid #e5e5e5;
        > div {
          width: 90%;
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
        > div:nth-child(1) {
          > div {
            width: auto;
            flex: auto;
          }
        }
      }
      > div:nth-child(2) {
        flex: 1;
        display: flex;
        flex-direction: column;
        > div {
          flex: 1;
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
            > div {
              display: flex;
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
              > p {
                margin-left: 1rem;
                color: #999;
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
        > p {
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
            width: 4rem;
          }
        }
      }
      > button {
        border-radius: 0;
        width: 12rem;
        height: 3rem;
        color: #fff;
      }
      > .addbtn {
        border: 1px solid #ff8400;
        background: #ff8400;
      }
      > .forbidbtn {
        border: 1px solid #dcdee2;
        background: #f7f7f7;
        color: #c5c8ce;
      }
    }
  }
  .msgbox {
    width: 5rem !important;
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 0.5rem;
    border: 1px solid #999;
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