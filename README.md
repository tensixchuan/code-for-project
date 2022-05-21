# code-for-project

## 第1章 Vue 语法初探

### 1-1 Vue实例的创建

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello world</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id='root'></div>
</body>
<script>
    Vue.createApp({
        data() {
            return {
                content: 1
            }
        },
        mounted() {
            setInterval(() => {
                // this.content += 1
                this.$data.content += 1
            }, 1000)

        },
        template: '<div>{{content}}</div>'
    }).mount('#root');
</script>

</html>
```

1. ！+ Tab 创建h5，header插入 <script src="https://unpkg.com/vue@next"></script>
2. body加入Dom元素
3. 创建Vue实例，Vue.createApp({})，data为数据层，template为视图层
4.  .mount() 挂载到Dom中, '#root', 指定放在id为root的元素中

const vm = vue.mount("....")  mount会返回Vue实例本身，也就是{}里的内容，所以还可以通过`vm.$data.content`来直接访问和修改数据

### 1-2 字符串反转

```
 Vue.createApp({
        data() {
            return {
                show: true,
                content: 'hello world'
            }
        },
        methods: {
            handleBtnClick() {
                this.show = !this.show
            }
        },
        // v-on 绑定事件
        template: `
        <div>
            <span v-if = 'show'>{{content}}</span>
            <button v-on:click="handleBtnClick">显示/隐藏</button>
        </div>
        `
    }).mount('#root')
```

`v-on:click="handleBtnClick"`绑定methods中的`handleBtnClick`方法为点击事件，methods中函数可通过`this.`访问data中的数据，模板中可通过`{{}}`插值表达式访问data中的数据

### 1-3 编写TodoList小功能，了解循环和双向绑定

```
Vue.createApp({
        data() {
            return {
                inputValue: "",
                deleteIndex: -1,
                list: []
            }
        },
        methods: {
            handleAddItem() {
                if (!this.inputValue) return
                this.list.push(this.inputValue)
                this.inputValue = ""
            },
            handleClear() {
                this.list = []
            }
        },
        // v-on 绑定事件
        template: `
        <div>
            <input v-model="inputValue"/>
            <button v-on:click="handleAddItem">增加</button>
            <ul>
                <li v-for="(item,index) of list">{{index+1}}: {{item}} </li>
                
            </ul>
            <button v-on:click="handleClear">清空</button>
        </div>
        
        `
    }).mount('#root')
```

### 1-4 组件概念初探，对TodoList进行组件代码拆分

```
const app = Vue.createApp({
        data() {
            return {
                inputValue: "",
                deleteIndex: -1,
                list: []
            }
        },
        methods: {
            handleAddItem() {
                if (!this.inputValue) return
                this.list.push(this.inputValue)
                this.inputValue = ""
            },
            handleClear() {
                this.list = []
            }
        },
        // v-on 绑定事件
        template: `
        <div>
            <input v-model="inputValue"/>
            <button v-on:click="handleAddItem">增加</button>
            <ul>
                <todo-item v-for="(item, idx) of list" 
                v-bind:content='item'
                v-bind:index='idx'/>
                
            </ul>
            <button v-on:click="handleClear">清空</button>
        </div>
        
        `
    })
    app.component('todo-item', {
        props: ['content', 'index'],
        template: '<li>{{index+1}}: {{content}}</li>'
    })
    app.mount('#root')
```

使用app.component()在Vue实例app上定义组件，第一个参数为组件在 vue 模板中的标签名，第二个参数为一个对象，定义组件的模板、接收参数等。可以通过`<组件名/>`标签添加到 vue 中

vue通过v-for遍历数组元素，利用v-bind将data中的值传递到组件中，组件用props接收收到的变量

## 第2章 Vue 基础语法

### 2-1 生命周期函数

生命周期函数是在某一时刻立即执行的函数，可以直接在定义的Vue中重写，和data、template、methods等并列

1. **beforeCreate**：在实例生成前自动执行的函数
2. **created**：实例生成后自动执行的函数
3. **beforeMount**：在组件内容被渲染到页面前自动执行的函数
4. **mounted**：在组件内容被渲染到页面之后自动执行的函数
5. **beforeUpdate**：数据变化时立即自动执行，此时页面还未重新渲染，通过Dom访问到的值还是旧的
6. **updated**：数据变化，页面重新渲染后立即执行
7. **beforeUnmount**：vue 应用失效时，自动执行的函数，此时页面还未被销毁，还可以访问到旧的Dom元素
8. **unmounted**：vue 应用失效，且dom完全销毁之后自动执行的函数

### 2-2 常用模板语法

常用指令及修饰符：

- #### **v-html** 

**作用：**通过html方式展示变量

**eg:**   `<div v-html="htmlMssage"></div>`

- ####  **v-bind**

**作用：**绑定值 

**eg:**  `<div v-bind:title="message">hello world</div>`

​		`<input v-bind:disabled = "disable"/>`

 **简写：** 可以用`:`代替，例如：`<input :disabled = "disable"/>`

- ####  v - once

 **作用：**只使用一次变量，后续数据发生变化也不会重新渲染 

**eg:** `<div v-once>{{message}}</div>`

- ####  v-if 

**作用：**是否展示 

**eg:** `<div v-if="show">{{message}}</div>`

- ####  v-on 

**作用：**绑定事件，事件写在methods中

**eg:**  `<div v-on:click="handleClick">{{message}}</div>` 

**简写：**  可以用`@`代替，例如：<div @click="handleClick">{{message}}</div> 

- #### []

**作用：**动态属性，属性值由data中的属性值决定，v-on v-bind都可以使用动态属性

**eg:** `<div @[event]="handleClick" :[name]="message">{{message}}</div>` 

- ####  .prevent 修饰符

**作用：**阻止默认行为

**eg：**`<form action="https://www.baidu.com" @click.prevent ="handleClick">  <button>提交</button><form/>`

如果直接绑定点击事件，完成事件后还会执行默认跳转，也可以通过绑定事件， `e.preventDefault()`来组织默认行为

eg: 

```
methods: {
	handlePreventDefault(e) {
		e.preventDefault()
	}
},
template: `
	<form action="https://www.baidu.com" @click="handlePreventDefault">
		<button>提交</button>
	<form/>
`
```

### 2-3 数据、方法、计算和监听属性

```
const app = Vue.createApp({
        data() {
            return {
                message: 'hello',
                count: 1,
                price: 5
            }
        },
        // data & methods & computed & watcher
        // computed 和 methods 都能实现的功能，建议使用 computed, 因为有缓存
        // computed 和 watch 都能实现的功能，建议使用 computed, 因为更简洁
        watch: {
            // price发生变化时会执行
            price(curent, prev) {
                console.log("price changed from", prev, "to", curent)
            }
        },
        computed: {
            // 当计算属性依赖的内容发生变化时，才会重新计算
            total() {
                return this.count * this.price
            }
        },
        methods: {
            handleClick() {
                console.log(data.message)
            },
            // 只要页面重新渲染，就会重新计算
            getTotal() {
                return this.count * this.price
            }
        },
        template: `
        <div @click="handleClick">{{total}}</div>
        `
    })
    const vm = app.mount("#root")
```

- #### methods，只要页面重新渲染，就会重新计算，

- #### computed，当计算属性依赖的内容发生变化时，才会重新计算

- #### watch，监听的数据发生变化时会执行

this都是指向vue实例，所以可以直接通过this.访问到data中的数据

### 2-4 样式绑定语法

#### class定义样式的绑定：字符串、对象、数组

#### style定义样式的绑定：字符串、对象（建议）

eg:

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 7</title>
    <script src="https://unpkg.com/vue@next"></script>
    <style>
        .red {
            color: red
        }
        
        .green {
            color: green
        }
    </style>
</head>

<body>
    <div id='root'></div>
</body>
<script>
    const app = Vue.createApp({
        data() {
            return {
                classString: 'green',
                classObject: {
                    red: true,
                    green: true
                },
                classArray: ['red', {
                    green: false
                }],
                styleObject: {
                    color: 'orange',
                    background: 'gray'
                }
            }
        },
        template: `
        <div class="red">
            hello world1
        </div>
        <div :class="classString">
            hello world2
        </div>
        <div style="color:yellow">
            hello world3
            <demo class='green'/>
        </div>
        <div :style="styleObject">
            hello world4
        </div>
        `
    })
    app.component('demo', {
        template: `
        <div class='red'>single</div>
        <div :class='$attrs.class'>single</div>
        `
    })
    const vm = app.mount("#root")
</script>

</html>
```

![image-20220521224925400](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220521224925400.png)

#### 组件绑定样式

```html
const app = Vue.createApp({
        data() {
            return {
                classString: 'green',
                classObject: {
                    red: true,
                    green: true
                },
                classArray: ['red', {
                    green: false
                }]
            }
        },
        template: `
        <div :class="classArray">
            hello world
            <demo/>
        </div>
        `
    })
    app.component('demo', {
        template: `
        <div class='green'>single</div>
        <div class='green'>single</div>
        `
    })
```

注：这里有多个标签嵌入到子组件demo中，直接使用<demo class='green'/>的话是无效的，可以使用:class='$attrs.class'，v-bind绑定class值为demo组件class属性对应的值

```html
const app = Vue.createApp({
        data() {
            return {
                classString: 'green',
                classObject: {
                    red: true,
                    green: true
                },
                classArray: ['red', {
                    green: false
                }]
            }
        },
        template: `
        <div :class="classArray">
            hello world
            <demo class='green'/>
        </div>
        `
    })
    app.component('demo', {
        template: `
        <div class='green'>single</div>
        <div :class='$attrs.class'>single</div>
        `
    })
    const vm = app.mount("#root")
```

### 2-5 条件渲染

- **v-if** 是通过控制元素在Dom上的存在与否来控制元素是否展现的，v-if=false 会在Dom上移除元素

- **v-show**是通过style样式来实现的，v-show=false 会设置样式 style="display: none;"

  频繁销毁或者创建使用v-show更好

  v-if 还有与之对应的v-else-if、v-else 和 else，要贴在一起写，eg:

  ```
  <div v-if='conditionOne'>if</div>
  <div v-else>else</div>
  ```

  ```
  <div v-if='conditionOne'>if</div>
  <div v-else-if='conditionTwo'>elseif</div>
  <div v-else='conditionTwo'>else</div>
  ```

  

## 第3章 探索组件的理念



## 第4章 Vue 中的动画



## 第5章 Vue 中的高级语法



## 第6章 Composition API



## 第7章 Vue 项目开发配套工具讲解



## 第8章 “京东到家”项目首页开发



## 第9章 登陆功能开发



## 第10章 商家展示功能开发（上）



## 第11章 商家展示功能开发（下）



## 第12章 核心购物链路开发



## 第13章 真机调试及工程发布流程

