<!-- 待修类型 -->
<template>
  <div class="chooseType">
    <h4>申请上门维修 > 客户信息</h4>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div>
            <img :src="item.img" />
            <p>{{ item.name }}</p>
          </div>
        </li>
      </ul>
      <button class="nextStep" @click="advance">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "电脑",
          img: require("../../assets/img/maintain/dn.png"),
        },
        {
          name: "打印机",
          img: require("../../assets/img/maintain/dyj.png"),
        },
        {
          name: "监控",
          img: require("../../assets/img/maintain/jk.png"),
        },
        {
          name: "弱电",
          img: require("../../assets/img/maintain/rd.png"),
        },
        {
          name: "其他",
          img: require("../../assets/img/maintain/qt.png"),
        },
      ],
    };
  },
  mounted() {
    this.$store.commit("show_maintainid", 0);
  },
  methods: {
    advance: function () {
      this.$router.push("/maintain/addGoods");
    },
  },
};
</script>

<style lang='less' scoped>
.chooseType {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    > ul {
      width: 100%;
      display: flex;
      > li {
        flex: 1;
        padding: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        > div {
          cursor: pointer;
          width: 5rem;
          height: 5rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          border: 1px solid #fff;
          > p {
            margin-top: 0.3rem;
            text-align: center;
          }
        }
        > div:hover {
          color: #ff8400;
          // border: 1px solid #ff8400;
        }
      }
    }
    .nextStep {
      margin-top: 10rem;
    }
  }
}
</style>