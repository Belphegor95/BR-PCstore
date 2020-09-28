<template>
  <div class="home">
    <shortcut />
    <div class="search_box">
      <search :isSearch="true" />
    </div>
    <div class="classifybox">
      <div class="w">
        <div class="classify">
          <div>商品分类</div>
          <ul>
            <li v-for="(item,index) in navigations" :key="index" @click="classifyClick(item)">
              <img :src="item.img_url" alt />
              <p>{{ item.name }}</p>
            </li>
            <li @click="$router.push('/maintain/maintainList');">
              <img src="../assets/img/home/shouhou.png" />
              <p>售后及维修</p>
            </li>
          </ul>
        </div>
        <Carousel class="Carouselbox" v-model="value" autoplay :autoplay-speed="5000" arrow="never">
          <CarouselItem v-for="(item,index) in picUrls" :key="index">
            <img :src="item.picUrl" />
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <div class="recommendbox">
      <tab name="精品推荐" />
      <div class="recommend">
        <commodityCard v-for="(item,index) in recommend" :key="index" :data="item" />
      </div>
    </div>
    <!-- 回到顶部 -->
    <BackTop class="topbtn">
      <img src="../assets/img/hg.png" />
    </BackTop>
    <div class="bottombox">
      <guarantee />
      <statement />
    </div>
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import search from "@/components/Search.vue";
import tab from "@/components/Tab.vue";
import commodityCard from "@/components/CommodityCard.vue";
import guarantee from "@/components/Guarantee.vue";
import statement from "@/components/Statement.vue";

export default {
  components: {
    shortcut,
    search,
    tab,
    commodityCard,
    guarantee,
    statement,
  },
  data() {
    return {
      value: 0,
      picUrls: [],
      navigations: [],
      recommend: [],
    };
  },
  mounted() {
    this.getswipeImg();
    this.getHomeCate();
    this.gethomeRecommend();
  },
  methods: {
    // 轮播图
    getswipeImg: function () {
      this.axios
        .get(this.$api.slideshow)
        .then((data) => {
          if (data.code == 200) {
            this.picUrls = data.data;
          } else {
            // this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          // this.$toast(this.$api.monmsg);
        });
    },
    // 首页分类入口
    getHomeCate: function () {
      this.axios
        .post(this.$api.getHomeCate)
        .then((data) => {
          if (data.code == 200) {
            this.navigations = data.data;
          } else {
            // this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 精品推荐
    gethomeRecommend: function () {
      this.axios
        .get(this.$api.homeRecommend)
        .then((data) => {
          if (data.code == 200) {
            this.recommend = data.data;
          } else {
            // this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          // this.$toast(this.$api.monmsg);
        });
    },
    classifyClick: function (data) {
      this.$router.push({
        path: "/classify",
        query: data,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-top: 38px;
  .classifybox {
    background-color: #f9f9f9;
    .w {
      display: flex;
      justify-content: space-between;
      .classify {
        width: 20rem;
        > div {
          height: 3rem;
          display: flex;
          color: #fff;
          align-items: center;
          justify-content: center;
          background-color: #ff8900;
        }
        > ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          background-color: #fff;
          > li {
            display: flex;
            height: 6rem;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            border: 1px dashed #ededed;
            width: 33.3%;
            cursor: pointer;
            > img {
              width: 2rem;
              margin-bottom: 0.5rem;
            }
          }
          > li:hover {
            border: 1px dashed #ff8900;
          }
        }
      }
      .Carouselbox {
        width: 54rem;
        background-color: #fff;
      }
    }
  }
}
.recommendbox {
  background-color: #f9f9f9;
  padding-top: 1rem;
  .recommend {
    // background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding-top: 1rem;
    // justify-content: space-around;
    > div {
      margin-bottom: 1rem;
    }
  }
}
.bottombox {
  // background-color: #f9f9f9;
  padding-top: 2rem;
}
.topbtn {
  width: 3rem !important;
}
</style>
