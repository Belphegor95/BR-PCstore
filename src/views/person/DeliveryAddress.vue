<!-- 收货地址 -->
<template>
  <div class="deliveryAddress">
    <h4>收货地址</h4>
    <div class="mark">收货地址</div>
    <div @click="addClick">新增收货地址</div>
    <div class="formbox" ref="formbox">
      <div class="kongbox"></div>
      <div class="dtbox">
        <span>
          <div class="gjcbox">
            <div>
              <span>
                <b>*</b>
                地区：
              </span>
              <Cascader
                :data="addressdata"
                v-model="address_"
                @on-change="countyClick"
                style="width: 300px"
              />
            </div>
            <div>
              <span>
                <b>*</b>
                详细地址：
              </span>
              <Input
                v-model="detail"
                placeholder="请输入详细地址"
                style="width: 300px"
              />
            </div>
            <Button @click="search">搜索</Button>
          </div>
          <baidu-map
            ak="FMxNKCVYPKKweAKH5b5Drv31Kz6pOGAg"
            class="map"
            @ready="mapReady"
          >
            <bm-local-search
              class="search"
              :keyword="keyword"
              :auto-viewport="true"
              @infohtmlset="infohtmlset"
              :location="location"
            ></bm-local-search>
          </baidu-map>
        </span>
      </div>
      <div class="xxbox">
        <div class="mark location">
          <p>
            当前地址
            <span>中国大陆</span>
          </p>
          <!-- <p>切换 ></p> -->
        </div>
        <div>
          <span> <b>*</b>地址位置: </span>
          <Input
            v-model="site"
            placeholder="请输入地址位置"
            style="width: 22.5rem"
            disabled
          />
          <Button
            style="margin-left: 1rem"
            @click="$refs.formbox.scrollTop = 480"
            >修改地址</Button
          >
        </div>
        <div>
          <span> <b>*</b>详细地址: </span>
          <Input
            v-model="address_detail"
            :maxlength="30"
            placeholder="请填写详细地址"
            style="width: 22.5rem"
          />
        </div>
        <div>
          <span> <b>*</b>收货人姓名: </span>
          <Input
            v-model="linkman"
            :maxlength="15"
            placeholder="请填写收货人姓名"
            style="width: 22.5rem"
          />
        </div>
        <div>
          <span> <b>*</b>手机号码: </span>
          <div>
            <Select v-model="model1" style="width: 7.5rem">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
            <Input
              v-model="phone"
              :maxlength="11"
              style="width: 14.5rem; margin-left: 0.5rem"
            />
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
    <div class="mark" style="display: flex; align-items: center">
      <img
        style="margin-right: 0.5rem"
        src="../../assets/img/person/xiao.png"
      />
      <p>
        已保存了{{ address.length }}条地址,还能保存{{
          12 - address.length
        }}条地址
      </p>
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
      <div v-for="(item, index) in address" :key="index">
        <div>{{ item.linkman }}</div>
        <div>{{ item.address | site }}</div>
        <div>{{ item.address_detail }}</div>
        <div>{{ item.phone }}</div>
        <div>
          <span @click="compile(item)">修改</span>|
          <span @click="deladdress(item)">删除</span>
        </div>
        <div>
          <span v-if="item.address_default == 0" @click="editAddress(item)"
            >设置默认地址</span
          >
          <span v-else style="color: #000">默认地址</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue";
import dizhi from "@/assets/js/dizhi";
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
      address_: [], // 地区
      detail: "", // 详细地址
      location: "", // BM 搜索条件
      keyword: "", // BM 搜索条件
      site: "", // 展示用地址信息
      address_detail: "", // 详细地址门牌号
      linkman: "", // 收货人姓名
      phone: "", // 收货人电话
      isDefault: false, // 是否是默认地址
      coordinate: {}, // 坐标位置 经纬度
      addressdata: dizhi.location, // 默认省市县
      istype: true, // 保存还是修改
      addressId: null, // 要修改的地址id
    };
  },
  watch: {
    phone(val) {
      this.$nextTick(() => {
        this.phone = val.replace(/[^\d]/g, "");
      });
    },
  },
  mounted() {
    // this.getprovince();
    this.getAllAddress();
    this.$store.commit("show_personid", 3);
  },
  methods: {
    // 百度地图实例生成以后
    mapReady: function () {
      let address = this.$route.query;
      if (address.is) return (this.$refs.formbox.scrollTop = 480);
      if (Object.keys(address).length != 0) return this.compile(address);
    },
    addClick: function () {
      this.istype = true;
      this.$refs.formbox.scrollTop = 480;
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
      if (this.detail == "") return this.$toast("请输入详细地址!");
      this.keyword = this.location + this.detail;
    },
    // 百度地图选择地址
    infohtmlset(a) {
      if (this.detail == "") return this.$toast("请输入详细地址!");
      this.$refs.formbox.scrollTop = 960;
      this.site = a.title;
      this.coordinate.lat = a.point.lat;
      this.coordinate.lng = a.point.lng;
    },
    // 编辑
    compile: function (a) {
      this.istype = false;
      this.$refs.formbox.scrollTop = 960;
      this.addressId = a.id;
      let addressdata = a.address.split("/");
      // 地区
      this.address_ = addressdata;
      // 详细地址
      this.detail = a.address_detail;
      // 搜寻地区
      this.location = `${addressdata[1]}${addressdata[2]}`;
      // 搜寻详细地址
      this.keyword = this.location + this.detail;
      // 经纬度
      this.coordinate.lat = a.lat;
      this.coordinate.lng = a.lng;
      // 展示用地址信息
      this.address_detail = a.address_detail;
      this.site = addressdata[3];
      this.linkman = a.linkman;
      this.phone = a.phone;
      this.isDefault = a.address_default ? true : false;
    },
    // 保存地址
    onSave() {
      if (this.address_detail.trim() == "") {
        this.$toast("详细地址未输入!");
        return;
      } else if (this.linkman.trim() == "") {
        this.$toast("收货人姓名未输入!");
        return;
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$toast("手机号输入有误");
        return;
      }
      // 如果是修改
      if (!this.istype) return this.editAddress();
      this.axios
        .post(this.$api.addAddress, {
          linkman: this.linkman,
          phone: this.phone,
          address: `${this.address_[0]}/${this.address_[1]}/${this.address_[2]}/${this.site}`,
          address_detail: this.address_detail,
          lat: this.coordinate.lat,
          lng: this.coordinate.lng,
          address_default: this.isDefault ? 1 : 0,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$refs.formbox.scrollTop = 0;
            this.getAllAddress();
            this.$toast("地址保存成功!");
            // 如果是订单过来的 跳转到  订单
            let address = this.$route.query;
            if (Object.keys(address).length != 0) return this.$router.go(-1);
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
              this.$toast(this.$api.monmsg);
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
      let obj = new Object();
      if (item) {
        obj = {
          addressId: item.id,
          phone: item.phone,
          linkman: item.linkman,
          address: item.address,
          address_detail: item.address_detail,
          lat: item.lat,
          lng: item.lng,
          address_default: 1, //1 设置为默认地址
        };
      } else {
        obj = {
          addressId: this.addressId,
          phone: this.phone,
          linkman: this.linkman,
          address: `${this.address_[0]}/${this.address_[1]}/${this.address_[2]}`,
          address_detail: this.site,
          lat: this.coordinate.lat,
          lng: this.coordinate.lng,
          address_default: this.isDefault ? 1 : 0,
        };
      }

      this.axios
        .post(this.$api.editAddress, obj)
        .then((data) => {
          if (data.code == 200) {
            this.$refs.formbox.scrollTop = 0;
            // 如果是订单过来的 跳转到  订单
            let address = this.$route.query;
            if (Object.keys(address).length != 0) return this.$router.go(-1);
            this.getAllAddress();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
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
    // getprovince: function () {
    //   for (let key in cityData.province_list) {
    //     let obj = new Object();
    //     obj.value = cityData.province_list[key];
    //     obj.label = cityData.province_list[key];
    //     obj.id = key;
    //     obj.children = [];
    //     this.addressdata.push(obj);
    //   }
    //   this.getcity();
    // },
    // getcity: function () {
    //   for (let i = 0; i < this.addressdata.length; i++) {
    //     let item = this.addressdata[i];
    //     for (let key in cityData.city_list) {
    //       let obj = new Object();
    //       obj.value = cityData.city_list[key];
    //       obj.label = cityData.city_list[key];
    //       obj.id = key;
    //       obj.children = [];
    //       if (obj.id.substring(0, 2) == item.id.substring(0, 2)) {
    //         item.children.push(obj);
    //       }
    //     }
    //   }
    //   this.getcounty();
    // },
    // getcounty: function () {
    //   for (let i = 0; i < this.addressdata.length; i++) {
    //     let item = this.addressdata[i];
    //     for (let j = 0; j < item.children.length; j++) {
    //       let itemj = item.children[j];
    //       for (let key in cityData.county_list) {
    //         let obj = new Object();
    //         obj.value = cityData.county_list[key];
    //         obj.label = cityData.county_list[key];
    //         obj.id = key;
    //         if (obj.id.substring(0, 2) == item.id.substring(0, 2)) {
    //           if (obj.id.substring(2, 4) == itemj.id.substring(2, 4)) {
    //             itemj.children.push(obj);
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
  },
  filters: {
    site: function (value) {
      // 替换地址 /
      return value.replace(/\//g, "");
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
    height: 30rem;
    overflow-y: auto;
    overflow: hidden;
    > .kongbox {
      height: 30rem;
    }
    > .xxbox {
      height: 30rem;
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
      height: 30rem;
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
      // 所在地址
      > div:nth-child(2) {
        flex: 1.5;
      }
      // 详细地址
      > div:nth-child(3) {
        flex: 2;
      }
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