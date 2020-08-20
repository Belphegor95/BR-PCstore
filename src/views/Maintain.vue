<!--  -->
<template>
  <div class="maintain">
    <div class="nav">
      <shortcut />
    </div>
    <div class="search_box">
      <search :isSearch="false" />
    </div>
    <div class="content">
      <div>
        <ul>
          <li>
            <div>下单引导</div>
          </li>
          <li>
            <div>
              <img src="../assets/img/maintain/wx.png" alt />
            </div>
            <div>待修类型</div>
          </li>
          <li>
            <div>
              <img src="../assets/img/maintain/sp.png" alt />
            </div>
            <div>添加商品</div>
          </li>
          <li>
            <div>
              <img src="../assets/img/maintain/khxx.png" alt />
            </div>
            <div>客户信息</div>
          </li>
          <li>
            <div>
              <img src="../assets/img/maintain/xd.png" alt />
            </div>
            <div>下单</div>
          </li>
        </ul>
        <router-view class="rightbox" />
      </div>
    </div>
  </div>
</template>

<script>
import shortcut from "@/components/Shortcut.vue";
import search from "@/components/Search.vue";
export default {
  components: {
    shortcut,
    search,
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.maintain {
  .content {
    > div {
      display: flex;
      > ul {
        flex: 1;
        margin-top: 2rem;
        position: relative;
        > li {
          padding: 0.5rem;
          font-size: 1rem;
          color: #888888;

          background-color: #fff;
          > span {
            cursor: pointer;
          }
          .active {
            color: #ff8400;
          }
          > div {
            z-index: 3;
          }
        }
        > li:nth-child(1) {
          > div {
            width: 6rem;
            height: 2.5rem;
            color: #fff;
            line-height: 2.5rem;
            text-align: center;
            border-radius: 0.3rem;
            background: #ff8400;
          }
        }
        > li:not(:first-child) {
          display: flex;
          padding: 2rem 0;
          align-items: center;
          > div:nth-child(1) {
            width: 6rem;
            display: flex;
            justify-content: center;
          }
        }
      }
      > ul:after {
        box-sizing: content-box;
        width: 1px;
        height: 100%;
        background: #ff8400;
        position: absolute;
        top: 2rem;
        left: 3rem;
        padding: 0;
        display: block;
        content: "";
        z-index: 2;
      }
      .rightbox {
        flex: 4;
      }
    }
  }
}
</style>