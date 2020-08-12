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
              <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格:</span>
              <p>90.00</p>
            </div>
            <div>
              <span>卷后价:</span>
              <p>27.00</p>
            </div>
            <div>
              <span>销量:</span>
              <p>10万+</p>
            </div>
          </div>
          <div>
            <div>
              <span>单位:</span>
              <div></div>
            </div>
            <div>
              <span>颜色:</span>
              <div></div>
            </div>
            <div>
              <span>购买数量:</span>
              <div>
                <InputNumber :max="10" :min="1" v-model="value1" />
              </div>
            </div>
          </div>
        </div>
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
export default {
  components: {
    shortcut,
    search,
    guarantee,
    statement,
  },
  data() {
    return {
      spec_width: 6 * 6,
      spec_list: 0,
      value1: 0,
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
            > span {
              display: inline-block;
              white-space: pre;
              //   text-align: justify;
              width: 5rem;
            }
          }
        }
        > div:nth-child(2) {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 2rem;
        }
      }
    }
  }
}
</style>