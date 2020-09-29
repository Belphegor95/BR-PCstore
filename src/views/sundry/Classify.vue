<!-- 搜索 分类 -->
<template>
  <div class="classify">
    <shortcut />
    <div class="search_box">
      <search :isSearch="true" :searchname="searchKey" @searchClick="searchClick" />
    </div>
    <div class="content">
      <div class="sortbox">
        <div>
          <span>全部分类:</span>
          <div>
            <button
              :class="cate_one == index? 'active':''"
              v-for="(item,index) in cateList.cateOneList"
              :key="index"
              @click="cate_oneclick(index)"
            >{{ item.title }}</button>
          </div>
        </div>
        <div>
          <span>类型:</span>
          <div>
            <button
              :class="cate_two == index? 'active':''"
              v-for="(item,index) in twoList"
              :key="index"
              @click="cate_twoclick(index)"
            >{{ item.title }}</button>
          </div>
        </div>
      </div>
      <div v-show="false">
        <div :class="pricetype != 0 ?'price_active':''" @click="pricetypeClick">
          <p>价格</p>
          <img v-if="pricetype== 1" src="../../assets/img/sundry/s.png" />
          <img v-else-if="pricetype == 2" src="../../assets/img/sundry/x.png" />
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
        <p style="font-size: 1rem;padding:0.5rem" v-if="searchs.length == 0">暂无数据</p>
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
      cate_one: 0,
      cate_two: 0,
      value1: null,
      pricetype: 0,
      cateList: [],
      twoList: [],
      searchKey: "",
      searchs: [], // 搜索
    };
  },
  watch: {
    $route(to) {
      this.getcate();
    },
  },
  mounted() {
    this.getcate();
  },
  methods: {
    // 1.跳转页面不搜索 2.跳转页面搜索 3.本页面不搜索 4.分类跳转并搜索分类
    is_search: function () {
      let index = Object.keys(this.$route.query).length;
      if (index == 0) {
        this.cate_one = 0;
        this.cate_two = 0;
        this.getcatePlist();
      } else if (index == 1) {
        this.searchClick(this.$route.query.name);
      } else {
        this.getquery();
      }
    },
    // 点击搜索
    searchClick: function (searchKey) {
      this.searchKey = searchKey;
      // 取消选中
      this.cate_one = -1;
      this.cate_two = -1;
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
            this.is_search();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {});
    },
    // 获取分类商品
    getcatePlist: function () {
      this.searchs = [];
      this.axios
        .post(this.$api.getCatePlist, {
          cateone: this.cateList.cateOneList
            ? this.cateList.cateOneList[this.cate_one].id
            : 0,
          catetwo: this.twoList ? this.twoList[this.cate_two].id : 0,
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
      this.cate_one = query.cate_one;
      this.cate_two = query.cate_two;
      this.getcatePlist();
      // for (let i = 0; i < this.cateList.cateOneList.length; i++) {
      //   let item = this.cateList.cateOneList[i].id;
      //   if (item == query.cate_one) {
      //     this.cate_one = i;
      //     this.twoList = this.cateList.cateOneList[i].twolist;
      //     break;
      //   }
      // }
      // for (let i = 0; i < this.twoList.length; i++) {
      //   let item = this.cateList.cateOneList[i].id;
      //   if (item == query.cate_two) {
      //     this.cate_two = i;
      //     break;
      //   }
      // }
    },
    // 一级分类
    cate_oneclick: function (id) {
      this.searchKey = "";
      this.cate_one = id;
      this.twoList = this.cateList.cateOneList[id].twolist;
      this.cate_two = 0;
      this.getcatePlist();
    },
    // 二级分类
    cate_twoclick: function (id) {
      if (this.cate_one == -1) this.cate_one = 0;
      this.searchKey = "";
      this.cate_two = id;
      this.getcatePlist();
    },
    // 价格排序方法
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
  margin-top: 2rem;
  .content {
    .sortbox {
      display: flex;
      color: #666666;
      flex-direction: column;
      > div {
        display: flex;
        min-height: 3.18rem;
        border-bottom: 1px solid #ddd;
        > span {
          width: 6rem;
          flex-shrink: 0;
          padding: 0.5rem;
          padding-top: 0.8rem;
          white-space: nowrap;
          display: inline-block;
          background-color: #f3f3f3;
        }
        > div {
          flex: auto;
          padding: 0.5rem;
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
      min-height: 23rem;
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

