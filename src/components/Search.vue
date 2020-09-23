<!-- 搜索框 -->
<template>
  <div class="searchBox">
    <div>
      <div class="happyname">
        <!-- <span @click="gohome">开心兔商城</span> -->
        <img @click="gohome" src="../assets/img/log.png" />
        <h1 @click="gohome">开心兔商城</h1>
      </div>
      <div class="serachbox" v-show="isSearch">
        <div class="serachinput">
          <input type="text" v-model="search" @keyup.enter="onSearch" />
          <button @click="onSearch">搜索</button>
        </div>
        <div class="btnbox">
          <span v-for="(item,index) in searchlist" :key="index" @click="onHistory(item)">{{ item }}</span>
          <!-- <span @click="onHistory(3,1)">油墨</span>|
          <span @click="onHistory(3,1)">打印纸</span>|
          <span @click="onHistory(1,3)">记号笔</span>|
          <span>档案袋</span>|
          <span>标签</span>-->
        </div>
      </div>
      <div class="visitbox" v-show="isSearch">
        <button @click="serve">
          <img src="../assets/img/home/sm.png" />
          <p>上门服务</p>
        </button>
        <!-- <Button size="large">上门服务</Button> -->
      </div>
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
      searchlist: ["油墨", "打印纸", "记号笔", "档案袋", "标签"],
    };
  },
  mounted() {
    // cate_one=3&cate_two=10
    // console.info(this.search)
  },
  methods: {
    gohome: function () {
      if (this.$route.path != "/") this.$router.push("/");
    },
    // 点击搜索
    onSearch: function () {
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
  > div:nth-child(1) {
    display: flex;
    height: 10rem;
    .happyname {
      flex: 2.5;
      display: flex;
      font-weight: 700;
      color: #ff8400;
      text-indent: 1rem;
      align-items: center;
      > img {
        cursor: pointer;
      }
      > h1 {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    .serachbox {
      flex: 2.2;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .serachinput {
        display: flex;
        > input {
          outline: 0px;
          width: 20rem;
          height: 2.5rem;
          padding-left: 0.8rem;
          border: 0.1rem solid #ff8900;
        }
        > button {
          color: #fff;
          padding: 0 1.2rem;
          background-color: #ff8900;
        }
      }
      .btnbox {
        margin-top: 0.5rem;
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
      }
    }
    .visitbox {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        display: flex;
        padding: 0.5rem 1rem;
        border: 1px solid #e6e6e6;
        > img {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>