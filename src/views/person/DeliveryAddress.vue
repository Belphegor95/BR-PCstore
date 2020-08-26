<!-- 收货地址 -->
<template>
  <div class="deliveryAddress">
    <h4>收货地址</h4>
    <div class="mark">收货地址</div>
    <div @click="addClick">新增收货地址</div>
    <div class="formbox">
      <div class="dtbox" v-show="isadd == 1">
        <span>
          <div class="gjcbox">
            <div>
              <span>
                <b>*</b>
                地区：
              </span>
              <Cascader :data="addressdata" v-model="address_" @on-change="countyClick" style="width: 300px" />
            </div>
            <div>
              <span>
                <b>*</b>
                详细地址：
              </span>
              <Input v-model="detail" placeholder="请输入详细地址" style="width: 300px" />
            </div>
            <Button @click="search">搜索</Button>
          </div>
          <baidu-map ak="FMxNKCVYPKKweAKH5b5Drv31Kz6pOGAg" class="map">
            <bm-local-search class="search" :keyword="keyword" :auto-viewport="true" @infohtmlset="infohtmlset" :location="location"></bm-local-search>
          </baidu-map>
        </span>
      </div>
      <div class="xxbox" v-show="isadd == 2">
        <div class="mark location">
          <p>
            当前地址
            <span>中国大陆</span>
          </p>
          <!-- <p>切换 ></p> -->
        </div>
        <div>
          <span>
            <b>*</b>地址信息:
          </span>
          <Input v-model="site" placeholder="请输入地址信息" style="width: 22.5rem" disabled />
          <Button style="margin-left:1rem" @click="isadd = 1">修改地址</Button>
        </div>
        <div>
          <span>
            <b>*</b>收货人姓名:
          </span>
          <Input v-model="linkman" placeholder="请填写收货人姓名" style="width: 22.5rem" />
        </div>
        <div>
          <span>
            <b>*</b>手机号码:
          </span>
          <div>
            <Select v-model="model1" style="width:7.5rem">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="phone" style="width: 14.5rem;margin-left:0.5rem" />
          </div>
        </div>

        <div>
          <span></span>
          <div class="default">
            <Checkbox v-model="isDefault" />
            <p>设置默认地址</p>
          </div>
        </div>
        <div>
          <span></span>
          <div class="default">
            <Button type="warning" @click="onSave">保存</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="mark" style="display: flex;align-items: center;">
      <img style="margin-right:0.5rem" src="../../assets/img/person/xiao.png" alt />
      <p>已保存了{{ address.length }}条地址,还能保存{{ 12 - address.length }}条地址</p>
    </div>
    <div class="listbox">
      <div>
        <div>收货人</div>
        <div>所在地址</div>
        <div>详细地址</div>
        <div>电话/手机</div>
        <div>操作</div>
        <div></div>
      </div>
      <div v-for="(item,index) in address" :key="index">
        <div>{{ item.linkman }}</div>
        <div>{{ item.address }}</div>
        <div>{{ item.address_detail }}</div>
        <div>{{ item.phone }}</div>
        <div>
          <span>修改</span>|
          <span @click="deladdress(item)">删除</span>
        </div>
        <div>
          <span v-if="item.address_default" @click="editAddress(item)">设置默认地址</span>
          <span v-else style="color: #000">默认地址</span>
        </div>
        <!-- <div>{{ item.address_default ? "设置默认地址" :"默认地址" }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue";
import cityData from "../../assets/js/cityData";
export default {
  components: {
    BaiduMap,
    BmLocalSearch,
  },
  data() {
    return {
      cityList: [
        {
          value: 0,
          label: "中国大陆 +86",
        },
      ], // 电话地址
      address: [], // 地址集合
      model1: 0,
      detail: "", // 用户输入搜索条件
      location: "", // BM 搜索条件
      keyword: "", // BM 搜索条件
      site: "", // 展示用地址信息
      address_: [], // 省市县地址
      linkman: "", // 收货人姓名
      phone: "", // 收货人电话
      isDefault: false, // 是否是默认地址
      coordinate: {}, // 坐标位置 经纬度
      addressdata: [], // 默认省市县
      isadd: 0, // 收货地址添加的状态
    };
  },
  mounted() {
    this.getprovince();
    this.getAllAddress();
    this.$store.commit("show_personid", 3);
    let addressid = this.$route.query.id;
    if (addressid) this.compile(addressid);
    // console.info(addressid);
  },
  methods: {
    addClick: function () {
      this.isadd = 1;
      this.detail = "";
      this.location = "";
      this.keyword = "";
      this.site = "";
      this.address_ = [];
      this.linkman = ""; // 收货人姓名
      this.phone = ""; // 收货人电话
      this.isDefault = false; // 是否是默认地址
      this.coordinate = {}; // 坐标位置 经纬度
    },
    // 县选择后
    countyClick: function (value) {
      this.location = `${value[1]}${value[2]}`;
    },
    // 点击搜索
    search: function () {
      this.keyword = this.location + this.detail;
    },
    // 百度地图选择地址
    infohtmlset(a) {
      this.isadd = 2;
      this.site = a.title;
      this.coordinate = a;
    },
    // 编辑
    compile: function () {
      this.isadd = 1;
      for (let i = 0;i < this.address.length;i++) {
        console.info(i)
      }
    },
    // 保存地址
    onSave() {
      this.axios
        .post(this.$api.addAddress, {
          linkman: this.linkman,
          phone: this.phone,
          address: `${this.address_[0]}/${this.address_[1]}/${this.address_[2]}`,
          address_detail: this.site,
          lat: this.coordinate.point.lat,
          lng: this.coordinate.point.lng,
          address_default: this.isDefault ? 1 : 0,
        })
        .then((data) => {
          if (data.code == 200) {
            this.isadd = 0;
            this.getAllAddress();
            this.$toast("地址保存成功!");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 删除地址
    deladdress: function (item) {
      this.$layer.confirm(
        "你确定要删除吗?",
        {
          btn: ["确定", "取消"], //按钮
        },
        (index) => {
          this.axios
            .post(this.$api.delAddress, {
              addressId: item.id,
            })
            .then((data) => {
              if (data.code == 200) {
                this.$toast("删除成功!");
                this.getAllAddress();
              } else {
                this.$toast(this.ErrCode(data.msg));
              }
            })
            .catch(() => {
              this.$toast.fail(this.$api.monmsg);
            });
          this.$layer.close(index);
        },
        (index) => {
          this.$layer.close(index);
        }
      );
    },
    // 保存修改地址
    editAddress: function (item) {
      this.axios
        .post(this.$api.editAddress, {
          addressId: item.id,
          phone: item.phone,
          linkman: item.linkman,
          address: item.address,
          address_detail: item.address_detail,
          address_default: 1, //1 设置为默认地址
        })
        .then((data) => {
          if (data.code == 200) {
            this.getAllAddress();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 获取用户所有地址
    getAllAddress: function () {
      this.axios
        .post(this.$api.getAllAddress)
        .then((data) => {
          if (data.code == 200) {
            this.address = data.data;
            for (let i = 0; i < this.address.length; i++) {
              let item = this.address[i];
              // 默认地址展示
              if (item.address_default == 1) {
                // this.default_ = i;
                // 排序 把默认地址第一个
                let obj = item;
                this.address.splice(i, 1);
                this.address.unshift(obj);
                break;
              }
            }
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 处理地址数据
    getprovince: function () {
      for (let key in cityData.province_list) {
        let obj = new Object();
        obj.value = cityData.province_list[key];
        obj.label = cityData.province_list[key];
        obj.id = key;
        obj.children = [];
        this.addressdata.push(obj);
      }
      this.getcity();
    },
    getcity: function () {
      for (let i = 0; i < this.addressdata.length; i++) {
        let item = this.addressdata[i];
        for (let key in cityData.city_list) {
          let obj = new Object();
          obj.value = cityData.city_list[key];
          obj.label = cityData.city_list[key];
          obj.id = key;
          obj.children = [];
          if (obj.id.substring(0, 2) == item.id.substring(0, 2)) {
            item.children.push(obj);
          }
        }
      }
      this.getcounty();
    },
    getcounty: function () {
      for (let i = 0; i < this.addressdata.length; i++) {
        let item = this.addressdata[i];
        for (let j = 0; j < item.children.length; j++) {
          let itemj = item.children[j];
          for (let key in cityData.county_list) {
            let obj = new Object();
            obj.value = cityData.county_list[key];
            obj.label = cityData.county_list[key];
            obj.id = key;
            if (obj.id.substring(0, 2) == item.id.substring(0, 2)) {
              if (obj.id.substring(2, 4) == itemj.id.substring(2, 4)) {
                itemj.children.push(obj);
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.deliveryAddress {
  flex: 4;
  .mark {
    background-color: #f5f5f5;
    border: 1px solid #e6e6e6;
    padding: 0.5rem 1rem;
  }
  .location {
    width: 28.5rem;
    display: flex;
    font-size: 0.8rem;
    justify-content: space-between;
    > p:nth-child(1) {
      color: #999;
      > span {
        padding-left: 0.5rem;
        color: #666;
      }
    }
    > p:nth-child(2) {
      color: #ff8400;
    }
  }
  > div {
    margin-top: 1rem;
  }
  > div:nth-child(3) {
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: #ff8400;
    font-size: 0.8rem;
  }
  .formbox {
    margin: 0;
    min-height: 30rem;
    > .xxbox {
      padding-top: 1rem;
      > div {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        > span {
          width: 5.5rem;
          text-align: right;
          margin-right: 0.5rem;
          > b {
            color: #ff8400;
          }
        }
        .default {
          display: flex;
        }
      }
    }
    > .dtbox {
      > span {
        width: 100%;
        height: 30rem;
        display: block;
        position: relative;
        .gjcbox {
          padding: 0.5rem;
          display: flex;
          > div {
            display: flex;
            align-items: center;
          }
          > button {
            margin-left: 1.5rem;
          }
        }
        .map {
          width: 75%;
          height: 25rem;
          float: right;
          .search {
            width: 25%;
            height: 25rem;
            position: absolute;
            top: 3rem;
            left: 0;
            overflow-y: auto;
            // overflow: hidden;
            > div {
              height: 25rem;
            }
          }
        }
        b {
          margin-left: 1rem;
          color: #ff8400;
        }
      }
    }
  }
  .listbox {
    margin-bottom: 2rem;
    border: 1px solid #e6e6e6;
    > div:nth-child(1) {
      display: flex;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e6e6e6;
      > div {
        flex: 1;
        padding: 0.5rem;
      }
    }
    > div {
      display: flex;
      border-bottom: 1px solid #e6e6e6;
      > div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e6e6e6;
        padding: 1rem 0.5rem;
        > span {
          cursor: pointer;
          margin: 0 0.3rem;
        }
        > span:hover {
          color: #ff8900;
        }
      }
      > div:last-child {
        border: none;
        color: #ff8400;
      }
    }
    > div:last-child {
      border: none;
    }
  }
}
</style>

<style>
.deliveryAddress .ivu-select-selection {
  border-radius: 0;
}
</style>