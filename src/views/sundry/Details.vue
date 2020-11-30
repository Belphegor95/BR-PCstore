<!-- 详情页 -->
<template>
  <div class="details">
    <shortcut />
    <div class="search_box">
      <search :isSearch="true" />
    </div>
    <breadcrumb :tos="[{name: '首页', to: '/'},{ name: '商品详情', to: '/details' }]" />
    <div class="content">
      <div>
        <div class="imgbox">
          <pic-zoom
            class="picbox"
            :url="detailsdata.plist_img_url[this.imgindex]"
            :scale="3"
          ></pic-zoom>
          <div>
            <img src="../../assets/img/sundry/zh.png" @click="leftClick" />
            <div>
              <div
                :style="{ width: spec_width + 'rem', left: spec_list + 'rem' }"
              >
                <img
                  :src="item"
                  :class="imgindex == index ? 'img_active' : ''"
                  v-for="(item, index) in detailsdata.plist_img_url"
                  :key="index"
                  @mouseenter="enter(index)"
                />
              </div>
            </div>
            <img src="../../assets/img/sundry/y.png" @click="rightClick" />
          </div>
        </div>
        <div class="sizebox">
          <h6>{{ detailsdata.plist_name }}</h6>
          <div class="box">
            <div>
              <div>
                <span>开 心 价 : </span>
                <price
                  :priceNum="
                    detailsdata.price_lv.unitList[this.unitid].orderPrice
                  "
                  :size="1.6"
                />
              </div>
            </div>
            <div>
              <div>
                <span> <span>单</span> 位 : </span>
                <div v-if="detailsdata.price_lv">
                  <button
                    :class="unitid == index ? 'active' : ''"
                    v-for="(item, index) in detailsdata.price_lv.unitList"
                    :key="index"
                    @click="colourClick(true, index)"
                  >
                    {{ item.unitName
                    }}<i v-if="item.rate != 1"
                      >({{ item.rate
                      }}{{ detailsdata.price_lv.unitList[0].unitName }})</i
                    >
                  </button>
                </div>
              </div>
              <div>
                <span> <span>颜</span> 色 : </span>
                <div v-if="detailsdata.price_lv">
                  <button
                    :class="colourid == index ? 'active' : ''"
                    v-for="(item, index) in detailsdata.price_lv.cate"
                    :key="index"
                    @click="colourClick(false, index)"
                  >
                    {{ item.cateName ? item.cateName : "暂无" }}
                  </button>
                </div>
              </div>
              <div class="btnbox">
                <span>购买数量:</span>
                <div>
                  <!-- <InputNumber :min="1" v-model="buyNum" /> -->
                  <!-- <p>库存数量 : 库存充足</p> -->
                  <stepper
                    :stepperObj="{
                      num: buyNum,
                      index: 0,
                      width: '10rem',
                      height: '3.13rem',
                    }"
                    @getstepperObj="getstepperObj"
                  />
                </div>
                <button @click="addShopping" class="addbtn">
                  <img src="../../assets/img/sundry/gwc.png" />
                  加入购物车
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="namebox">
        <span>产品详情</span>
      </div>
      <div class="detailsimgbox">
        <div class="detailbox">
          <div>
            商品名称：<span>{{ detailsdata.plist_name }}</span>
          </div>
          <div>
            商品颜色：<span
              v-for="(item, index) in detailsdata.price_lv.cate"
              :key="index"
              >{{ item.cateName || "暂无"
              }}<i v-if="index != detailsdata.price_lv.cate.length - 1"
                >、</i
              ></span
            >
          </div>
          <div>
            商品数量：<span
              v-for="(item, index) in detailsdata.price_lv.unitList"
              :key="index"
              >{{ item.unitName
              }}<i v-if="index != detailsdata.price_lv.unitList - 1"
                >、</i
              ></span
            >
          </div>
          <div>商品产地：中国大陆</div>
          <div>商品用途：办公</div>
        </div>
        <img
          :src="item"
          v-for="(item, index) in detailsdata.plist_detail_img_url"
          :key="index"
        />
      </div>
    </div>
    <div class="bottombox">
      <guarantee />
      <statement />
    </div>
    <goTop />
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import search from "@/components/Search.vue";
import guarantee from "@/components/Guarantee.vue";
import statement from "@/components/Statement.vue";
import price from "@/components/Price.vue";
import PicZoom from "vue-piczoom";
import goTop from "@/components/GoTop.vue";
import breadcrumb from "@/components/Breadcrumb.vue";
import stepper from "@/components/Stepper.vue";
export default {
  components: {
    shortcut,
    search,
    guarantee,
    statement,
    price,
    PicZoom,
    goTop,
    breadcrumb,
    stepper,
  },
  data() {
    return {
      detailsdata: this.$store.state.detailsdata,
      spec_width: 6 * 6,
      spec_list: 0,
      buyNum: 1,
      colourid: 0,
      unitid: 0,
      imgindex: 0,
    };
  },
  mounted() {},
  methods: {
    // 添加商品
    addShopping: function () {
      let arr = [];
      let item = this.detailsdata.price_lv;
      let obj = {};
      obj.plistId = this.detailsdata.id;
      obj.priceId = item.unitList[this.unitid].priceId;
      obj.cateId = item.cate[this.colourid].cateId;
      obj.buyNum = this.buyNum;
      if (this.buyNum != 0) {
        arr.push(obj);
      }
      if (arr.length == 0) return;
      this.axios
        .post(this.$api.addToShoppingCart, {
          plist: JSON.stringify(arr),
        })
        .then((data) => {
          if (data.code == 200) {
            this.$toast("添加成功!");
            this.$store.commit("show_count", data.data.count);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 数量改变
    getstepperObj: function (obj) {
      console.info(obj);
      this.buyNum = obj.num;
      // this.shoppings[obj.index].buyNum = obj.num;
      // this.shoppingCarCount(this.shoppings[obj.index]);
      // this.$forceUpdate();
    },
    // 左滚
    leftClick: function () {
      if (this.spec_list == 0) return;
      this.spec_list = 0;
    },
    // 右滚
    rightClick: function () {
      if (this.spec_list < 4) return;
      this.spec_list = -12;
      // 6 - this.spec_list
    },
    enter: function (index) {
      this.imgindex = index;
    },
    colourClick: function (is, id) {
      is ? (this.unitid = id) : (this.colourid = id);
    },
  },
};
</script>

<style lang='less' scoped>
.details {
  margin-top: 2rem;
  i {
    font-style: normal;
  }
  .content {
    // background: #f9f9f9;
    // padding-top: 2rem;
    > div:nth-child(1) {
      background-color: #fff;
      display: flex;
      border-top: 1px solid #e5e5e5;
      padding-top: 2rem;
      .imgbox {
        width: 21rem;
        // position: relative;
        // 顶部大图
        > div:nth-child(1) {
          width: 21rem;
          height: 21rem;
          border: 1px solid #f2f2f2;
          > img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        // 下面切换图
        > div:nth-child(2) {
          // 左右箭头
          display: flex;
          margin-top: 0.5rem;
          align-items: center;
          justify-content: space-around;
          > img {
            cursor: pointer;
          }
          > div {
            width: 24rem;
            height: 5rem;
            display: flex;
            overflow: hidden;
            position: relative;
            > div {
              top: 0;
              height: 5rem;
              display: flex;
              align-items: center;
              position: absolute;
              > img {
                border: 1px solid #fff;
                margin: 0 0.3rem;
                width: 3.25rem;
                height: 3.25rem;
              }
              > .img_active {
                border: 1px solid #ff8400;
              }
            }
          }
        }
      }
      .sizebox {
        // width: 100%;
        flex: auto;
        padding-left: 1.56rem;
        > h6 {
          width: 30rem;
          margin-bottom: 2rem;
          font-size: 1.4rem;
        }
        .box {
          display: flex;
          flex-direction: column;
          > div {
            font-size: 1rem;
            margin-bottom: 1rem;
            > div {
              display: flex;
              > span:nth-child(1) {
                display: flex;
                align-items: center;
                white-space: pre;
                width: 5rem;
                > span {
                  margin-right: 1.2rem;
                }
              }
              > div:nth-child(2) {
                display: flex;
                align-items: center;

                > p {
                  text-indent: 1rem;
                }
                > button {
                  color: #666666;
                  font-size: 0.8rem;
                  padding: 0.75rem 2.25rem;
                  margin-right: 1rem;
                  border: 1px solid #dcdcdc;
                }
                .active {
                  color: #ff8900;
                  border: 1px solid #ff8900;
                }
              }
            }
          }
          > div:nth-child(1) {
            padding: 1rem 1.3rem;
            background-color: #fff4e6;
          }
          > div:nth-child(2) {
            > div {
              margin-bottom: 1rem;
            }
          }
          .btnbox {
            border-top: 1px dotted#DCDCDC;
            padding-top: 1.5rem;
            .addbtn {
              width: 14rem;
              height: 3.13rem;
              background: #ff9000;
              margin-left: 1.56rem;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              > img {
                width: 1.5rem;
                height: 1.25rem;
                margin-right: 0.63rem;
              }
            }
          }
        }
      }
    }
    .namebox {
      margin-top: 6rem !important;
      background: #f2f2f2;
      > span {
        display: inline-block;
        padding: 0.8rem 3rem;
        font-size: 1.1rem;
        background: #ffffff;
        border: 1px solid #dcdcdc;
        border-top: 0.3rem solid #ff8900;
      }
    }
    .detailsimgbox {
      background: #fff;
      padding: 1rem;
      font-size: 0;
      padding-bottom: 10rem;
      .detailbox {
        margin-top: 1.8rem;
        margin-bottom: 3rem;
        font-size: 1rem;
        // font-size: 0.75rem;
        padding: 0 4rem;
        border-bottom: 1px dotted#DCDCDC;
        display: flex;
        flex-wrap: wrap;
        > div {
          width: 25%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 1rem;
        }
      }
      > img {
        width: 100%;
      }
    }
  }
}
</style>

<style>
.details .ivu-input-number-handler-wrap {
  opacity: 1;
}
.details .mouse-cover-canvas {
  width: 35.5rem;
  height: 35.5rem;
}
/* 设置  数字输入框符号 */
.details .ivu-icon-ios-arrow-up:before {
  content: "\F102";
}
.details .ivu-icon-ios-arrow-down:before {
  content: "\F292";
}
</style>