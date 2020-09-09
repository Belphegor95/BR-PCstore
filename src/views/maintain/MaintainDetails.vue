<!-- 申请服务详情 -->
<template>
  <div class="maintainDetails">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <div class="content">
      <div>
        <h4>维修详情</h4>
        <div class="serialbox">
          <p>编号:{{ detailsData.tradeNo }}</p>
          <p>{{ status[detailsData.state + 1] }}</p>
        </div>
        <div class="schedulebox">
          <div>当前进度</div>
          <ul>
            <li v-for="(item,index) in detailsData.fixProgress" :key="index">{{ item.time }} {{ item.content }}</li>
          </ul>
        </div>
        <div class="msgbox">
          <div>
            <tab name="待修商品信息" />
            <div class="msg">
              <div>
                <img :src="item.path" alt v-for="(item,index) in detailsData.attachPic" :key="index" />
              </div>
              <div>
                <div>
                  <span>
                    <b>*</b>
                    设备型号
                  </span>
                  <img style="max-width: 15rem;max-height: 10rem" :src="detailsData.unitType" alt />
                </div>
                <div>
                  <span>
                    <b>*</b>
                    商品名称
                  </span>
                  <Input v-model="fixs[detailsData.fixType]" style="width: 15rem" readonly />
                </div>
                <div>
                  <span>
                    <b>*</b>
                    商品类别
                  </span>
                  <Input v-model="detailsData.goodsName" style="width: 15rem" readonly />
                </div>
                <div>
                  <span>
                    <b>*</b>
                    故障描述
                  </span>
                  <Input v-model="detailsData.detail" style="width: 15rem" type="textarea" :autosize="{minRows: 5,maxRows: 5}" readonly />
                </div>
              </div>
            </div>
          </div>
          <div>
            <tab name="上门时间" />
            <div class="sjbox">
              <span>
                <p>{{ detailsData.doorTime | dateline }}</p>
                <p>{{ detailsData.doorTime | days }}</p>
              </span>
              <Input v-model="hourdate" readonly style="width: 100px" />
            </div>
          </div>
        </div>
        <div class="costbox">
          <div>
            <div>
              <span>费用清单:</span>
              <span>￥0</span>
            </div>
            <div>
              <span>上门服务费:</span>
              <span>￥{{ detailsData.doorMoney }}</span>
            </div>
            <div>
              <span>维修加时:0.5小时</span>
              <span>￥0</span>
            </div>
            <div>
              <span>应付金额</span>
              <span style="color: #ff8400">￥{{ detailsData.doorMoney }}</span>
            </div>
          </div>
          <button>立即付款</button>
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
import search from "@/components/Search.vue";
import tab from "@/components/Tab.vue";
import statement from "@/components/Statement.vue";
export default {
  components: {
    shortcut,
    search,
    tab,
    statement,
  },
  data() {
    return {
      value: "",
      date: "12:00",
      fixs: ["电脑", "打印机", "监控", "弱电", "其他"],
      status: [
        "已取消",
        "未支付",
        "已支付",
        "仓库已接单",
        "骑手已接单",
        "骑手已到达",
        "开始维修",
        "骑手维修加时",
        "维修完成",
      ],
      model1: "",
      detailsData: this.$store.state.maintainDetails,
      hourdate: "",
    };
  },
  mounted() {
    this.hourdate = this.detailsData.doorTime.split(" ")[1] + "0";
  },
  filters: {
    dateline: function (value) {
      let arr = value.split(" ");
      if (arr.length != 2) return value;
      let date = new Date(arr[0]);
      let yue = date.getMonth() + 1;
      let tian = date.getDate();
      return `${yue}月${tian}天`;
    },
    days: function (value) {
      let arr = value.split(" ");
      if (arr.length != 2) return value;
      let date = new Date(arr[0]);
      let day = date.getDay();
      let zhou = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      return zhou[day];
    },
  },
};
</script>

<style lang='less' scoped>
.maintainDetails {
  .content {
    > div {
      padding: 0 2rem;
      > h4 {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 2.8rem;
      }
      .serialbox {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        border: 1px solid #e6e6e6;
        background-color: #f5f5f5;
        color: #666;
        > p:nth-child(2) {
          color: #ff8400;
        }
      }
      .schedulebox {
        display: flex;
        padding-top: 1rem;
        align-items: baseline;
        justify-content: space-between;
        > div {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e6e6e6;
        }
        > ul {
          width: 60rem;
          padding: 0.5rem 1rem;
          border: 1px solid #e6e6e6;
          min-height: 10rem;
        }
      }
      .msgbox {
        display: flex;
        > div:nth-child(1) {
          flex: 2;
          .msg {
            display: flex;
            padding: 1rem 0;
            min-height: 15rem;
            > div:nth-child(1) {
              flex: 1;
              margin-right: 1rem;
              display: flex;
              flex-wrap: wrap;
              padding: 0.5rem;
              background-color: #ececec;
              > img {
                max-width: 5rem;
                max-height: 5rem;
                margin-right: 0.5rem;
                margin-bottom: 0.5rem;
              }
              .upbox {
                cursor: pointer;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                > span {
                  color: #ff8400;
                }
                > p {
                  color: #999999;
                  font-size: 0.8rem;
                }
              }
            }
            > div:nth-child(2) {
              flex: 1;
              display: flex;
              justify-content: space-around;
              flex-direction: column;
              > div {
                display: flex;
                margin-bottom: 0.5rem;
                > span {
                  display: inline-block;
                  width: 6rem;
                  > b {
                    color: #ff8400;
                  }
                }
                .smbox {
                  width: 14rem;
                  margin-left: 6rem;
                }
              }
            }
          }
        }
        > div:nth-child(2) {
          flex: 1;
          .sjbox {
            padding: 5rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            > span {
              display: flex;
              padding: 0.5rem;
              margin-right: 1rem;
              align-items: center;
              flex-direction: column;

              background-color: #f3f4f7;
            }
          }
        }
      }
      .costbox {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        margin-bottom: 3rem;
        > div {
          width: 30rem;
          height: 10rem;
          display: flex;
          padding: 0.5rem;
          flex-direction: column;
          justify-content: space-around;
          border: 1px solid #ff8400;
          > div {
            display: flex;
            justify-content: space-between;
            > span:nth-child(1) {
              width: 7rem;
              text-align: right;
            }
          }
        }
        > button {
          color: #fff;
          padding: 0.7rem 5rem;
          background: #ff8400;
        }
      }
    }
  }
}
</style>

<style>
.maintainDetails .ivu-upload-select {
  width: 100%;
  height: 100%;
}
.maintainDetails .textarea {
  padding: 0.5rem;
}
</style>