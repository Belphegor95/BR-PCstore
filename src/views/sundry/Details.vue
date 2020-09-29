<!-- 详情页 -->
<template>
  <div class="details">
    <shortcut />
    <div class="search_box">
      <search :isSearch="true" />
    </div>
    <div class="content">
      <div>
        <div class="imgbox">
          <pic-zoom class="picbox" :url="detailsdata.plist_img_url[this.imgindex]" :scale="3"></pic-zoom>
          <div>
            <img src="../../assets/img/sundry/zh.png" @click="leftClick" />
            <div>
              <div :style="{width: spec_width + 'rem',left: spec_list +'rem'}">
                <img
                  :src="item"
                  :class="imgindex == index ?'img_active':''"
                  v-for="(item,index) in detailsdata.plist_img_url"
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
                <span>
                  <span>价</span> 格 :
                </span>
                <price :priceNum="detailsdata.price_lv.unitList[this.unitid].marketPrice" :size="1.6" />
              </div>
            </div>
            <div>
              <div>
                <span>
                  <span>单</span> 位 :
                </span>
                <div v-if="detailsdata.price_lv">
                  <button
                    :class="unitid == index? 'active':''"
                    v-for="(item,index) in detailsdata.price_lv.unitList"
                    :key="index"
                    @click="colourClick(true,index)"
                  >{{ item.unitName ? item.unitName : "暂无" }}</button>
                </div>
              </div>
              <div>
                <span>
                  <span>颜</span> 色 :
                </span>
                <div v-if="detailsdata.price_lv">
                  <button
                    :class="colourid == index? 'active':''"
                    v-for="(item,index) in detailsdata.price_lv.cate"
                    :key="index"
                    @click="colourClick(false,index)"
                  >{{ item.cateName ? item.cateName : "暂无" }}</button>
                </div>
              </div>
              <div>
                <span>购买数量:</span>
                <div>
                  <InputNumber :min="1" v-model="buyNum" />
                  <p>库存数量 : 库存充足</p>
                </div>
              </div>
            </div>
            <div class="btnbox">
              <button @click="addShopping">
                <img src="../../assets/img/sundry/gwc.png" />
                加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="namebox">
        <span>产品详情</span>
      </div>
      <div class="detailsimgbox">
        <img :src="item" v-for="(item,index) in detailsdata.plist_detail_img_url" :key="index" />
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
export default {
  components: {
    shortcut,
    search,
    guarantee,
    statement,
    price,
    PicZoom,
    goTop
  },
  data() {
    return {
      detailsdata: this.$store.state.detailsdata,
      spec_width: 6 * 6,
      spec_list: 0,
      buyNum: 0,
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
  .content {
    background: #f9f9f9;
    // padding-top: 2rem;
    > div:nth-child(1) {
      background-color: #fff;
      display: flex;
      border-top: 1px solid #e5e5e5;
      padding-top: 2rem;
      .imgbox {
        // position: relative;
        // 顶部大图
        > div:nth-child(1) {
          width: 30rem;
          height: 30rem;
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
              position: absolute;
              > img {
                border: 1px solid #fff;
                margin: 0 0.5rem;
                width: 5rem;
                height: 5rem;
              }
              > .img_active {
                border: 1px solid #ff8400;
              }
            }
          }
        }
      }
      .sizebox {
        width: 100%;
        padding: 4rem;
        padding-top: 2rem;
        > h6 {
          width: 30rem;
          margin-bottom: 2rem;
          font-size: 1.4rem;
        }
        .box {
          display: flex;
          padding: 1rem;
          flex-direction: column;
          background-color: #f9f9f9;
          > div {
            font-size: 1rem;
            > div {
              display: flex;
              margin: 1rem 0;
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
                  border-radius: 1rem;
                  padding: 0.2rem 1rem;
                  margin-right: 1rem;
                  border: 1px solid #e9e9e9;
                }
                .active {
                  color: #ff8900;
                  border: 1px solid #ff8900;
                }
              }
            }
          }
          > div:nth-child(1) {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 1rem;
          }
          .btnbox {
            display: flex;
            align-items: center;
            > button {
              height: 3rem;
              margin-left: 2rem;
              border-radius: 0.1rem;
              padding: 0.5rem 2rem;
              border: 1px solid #ff8900;
            }
            > button:nth-child(1) {
              color: #ff8900;
              display: flex;
              align-items: center;
              > img {
                margin-right: 0.5rem;
              }
            }
            > button:nth-child(2) {
              background: #ff8900;
              color: #fff;
            }
          }
        }
      }
    }
    .namebox {
      margin-top: 6rem !important;
      border: 1px solid #eaeaea;
      background-color: #fff;
      > span {
        border-top: 0.3rem solid #ff8900;
        border-right: 1px solid #eaeaea;
        display: inline-block;
        padding: 0.8rem 2rem;
        font-size: 1.1rem;
        // width: 5rem;
        // line-height: 3rem;
      }
    }
    .detailsimgbox {
      background: #fff;
      padding: 1rem;
      font-size: 0;
      padding-bottom: 10rem;
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
.mouse-cover-canvas {
  width: 35.5rem;
  height: 35.5rem;
}
</style>