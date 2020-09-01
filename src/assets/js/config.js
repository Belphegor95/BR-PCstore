var api = api || {};


// api.baseUrl = "http://121.196.123.181:3000"
api.baseUrl = "http://192.168.1.189:3000"   // 孙飞请求地址

api.monmsg = "网络遇到问题,请重试!";

api.regist = "/api/regist"  // 注册 1

api.login = "/api/login"  // 登录 1

api.selectAcc = "/api/selectAcc"  // 登录角色

api.slideshow = "/api/slideshow"  // 轮播图 1

api.homeRecommend = "/api/homeRecommend"  // 推荐商品 1

api.cate = "/api/cate"  // 分类  1

api.getCatePlist = "/api/getCatePlist"  // 获取分类商品 1

api.getHomeCate = "/api/getHomeCate"  // 首页分类入口 1

api.getYzm = "/api/getYzm"  // 获取验证码 1

api.addAddress = "/api/addAddress"  // 保存收货地址 1

api.getAllAddress = "/api/getAllAddress"  // 获取所有收货地址 1

api.editAddress = "/api/editAddress"  // 设置为默认地址 1

api.delAddress = "/api/delAddress"  // 删除收货地址 1

api.search = "/api/search"  // 搜索商品 1

api.addToShoppingCart = "/api/addToShoppingCart"  // 添加购物车 1

api.getShoppingCart = "/api/getShoppingCart"  // 购物车商品 1

api.getShoppingCartPlistCount = "/api/getShoppingCartPlistCount"  // 购物车物品个数 1

api.editShoppingCarCount = "/api/editShoppingCarCount"  // 修改购物车商品的数量 1

api.delSelectShoppingCart = "/api/delSelectShoppingCart"  // 删除购物车商品 1

api.downOrder = "/api/downOrder"  // 购物车下单 1

api.submitOrder = "/api/submitOrder"  // 提交订单 1

api.getOrderList = "/api/getOrderList"  // 获取订单 1

api.getTicket = "/api/getTicket"  // 获取优惠券 1

api.submitSuggest = "/api/submitSuggest"  // 提交意见建议

api.getYzmForChangePhone = "/api/getYzmForChangePhone"  // 换绑手机号--获取验证码 1

api.applyChangePhone = "/api/applyChangePhone"  // 申请更换手机号 1

api.changePhone = "/api/changePhone"  // 换绑手机号 1

api.logout = "/api/logout"  // 退出登录 1

api.uploadFixImg = "/api/uploadFixImg"  // 上传图片

api.getAccOrders = "/api/getAccOrders"  // 获取订货账号

export { api };