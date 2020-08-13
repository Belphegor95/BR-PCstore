<!-- 详情页 -->
<template>
  <div class="details">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="true" />
    </div>
    <div class="content">
      <div>
        <div class="imgbox">
          <div>
            <img src="../../assets/img/sundry/zt.png" alt />
          </div>
          <div>
            <img src="../../assets/img/sundry/zh.png" @click="leftClick" alt />
            <div>
              <div :style="{width: spec_width + 'rem',left: spec_list +'rem'}">
                <img src="../../assets/img/sundry/zt.png" v-for="(item,index) in 6" :key="index" />
              </div>
            </div>
            <img src="../../assets/img/sundry/y.png" @click="rightClick" alt />
          </div>
        </div>
        <div class="sizebox">
          <h6>打印机打印机打印机打印机打印机打印机打印机打印机打印机打印机</h6>
          <div>
            <div>
              <span>
                <span>价</span> 格 :
              </span>
              <p>90.00</p>
            </div>
            <div>
              <span>卷 后 价 :</span>
              <price :priceNum="27.00" :size="1.6" />
            </div>
            <div>
              <span>
                <span>销</span> 量 :
              </span>
              <p>10万+</p>
            </div>
          </div>
          <div>
            <div>
              <span>
                <span>单</span> 位 :
              </span>
              <div></div>
            </div>
            <div>
              <span>
                <span>颜</span> 色 :
              </span>
              <div>
                <button :class="colourid == index? 'active':''" v-for="(item,index) in 4" :key="index" @click="colourClick(index)">白色</button>
              </div>
            </div>
            <div>
              <span>购买数量:</span>
              <div>
                <InputNumber :max="10" :min="1" v-model="value1" />
                <p>库存数量 : 100</p>
              </div>
            </div>
          </div>
          <div class="btnbox">
            <button>
              <img src="../../assets/img/sundry/gwc.png" alt />
              加入购物车
            </button>
            <button>立即购买</button>
          </div>
        </div>
      </div>
      <div class="namebox">
        <span>产品详情</span>
      </div>
      <div class="detailsimgbox">
        <img src="../../assets/img/sundry/zt.png" alt />
      </div>
    </div>
    <div class="bottombox">
      <guarantee />
      <statement />
    </div>
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import search from "@/components/Search.vue";
import guarantee from "@/components/Guarantee.vue";
import statement from "@/components/Statement.vue";
import price from "@/components/Price.vue";
export default {
  components: {
    shortcut,
    search,
    guarantee,
    statement,
    price,
  },
  data() {
    return {
      spec_width: 6 * 6,
      spec_list: 0,
      value1: 0,
      colourid: 0,
    };
  },
  methods: {
    leftClick: function () {
      if (this.spec_list == 0) return;
      this.spec_list = 0;
    },
    rightClick: function () {
      this.spec_list = -12;
      // 6 - this.spec_list
    },
    colourClick: function (id) {
      this.colourid = id;
    },
  },
};
</script>

<style lang='less' scoped>
.details {
  .content {
    > div:nth-child(1) {
      display: flex;
      border-top: 1px solid #e5e5e5;
      padding-top: 2rem;
      .imgbox {
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
              > img:hover {
                border: 1px solid #ff8400;
              }
            }
          }
        }
      }
      .sizebox {
        padding: 4rem;
        padding-top: 2rem;
        > h6 {
          width: 30rem;
          margin-bottom: 2rem;
          font-size: 1.4rem;
        }
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
        > div:nth-child(2) {
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
    .namebox {
      margin-top: 4rem!important;
      border: 1px solid #eaeaea;
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
      padding: 1rem;
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
</style>