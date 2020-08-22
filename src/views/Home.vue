<template>
  <div class="home">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="true" />
    </div>
    <div class="classifybox">
      <div class="w">
        <div class="classify">
          <div>商品分类</div>
          <ul>
            <li v-for="(item,index) in 11" :key="index">文件管理</li>
          </ul>
        </div>
        <Carousel class="Carouselbox" v-model="value" autoplay :autoplay-speed="5000" arrow="never">
          <CarouselItem>
            <img src="../assets/img/home/banner.png" alt />
            <!-- <div class="demo-carousel">1</div> -->
          </CarouselItem>
          <CarouselItem>
            <img src="../assets/img/home/banner.png" alt />
            <!-- <div class="demo-carousel">2</div> -->
          </CarouselItem>
          <CarouselItem>
            <img src="../assets/img/home/banner.png" alt />
            <!-- <div class="demo-carousel">3</div> -->
          </CarouselItem>
          <CarouselItem>
            <img src="../assets/img/home/banner.png" alt />
            <!-- <div class="demo-carousel">4</div> -->
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <div class="recommendbox">
      <tab name="精品推荐" />
      <div class="recommend">
        <commodityCard v-for="(item,index) in 20" :key="index" />
      </div>
    </div>
    <!-- 回到顶部 -->
    <BackTop class="topbtn">
      <img src="../assets/img/hg.png" alt />
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
    };
  },
  
};
</script>

<style lang="less" scoped>
.home {
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
            padding: 2.48rem 0;
            align-items: center;
            justify-content: center;
            border: 1px dashed #ededed;
            width: 33.3%;
            cursor: pointer;
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
  padding-top: 1rem;
  .recommend {
    display: flex;
    flex-wrap: wrap;
    padding-top: 1rem;
    justify-content: space-around;
    > div {
      margin-bottom: 1rem;
    }
  }
}
.bottombox {
  padding-top: 2rem;
}
.topbtn {
  width: 3rem !important;
}
// @media screen and (max-width: 1350px) {
//   .home {
//     > div {
//       width: 100%;
//       > div {
//         width: 65rem;
//         margin: auto;
//       }
//     }
//     .classifybox {
//       .w {
//         // .classify {
//         //   width: 20rem;
//         // }
//         .Carouselbox {
//           width: 44rem;
//         }
//       }
//     }
//   }
// }
</style>
