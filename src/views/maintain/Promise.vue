<!-- 客户信息 -->
<template>
  <div class="promise">
    <h4>申请上门维修 > 客户信息</h4>
    <div class="content">
      <div class="tiembox">
        <tab name="请选择期望上门时间" />
        <ul>
          <li :class="dayid == index? 'active' : ''" v-for="(item,index) in days" :key="index" @click="dayClick(index)">
            <p>{{ item.day }}</p>
            <p>
              <b v-if="index == 0">今天/</b>
              <b v-else-if="index == 1">明天/</b>
              <b v-else-if="index == 2">后天/</b>
              {{ item.week }}
            </p>
          </li>
        </ul>
        <ul>
          <li
            v-for="(item,index) in hours"
            :key="index"
            :style="item.is? 'cursor: no-drop;background-color: #ccc;color: #fff': ''"
            :class="hourid == index? 'active' : ''"
            @click="hourClick(item.is,index)"
          >{{ item.hour }}</li>
        </ul>
      </div>
      <div class="sitebox">
        <tab name="上门地址" />
        <RadioGroup v-model="phone" class="radiobox">
          <div v-for="(item,index) in address" :key="index" :class="phone == index? 'radio_active':''">
            <div style="opacity: 0;">
              <img src="../../assets/img/sundry/dw.png" />
              <p>寄送到</p>
            </div>
            <Radio :label="index">
              <div>
                <p>{{ item.address + item.address_detail | site }}</p>
                <span v-show="phone == index" @click="rut(item)">修改本地址</span>
              </div>
            </Radio>
          </div>
        </RadioGroup>
        <Button @click="$router.push('/person/deliveryAddress?is=true')">新增地址</Button>
      </div>
      <button class="nextStep" @click="advance">确定下单</button>
    </div>
  </div>
</template>

<script>
import tab from "@/components/Tab.vue";
export default {
  components: {
    tab,
  },
  data() {
    return {
      phone: 0,
      days: [],
      dayid: 0,
      hours: [],
      hourid: 0,
      doorTime: 0, //上门时间
      address: [], // 收货地址列表
    };
  },
  mounted() {
    this.$store.commit("show_maintainid", 2);
    this.getday();
    this.gethour();
    this.getAllAddress();
  },
  methods: {
    advance: function () {
      if (this.doorTime == 0) {
        return this.$toast("上门时间未选择!");
      } else if (this.address.length == 0) {
        return this.$toast("收货地址未选择!");
      } else if (Object.keys(this.$store.state.maintain).length == 0) {
        return this.$toast("订单其他数据有异常请重新输入!");
      } else {
        this.$store.commit("show_maintain", {
          doorTime: this.doorTime,
          addressId: this.address[this.phone].id,
        });
        this.submitFixOrder();
      }
      // this.$router.push("/maintain/maintainOrders");
    },
    // 下单
    submitFixOrder: function () {
      this.axios
        .post(this.$api.submitFixOrder, this.$store.state.maintain)
        .then((data) => {
          if (data.code == 200) {
            this.$toast("维修下单成功!");
            this.$router.push("maintain/maintainList");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
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
    // 选这星期
    dayClick: function (index) {
      this.dayid = index;
      let hour = new Date().getHours(); //得到小时
      for (let i = 0; i < this.hours.length; i++) {
        let item = this.hours[i];
        if (index == 0) {
          if (item.hr < hour) {
            item.is = true;
          } else {
            this.hourClick(item.is, i);
            break;
          }
        } else {
          item.is = false;
        }
      }
      if (index != 0) this.hourClick(false, 0);
    },
    // 选择小时
    hourClick: function (is, index) {
      if (!is) {
        this.hourid = index;
        let arr = this.hours[index].hour.split(":");
        let fen = parseInt(arr[1]) * 60 * 1000;
        let shi = parseInt(arr[0]) * 60 * 60 * 1000;
        // 上门时间
        this.doorTime = this.days[this.dayid].timestamp + shi + fen;
      }
    },
    // 修改收货地址
    rut: function (item) {
      this.$router.push({
        path: "/person/deliveryAddress",
        query: item,
      });
    },
    // 获取天数
    getday: function () {
      let now = new Date(new Date().toLocaleDateString()).getTime();
      let arr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      for (let i = 0; i < 7; i++) {
        let newdate = new Date(now + i * 1000 * 60 * 60 * 24);
        let day = newdate.getDay(); //得到周几
        let month = newdate.getMonth(); //得到月份
        let date = newdate.getDate(); //得到日期
        let riqi = `${month + 1}月${date}日`;
        let obj = {};
        obj.day = riqi;
        obj.week = arr[day];
        obj.timestamp = newdate.getTime();
        this.days.push(obj);
      }
    },
    // 获取小时数
    gethour: function () {
      this.hours = [];
      let minutes = ["00", "30"];
      for (let i = 8; i < 19; i++) {
        for (let j = 0; j < 2; j++) {
          let hour = (i + "").length != 2 ? "0" + i : i;
          let obj = new Object();
          obj.hour = `${hour}:${minutes[j]}`;
          obj.is = false;
          obj.hr = i;
          this.hours.push(obj);
        }
      }
      this.dayClick(0);
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
.promise {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    .tiembox {
      width: 100%;
      padding-top: 1.5rem;
      > ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 2rem;
        padding-top: 2rem;
        > li {
          cursor: pointer;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          padding: 1rem 0.5rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid #fff;
          background-color: #f3f4f7;
          b {
            font-weight: 400;
          }
        }
        > .active {
          color: #ff8400;
          border: 1px solid #ff8400;
        }
        > .forbid {
          cursor: no-drop;
          background-color: red;
          color: #fff;
        }
      }
      > ul:nth-child(3) {
        width: 40rem;
        padding-bottom: 2rem;
      }
    }
    .sitebox {
      width: 100%;
      .radiobox {
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          overflow: hidden;
          margin: 0.5rem 0;
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
              width: 100%;
              display: flex;
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
        margin-left: 6.5rem;
      }
    }
    .nextStep {
      margin-top: 5rem;
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