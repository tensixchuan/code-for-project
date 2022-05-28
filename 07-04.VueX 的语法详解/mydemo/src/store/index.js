// index.js
import { createStore } from 'vuex'
// vuex 数据管理框
// vuex 创建了一个全局唯一的仓库，用来存放全局的数据
export default createStore({
    state: {
        name: 'wd'
    },
    getters: {},
    mutations: {
        // 第四步，对应的 mutation 被执行
        changeName(state, str) {
            // 第五步，在mutation中修改数据
            // this.state.name = "wang"
            state.name = str
        }
    },
    actions: {
        // 第二步，store 感知到触发了changeName 的action，执行操作
        changeName(store, str) {
            // 第三步，提交一个commit 触发一个mutation
            console.log("try to change name");
            // this.commit('changeName')
            setTimeout(() => {
                store.commit('changeName', str)
            }, 2000)
        }
    },
    modules: {}
})