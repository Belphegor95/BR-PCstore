<!-- 收货地址 -->
<template>
  <div class="deliveryAddress">
    <h4>收货地址</h4>
    <div class="mark">收货地址</div>
    <div>新增收货地址</div>
    <div class="mark location">
      <p>
        当前地址
        <span>中国大陆</span>
      </p>
      <p>切换 ></p>
    </div>
    <div class="formbox">
      <div>
        <span>
          <b>*</b>地址信息:
        </span>
        <Input v-model="value" placeholder="Enter something..." />
      </div>
      <div>
        <span>
          <b>*</b>详细地址:
        </span>
        <Input v-model="value" placeholder="Enter something..." />
      </div>
      <div>
        <span>邮政编码:</span>
        <Input v-model="value" placeholder="Enter something..." />
      </div>
      <div>
        <span>
          <b>*</b>收货人姓名:
        </span>
        <Input v-model="value" placeholder="Enter something..." />
      </div>
      <div>
        <span>
          <b>*</b>手机号码:
        </span>
        <div>
          <Select v-model="model1" style="width:140px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
        </div>
      </div>
      <div>
        <span></span>
        <div class="default">
          <Checkbox v-model="single" />
          <p>设置默认地址</p>
        </div>
      </div>
      <div>
        <span></span>
        <div class="default">
          <Button type="warning">保存</Button>
        </div>
      </div>
    </div>
    <div class="mark" style="display: flex;align-items: center;">
      <img style="margin-right:0.5rem" src="../../assets/img/person/xiao.png" alt />
      <p>已保存了8条地址,还能保存12条地址</p>
    </div>
    <div class="listbox">
      <div>
        <div>收货人</div>
        <div>所在地址</div>
        <div>详细地址</div>
        <div>邮编</div>
        <div>电话/手机</div>
        <div>操作</div>
        <div></div>
      </div>
      <div v-for="(item,index) in 2" :key="index">
        <div>张三</div>
        <div>河南郑州市中原区建设路街道</div>
        <div>中原广告产业园2816</div>
        <div>0000</div>
        <div>86-123456789</div>
        <div>
          <span>修改</span>|
          <span>删除</span>
        </div>
        <div>设置默认地址</div>
      </div>
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
          value: 0,
          label: "中国大陆 +86",
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
      model1: 0,
      single: false,
    };
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
    padding: 0.5rem 1rem;
    color: #ff8400;
    font-size: 0.8rem;
  }
  .formbox {
    width: 28.5rem;
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
      > div {
        width: 1px;
        flex: auto;
        display: flex;
        justify-content: space-between;
      }
      .default {
        justify-content: end;
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
          margin: 0 0.3rem;
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