<template>
  <div class="home">
    <shortcut />
    <div class="search_box">
      <search :isSearch="true" />
    </div>
    <div class="topbox">
      <div>
        <div>
          <img src="../assets/img/home/toptype.png" alt="" />
          <p>商 品 分 类</p>
        </div>
      </div>
    </div>
    <div class="classifybox">
      <div class="w">
        <ul class="classify">
          <li
            v-for="(item, index) in navigations"
            :key="index"
            @click="classifyClick(item)"
          >
            <div>
              <img :src="item.img_url" alt />
              <div></div>
            </div>
            <p>{{ item.name }}</p>
          </li>
          <li @click="$router.push('/maintain/maintainList')">
            <div>
              <img src="../assets/img/home/shouhou.png" />
              <div></div>
            </div>
            <p>售后及维修</p>
          </li>
        </ul>
        <Carousel
          class="Carouselbox"
          v-model="value"
          autoplay
          :autoplay-speed="5000"
          arrow="never"
        >
          <CarouselItem v-for="(item, index) in picUrls" :key="index">
            <img :src="item.picUrl" />
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <div class="recommendbox">
      <div class="tabbox">
        <p>精品推荐</p>
        <img src="../assets/img/home/bt_recommend.png" alt="" />
        <p>Elite Shop</p>
      </div>
      <!-- <tab name="精品推荐" /> -->
      <div class="recommend">
        <commodityCard
          v-for="(item, index) in recommend"
          :key="index"
          :data="item"
        />
      </div>
    </div>
    <!-- 回到顶部 -->
    <!-- <BackTop class="topbtn" >
      <div>123</div>
      <img src="../assets/img/hg.png" />
    </BackTop> -->
    <goTop />
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
import goTop from "@/components/GoTop.vue";
export default {
  components: {
    shortcut,
    search,
    goTop,
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
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
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
            this.$toast(this.ErrCode(data.msg));
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
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
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
  margin-top: 2rem;
  .topbox {
    width: 100%;
    height: 2.38rem;
    background: #ff9000;
    > div {
      > div {
        width: 23.06rem !important;
        height: 2.38rem;
        background: #ff7302;
        display: flex;
        align-items: center;
        justify-content: center;
        > p {
          font-size: 1.22rem;
          margin: 0 0.88rem;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }
  .classifybox {
    background-color: #f9f9f9;
    .w {
      display: flex;
      height: 28.13rem;
      justify-content: space-between;
      .classify {
        width: 23.06rem;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        > li:hover {
          > div {
            > div {
              background-color: rgba(255, 255, 255, 0.2);
            }
          }
        }
        > li {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          border: 1px solid #ededed;
          max-height: 10rem;
          width: 33.3%;
          cursor: pointer;
          > div {
            width: 2.9rem;
            height: 2.9rem;
            position: relative;
            > img {
              width: 100%;
            }
            > div {
              z-index: 1;
              position: absolute;
              width: 2.9rem;
              height: 2.9rem;
              top: 0;
              left: 0;
            }
          }
          > P {
            margin-top: 0.6rem;
            font-size: 1.01rem;
            font-family: SourceHanSansCN;
            font-weight: 400;
            color: #000;
          }
        }
        > li:hover {
          border: 1px solid #ff8900;
        }
      }
      .Carouselbox {
        width: 51.94rem;
        background-color: #fff;
      }
    }
  }
}
.recommendbox {
  background-color: #f9f9f9;
  padding-top: 1rem;
  .tabbox {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    > p:nth-child(1) {
      font-size: 1.62rem;
      font-family: SourceHanSansCN;
      font-weight: 500;
      color: #010101;
      margin-bottom: 0.3rem;
    }
    > p:nth-child(3) {
      margin-top: 0.3rem;
      font-size: 0.87rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #818181;
    }
  }
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
