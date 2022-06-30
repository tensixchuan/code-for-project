import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // shopId: { // 第一层级是商铺的id
      //   // 第二层是商品id
      //   // 第二层内容是商品内容及购物数量
      //   productId: {
      //     _id: '1',
      //     name: '番茄 250g/份',
      //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //     sales: 327,
      //     price: 5.8,
      //     oldPrice: 9.9,
      //     count: 2
      //   }
      // },
      // 2: { // shop_id
      //   _id: '2',
      //   name: '车厘子 500g/份',
      //   imgUrl: 'http://www.dell-lee.com/imgs/vue3/cherry.png',
      //   sales: 135,
      //   price: 69.9,
      //   oldPrice: 119.9
      // }
    }
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      console.log(shopId)
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += num
      product.count = product.count < 0 ? 0 : product.count
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      console.log(shopInfo, product)
    }
  },
  actions: {
  },
  modules: {
  }
})
