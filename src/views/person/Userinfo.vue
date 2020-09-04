<!-- 个人资料 -->
<template>
  <div class="userinfo">
    <h4>个人中心</h4>
    <div class="userbox">
      <div>
        <div>
          <span class="tximg"></span>
          <div class="usernamebox">
            <div>
              {{ user.companyName ? user.companyName: '暂无' }}
              <div :style="is ? 'background-color:#fff':''" class="xgbox">
                <b @click="is= !is">修改</b>
                <div v-if="is">
                  <div>
                    <Input v-model="name" style="width:11rem" placeholder="用户名" />
                    <Button>确定</Button>
                    <Button @click="is = false">取消</Button>
                  </div>
                  <div>
                    <img src="../../assets/img/guide/i.png" />
                    <p>建议输入公司名称</p>
                  </div>
                </div>
              </div>
            </div>
            <p>(taobaoxiaonao)</p>
          </div>
        </div>
        <div>
          <p>我的收货地址</p>
        </div>
        <div>我的优惠券</div>
      </div>
      <div>
        <div>
          <span>待付款</span>
        </div>
        <div>
          <span>待收货</span>
        </div>
        <div>
          <span>上门维修单</span>
        </div>
      </div>
    </div>
    <div class="usersign">
      <img src="../../assets/img/person/wl.png" />
      <p>我的物流</p>
    </div>
    <div class="userorder">
      <div v-for="(item,index) in 2" :key="index">
        <div>
          <p>订单号: 34234648945641</p>
          <p>商品号: 12312345874554</p>
          <p>收货地址: 河南省郑州市中原区科学大道</p>
        </div>
        <div>
          <div class="waybox">
            <span></span>
            <span></span>
          </div>
          <div>
            <div>
              <p>时间: 11:00</p>
              <p>动态: 骑手已接单</p>
            </div>
            <div>
              <p>时间: 11:00</p>
              <p>动态: 仓库打包</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      name: "",
      is: false,
    };
  },
  mounted() {
    this.$store.commit("show_personid", 0);
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.userinfo {
  flex: 4;
  > div {
    margin-top: 1rem;
    border: 1px solid #ececec;
  }
  // 用户信息
  .userbox {
    width: 100%;
    > div:nth-child(1) {
      display: flex;
      padding: 0.5rem;
      background-color: #f5f5f5;
      > div {
        flex: 1;
        display: flex;
        align-items: center;
      }
      > div:nth-child(1) {
        .tximg {
          display: inline-block;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: #000;
        }
        .usernamebox {
          display: flex;
          text-indent: 1.3rem;
          flex-direction: column;
          > div {
            display: flex;
          }
          .xgbox {
            width: 5rem;
            display: flex;
            justify-content: center;
            position: relative;
            text-indent: 0;
            > b {
              cursor: pointer;
              font-weight: 400;
              color: #ff8400;
              border-bottom: none;
            }
            > div {
              padding: 1rem;
              width: 22rem;
              height: 5.5rem;
              background: #fff;
              display: flex;
              border: 1px solid #eee;
              flex-direction: column;
              justify-content: space-between;
              position: absolute;
              top: 1.3rem;
              left: 0;
              > div:nth-child(1) {
                > button {
                  margin-left: 0.5rem;
                }
              }
              > div:nth-child(2) {
                display: flex;
                align-items: center;
                color: #515a6e;
                > img {
                  margin-right: 0.3rem;
                }
              }
            }
          }
        }
      }
    }
    > div:nth-child(2) {
      display: flex;
      > div {
        flex: 1;
        padding: 0.8rem 1rem;
        > span {
          width: 100%;
          text-align: center;
          display: inline-block;
          border-right: 1px solid #e9e9e9;
        }
      }
      > div:nth-child(3) > span {
        border: none;
      }
    }
  }
  // 我的物流
  .usersign {
    display: flex;
    padding: 0.5rem;
    background: #f5f5f5;
    > img {
      width: 1.6rem;
      margin-right: 1rem;
    }
  }
  // 订单信息
  .userorder {
    margin-bottom: 3rem;
    > div {
      display: flex;
      font-size: 0.8rem;
      line-height: 1.3rem;
      padding: 1rem 2rem;
      align-items: center;
      > div {
        flex: 1;
      }
      // 订单信息
      > div:nth-child(1) {
        border-right: 1px solid #e9e9e9;
      }
      // 订单物流
      > div:nth-child(2) {
        display: flex;
        // padding-left: 8rem;
        // 路径
        > .waybox {
          width: 0.15rem;
          margin-left: 6rem;
          position: relative;
          margin-right: 1rem;
          background: #dddddd;
          > span {
            display: inline-block;
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
            background: #dddddd;
            position: absolute;
            left: -0.3rem;
          }
          > span:nth-child(1) {
            top: 0.9rem;
          }
          > span:nth-child(2) {
            top: 4.3rem;
          }
        }
        // 动态
        > div:nth-child(2) {
          > div:nth-child(1) {
            margin-bottom: 1rem;
          }
        }
      }
    }
    > div:nth-child(1) {
      border-bottom: 1px solid #e9e9e9;
    }
  }
}
</style>