<!-- 添加商品 -->
<template>
  <div class="addgoods">
    <h4>申请上门维修 > 添加商品</h4>
    <div class="content">
      <ul>
        <li>
          <Upload
            multiple
            ref="upload"
            :max-size="1024"
            :on-success="upsuccess"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :action="$api.baseUrl + $api.uploadFixImg"
          >
            <Button icon="ios-cloud-upload-outline">上传商品图片</Button>
          </Upload>
        </li>
        <li v-for="(item,index) in attachPic" :key="index">
          <img :src="item.path" />
        </li>
      </ul>
      <div>
        <div>
          <span>
            <b>*</b> 设备型号
          </span>
          <Upload
            v-if="unitType == ''"
            ref="upload"
            :max-size="1024"
            :on-success="upUnitType"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :on-format-error="handleFormatError"
            :action="$api.baseUrl + $api.uploadFixImg"
          >
            <Button icon="ios-cloud-upload-outline">设备型号图片</Button>
          </Upload>
          <div class="unitTypebox" v-else>
            <span @click="unitType = ''">x</span>
            <img class="unitTypeimg" :src="unitType" />
          </div>
        </div>
        <div>
          <span>
            <b>*</b> 商品名称
          </span>
          <Input v-model="goodsName" style="width: 20rem" />
          <!-- <div>
            <img src="../../assets/img/maintain/xx.png" />
            <p>多件不同商品请分开填写,如因件数不符合产生的额外费用需本人承担</p>
          </div>-->
        </div>
        <div>
          <span>
            <b>*</b> 故障描述
          </span>
          <Input v-model="detail" type="textarea" style="width: 20rem" />
        </div>
        <div>
          <span>示例图</span>
          <ul>
            <li>
              <img src="../../assets/img/maintain/cp.png" />
              <p>维修商品细节图</p>
            </li>
            <li>
              <img src="../../assets/img/maintain/cp.png" />
              <p>维修商品细节图</p>
            </li>
            <li>
              <img src="../../assets/img/maintain/cp.png" />
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
      attachPic: [], // 上传列表
      uploadList: [], // 正在上传的图片
      unitType: "", // 设备型号图片地址
      goodsName: "", // 商品名称
      detail: "", // 故障描述
    };
  },
  mounted() {
    this.$store.commit("show_maintainid", 1);
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    advance: function () {
      if (this.attachPic.length == 0) {
        return this.$toast("商品故障图片未上传!");
      } else if (this.goodsName.trim().length == "") {
        return this.$toast("商品名称未输入!");
      } else if (this.detail.trim().length == "") {
        return this.$toast("故障描述未输入!");
      } else {
        this.$store.commit("show_maintain", {
          goodsName: this.goodsName,
          unitType: this.unitType,
          detail: this.detail,
          attachPic: JSON.stringify(this.attachPic),
        });
        this.$router.push("/maintain/promise");
      }
    },
    // 保存成功
    upsuccess: function (data) {
      if (data.code == 200) {
        data.data.path = data.data.path.replace(new RegExp("\\\\", "g"), "/");
        this.attachPic.push(data.data);
      }
    },
    // 商品型号
    upUnitType: function (data) {
      if (data.code == 200) {
        this.unitType = data.data.path.replace(new RegExp("\\\\", "g"), "/");
      }
    },
    // 上传之前
    handleBeforeUpload() {
      let check = this.uploadList.length + this.attachPic.length < 9;
      if (!check) {
        this.$toast("最多9个!");
      }
      return check;
    },
    // 上传不符合条件
    handleMaxSize(file) {
      this.$toast("文件大小超过1M!");
    },
    // 上传格式有误
    handleFormatError(file) {
      this.$toast("请上传图片格式文件!");
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
        width: 19%;
        display: flex;
        height: 12rem;
        align-items: center;
        justify-content: center;
        margin-right: 1%;
        > img {
          max-width: 100%;
          max-height: 100%;
        }
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
        .unitTypebox {
          position: relative;
          display: flex;
          > span {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            padding: 0 0.5rem;
            background-color: #fff;
          }
          // 商品型号图片
          .unitTypeimg {
            max-width: 20rem;
            max-height: 20rem;
          }
        }
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