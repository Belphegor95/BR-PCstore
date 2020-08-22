<!-- 添加商品 -->
<template>
  <div class="addgoods">
    <h4>申请上门维修 > 添加商品</h4>
    <div class="content">
      <ul>
        <li>
          <Upload :show-upload-list="false" action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </li>
        <li>
          <img src="../../assets/img/maintain/cp.png" alt />
        </li>
      </ul>
      <div>
        <div>
          <span>
            <b>*</b> 商品类别
          </span>
          <Select v-model="model1" style="width:20rem">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div>
          <span>
            <b>*</b>商品数量
          </span>
          <Input v-model="value" placeholder="Enter something..." style="width: 20rem" />件
          <div>
            <img src="../../assets/img/maintain/xx.png" alt />
            <p>多件不同商品请分开填写,如因件数不符合产生的额外费用需本人承担</p>
          </div>
        </div>
        <div>
          <span>
            <b>*</b>故障描述
          </span>
          <Input v-model="value" type="textarea" placeholder="Enter something..." style="width: 20rem" />
        </div>
        <div>
          <span>示例图</span>
          <ul>
            <li>
              <img src="../../assets/img/maintain/cp.png" alt />
              <p>维修商品细节图</p>
            </li>
            <li>
              <img src="../../assets/img/maintain/cp.png" alt />
              <p>维修商品细节图</p>
            </li>
            <li>
              <img src="../../assets/img/maintain/cp.png" alt />
              <p>维修商品细节图</p>
            </li>
          </ul>
        </div>
      </div>
      <button class="nextStep" @click="advance">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
        {
          value: "Ottawa",
          label: "Ottawa",
        },
        {
          value: "Paris",
          label: "Paris",
        },
        {
          value: "Canberra",
          label: "Canberra",
        },
      ],
      model1: "",
    };
  },
  mounted() {
    this.$store.commit("show_maintainid", 1);
  },
  methods: {
    advance: function () {
      this.$router.push("/maintain/promise");
    },
  },
};
</script>

<style lang='less' scoped>
.addgoods {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    > ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #ededed;
      > li {
        width: 20%;
        display: flex;
        height: 12rem;
        align-items: center;
        justify-content: center;
      }
    }
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 35rem;
        margin-top: 1rem;
        > span {
          display: inline-block;
          width: 5rem;
          > b {
            color: #ff8500;
          }
        }
        > div:nth-child(3) {
          padding-left: 5rem;
          padding-top: 0.5rem;
          display: flex;
          align-items: baseline;
          > p {
            width: 18rem;
          }
        }
        > ul {
          display: flex;
          > li {
            width: 7rem;
            display: flex;
            align-items: baseline;
            flex-direction: column;
            > p {
              margin-top: 0.5rem;
            }
          }
        }
      }
    }
    .nextStep {
      margin-top: 3rem;
    }
  }
}
</style>