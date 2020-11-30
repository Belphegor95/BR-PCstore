<!-- 搜索框 -->
<template>
  <div class="searchBox">
    <div class="leftbox">
      <div class="happyname">
        <!-- <span @click="gohome">开心兔商城</span> -->
        <img @click="gohome" src="../assets/img/log.png" />
        <!-- <h1 @click="gohome">开心兔</h1> -->
      </div>
      <div class="serachbox" v-show="isSearch">
        <div class="serachinput">
          <input type="text" v-model="search" @keyup.enter="onSearch" />
          <button @click="onSearch">
            <img src="../assets/img/loupe.png" alt="" /> 搜索
          </button>
          <ul v-show="historyList.length != 0">
            <li v-for="(item, index) in historyList" @click="onHistory(item)" :key="index">
              <p>{{ item }}</p>
              <div>
                <span>搜索历史</span>
                <span @click.stop="detHistoryList(index)">删除</span>
              </div>
            </li>
            <p @click="emptyHistoryList">全部删除</p>
          </ul>
        </div>
        <div class="btnbox">
          <span
            v-for="(item, index) in searchlist"
            :key="index"
            @click="onHistory(item)"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <div class="codebox" v-show="isSearch">
      <p>下载手机开心兔</p>
      <img src="../assets/img/home/qr_code.png" alt="" />
      <!-- <button @click="serve">
        <img src="../assets/img/home/sm.png" />
        <p>上门服务</p>
      </button> -->
      <!-- <Button size="large">上门服务</Button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSearch: Boolean,
    searchname: String,
  },
  data() {
    return {
      search: "",
      searchlist: ["油墨", "打印纸", "记号笔", "档案袋", "标签"], // 推荐搜索
      historyList: this.$store.state.historyList, // 搜索的历史记录
    };
  },
  mounted() {},
  methods: {
    gohome: function () {
      if (this.$route.path != "/") this.$router.push("/");
    },
    // 点击搜索
    onSearch: function () {
      this.addHistoryList(this.search);
      if (this.$route.query.name != this.search) {
        // 如果用户搜索空  清除name值
        if (this.$route.path == "/classify" && this.search.trim() == "") {
          if (!this.$route.query.name) return;
          this.$router.push({
            query: {},
          });
          return;
        }
        if (this.search == "") {
          this.$router.push("/classify");
        } else {
          this.$router.push({
            path: "/classify",
            query: {
              name: this.search,
            },
          });
        }
      }
    },
    // 点击历史记录
    onHistory: function (item) {
      this.addHistoryList(item);
      // 判断  防止重复点击报错
      if (this.$route.query.name != item) {
        this.$router.push({
          path: "/classify",
          query: {
            name: item,
          },
        });
      }
    },
    // onHistory: function (id1, id2) {
    //   if (
    //     this.$route.query.cate_one == id1 &&
    //     this.$route.query.cate_two == id2
    //   )
    //     return;
    //   this.$router.push({
    //     path: "/classify",
    //     query: {
    //       cate_one: id1,
    //       cate_two: id2,
    //     },
    //   });
    // },
    // 上门列表
    serve: function () {
      this.$router.push("/maintain/maintainList");
    },
    // 添加历史记录
    addHistoryList: function (item) {
      if (item.trim() == "") return;
      // 历史记录限定十个
      if (this.historyList.length == 10) {
        this.historyList.splice(9, 1);
        this.historyList.unshift(item);
      } else {
        this.historyList.unshift(item);
      }
      let arr = Array.from(new Set(this.historyList));
      this.historyList = arr;
      this.$store.commit("show_historyList", arr);
    },
    // 删除历史记录
    detHistoryList: function (index) {
      this.historyList.splice(index, 1);
      this.$store.commit("show_historyList", this.historyList);
    },
    // 清空历史记录
    emptyHistoryList: function () {
      this.historyList = [];
      this.$store.commit("show_historyList", this.historyList);
    },
  },
  watch: {
    searchname(name) {
      this.search = name;
    },
  },
};
</script>

<style lang="less" scoped>
.searchBox {
  height: 7.31rem;
  display: flex;
  justify-content: space-between;
  .leftbox {
    display: flex;
    .happyname {
      overflow: hidden;
      margin-right: 4.7rem;
      margin-left: 3.7rem;
      display: flex;
      font-weight: 700;
      // color: #ff8400;
      font-family: huxiaobo;
      text-indent: 1rem;
      align-items: center;
      > img {
        cursor: pointer;
        width: 13rem;
      }
      > h1 {
        color: #f39800;
        font-size: 3rem;
        cursor: pointer;
      }
    }
    .serachbox {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .serachinput {
        display: flex;
        height: 2.11rem;
        position: relative;
        > input {
          outline: 0px;
          height: 2.1rem;
          width: 40.88rem;
          padding-left: 0.8rem;
          border: 0.1rem solid #F39800;
        }
        > button {
          height: 2.1rem;
          display: flex;
          align-items: center;
          color: #fff;
          padding: 0 1.2rem;
          background-color: #ff8900;
          > img {
            margin-right: 0.3rem;
          }
        }
        > ul {
          display: none;
          z-index: 10;
          position: absolute;
          top: 2.1rem;
          left: 0;
          width: 40.88rem;
          border: 1px solid #cccccc;
          background-color: #fff;
          > li {
            cursor: pointer;
            display: flex;
            padding: 0.2rem 0.5rem;
            justify-content: space-between;
            > div {
              > span:nth-child(1) {
                color: #bebebe;
              }
              > span:nth-child(2) {
                display: none;
              }
            }
          }
          > p {
            width: 100%;
            cursor: pointer;
            text-align: right;
            border-top: 1px solid #cccccc;
            padding: 0.2rem 0.5rem;
          }
          > li:hover,
          > p:hover {
            background-color: #f5f5f5;
          }
        }
      }
      .serachinput:hover {
        > ul {
          display: block;
          li:hover {
            > div {
              > span:nth-child(1) {
                display: none;
              }
              > span:nth-child(2) {
                display: block;
              }
            }
          }
        }
      }
      .btnbox {
        color: #999999;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        > span {
          margin: 0 0.5rem;
          cursor: pointer;
        }
        > span:first-child {
          margin-left: 0;
        }
        > span:last-child {
          margin-right: 0;
        }
        > span:hover {
          color: #f68b00;
        }
      }
    }
  }
  .codebox {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #999999;
    > p {
      margin-bottom: 0.25rem;
    }
    > img {
      width: 4.13rem;
    }
  }
  // .visitbox {
  //   flex: 1;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   button {
  //     display: flex;
  //     padding: 0.5rem 1rem;
  //     border: 1px solid #e6e6e6;
  //     > img {
  //       margin-right: 0.5rem;
  //     }
  //   }
  // }
}
</style>