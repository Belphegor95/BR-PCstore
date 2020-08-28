<!-- 维修下单 -->
<template>
  <div class="maintainOrders">
    <h4>申请上门维修 > 下单</h4>
    <div class="content">
      <tab name="请填写订单备注" />
      <div>
        <Input
          v-model="value"
          type="textarea"
          :rows="8"
          maxlength="200"
          placeholder="请在此处填写关于本次服务师傅需要注意的内容(200字以内)
      示例:
      1.师傅接单后请及时与客服/我预约时间, 上门前提前三小时再次确认, 避免空跑;
      2.师傅服务过程中不得随意评价产品, 若发现产品问题请引导客户及时与商家联系解决;
      3.师傅上门前必须与客服确认清楚施工环境和施工条件在进行操作;
      4.师傅服务后请提供三张以上清晰完工图片并填写服务确认单;
      5.请师傅文明服务, 不可与客户发生冲突, 有任何问题请及时反馈平台。
      "
        />
        <div>
          <img src="../../assets/img/maintain/i.png" />
          <p>温馨提示: 请勿在备注信息中填写与订单必填产品信息不符的内容, 如: 除了订单产品还要安装***、需要师傅帮忙维修***等等额外服务信息, 以免因为师傅忽略而导致交易纠纷, 一旦因此发生纠纷, 平台仲裁将以订单必填信息为准</p>
        </div>
      </div>
      <div>
        <img src="../../assets/img/maintain/xx.png" />
        <p>将订单推送给所有师傅</p>
      </div>
      <button class="nextStep">确定下单</button>
    </div>
  </div>
</template>

<script>
import tab from "@/components/Tab.vue";
export default {
  components: {
    tab,
  },
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.$store.commit("show_maintainid", 3);
  },
  methods: {
    advance: function () {
      this.$router.push("/maintain");
    },
  },
};
</script>

<style lang='less' scoped>
.maintainOrders {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    > div:nth-child(1) {
      width: 100%;
      margin-top: 1.5rem;
    }
    > div:nth-child(2) {
      padding: 1rem;
      color: #ff8400;
      > div:nth-child(2) {
        display: flex;
        margin-top: 0.5rem;
        align-items: baseline;
      }
    }
    > div:nth-child(3) {
      margin-top: 6rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: baseline;
    }
  }
}
</style>