<!-- 搜索 分类 -->
<template>
  <div class="classify">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="true" :searchname="searchKey" @searchClick="searchClick" />
    </div>
    <div class="content">
      <div class="sortbox">
        <div>
          <span>全部分类:</span>
          <div>
            <button
              :class="id1 == index? 'active':''"
              v-for="(item,index) in cateList.cateOneList"
              :key="index"
              @click="id1click(index)"
            >{{ item.title }}</button>
          </div>
        </div>
        <div>
          <span>类型:</span>
          <div>
            <button
              :class="id2 == index? 'active':''"
              v-for="(item,index) in twoList"
              :key="index"
              @click="id2click(index)"
            >{{ item.title }}</button>
          </div>
        </div>
      </div>
      <div v-show="false">
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
        <commodityCard v-for="(item,index) in searchs" :key="index" :data="item" />
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
      value1: null,
      pricetype: 0,
      cateList: [],
      twoList: [],
      searchKey: "",
      searchs: [], // 搜索
    };
  },
  mounted() {
    this.getcate();
  },
  methods: {
    getcate: function () {
      this.axios
        .get(this.$api.cate)
        .then((data) => {
          if (data.code == 200) {
            let data_ = data.data;
            for (let i = 0; i < data_.cateOneList.length; i++) {
              let cateoneid = data_.cateOneList[i].id;
              for (let key in data_.cateTwoList) {
                if (cateoneid == key) {
                  data_.cateOneList[i].twolist = data_.cateTwoList[key];
                }
              }
            }
            // 默认打开第一个
            this.cateList = data_;
            this.twoList = this.cateList.cateOneList[0].twolist;
            // 判断 路由是否有值  有值先赋值
            Object.keys(this.$route.query).length != 0 ? this.getquery() : "";
            this.getcatePlist();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {});
    },
    // 点击搜索
    searchClick: function (searchKey) {
      this.searchKey = searchKey;
      // 判断是否存在
      if (!this.searchKey) {
        this.getcatePlist();
        return;
      }
      // 取消选中
      this.id1 = -1;
      this.id2 = -1;
      this.axios
        .post(this.$api.search, {
          searchKey: this.searchKey.trim(),
        })
        .then((data) => {
          if (data.code == 200) {
            this.searchs = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {});
    },
    // 获取分类商品
    getcatePlist: function () {
      this.axios
        .post(this.$api.getCatePlist, {
          cateone: this.cateList.cateOneList[this.id1].id,
          catetwo: this.twoList[this.id2].id,
        })
        .then((data) => {
          if (data.code == 200) {
            this.searchs = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    //  获取搜索条件对应的id
    getquery: function () {
      let query = this.$route.query;
      for (let i = 0; i < this.cateList.cateOneList.length; i++) {
        let item = this.cateList.cateOneList[i].id;
        if (item == query.cate_one) {
          this.id1 = i;
        }
      }
      for (let i = 0; i < this.twoList.length; i++) {
        let item = this.cateList.cateOneList[i].id;
        if (item == query.cate_two) {
          this.id2 = i;
        }
      }
    },
    // 一级分类
    id1click: function (id) {
      this.searchKey = "";
      this.id1 = id;
      this.twoList = this.cateList.cateOneList[id].twolist;
      this.id2 = 0;
      this.getcatePlist();
    },
    // 二级分类
    id2click: function (id) {
      this.searchKey = "";
      this.id2 = id;
      this.getcatePlist();
    },
    // 时间排序方法
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
        min-height: 3.18rem;
        padding: 0.5rem 2rem;
        border-bottom: 1px dashed #eeeeee;
        > span {
          width: 4rem;
          white-space: nowrap;
          display: inline-block;
          text-align: right;
        }
        > div {
          flex: auto;
          margin-left: 1rem;
          > button {
            padding: 0.1rem 1rem;
            margin: 0 1rem 0.5rem 1rem;
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
      padding-top: 0.5rem;
      // justify-content: space-around;
      > div {
        margin: 0.5rem 0.35rem;
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

