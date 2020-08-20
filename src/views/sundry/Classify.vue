<!-- 搜索 分类 -->
<template>
  <div class="classify">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="true" />
    </div>
    <div class="content">
      <div class="sortbox">
        <div>
          <span>全部分类:</span>
          <div>
            <button :class="id1 == index? 'active':''" v-for="(item,index) in 4" :key="index" @click="id1click(index)">分类{{ index + 1 }}</button>
          </div>
        </div>
        <div>
          <span>类型:</span>
          <div>
            <button :class="id2 == index? 'active':''" v-for="(item,index) in 4" :key="index" @click="id2click(index)">分类{{ index + 1 }}</button>
          </div>
        </div>
        <div>
          <span>价格:</span>
          <div>
            <button :class="id3 == 0? 'active':''" @click="id3click(0)">0-199</button>
            <button :class="id3 == 1? 'active':''" @click="id3click(1)">199-299</button>
          </div>
        </div>
      </div>
      <div>
        <div :class="pricetype != 0 ?'price_active':''" @click="pricetypeClick">
          <p>价格</p>
          <img v-if="pricetype== 1" src="../../assets/img/sundry/s.png" alt />
          <img v-else-if="pricetype == 2" src="../../assets/img/sundry/x.png" alt />
        </div>
        <div>
          <div>
            <InputNumber :max="10" :min="1" v-model="value1" />-
            <InputNumber :max="10" :min="1" v-model="value1" />
          </div>
          <div>
            <button @click="eliminate">清除</button>
            <Button>确定</Button>
          </div>
        </div>
      </div>
      <div class="listbox">
        <commodityCard v-for="(item,index) in 20" :key="index" />
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
import commodityCard from "@/components/CommodityCard.vue";
import guarantee from "@/components/Guarantee.vue";
import statement from "@/components/Statement.vue";
export default {
  components: {
    shortcut,
    search,
    commodityCard,
    guarantee,
    statement,
  },
  data() {
    return {
      id1: 0,
      id2: 0,
      id3: 0,
      value1: null,
      pricetype: 0,
    };
  },
  methods: {
    id1click: function (id) {
      if (id == this.id1) return (this.id1 = -1);
      this.id1 = id;
    },
    id2click: function (id) {
      if (id == this.id2) return (this.id2 = -1);
      this.id2 = id;
    },
    id3click: function (id) {
      if (id == this.id3) return (this.id3 = -1);
      this.id3 = id;
    },
    pricetypeClick: function () {
      if (this.pricetype == 0) {
        this.pricetype = 1;
      } else if (this.pricetype == 1) {
        this.pricetype = 2;
      } else if (this.pricetype == 2) {
        this.pricetype = 0;
      }
    },
    // 价格清除
    eliminate: function () {
      this.value1 = "";
    },
  },
};
</script>

<style lang='less' scoped>
.classify {
  .content {
    .sortbox {
      display: flex;
      color: #666666;
      flex-direction: column;
      > div {
        display: flex;
        align-items: center;
        padding: 0.5rem 2rem;
        border-bottom: 1px dashed #eeeeee;
        > span {
          width: 4rem;
          text-align: right;
        }
        > div {
          margin-left: 1rem;
          > button {
            padding: 0.1rem 1rem;
            margin: 0 1rem;
            color: #666666;
          }
          .active {
            color: #ff8400;
            border: 1px solid #ff8400;
          }
        }
      }
    }
    // 价格
    > div:nth-child(2) {
      display: flex;
      align-items: center;
      margin-top: 1rem !important;
      border: 1px solid #e6e6e6;
      background-color: #f5f5f5;
      > div:nth-child(1) {
        display: flex;
        width: 4rem;
        cursor: pointer;
        padding: 0.5rem;
        margin-left: 0.3rem;
        align-items: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        > img {
          margin-left: 0.2rem;
        }
      }
      > div:nth-child(2) {
        display: flex;
        position: relative;
        > div:nth-child(1) {
          padding: 0.2rem;
          margin: 0.2rem 0.5rem;
        }
        > div:nth-child(2) {
          padding: 0 0.5rem;
          display: none;
          position: absolute;
          top: 0;
          width: 12rem;
          height: 5.5rem;
          z-index: 3;
          background: #fff;
          border: 1px solid #999;
          > button {
            margin-top: 3rem;
          }
          > button:nth-child(1) {
            color: #ff8400;
          }
        }
      }
      > div:nth-child(2):hover {
        > div:nth-child(1) {
          z-index: 4;
        }
        > div:nth-child(2) {
          display: flex;
          justify-content: space-between;
        }
      }
      .price_active {
        background-color: #fff;
        color: #666666;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
    .listbox {
      display: flex;
      flex-wrap: wrap;
      padding-top: 1rem;
      justify-content: space-around;
      > div {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
<style >
.classify .ivu-input-number-handler-wrap {
  display: none;
}
</style>

