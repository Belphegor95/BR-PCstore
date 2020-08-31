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
          <p>编号:123456</p>
          <p>维修中</p>
        </div>
        <div class="schedulebox">
          <div>当前进度</div>
          <ul>
            <li>2020-8-31 11:37:31 维修完成</li>
            <li>2020-8-31 11:37:31 维修完成</li>
            <li>2020-8-31 11:37:31 维修完成</li>
            <li>2020-8-31 11:37:31 维修完成</li>
            <li>2020-8-31 11:37:31 维修完成</li>
            <li>2020-8-31 11:37:31 维修完成</li>
            <li>2020-8-31 11:37:31 维修完成</li>
            <li>2020-8-31 11:37:31 维修完成</li>
          </ul>
        </div>
        <div class="msgbox">
          <div>
            <tab name="待修商品信息" />
            <div class="msg">
              <div>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                  <div class="upbox">
                    <img src="../../assets/img/maintain/tj.png" alt />
                    <span>上传更多</span>
                    <p>其他角度的图片</p>
                  </div>
                </Upload>
                <div></div>
              </div>
              <div>
                <div>
                  <span>
                    <b>*</b>
                    商品类别
                  </span>
                  <Input v-model="value" style="width: 15rem" />
                </div>
                <div>
                  <span>
                    <b>*</b>
                    商品类别
                  </span>
                  <Input v-model="value" style="width: 15rem" />件
                  <div class="smbox">
                    <img src="../../assets/img/maintain/xx.png" alt />
                    多件不同商品请分开填写,如因件数不符合产生的额外费用需本人承担
                  </div>
                </div>
                <div>
                  <span>
                    <b>*</b>
                    商品类别
                  </span>
                  <Input v-model="value" style="width: 15rem" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <tab name="上门时间" />
            <div class="sjbox">
              <span>
                <p>8月31日</p>
                <p>今天/周日</p>
              </span>
              <span>
                <p>8月31日</p>
                <p>今天/周日</p>
              </span>
              <Input v-model="date" readonly placeholder="Enter something..." style="width: 100px" />
            </div>
          </div>
        </div>
        <div>
          <tab name="请填写订单备注" />
          <Input
            v-model="value"
            type="textarea"
            :rows="8"
            maxlength="200"
            placeholder="请在此处填写关于本次服务师傅需要注意的内容(200字以内)
      示例:
      1.师傅接单后请及时与客服/我预约时间, 上门前提前三小时再次确认, 避免空跑;
      2.师傅服务过程中不得随意评价产品, 若发现产品问题请引导客户及时与商家联系解决;
      3.师傅上门前必须与客服确认清楚施工环境和施工条件在进行操作;
      4.师傅服务后请提供三张以上清晰完工图片并填写服务确认单;
      5.请师傅文明服务, 不可与客户发生冲突, 有任何问题请及时反馈平台。
      "
            style="width: 100%"
          />
          <div style="display: flex;align-items: baseline;margin-top: 2rem;color:#ff8400">
            <img src="../../assets/img/maintain/i.png" />
            <p>温馨提示: 请勿在备注信息中填写与订单必填产品信息不符的内容, 如: 除了订单产品还要安装***、需要师傅帮忙维修***等等额外服务信息, 以免因为师傅忽略而导致交易纠纷, 一旦因此发生纠纷, 平台仲裁将以订单必填信息为准</p>
          </div>
        </div>
        <div class="costbox">
          <div>
            <div>
              <span>费用清单:</span>
              <span>￥100.00</span>
            </div>
            <div>
              <span>上门服务费:</span>
              <span>￥50.00</span>
            </div>
            <div>
              <span>维修加时:0.5小时</span>
              <span>￥100.00</span>
            </div>
            <div>
              <span>应付金额</span>
              <span style="color: #ff8400">￥137.00</span>
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
    };
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
              padding: 0.5rem;
              background-color: #ececec;
              > div {
                width: 6rem;
                height: 6rem;
                margin-right: 0.5rem;
                background-color: #fff;
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
              //   align-items: center;
              flex-direction: column;
              > div {
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
.maintainDetails .ivu-input-wrapper {
    padding: 0.5rem;
}
</style>