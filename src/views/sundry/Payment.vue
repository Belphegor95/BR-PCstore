<!-- 结算 -->
<template>
  <div class="payment">
    <shortcut />
    <div class="content">
      <div class="happyname">
        <div>
          <h1 @click="gohome">开心兔</h1>
          <span>核实订单信息</span>
        </div>
        <div class="stepsbox1">
          <div
            v-for="(item, index) in [
              '我的购物车',
              '填写核对订单信息',
              '成功提交订单',
            ]"
            :key="index"
            :class="
              index - 1 < pitchon
                ? 'active'
                : index - 1 == pitchon
                ? 'active_'
                : ''
            "
          >
            <div>
              <span
                ><span>{{ index + 1 }}</span></span
              >
            </div>
            <p>{{ index + 1 }}.{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="activeOne" v-if="pitchon == 0">
        <div>
          <div>
            <span>确认收货地址</span>
            <span @click="$router.push('/person/deliveryAddress?is=true')"
              >新增收货地址</span
            >
            <!-- <Button @click="$router.push('/person/deliveryAddress?is=true')"
              >新增地址</Button
            > -->
          </div>
          <!-- <span @click="$router.push('/person/deliveryAddress?is=true')"
            >管理收货地址</span
          > -->
          <RadioGroup v-model="addressindex" class="radiobox">
            <div
              v-for="(item, index) in address"
              :key="index"
              :class="addressindex == index ? 'radio_active' : ''"
            >
              <div style="opacity: 0">
                <img src="../../assets/img/sundry/dw.png" />
              </div>
              <Radio :label="index">
                <div>
                  <p>{{ (item.address + item.address_detail) | site }}</p>
                  <span v-show="addressindex == index" @click="rut(item)"
                    >编辑</span
                  >
                </div>
              </Radio>
            </div>
          </RadioGroup>
        </div>
        <div>
          <p>确认订单信息</p>
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
              <div>￥{{ item.price }}</div>
              <div>{{ item.buyNum }}</div>
              <div>￥{{ (item.price * item.buyNum).toFixed(2) }}</div>
            </div>
          </div>
          <div class="propertybox">
            <div>
              <div>
                <span>给卖家留言:</span>
                <Input
                  v-model="notes"
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                />
              </div>
              <div>
                <span>发票:</span>
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
                <div class="psbox">
                  <p>免费配送</p>
                  <p>0.00</p>
                </div>
              </div>
              <div>
                <span>优惠券:</span>
                <div class="totalbox">
                  <Select v-model="ticketid" style="width: 150px">
                    <Option
                      v-for="item in ticketList"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.name }}</Option
                    >
                  </Select>
                  <p>
                    -￥<span
                      v-for="item in ticketList"
                      :key="item.id"
                      v-show="item.id == ticketid"
                      >{{ item.money || 0 }}</span
                    >
                  </p>
                </div>
              </div>
              <div>
                <span>合计:</span>
                <div class="totalbox">
                  <span></span>
                  <p>￥{{ isticketNum(orderdata.totalMoney) }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div style="text-align: right; padding: 0.5rem 1rem">满50包邮</div> -->
        </div>
        <div class="bttombox">
          <div v-if="address.length > 0">
            <p>
              <span>实付款:</span>
              {{ isticketNum(orderdata.totalMoney) }}
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
          <Button class="forbidbtn" disabled v-show="orderdata.totalMoney < 50"
            >未满50元</Button
          >
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
      ticketid: -1,
      ticketList: [
        {
          id: -1,
          name: "不使用优惠券",
          money: 0,
        },
      ],
    };
  },
  mounted() {
    this.orderOk = this.$route.query;
    this.pitchon = this.orderOk.pitchon ? this.orderOk.pitchon : 0;
    this.getAllAddress();
    this.getTicket();
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
    // 获取优惠券
    getTicket: function () {
      this.axios
        .post(this.$api.getTicket)
        .then((data) => {
          if (data.code == 200) {
            this.ticketList = [
              {
                id: -1,
                name: "不使用优惠券",
              },
            ];
            for (let i = 0; i < data.data.length; i++) {
              let item = data.data[i];
              item.name = item.money + "元现金券";
              if (item.type == 0) this.ticketList.push(item);
            }
          } else {
            this.$toast(this.ErrCode(data.msg));
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
          ticketId: this.ticketid ? this.ticketid : -1,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$toast("下单成功,即将跳转到支付页面!");
            this.orderOk = data.data;
            setTimeout(() => {
              this.btnload = false;
              this.pitchon = 1;
              this.$router.push({
                path: "/payment",
                query: {
                  pitchon: 1,
                  money: data.data.money,
                  qrCode: data.data.qrCode,
                  tradeNo: data.data.tradeNo,
                  orderType: data.data.orderType,
                },
              });
            }, 3000);
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
    // 计算优惠之后的价格
    isticketNum: function (val) {
      if (!this.ticketid || this.ticketid == -1) return val.toFixed(2);
      for (let i = 0; i < this.ticketList.length; i++) {
        let item = this.ticketList[i];
        if (item.id == this.ticketid) {
          return (Number(val) - item.money).toFixed(2);
        }
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
  .content {
    > div {
      background: #fff;
    }
    .happyname {
      display: flex;
      // height: 7rem;
      font-weight: 700;
      color: #ff8400;
      align-items: center;
      justify-content: space-between;
      > div:nth-child(1) {
        display: flex;
        padding: 2rem 0;
        align-items: flex-end;
        > h1 {
          font-size: 3.8rem;
          cursor: pointer;
          text-indent: 1rem;
        }
        > span {
          color: #000;
          font-size: 1.25rem;
          font-family: Microsoft YaHei;
          font-weight: 400;
          margin-left: 2.3rem;
          margin-bottom: 1rem;
        }
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
      .stepsbox1 {
        display: flex;
        color: #c4c4c4;
        margin-right: 2rem;
        > div {
          display: flex;
          flex-direction: column;
          margin-right: -1rem;
          > div {
            width: 12rem;
            height: 0.38rem;
            > span:nth-child(1) {
              width: 100%;
              height: 0.38rem;
              background: #c4c4c4;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 1rem;
              > span {
                // height: 2rem;
                width: 1.26rem;
                height: 1.26rem;
                line-height: 1.26rem;
                background: #c4c4c4;
                text-align: center;
                color: #fff;
                border-radius: 50%;
              }
            }
          }
          > p {
            margin-top: 0.88rem;
            text-align: center;
            font-size: 0.75rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
          }
        }
        // 第一个倒圆角
        > div:nth-child(1) > div > span:nth-child(1) {
          border-radius: 1rem 0 0 1rem;
        }
        // 最后一个特殊处理
        > div:last-child > div {
          width: 10rem;
          height: 0.38rem;
          > span:nth-child(1) {
            width: 50%;
            height: 0.38rem;
            background: #c4c4c4;
            display: flex;
            // align-items: center;
            justify-content: flex-end;
            > span {
              // height: 2rem;
              width: 1.26rem;
              height: 1.26rem;
              line-height: 1.26rem;
              background: #c4c4c4;
              text-align: center;
              color: #fff;
              border-radius: 50%;
            }
          }
        }
        .active {
          color: #ffc273;
          > div {
            > span {
              background-color: #ffc273 !important;
              > span {
                background-color: #ffc273 !important;
              }
            }
          }
        }
        .active_ {
          color: #ff9000;
          z-index: 1s;
          > div {
            > span {
              background-color: #ff9000 !important;
              > span {
                background-color: #ff9000 !important;
              }
            }
          }
        }
      }
    }
    // 拍下商品
    .activeOne {
      > div:nth-child(1) {
        border: 1px solid #c4c4c4;
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        color: #000;
        padding: 1rem 1rem 0.5rem 1rem;
        > div:nth-child(1) {
          display: flex;
          height: 1.5rem;
          margin-bottom: 0.88rem;
          justify-content: space-between;
          border-bottom: 1px solid #c4c4c4;
          > span:nth-child(1) {
            font-size: 0.75rem;
            font-family: Microsoft YaHei;
            font-weight: bold;
          }
          > span:nth-child(2) {
            // color: #ff8400;
            font-size: 0.75rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            cursor: pointer;
          }
        }
        .radiobox {
          display: flex;
          flex-direction: column;
          > div {
            display: flex;
            overflow: hidden;
            padding: 0.2rem 0;
            margin: 0.2rem 0;
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
      }
      > div:nth-child(2) {
        margin-top: 1.8rem;
        padding: 0.8rem;
        background: #fbfbfb;
        border: 1px solid #c4c4c4;
        > p:nth-child(1) {
          height: 1.5rem;
          font-size: 0.75rem;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #000000;
          margin-bottom: 0.88rem;
          border-bottom: 1px solid #c4c4c4;
        }
        .listbox {
          border-bottom: 1px solid #c4c4c4;
          > div {
            display: flex;
            > div {
              flex: 1;
              display: flex;
              padding: 1rem 0;
              justify-content: center;

              > img {
                width: 5rem;
                height: 5rem;
                margin-left: 2rem;
              }
              > p {
                margin-left: 0.5rem;
              }
            }
            > div:nth-child(1) > p {
              width: 100%;
            }
            > div:nth-child(2) {
              color: #999;
            }
            > div:nth-child(5) {
              color: #ff8400;
            }
          }
          > div:nth-child(1) {
            background: #ffeed8;
            > div {
              padding: 0.4rem 0;
            }
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
      // border-bottom: 1px solid #e5e5e5;
      > div:nth-child(1) {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        > div {
          width: 90%;
          display: flex;
          margin-bottom: 1rem;
          > span {
            width: 5rem;
            margin-top: 0.3rem;
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
          > span {
            width: 6rem;
            flex-shrink: 0;
            // text-align: right;
          }
          .psbox {
            display: flex;
            width: 100%;
            padding: 0 1rem;
            justify-content: space-between;
            > div {
              display: flex;
              > p {
                margin-left: 1rem;
                color: #999;
              }
            }
            > p:nth-child(2) {
              color: #ff8400;
            }
          }

          .totalbox {
            width: 100%;
            display: flex;
            padding: 0 1rem;
            justify-content: space-between;
            > p {
              color: #ff8400;
              font-size: 1.1rem;
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
      padding: 1.94rem 0;
      align-items: flex-end;
      flex-direction: column;
      > div {
        width: 30rem;
        display: flex;
        padding: 0.5rem 1rem;
        flex-direction: column;
        border: 0.25rem solid #ffdeb2;
        > p,
        > span {
          text-align: right;
        }
        > p {
          color: #e20000;
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
        border: 1px solid #f68b00;
        background: #f68b00;
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