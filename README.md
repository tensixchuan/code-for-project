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

### 2-6 列表循环渲染

- **循环数组：**v-for="(item, index) in listArray"，第一个参数是元素值，第二个参数是对应索引

​	 `<div v-for="(item, index) in listArray" :key="item">{{item}} --- {{index}}</div>`

- **循环对象：**v-for="(value, key, index) in listObject"，第一个参数是元素值，第二个参数键名，第三个参数是对应索引

​	 `<div v-for="(value, key, index) in listObject" :key="value">{{value}} --- {{key}} --- {{index}}</div>`

- **循环数字：** `v-for="item in 10" ` item值为1-10

使用v-for时最好**指定key**，作为数据项的唯一索引，可以就地复用，有利于提高渲染效率。

注：变更数据的方法：

1. 使用数组的变更函数 push pop shift unshift splice sort reverse
2. 直接替换数组 this.listArray = ["hey"]   this.listArray = ["hey"] .filter(item => item==="hey")
3. 直接更新数组内容 this.listArray[0] = "hello"
4. 直接添加对象的内容，也可以自动展示



v-if 和 v-for 同时出现（在同 一个标签）时, v-if会失效，因为v-for优先级更高，例如：

```
<div v-for="(value, index) in listArray" :key="value"  v-if="value !== 'lee'">
	{{value}} --- {{index}}
</div>
```

v-if会失效,lee还是会显示出来

解决 v-if失效方法：

1. 增加一个新标签，使v-if和v-for不在同一标签内，但是会多一层嵌套

```
<div>
	<div v-for="(value, index) in listArray" :key="value">
		<div v-if="value !== 'lee'">
			{{value}} --- {{index}}
		</div>
	</div>
	<div v-for="item in 10">
		{{item}}
	</div>
</div>
```

![image-20220522160642074](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220522160642074.png)

2. 使用template标签，这样在Dom中能减少嵌套。template标签只是一个占位符。

   ```
    <div>
   	<template v-for="(value, index) in listArray" :key="value">
   		<div v-if="value !== 'lee'">
   			{{value}} --- {{index}}
   		</div>
   	</template>
   	<div v-for="item in 10">
   		{{item}}
   	</div>
   </div>
   ```

   ![image-20220522160807385](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220522160807385.png)



### 2-7 事件绑定

```js
<script>
    const app = Vue.createApp({
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            handleBtnClick(event) { //统计点击次数
                console.log(event)
                this.counter++
            }
        },
        template: `
        <div>
            {{counter}}
            <button @click="handleBtnClick">button</button>
        </div>
        
        `
    })
    const vm = app.mount("#root")
</script>
```

1. 如果要传递参数，同时获取原生事件，可以@click="handleBtnClick(num, $event)"

2. 如果要执行多个事件，可以@click="handleBtnClick1(), handleBtnClick2()"，逗号分隔，函数加括号

#### 事件修饰符：stop self prevent capture once passive

- **.stop** 阻止冒泡
- **.self** 只执行自身触发的事件
- **.prevent** 阻止默认事件
- **.capture** 事件运行模式变为捕获
- **.once** 事件绑定只执行一次
- **.passive** 和scroll组合，提升滚动性能 @scroll.passive

#### 按键修饰符

按键事件为keydown，常规写按键事件的话需要获取event，然后通过event.keyCode判断按的哪个按键（eg: 函数handleKeyDown1），而采用按键修饰符可以按下指定键才执行函数（eg: 修饰符.enter，函数handleKeyDown1）。

```
const app = Vue.createApp({
        methods: {
            handleKeyDown1(event) { // 按enter键执行函数
                console.log(event)
                if (event.keyCode === 13) console.log("enter")
            },
            handleKeyDown2(event) {
                console.log("enter2")
            }
        },
        template: `
        <div>
            <input @keydown="handleKeyDown1"></input>
            <input @keydown.enter="handleKeyDown2"></input>
        </div>
        
        `
    })
    const vm = app.mount("#root")
```

**常见按键修饰符有：enter tab delete esc up down left right 等**

#### 鼠标修饰符

 **常见鼠标修饰符有：left right middle**

eg： `<div @click.right="handleDivClick">1234</div>`

#### 精确修饰符 exact

```
 <div @click.ctrl="handleDivClick">1234</div>
```

这里按下ctrl键再按其他的键，再点击就会执行方法。若要求只有按下ctrl键再点击才执行，可以使用精确修饰符

```
 <div @click.ctrl.exact="handleDivClick">1234</div>
```

### 2-8 表单中的双向绑定指令

#### input

```
<input v-model="message" />
```



#### textarea

一般是这么写：

```
<textarea>ABC</textarea>
```

但是用vue可以写成闭合标签：

```
<textarea v-model="message"/>
```



#### checkbox 

- 单个checkbox ：

```
<input type="checkbox" v-model="isChecked"/>
```

isChecked为true或false

- 多个checkbox ：

```
<div>
	{{messages}}
	A<input type="checkbox" v-model="messages" value="A"/>
	B<input type="checkbox" v-model="messages" value="B"/>
	C<input type="checkbox" v-model="messages" value="C"/>
</div>
```

可以绑定到一个数组中，选中时value值加入数组，未选中时不在数组。

可以通过 **true-value、false-value** 设置选中/未选中时的值。

#### radio

radio只能单选，所以不需要用数组存，用字符串存就可以

```
<div>
	{{messages}}
	A<input type="radio" v-model="message" value="A"/>
	B<input type="radio" v-model="message" value="B"/>
	C<input type="radio" v-model="message" value="C"/>
</div>
```



#### select

单选：

message初始值为”“:  message=""

```
{{message}}
<select v-model="message">
	<option disabled value="">请选择内容</option>
	<option>A</option>
	<option>B</option>
	<option>C</option>
</select>
```

多选：

```
{{messages}}
<select v-model="messages" multiple>
	<option disabled value="">请选择内容</option>
	<option>A</option>
	<option>B</option>
	<option>C</option>
</select>
```

v-for：

```
const app = Vue.createApp({
        // input textarea checkbox 
	data() {
		return {
                messages: [],
                options: [{
                    text: 'A',
                    value: 'A'
                }, {
                    text: 'B',
                    value: 'B'
                }, {
                    text: 'C',
                    value: 'C'
                }, {
                    text: 'D',
                    value: {
                        value: 'D'
                    }
                }]
            }
        },
	template: `
        {{messages}}
        <select v-model="messages" multiple>
            <option v-for="item in options" :value="item.value">{{item.text}}</option>
        </select>
        `
})
const vm = app.mount("#root")
```

#### 修饰符：lazy number trim

- **lazy** 延后反应，节约事件触发成本

- **number** 转化value的类型为number

- **trim** 去除输入前后的空格



## 第3章 探索组件的理念

### 3-1 组件的定义及复用

#### 组件的定义

```
<body>
    <div id="root"></div>
</body>
<script>
    const app = Vue.createApp({
        data() {
            return {
                message: ""
            }
        },
        template: `
        <div>
            <counter/>
        </div>
        `
    })
    app.component("counter", {
        data() {
            return {
                counter: 0
            }
        },
        template: `<div @click="counter += 1">{{counter}}</div>`
    })
    const vm = app.mount('#root')
</script>
```



#### 组件具备复用性

```
template: `
	<div>
		<counter/>
		<counter/>
		<counter/>
</div>
`
```

组件可以复用，但是组件内的数据是在当前组件内独享的，不会和同名组件共享



#### 全局组件

```
<script>
    const app = Vue.createApp({
        data() {
            return {
                message: ""
            }
        },
        template: `
        <div>
            <counter-parent/>
            <counter/>
            <counter/>
        </div>
        `
    })
    app.component("counter-parent", {
        data() {
            return {
                counter: 0
            }
        },
        template: `<conter/>`
    })
    app.component("counter", {
        data() {
            return {
                counter: 0
            }
        },
        template: `<div @click="counter += 1">{{counter}}</div>`
    })
    const vm = app.mount('#root')
</script>
```

全局组件：只要定义了就处处可用，性能不高，但使用简单

通过app.component定义的组件为全局组件，可以在父组件使用，也可以在其他组件内使用。但是即使没有使用，全局组件也会挂载。



#### 局部组件

局部组件：定义了要注册之后才能使用，性能较高，但使用麻烦，建议首字母大写，驼峰式命名

```
<script>
    const Counter = {
        data() {
            return {
                counter: 0
            }
        },
        template: `<div @click="counter += 1">{{counter}}</div>`
    }
    const app = Vue.createApp({
        components: {
            counter: Counter
        },
        data() {
            return {
                message: ""
            }
        },
        template: `
        <div>
            <counter/>
            <counter/>
        </div>
        `
    })
    const vm = app.mount('#root')
</script>
```

首先定义一个常量，然后在父组件中通过components声明，之后可以直接使用

注：

1. 局部组件使用时，要做一个名字和组件的映射对象，当key值和value值一致时可以直接组件名：组件名，不需要加引号，但是不写的话Vue底层也会自动尝试映射

   ```
   components: {
   	Counter: Counter
   }
   ```

   或

   ```
   components: {
   	Counter,others...
   }
   ```

   或

   ```
   components: {
   	"counter": Counter
   }
   ```

2. 局部组件命名时无法使用-，而驼峰式难以和其他变量区分，所以最好首字母大写，和其他变量区分 。

   

### 3-2 组件间的传值及校验

#### 父子组件传值

```
<script>
    const app = Vue.createApp({
        data() {
            return {
                num: 12
            }
        },
        template: `
        <div>
            <test content="hello world"/>
        </div>
        `
    })
    app.component("test", {
        props: ['content'],
        template: `<div>{{content}}</test>`
    })
    const vm = app.mount('#root')
</script>
```

父组件调用子组件的标签，然后通过标签上的属性向子组件传值，子组件通过props接收对应内容，之后就可以直接使用传递的值

注：

1. 静态属性：形如content="hello world"这种传递固定值的属性叫做静态属性

2. 动态属性：形如content="num"这种传递动态值的属性叫做动态属性

#### 类型校验：

```
app.component("test", {
        props: {content: String},
        template: `<div>{{content}}</test>`
})
```

```
app.component("test", {
        // type: String Boolean Array Object Function
        // required true为必填
        // default 默认值
        props: {
            content: String,
            message: {
                type: String,
                validator: function(value) {
                    return value.length < 10
                },
                required: false,
                default: "default"
            }
        },
        template: `<div>{{content}} {{message}}</div>`
    })
```

- type为校验的类型
- validator为一个参数校验的函数，如果返回false会报警告
- required 为 true 时该属性必填
- default 默认值

#### 传多个值：v-bind="params"

```
<script>
    const app = Vue.createApp({
        data() {
            return {
                content: 123,
                params: {
                    n: 123,
                    a: 456,
                    b: 789
                }
            }
        },
        template: `
        <div>
            <test :content='content' v-bind="params"/>
        </div>
        `
    })
    app.component("test", {
        // type: String Boolean Array Object Function
        // required true为必填
        // default 默认值
        props: ['content','n', 'a', 'b'],
        template: `<div>{{n}} {{a}} {{b}}</div>`
    })

    const vm = app.mount('#root')
</script>
```

v-bind="params" 等价于 :n="params.n"   :a="params.a"  :b="params.b"

注：用以-为单词间隔的字符串作为属性名传值时，接收的时候使用驼峰式，eg: 传的时候使用content-abc命名，接的时候使用contentAbc命名

### 3-3 单项数据流

子组件可以使用父组件传递的值，但是不能修改传递的值。可以自定义一个变量复制值，然后修改自定义的变量。

```
<script>
    const app = Vue.createApp({
            data() {
                return {
                    content: 123
                }
            },
            template: `
        <div>
            <counter :count='content'/>
        </div>
        `
        })
        
    app.component("counter", {
        props: ['count'],
        data() {
            return {
                myCount: this.count
            }
        },
        template: `<div @click="myCount++">{{myCount}}</div>`
    })

    const vm = app.mount('#root')
</script>
```

### 3-4 Non-Props

父组件传递的属性子组件接收但是未使用时，Dom 标签内并不会显示该属性，而父组件传递的属性子组件未接受且未使用时 Dom 标签内会显示该属性

- **inheritAttrs**

设置 `inheritAttrs: false`后，不会继承父组件传递的Non-Props属性，即传递的属性值未被接收时，子组件标签上不会显示传递的属性

 常用Non-Props来给子组件设置样式：

```
<script>
    const app = Vue.createApp({
        template: `
            <div>
                <counter style="color: red;"/>
            </div>
        `
    });
    app.component("counter", {
        template: `<div>content</div>`
    });

    const vm = app.mount('#root')
</script>
```

![image-20220522213710704](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220522213710704.png)

#### $attrs

- 子组件内有多个标签时，可以通过$attrs来指定接收全部属性或部分属性
- 在生命周期函数或方法中也可以使用this.$attrs来使用父组件传递的属性

```
<script>
    const app = Vue.createApp({
        template: `
            <div>
                <counter style="color: red;"/>
                <divs msg="hello" msg2="hello2"/>
            </div>
        `
    });
    app.component("counter", {
        template: `<div>content</div>`
    });
    app.component("divs", {
        // inheritAttrs: false,
        mounted() {  // 使用this.$attrs来使用父组件传递的值
            console.log(this.$attrs.msg)
        },
        template: `
            <div v-bind:msg="$attrs.msg">content</div>
            <div v-bind="$attrs">content</div>
            <div v-bind:msg="$attrs.msg2">content</div>
        `
    });
    const vm = app.mount('#root')
</script>
```

![image-20220522215158415](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220522215158415.png)



### 3-5 父子组件间通过事件通信

#### this.$emit()

```
<script>
    const app = Vue.createApp({
        data() {
            return {
                count: 1
            }
        },
        methods: {
            handleAdd(params) {
                this.count += params
            }
        },
        template: `
            <div>
                {{count}}
                <counter :count="count" @add-num="handleAdd"/>
            </div>
        `
    });
    app.component("counter", {
        props: ['count'],
        methods: {
            handelItemClick() {
                this.$emit('addNum', 2)
            }
        },
        template: `<div @click="handelItemClick">{{count}}</div>`
    });

    const vm = app.mount('#root')
</script>
```

子组件通过`this.$emit('addNum')`触发父组件的`add-num`事件

#### emits

emits可以用来放要触发的事件，emits:['addNum'] 或 emits:{addNum: ()=>{}} 

#### 父子组件的双向绑定

```
<script>
    const app = Vue.createApp({
        data() {
            return {
                count: 1
            }
        },
        template: `
            <counter v-model:countItem="count"/>
        `
    });
    app.component('counter', {
        props: ['countItem'],
        methods: {
            add() {
                this.$emit('update:countItem', this.countItem + 1)
            }
        },
        template: `
        <div @click="add">{{countItem}}</div>
        `
    })
    const vm = app.mount('#root')
</script>
```

父组件v-model传值，子组件this.$emit('update:值'，新值)

注：

1. 双向绑定多个参数：` <counter v-model:count="count" v-model:count1="time"/>`

2. modelModifiers 修饰符

```
const app = Vue.createApp({
        data() {
            return {
                str: 'ab'
            }
        },
        template: `
            <counter v-model.uppercase="str"/>
        `
    });
    app.component('counter', {
        props: {
            'modelValue': String,
            'modelModifiers': {
                default: () => {} // 当不传递修饰符时modelModifiers默认值
            }
        },
        methods: {
            addCount() {
                let newVlaue = this.modelValue + "b"
                if (this.modelModifiers.uppercase) { // 判断传递的修饰符
                    newVlaue = newVlaue.toUpperCase()
                }
                this.$emit('update:modelValue', newVlaue)
            }
        },
        template: ` 
        <div @click="addCount">{{modelValue}}</div>
        `
    })
```

### 3-6 使用插槽和具名插槽解决组件内容传递问题

#### 插槽

可以使用插槽传自定义标签、字符串、组件，可以在子组件模板中用`<slot/>`代替父组件中组件插入的东西。

```
<script>
    const app = Vue.createApp({
        data() {
            return {
                str: 'ab'
            }
        },
        template: `
            <myform>
                <button>提交</button>
            </myform>
            <myform>
                <div>提交</div>
            </myform>
            <myform>
                123
            </myform>
            <myform>
                <test/>
            </myform>
            <myform></myform>
        `
    });
    app.component('myform', {
        methods: {
            handleClick() {
                alert(123)
            }
        },
        template: ` 
        <div>
            <input/><span @click="handleClick"><slot>default value</slot></span>
        </div>
        `
    })
    app.component('test', {
        template: `<div>123</div>`
    })
    const vm = app.mount('#root')
</script>
```

![image-20220523203704493](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220523203704493.png)

注：

- 父模板里调用的数据属性, 使用的是父模板里的数据

- 子模板里调用的数据属性, 使用的是子模板里的数据
- 没有传入slot时可以指定默认值，有slot用slot，没有用默认值

#### 具名插槽

可以用v-slot指定slot的名字`v-slot:名字`，用template占位。然后子组件中指定`name="名字"`。使用具名插槽对插槽进行拆分会更加灵活。

```
<script>
    const app = Vue.createApp({
        template: `
            <myform>
                <template v-slot:header>
                    <div>header</div>
                </template>
                <template #footer>
                    <div>footer</div>
                </template>
            </myform>
        `
    });
    app.component('myform', {
        template: ` 
        <div>
            <slot name="header"></slot>
            <div>content</div>
            <slot name="footer"></slot>
        </div>
        `
    })
    const vm = app.mount('#root')
</script>
```

可以用#缩写，`v-slot:header` 等价于 `#header`

#### 作用域插槽

作用域插槽使得父组件能够调用子组件作用域内的值。

```
// 作用域插槽
const app = Vue.createApp({
	data() {
		return {
			text: "提交"
		}
	},
	template: `
		<list v-slot="slotProps">
			<div>{{slotProps.item}}</div>
		</list>
        `
});
app.component('list', {
        data() {
            return {
                list: [1, 2, 3]
            }
        },
        template: ` 
        <div>
            <slot v-for="item in list" :item="item"></slot>
        </div>
        `
})
```

这里父组件调用子组件时传入slot，子组件循环调用slot时以属性的形式传递值到父组件，父组件通过slotProps对象接收所有slot传来的值。

注：还可以使用对象的解构去简写

```
<list v-slot="{item}">
	<div>{{item}}</div>
</list>
```



### 3-7 动态组件和异步组件

#### 动态组件

使用动态组件前，如果要动态地展示组件：

```
<script>
    // 动态组件
    const app = Vue.createApp({
        data() {
            return {
                currentItem: "commen-item"
            }
        },
        methods: {
            handleClick() {
                console.log(this.currentItem)
                this.currentItem = this.currentItem === "input-item" ? "commen-item" : "input-item"
                console.log(this.currentItem)
            }
        },
        template: `
            <input-item v-show="currentItem==='input-item'"/>
            <commen-item v-show="currentItem==='commen-item'"/>
            <button @click="handleClick">切换</button>
        `
    });
    app.component('input-item', {
        template: ` 
        <input/>
        `
    })
    app.component('commen-item', {
        template: ` 
        <div>hello world</div>
        `
    })

    const vm = app.mount('#root')
</script>
```

这里定义了两个组件，分别通过父组件中的变量currentItem来判断当前展示与否

使用动态组件来简写：

```
template: `
	<component :is="currentItem"/>
	<button @click="handleClick">切换</button>
`
```

注：这里切换时会清除变动的历史，可以使用keep-alive包裹，去保持状态。

#### 异步组件

异步组件会异步地实现组件的逻辑

```
// 异步组件
    const app = Vue.createApp({
        template: `
            <commen-item/>
            <async-commen-item/>
        `
    });
    app.component('commen-item', {
        template: `<div>hello world</div>`
    })
    app.component('async-commen-item', Vue.defineAsyncComponent(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    template: `<div>This is an async component</div>`
                })
            }, 3000)
        })
    }))

    const vm = app.mount('#root')
```

首先定义组件名，然后调用Vue.defineAsyncComponent方法，传入一个函数，返回一个Promise。这里会隔3s后再显示组件。

### 3-8 其他知识点

#### v-once 让某个元素标签只渲染一次，即使数据发生了改变

#### ref 获取 Dom 节点/组件引用

```
<script>
    // ref 实际上是获取 Dom 节点/组件引用的方法
    const app = Vue.createApp({
        data() {
            return {
                count: 1
            }
        },
        mounted() {
            console.log(this.$refs.count) // <div>1</div>
            console.log(this.$refs.commen.sayHello()) //hello
        },
        template: `
            <div>
                <div ref="count">{{count}}</div>
                <commen-item ref="commen">commen-item</commen-item>
            </div>
        `
    });
    app.component('commen-item', {
        methods: {
            sayHello() {
                alert("hello")
                return "hello"
            }
        },
        template: ` 
        <div>hello world</div>
        `
    })

    const vm = app.mount('#root')
</script>
```

#### provide / inject 实现跨组件多级之间的传递

```
// provide / inject 跨组件多级之间的传递
    const app = Vue.createApp({
        data() {
            return {
                count: 1
            }
        },
        // provide: {
        //     count: 1
        // },
        provide() { // 传data中的值时需要写成函数形式
            return {
                count: this.count
            }
        },
        template: `
            <div>
                <child :count="count"/>
            </div>
        `
    }).mount('#root');
    app.component('child', {
        template: ` 
        <div></div>
        <child-child/>
        `
    })
    app.component('child-child', {
        inject: ['count'],
        template: ` 
        <div>{{count}}</div>
        `
    })
```

provide:{}传值，inject:[]接收值

注：传data中的值时provide需要写成函数形式 provide(){return {}}

## 第4章 Vue 中的动画

### 4-1 使用Vue实现基础CSS动画过渡

- 设置左右移动动画

```
<style>
        @keyframes leftToRight {
            0% {
                transform: translateX(-100px);
            }
            50% {
                transform: translateX(-50px);
            }
            100% {
                transform: translateX(0px);
            }
        }
        
        .animation {
            animation: leftToRight 3s;
        }
    </style>
```

```
<script>
    // 过渡 动画
    const app = Vue.createApp({
        data() {
            return {
                animate: {
                    animation: false
                }
            }
        },
        methods: {
            handleClick() {
                this.animate.animation = !this.animate.animation
            }
        },
        template: `<div>
            <div :class="animate">Hello World</div>
            <button @click="handleClick">切换</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

- 设置缓慢过渡动画

```
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
    <style>
        .transition {
            transition: 2s background-color ease;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>
<script>
    // 过渡 动画
    const app = Vue.createApp({
        data() {
            return {
                styleObj: {
                    background: 'green'
                }
            }
        },
        methods: {
            handleClick() {
                this.styleObj.background = this.styleObj.background === 'green' ? 'blue' : 'green'
            }
        },
        template: `<div>
            <div class="transition" :style="styleObj">Hello World</div>
            <button @click="handleClick">切换</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

### 4-2 使用transition标签实现单元素组件的过渡和动画效果

```
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
    <style>
        @keyframes shake {
            0% {
                transform: translateX(-100px);
            }
            50% {
                transform: translateX(-50px);
            }
            100% {
                transform: translateX(50px);
            }
        }
        
        .v-enter-active {
            animation: shake 3s;
        }
        
        .v-leave-active {
            animation: shake 3s;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>
<script>
    // 过渡 动画
    const app = Vue.createApp({
        data() {
            return {
                show: false
            }
        },
        methods: {
            handleClick() {
                this.show = !this.show
            }
        },
        template: `<div>
            <transition>
                <div v-if="show" >Hello World</div>
            </transition>
            <button @click="handleClick">切换</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

注：

1. transition中不写name时v-enter-active这样的样式默认以v开头，如果自定义了name="hello"，则重写样式时应以hello开头：hello-enter-active

2. 可以在transition中重写v-enter-active，如`<transition enter-active-class=“hello> </transition>`, 然后样式中可以用hello代替v-enter-active

3. 还可以引入animate动画效果库

   安装：`$ npm install animate.css --save`

   头部引入：

   ```
   <head>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
   </head>
   ```

   使用：

   ```
   template: `<div>
               <transition 
               enter-active-class="animate__animated animate__bounce"
               leave-active-class="animate__animated animate__flash">
                   <div v-show="show" >Hello World</div>
               </transition>
               <button @click="handleClick">切换</button>
           </div>`
   ```

   

[animate动画效果库]: https://animate.style/

animate动画效果库：https://animate.style/

#### 同时动画和过渡：

```
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 24</title>
    <script src="https://unpkg.com/vue@next"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <style>
        @keyframes shake {
            0% {
                transform: translateX(-100px);
            }
            50% {
                transform: translateX(-50px);
            }
            100% {
                transform: translateX(50px);
            }
        }
        
        .v-enter-from {
            color: red
        }
        
        .hello {
            animation: shake 3s;
            transition: color 3s ease-in;
        }
        
        .v-leave-to {
            color: red
        }
        
        .bye {
            animation: shake 3s;
            transition: color 3s ease-out;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>
<script>
    // 过渡 动画
    const app = Vue.createApp({
        data() {
            return {
                show: false
            }
        },
        methods: {
            handleClick() {
                this.show = !this.show
            }
        },
        template: `<div>
            <transition 
            enter-active-class="hello"
            leave-active-class="bye">
                <div v-show="show" >Hello World</div>
            </transition>
            <button @click="handleClick">切换</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

注：当有多种时可以设置 type="transition" 使动画以渐变为主，当渐变先完成时，其他动画立即完成，还可以设置:duration="1000"使得动画全部在1s内完成

`:duration="1000"`

`:duration="{enter:2000,leave:1000}"`

`:css='false'` 不使用css动画

#### 使用js动画

```
<script>
    const app = Vue.createApp({
        data() {
            return {
                show: false
            }
        },
        //js动画
        methods: {
            handleClick() {
                this.show = !this.show
            },
            handleBeforeEnter(el) { //刚进入
                el.style.color = 'red'
            },
            handleEnterActive(el, done) { //进入
                const animation = setInterval(() => {
                    const color = el.style.color
                    if (color === 'red') {
                        el.style.color = 'green'
                    } else {
                        el.style.color = 'red'
                    }
                }, 1000)
                setTimeout(() => {
                    clearInterval(animation)
                    done()
                }, 5000)
            },
            handleEnterEnd() { // 动画结束调用
                alert('123')
            }
        },
        // - @before-enter，接收el参数
        // - @enter，接收 el done 参数，done()表示已执行完
        // - @after-enter，接收 el
        // - @before-leave，接收 el
        // - @leave，接收 el done
        // - @after-leave，接收 el
        template: `<div>
            <transition 
                :css='false'
                @before-enter="handleBeforeEnter"
                @enter="handleEnterActive"
                @after-enter="handleEnterEnd">
                <div v-show="show" >Hello World</div>
            </transition>
            <button @click="handleClick">切换</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```



- @before-enter，接收el参数
- @enter，接收 el done 参数，done()表示已执行完
- @after-enter，接收 el
- @before-leave，接收 el
- @leave，接收 el done
- @after-leave，接收 el

### 4-3 组件和元素切换动画

#### 多个单元素的切换

```
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 24</title>
    <script src="https://unpkg.com/vue@next"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <style>
        .v-enter-from {
            opacity: 0
        }
        
        .v-enter-active,
        .v-leave-active {
            transition: opacity 1s ease-in;
        }
        
        .v-enter-to {
            opacity: 1
        }
        
        .v-leave-from {
            opacity: 1
        }
        
        .v-leave-to {
            opacity: 0
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>
<script>
    // 过渡 动画
    const app = Vue.createApp({
        data() {
            return {
                show: false
            }
        },
        //js动画
        methods: {
            handleClick() {
                this.show = !this.show
            }
        },
        template: `<div>
            <transition mode="out-in" appear>
                <div v-if="show">hello world</div>
                <div v-else="show">bye world</div>
            </transition>
            <button @click="handleClick">切换</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

transition中mode="out-in"设置动画顺序为先消失后出现，否则会同时执行

appear设置初次出现时也使用动画

#### 多个单组件的切换

```
<script>
    // 多个单组件的切换
    const componentA = {
        template: `
            <div>hello world</div>
        `
    }
    const componentB = {
        template: `
            <div>bye world</div>
        `
    }
    const app = Vue.createApp({
        data() {
            return {
                show: false
            }
        },
        methods: {
            handleClick() {
                this.show = !this.show
            }
        },
        components: {
            'component-a': componentA,
            'component-b': componentB
        },
        template: `<div>
            <transition mode="out-in" appear>
                <component-a v-if="show"/>
                <component-b v-else="show"/>
            </transition>
            <button @click="handleClick">切换</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>

</html>
```

也可以通过is 用动态组件

```
        methods: {
            handleClick() {
                this.component = this.component === 'component-a' ? 'component-b' : "component-a"
            }
        },
        components: {
            'component-a': componentA,
            'component-b': componentB
        },
        template: `<div>
            <transition mode="out-in" appear>
                <component :is="component"/>
            </transition>
            <button @click="handleClick">切换</button>
        </div>`
    })
```

### 4-4 列表动画

```
<style>
        .list-item {
            display: inline-block;
            margin-right: 10px;
        }
        
        .v-enter-from {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .v-enter-active {
            transition: all 1s ease-in;
        }
        
        .v-move {
            transition: all .5s ease-in;
        }
    </style>
```

```
<script>
    // 列表动画的实现
    const app = Vue.createApp({
        data() {
            return {
                list: [1, 2, 3]
            }
        },
        methods: {
            handleClick() {
                this.list.unshift(this.list.length + 1)
            }
        },
        template: `<div>
            <transition-group >
                <span class="list-item" v-for="item in list" :key="item">{{item}}</span>
            
            </transition-group>
            <button @click="handleClick">增加</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

### 4-5 状态动画

通过数据控制Dom的显示

```
<script>
    // 状态动画 svg
    const app = Vue.createApp({
        data() {
            return {
                number: 0,
                animateNubmer: 1
            }
        },
        methods: {
            handleClick() {
                this.number += 10
                const animation = setInterval(() => {
                    this.animateNubmer++;
                    if (this.animateNubmer >= this.number) {
                        clearInterval(animation)
                    }
                }, 100)
            }
        },
        template: `<div>
            <div>{{animateNubmer}}</div>
            <button @click="handleClick">增加</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```



## 第5章 Vue 中的高级语法

### 5-1 Mixin

```
<script>
    const myMixin = { // 局部mixin
        data() {
            return {
                number: 2
            }
        },
        methods: {
            handleClick() {
                console.log("mixin")
            }
        }
    }
    const app = Vue.createApp({
        // data() {
        //     return {
        //         number: 1
        //     }
        // },
        mixins: [myMixin],
        methods: {
            handleClick() {
                console.log("handleClick")
            }
        },
        template: `<div>
            <div>{{number}}</div>
            <button @click="handleClick">增加</button>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

首先定义一个对象，然后在组件中将对象加入 `mixins: [myMixin]` ，将对象注入到组件中

Mixin 可以将数据、方法、生命周期函数混入组件或应用中:

- 组件 **data/methods** 优先级高于mixin data/methods 优先级，同时存在时组件data/methods会覆盖mixin data/methods

- mixin中的**生命周期函数**和组件的生命周期函数同时存在时，先执行mixin里的，再执行组件里的，不会被覆盖掉
- **自定义属性**，组件中的属性优先级高于mixin属性优先级

#### 局部mixin和全局mixin

像上面那样在外部定义的mixin为局部mixin，需要在组件内通过mixins:[]注入才能使用，而全局mixin可以app.mixin()定义后全局使用（不推荐）

```
<script>
    const app = Vue.createApp({
        methods: {
            handleClick() {
                console.log("handleClick")
            }
        },
        template: `<div>
            <div>{{number}}</div>
            <child/>
        </div>`
    })
    app.mixin({ // 定义全局mixin
        data() {
            return {
                number: 2,
                count: 0
            }
        },
        methods: {
            handleClick() {
                console.log("mixin")
            }
        },
    })
    app.component("child", {
        template: `<div>
            <div>{{count}}</div>
        </div>`
    })
    const vm = app.mount("#root")
</script>
```

可以通过app.mixin()定义全局mixin，传入参数为一个对象，这样在所有组件应用中都可以使用这个全局mixin中的数据和方法

#### 配置自定义属性优先级

data中的属性可以直接{{number}}取，自定义的属性可以{{this.$options.number}}取。组件中的属性优先级高于mixin属性优先级，但是可以通过app.config.optionMergeStrategies.自定义属性来配置

```
app.config.optionMergeStrategies.number = (mixinVal, appValue) => {
        return mixinVal || appValue
}
```

对于number属性，有mixin时先取mixinVal，没有时取appValue

vue3之后不推荐mixin，因为可维护性低，逻辑上看起来不清晰，数据的定位复杂（组件、mixin、优先级），全局mixin影响范围很大

### 5-2 Vue自定义指令

定义一个输入框， 如果要让它自动聚焦，需要给定ref name，然后在mouted钩子函数中写focus()

```
<script>
	const app = Vue.createApp({
        mounted() {
            this.$refs.input.focus()
        },
        template: `<div>
            <input ref="input"/>
        </div>`
    })

    const vm = app.mount("#root")
</script>
```

但是这种方法无法复用，而使用自定义指令可以很好的复用

#### 全局指令：

```
<script>
    // 自定义指令 directive
	// 全局指令
    const app = Vue.createApp({
        template: `<div>
            <input v-focus/>
        </div>`
    })
    app.directive('focus', { // 全局指令
        mounted(el) {
            el.focus()
        }
    })
    const vm = app.mount("#root")
</script>
```

#### 局部指令：

```
<script>
    // 自定义指令 directive
    // 全局指令
    const app = Vue.createApp({
        template: `<div>
            <input v-focus/>
        </div>`
    })
    app.directive('focus', { // 全局指令
        mounted(el) {
            el.focus()
        }
    })
    const vm = app.mount("#root")
</script>
```

#### 指令的生命周期函数：

```
app.directive('focus', { 
        beforeMount(el) {
            console.log("beforeMount")
        },
        mounted(el) {
            console.log("mounted")
            el.focus()
        },
        beforeUpdate() {
            console.log("beforeUpdate")
        },
        updated() {
            console.log("updated")
        },
        beforeUnmount(el) {
            console.log("beforeUnmount")
        },
        unmounted(el) {
            console.log("unmounted")
        }
    })
```

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted

如果mounted和updated要处理的事件一致，可以简写到一起：

```
template: `<div v-pos="200" class='header'>
            <input v-focus/>
	</div>`
```



```
app.directive('pos', { // top=200px
        mounted(el, binding) {
            el.style.top = binding.value + 'px'
        },
        updated(el, binding) {
            el.style.top = binding.value + 'px'
        },
    })
```

这里binding.value为指令传递的值，mounted和updated还可以写在一起，默认第二个参数为要mounted和updated处理的事件

```
app.directive('pos', (el, binding) => { //简写形式，代表mounted和updated处理的事件
        el.style.top = binding.value + 'px'
})
```



#### 指令的参数和值

指令除了v-pos="200"这样的形式，还可以指定参数，如：v-pos:top="200"

```
<script>
    // 自定义指令 directive

    const app = Vue.createApp({
        data() {
            return {
                show: true,
                top: 300
            }
        },
        template: `<div v-pos:top="top" class='header'>
            <input v-focus/>
            <div v-pos:left="500" class='header'>11</div>
        </div>`
    });

    app.directive('pos', (el, binding) => { //简写形式，代表mounted和updated处理的事件
        el.style[binding.arg] = binding.value + 'px'
    })

    const vm = app.mount("#root")
</script>
```

binding.arg为指令的参数， binding.value为指令传递的值

### 5-3 Teleport 传送门

可以把组件传送到指定位置，常用来实现一些模态框、蒙层、吸底等效果，放在body或html下

```
<style>
        .area {
            position: absolute;
            width: 200px;
            height: 300px;
            background: green;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        
        .mask {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: black;
            opacity: 0.2;
            color: white;
            font-size: 100px;
        }
    </style>
```

```
<script>
    // teleport 传送门

    const app = Vue.createApp({
        data() {
            return {
                show: false
            }
        },
        methods: {
            handleClick() {
                this.show = !this.show
            }
        },
        template: `<div class='area'>
            <teleport to="body">
                <div class="mask" v-show="show">123</div>
            </teleport>
            <button @click="handleClick">按钮</button>
            
        </div>`
    });


    const vm = app.mount("#root")
</script>
```

![image-20220525151625159](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220525151625159.png)

mask本来在area内，通过传送门可以传到body下，实现整体的蒙版

### 5-4 更底层的render函数

```
<script>
    // render 函数  
    // template在底层编译后会生成render函数，render函数返回虚拟Dom（Dom节点的JS表示）

    const app = Vue.createApp({
        template: `<my-title level="3"> hello wo </my-title>`
    });

    app.component('my-title', {
        props: ["level"], // 
        render() {
            // h函数返回虚拟Dom节点
            // 第一个参数为tagName
            // 第二个参数为attributes, 表示标签上定义的属性
            // 第三个参数为节点对应的文本内容

            // template -> render -> h ->虚拟Dom ->真实Dom ->展示到页面
            const {
                h
            } = Vue;
            // return h("h" + this.level, {}, this.$slots.default())

            // h的嵌套
            return h("h" + this.level, {}, [this.$slots.default(), h('h4', {}, "dell")])
        }
    })

    const vm = app.mount("#root")
</script>
```



### 5-5 插件的定义和使用

#### 插件的定义：

对象里里面加一个install，install传入app和options，app为使用插件的实例,options为传入的参数

```
 // plugin 插件,把通用性的功能封装起来
    const myPlugin = {
        install(app, options) { // app为使用插件的实例,options为传入的参数
            app.provide('name', "wd")
            app.directive("focus", el => {
                el.focus()
            })
            app.mixin({
                mounted() {
                    console.log('mixin')
                }
            })
            app.config.globalProperties.$sayHello = "hello"
            console.log(app)
            console.log(options)
        }
    }
```

#### 插件的使用：

直接app.use("插件名",传入的参数)

```
const app = Vue.createApp({

        template: `<my-title/>`
    });

    app.component('my-title', {
        inject: ['name'],
        mounted() {
            console.log(this.$sayHello)
        },
        template: `<div><input v-focus></input>{{name}}</div>`
    })
    app.use(myPlugin, {
        name: "wd"
    })
```



### 5-6 数据校验插件开发实例

#### 用mixin对数据做校验

```
<script>
    // 用mixin对数据做校验
    const app = Vue.createApp({
        data() {
            return {
                name: "dell",
                age: 21
            }
        },
        rules: {
            age: {
                validate: age => {
                    return age > 25
                },
                message: "too young"
            },
            name: {
                validate: name => {
                    return name.length <= 10
                },
                message: "too long"
            }
        },
        template: `<div>{{name}}--{{age}}</div>`
    });

    app.mixin({
        created() {
            for (let key in this.$options.rules) {
                const item = this.$options.rules[key]
                console.log(this)
                this.$watch(key, value => {
                    console.log(value)
                    const result = item.validate(value)
                    if (!result) console.log(item.message)
                })
            }
        }
    })
    const vm = app.mount("#root")
</script>
```

在vue中定义规则，然后使用全局mixin, 在created生命周期函数内，this.$options.relues取出自定义属性rules，对数据项依次校验，this.$watch监听key属性值的变化，每次变化对value进行校验，如果数据不合格则打印相应提示信息

#### 用plugin 封装

```
const validatorPlugin = (app, options) => {
        app.mixin({
            created() {
                for (let key in this.$options.rules) {
                    const item = this.$options.rules[key]
                    console.log(this)
                    this.$watch(key, value => {
                        console.log(value)
                        const result = item.validate(value)
                        if (!result) console.log(item.message)
                    })
                }
            }
        })
    }
 // ......
 
 app.use(validatorPlugin)
```



## 第6章 Composition API

用了composition 之后，就不需要写data methods 这些了，可以直接在setup函数中写，让数据响应式

### 6-1 setup函数的使用

```
<script>
    const app = Vue.createApp({
        // created 实例完全被初始化前
        // 所以不能使用this或者外部的方法因为此时还获取不到data/methods
        // 而其他的方法可以调用setup
        setup(props, context) {
            return {
                name: "dell",
                handleClick: () => {
                    alert("123")
                }
            }
        },
        template: `<div @click="handleClick">{{name}}</div>`
    });

    const vm = app.mount("#root")
</script>
```

### 6-2 ref，reactive 的响应式引用

原理: 通过proxy 对数据进行封装,当数据变化时, 触发模板等内容的更新

- ref 处理基础类型的数据
- reactive  处理复杂类型的数据
- toRefs 响应式解构数据

```
<script>
    // ref reactive 响应式的应用
    // 原理: 通过proxy 对数据进行封装,当数据变化时, 触发模板等内容的更新
    // ref 处理基础类型的数据
    const app = Vue.createApp({
        setup(props, context) {
            // // proxy, 'dell'变成proxy({value:'dell'})这样的响应式引用
            // const {
            //     ref
            // } = Vue;
            // let name = ref('dell')
            // setTimeout(() => {
            //     name.value = "wang"
            // }, 2000)
            // return {
            //     name
            // }
            const {
                reactive
            } = Vue;
            // proxy, {name: "dell"}变成proxy( {name: "dell"})这样的响应式引用
            const nameObj = reactive({
                name: "dell"
            })
            setTimeout(() => {
                nameObj.name = "wang"
            }, 2000)
            return {
                nameObj
            }
        },
        template: `<div>{{nameObj.name}}</div>`
    });

    const vm = app.mount("#root")
</script>
```

vue还提供了readonly，对响应式的引用做了限制，只能读不能改

```
const {
                reactive,
                readonly
            } = Vue;
const nameObj = reactive({
                name: "dell"
            })
const readOnlyObj = readonly(nameObj)
setTimeout(() => {
                nameObj.name = "wang"
                readOnlyObj.name = "wang"
            }, 2000)
return {
                nameObj,
                readOnlyObj
            }
```

会报错`vue@next:427 [Vue warn] Set operation on key "name" failed: target is readonly.`

如果直接

```
const {name} = nameObj;
return {
	name
}
```

返回解构到的name，nameObj是响应式的，但是解构得到的name不是响应式，nameObj更改后返回的name还是旧的值，所以想要响应式的返回解构值，需要用到toRefs

```
const {reactive,toRefs} = Vue;
const nameObj = reactive({name: "dell"})
const {name} = toRefs(nameObj);
return {name}
```

### 6-3 toRef

当用toRefs取对象中没有的属性值时，toRefs不会给定默认值，后续再赋值会报错。而toRef可以给一个默认值。

```
const app = Vue.createApp({
        setup(props, context) {
            const {reactive,toRef} = Vue;
            const data = reactive({
                name: "dell"
            })
            const age = toRef(data, 0) // 给age一个默认值0
            setTimeout(() => {
                age.value = 12
            }, 2000);
            return {
                age
            }
        },
        template: `<div>{{age}}</div>`
    });
```

### 6-3 context

context里存放着attrs, slots,emit

- attrs, 取的是父组件传来的属性(不传值的话是None-Props)
- slots, 取的是父组件里的插槽
- emit，触发父组件的事件

在Composition API中通过slots可以实现传统的this.$slots，emit可以实现传统语法中的this.$emit，attrs可以获取传统语法中的None-Props

#### attrs：

```
<script>
    const app = Vue.createApp({
        template: `<child app='app'>parent</child>`
    });
    app.component("child", {
        template: `<div>child</div>`,
        //attrs 取的是父组件传来的属性(不传值的话是None-Props)
        setup(props, context) {
            const {
                attrs,
                slots,
                emit
            } = context
            console.log(attrs.app)// 会打印传来的"app"
            return {}
        }
    })
    const vm = app.mount("#root")
</script>
```

#### slots：

```
<script>
    const app = Vue.createApp({
        methods: {
            handleChange() {
                console.log("handleChange")
            }
        },
        template: `<child>parent</child>`
    });
    app.component("child", {

        mounted() { // 本来可以用this.$slots取到插槽
            console.log(this.$slots)
        },
        template: `<div>child</div>`,

        setup(props, context) {
            const {
                h
            } = Vue
            const {
                attrs,
                slots,
                emit
            } = context

            console.log(slots.default()) // 插槽的默认值
            return () => h('div', {}, slots.default()) // 返回一个render，最终子组件会渲染出父组件插槽里的内容：parent
        }
    })
    const vm = app.mount("#root")
</script>
```

#### emit：

原本子组件里this.$emit('change')，通知父组件，父组件@change="handleChange"收到后调用handleChange函数，打印"handleChange"

```
<script>
    const app = Vue.createApp({
        methods: {
            handleChange() {
                console.log("handleChange")
            }
        },
        template: `<child @change="handleChange">parent</child>`
    });
    app.component("child", {
        mounted() {
            this.$emit('change')
        },
        template: `<div >child</div>`
    })
    const vm = app.mount("#root")
</script>
```

而在context中可以直接emit('change')

```
<script>
    const app = Vue.createApp({
        methods: {
            handleChange() {
                console.log("handleChange")
            }
        },
        template: `<child @change="handleChange">parent</child>`
    });
    app.component("child", {
        template: `<div @click="handleClick">child</div>`,
        setup(props, context) {
            const {attrs,slots,emit} = context

            function handleClick() {
                emit('change')
            }
            return {handleClick}
        }
    })
    const vm = app.mount("#root")
</script>
```

### 6-4 使用Composition API开发TodoList

```
<script>
    const app = Vue.createApp({
        setup() {
            const {
                ref,
                reactive
            } = Vue;
            const inputValue = ref("123")
            const list = reactive([])
            const handleInputValueChange = (e) => {
                inputValue.value = e.target.value
                console.log(e.target.value)
            }
            const handleSubmit = (e) => {
                list.push(inputValue.value)
            }
            return {
                list,
                inputValue,
                handleInputValueChange,
                handleSubmit
            }
        },
        template: `<div>
            <input :value="inputValue" @input="handleInputValueChange"/>
            <div>{{inputValue}}</div>
            <button @click="handleSubmit">提交</button>
            <ul>
                <li v-for="(item,index) in list" :key="index">{{item}}</li>
            </ul>
        </div>`
    });

    const vm = app.mount("#root")
</script>
```

还可以把list相关操作封装，input相关操作封装

```
// 将关于list的代码进行封装
    const listRelativeEffect = () => {
            const {
                reactive
            } = Vue;
            const list = reactive([])
            const handleSubmit = (item) => {
                list.push(item)
            }
            return {
                handleSubmit,
                list
            }
        }
        // 将关于inputValue的代码进行封装
    const inputRelativeEffect = () => {
        const {
            ref
        } = Vue;
        const inputValue = ref("123")
        const handleInputValueChange = (e) => {
            inputValue.value = e.target.value
            console.log(e.target.value)
        }
        return {
            inputValue,
            handleInputValueChange
        }
    }
    const app = Vue.createApp({
        // 流程调度中转
        setup() {
            const {
                list,
                handleSubmit
            } = listRelativeEffect();
            const {
                inputValue,
                handleInputValueChange
            } = inputRelativeEffect();
            return {
                list,
                inputValue,
                handleInputValueChange,
                handleSubmit
            }
        },
        template: `<div>
            <input :value="inputValue" @input="handleInputValueChange"/>
            <div>{{inputValue}}</div>
            <button @click="handleSubmit(inputValue)">提交</button>
            <ul>
                <li v-for="(item,index) in list" :key="index">{{item}}</li>
            </ul>
        </div>`
    });
```

### 6-5 computed方法生成计算属性

```
const app = Vue.createApp({

        setup() {
            const {
                ref,
                computed
            } = Vue
            const count = ref(0)
            const handleClick = function() {
                count.value++
            }
            const countAddFive = computed(() => {
                return count.value + 5
            })
            return {
                count,
                handleClick,
                countAddFive
            }
        },
        template: `<div>
            <span @click="handleClick">{{count}}</span>--{{countAddFive}}
        </div>`
    });
```

computed还可以设置set和get

```
const app = Vue.createApp({
        setup() {
            const {
                ref,
                computed
            } = Vue
            const count = ref(0)
            const handleClick = function() {
                    count.value++
                }
                // const countAddFive = computed(() => {
                //     return count.value + 5
                // })
            const countAddFive = computed({
                get: () => {
                    return count.value + 5
                },
                set: (param) => {
                    count.value = param - 5
                }
            })
            setTimeout(() => {
                countAddFive.value = 100
            }, 2000)
            return {
                count,
                handleClick,
                countAddFive
            }
        },
        template: `<div>
            <span @click="handleClick">{{count}}</span>--{{countAddFive}}
        </div>`
    });
```

### 6-6 watch 和 watchEffect 的使用和差异性

#### watch

```
// watch 侦听器
    const app = Vue.createApp({
        setup() {
            const {
                ref,
                watch
            } = Vue
            const name = ref("wd");
            // 具备一定的惰性 lazy
            // 参数可以拿到当前值和原始值
            watch(name, (currentValue, prevValue) => {
                console.log(currentValue, prevValue)
            })
            return {
                name
            }
        },
        template: `<div>
            Name: <input v-model="name"/>
            <div>my mame is {{name}}</div>
        </div>`
    });
```

如果要监听reactive的部分属性，不能直接watch(Obj.xxx, (currentValue, prevValue)=>{})，因为监听对象只能是getter/effect function、ref、reactive object，或者an array of these types. 所以可以改写为watch(()=>Obj.xxx, (currentValue, prevValue)=>{})，如果要监听多个属性，可以写在数组里

```
// watch 侦听器
    const app = Vue.createApp({
        setup() {
            const {
                reactive,
                ref,
                toRefs,
                watch
            } = Vue
            // const name = ref("wd");
            const person = reactive({
                    name: "w",
                    age: 23
                })
                // 具备一定的惰性 lazy
                // 参数可以拿到当前值和原始值

            // watch(() => person.name, (currentValue, prevValue) => {
            //     console.log(currentValue, prevValue)
            // })
            // watch(() => person.age, (currentValue, prevValue) => {
            //     console.log(currentValue, prevValue)
            // })
            
            // 可以侦听多个数据的变化，用一个侦听器承载
            watch([person.name, person.age], ([currenName, currenAge], [prevName, prevAge]) => {
                console.log([currenName, prevName], [currenAge, prevAge])
            })
            const {
                name,
                age
            } = toRefs(person)
            return {
                name,
                age
            }
        },
        template: `<div>
            Name: <input v-model="name"/>
            Age: <input v-model="age"/>
            <div>my mame is {{name}},age is {{age}}</div>
        </div>`
    });
```

watch是惰性的，不会立即执行，如果要改为立即执行的话可以再传一个参数：`{ immediate: true}`，改为`watch(()=>{},{ immediate: true})`

#### watchEffect

-  watchEffect立即执行，没有惰性
- 不需要传递要侦听的内容，会自动感知代码依赖，不需要传递很多参数，只需要传递一个回调函数
- watchEffect 不能获取之前的值

```
watchEffect(() => {
	console.log(person.name)
})
```

#### 取消侦听器

```
const stop1=watch([person.name, person.age], ([currenName, currenAge], [prevName, prevAge]) => {
	console.log([currenName, prevName], [currenAge, prevAge])
	setTimeout(() => {
		stop1()
	}, 5000)
})

const stop2 = watchEffect(() => {
	console.log(person.name)
	setTimeout(() => {
		stop2()
	}, 5000)
})
```

### 6-7 生命周期函数的新写法

```
<script>
    // compisition API 中的生命周期函数

    // compisition中没有ceated 和beforeCreate, 因为setup出现在create之前
    // beforeMount => onBeforeMount
    // mounted => onMounted
    // beforeUpdate => onBeforeUpdate
    // updated => onUpdated
    // beforeUnmount => onBeforeUnmount
    // unmounted => onUnmounted
    // 除了上述对应的生命周期函数，compisition API中还有额外的生命周期函数：
    // onRenderTracked: 每次页面渲染时自动执行
    // onRenderTriggered: 重新触发页面渲染时执行

    const app = Vue.createApp({
        mounted() {
            console.log("mounted")
        },
        setup() {
            const {
                ref,
                onBeforeMount,
                onMounted,
                onBeforeUpdate,
                onUpdated,

            } = Vue;
            const name = ref("wd");
            const handleClick = function() {
                name.value = "wang"
            };
            onBeforeMount(() => {
                console.log("onBeforeMount")
            });
            onBeforeUpdate(() => {
                console.log("onBeforeUpdate")
            });
            onUpdated(() => {
                console.log("onUpdated")
            });
            // 每次渲染后重新收集响应式依赖
            onRenderTracked(() => {
                console.log("onRenderTracked")
            });
            // 每次触发页面重新渲染时自动执行
            onRenderTriggered(() => {
                console.log("onRenderTriggered")
            });
            return {
                name,
                handleClick
            };
        },
        template: `<div @click="handleClick">
            {{name}}
        </div>`
    });

    const vm = app.mount("#root")
</script>
```

### 6-8 Provide，Inject，模板Ref的用法

#### Provide，Inject

```
    const app = Vue.createApp({
        setup() {
            const {
                ref,
                provide
            } = Vue
            const name = ref('wd');
            provide('name', name);
            provide('changeName', (value) => {
                name.value = value
                console.log(value)
            });
        },
        template: `<div>
            <child/>
        </div>`
    });
    app.component("child", {
        setup(props, context) {
            const {
                inject
            } = Vue
            const name = inject('name', "default")
            const changeName = inject('changeName')
            const handleClick = function() {
                changeName('wang')
            }
            return {
                name,
                handleClick
            }
        },
        template: `<div @click="handleClick">{{name}}</div>`
    })
```

如果要强制子组件不修改值，可以在传递name时用readonly封装

```
setup() {
            const {
                ref,
                provide,
                readonly
            } = Vue
            const name = ref('wd');
            provide('name', readonly(name));
            provide('changeName', (value) => {
                name.value = value
                console.log(value)
            });
        }
```

#### Dom Ref

用ref 获取DOM元素节点: 

```
<script>
    // CompositionAPI的语法下，用ref 获取真实的DOM元素节点
    const app = Vue.createApp({
        setup() {

            const {
                ref,
                onMounted
            } = Vue
            const hello = ref(null);
            onMounted(() => {
                console.log(hello.value)
            })
            return {
                hello
            }
        },
        // 这里的ref是获取dom节点的ref
        template: `<div ref="hello">
            hello world
        </div>`
    });

    const vm = app.mount("#root")
</script>
```



## 第7章 Vue 项目开发配套工具讲解

### 7-1 VueCLI的使用和单文件组件

1. 安装node、npm

   

2. 安装nrm

   ```
   npm install nrm -g
   ```

   注：提示没有权限安装失败的话就win+r，cmd 然后ctrl+shift+enter以管理者权限打开命令行再输入命令。

   nrm ls 列出可用镜像源 `nrm ls`

   ```
   C:\Users\wind>nrm ls
   
     npm ---------- https://registry.npmjs.org/
     yarn --------- https://registry.yarnpkg.com/
     tencent ------ https://mirrors.cloud.tencent.com/npm/
     cnpm --------- https://r.cnpmjs.org/
     taobao ------- https://registry.npmmirror.com/
     npmMirror ---- https://skimdb.npmjs.com/registry/
   ```

   使用淘宝镜像源 `nrm use taobao`

3. 安装vue-cli

   vue-cli是一个快速搭建vue工程的工具，为了安装新版本脚手架，所以先卸载一下

   ```
   npm uninstall vue-cli -g
   yarn global remove vue-cli
   
   npm install -g @vue/cli
   ```

4. 创建Vue 项目

   ```
   cd Desktop
   vue create mydemo
   ```

   然后会展现创建选项，选择人工配置（manually select features），选择Babel、Linter后回车，再选择vue版本（3.x），然后选择ESLint with error prevention only，选择Lint on save，保存时校验，选择配置文件的保存方式：In dedicated config files

5. 运行项目

   ```
   cd mydemo
   npm run serve
   ```

   ctrl + c 退出关闭项目

   可以在VScode 中打开，安装Vetur扩展（语法提示），`npm install` 引入node_modules

工程目录中源码放在src中，APP.vue相当于一个组件，模板写在template中，样式写在style中，核心逻辑在export default中，包含name、局部组件。像APP.vue这样的组件就是单文件组件，文件即代表组件。

main.js为入口文件，用import 的语法引入npm管理的包

```
import { createApp } from 'vue'
import App from './App.vue'
```

npm install

### 7-2 使用单文件编写TodoList

App.vue

```
<template>
  <div>
    <input v-model="inputValue"/>
    <button class="button" @click="handleSubmit">提交</button>
    <ul>
      <list-item 
        v-for="(item,index) in list" 
        :key="index" 
        :msg="item"/>
    </ul>
  </div>
</template>

<script>
import { reactive,ref } from 'vue'
import ListItem from './components/ListItem'
export default {
  name: 'App',
  components:{ListItem},
  setup(){
    const list = reactive([])
    const inputValue = ref("")
    const handleSubmit = function(){
      list.push(inputValue.value);
      inputValue.value="";
    }
    return {list,inputValue,handleSubmit}
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.button{
  margin: 20px;
}
</style>
```

ListItem.vue

```
<template>
    <li>{{msg}}</li>
</template>

<script>
export default {
    name:"ListItem",
    props:{
        msg:String
    }
}
</script>

<style>

</style>
```



### 7-3 Vue-Router的理解和使用

路由是指根据url的不同，展示不同的内容

```
cd Desktop
vue create mydemo
```

手工选择，选择router，不使用history mode（使用hash mode），ESLint 放在单目录，不保存

```
cd mydemo
npm run serve
```

```
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 路由是指根据url的不同，展示不同的内容
createApp(App).use(router).mount('#app')
```

首先main.js中使用路由 `createApp(App).use(router).mount('#app')`，使用了router下的index.js定义的路由

```
//index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

可以看到/和home组件做关联，/about和about组件做关联。

main.js虽然使用了路由，但是最开始执行的实例还是App这个组件，打开App.vue：

```
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
/* ...... */
</style>
```

router-link 是跳转路由的标签，router-view是展示的路由内容，展示当前路由对应的组件内容

总结：

- main.js 入口
- ​	App.vue 路由的展示和跳转
- ​		在router/index.js下对应路径和组件的关系
- ​			views下放要展示的路由组件

注：可以异步加载路由

### 7-4 VueX的语法详解

main.js

```
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
```

vuex提供了全局的仓库store

```
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

存数据：

```
state: {
	name:"wd"
},
```

取数据：`this.$store.state.name`

改数据：

```
<!-- AboutView.vue
第一步：派发一个action -->
<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{myname}}</h1>
  </div>
</template>
<script>

export default {
  name: 'AboutPage',
  computed:{
    myname(){
      return this.$store.state.name
    }
  },
  methods:{
    handleClick(){
      // 想改变数据的话，vuex要求第一步先派发一个action
      this.$store.dispatch('changeName')
    }
  }
}
</script>
```

```
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
        changeName() {
            // 第五步，在mutation中修改数据
            this.state.name = "wang"
        }
    },
    actions: {
        // 第二步，store 感知到触发了changeName 的action，执行操作
        changeName() {
            // 第三步，提交一个commit 触发一个mutation
            console.log("try to change name");
            this.commit('changeName')
        }
    },
    modules: {}
})
```

步骤：

1. dispatch方法，dispatch派发一个action，名为change
2. 感知到 change 这个 action， 执行store中action下的change方法
3. commit一个名为change的数据改变
4. mutation 感知到提交的change改变，执行change方法改变数据

如果没有异步操作，可以不发送action在action中改数据，可以直接commit提交数据修改请求，mutation也能感知到。

注：虽然mutations里面可以异步修改数据，但是默认只进行同步操作，不允许写异步代码。如果要异步的话应该在action中进行异步commit

传参数：

```
<!-- AboutView.vue
第一步：派发一个action -->
<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{name}}</h1>
  </div>
</template>
<script>

export default {
  name: 'AboutPage',
  computed:{
    name(){
      return this.$store.state.name
    }
  },
  methods:{
    handleClick(){
      // 想改变数据的话，vuex要求第一步先派发一个action
      this.$store.dispatch('changeName','wang')
    }
  }
}
</script>

```

```
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
```

- dispatch 和 action 做关联
- commit 和 mutation 做关联

### 7-5 Composition API 中如何使用VueX

```
<!-- AboutView.vue -->
<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{name}}</h1>
  </div>
</template>
<script>

import {useStore} from 'vuex'
import {toRefs} from 'vue'
export default {
  name: 'AboutPage',
  setup(){
    const store = useStore();
    const {name} = toRefs(store.state)
    const handleClick = function(){
      // store.dispatch('changeName','wang') // 异步修改数据要dispatch到action中
      store.commit('changeName','wang') // 同步直接commit
    }
    return {
      name,handleClick
    }
  }
}
</script>

```

```
// index.js
import { createStore } from 'vuex'
export default createStore({
    state: {
        name: 'wd'
    },
    getters: {},

    // 使用Composition API
    mutations: {
        changeName(state, str) {
            state.name = str
        }
    },
    actions: {
        changeName(store, str) {
            console.log("try to change name");
            // this.commit('changeName') // 同步
            setTimeout(() => {
                store.commit('changeName', str) // 异步
            }, 2000)
        }
    },
    modules: {}
})
```

### 7-6 使用 axios 发生 ajax 请求

1. 安装 axios 

   `npm install axios --save`

2. 引入axios

   ```
   <!-- AboutView.vue -->
   <template>
     <div class="about">
       <h1 @click="handleClick">This is an about page</h1>
       <h1>{{name}}</h1>
     </div>
   </template>
   <script>
   // https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register
   import {useStore} from 'vuex'
   import {toRefs} from 'vue'
   import axios from 'axios'
   export default {
     name: 'AboutPage',
     setup(){
       axios.get('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register')
         .then((response)=>{
           console.log(response)
         })
       const store = useStore();
       const {name} = toRefs(store.state)
       
       return {
         name
       }
     }
   }
   </script>
   
   ```

   ![image-20220528123127511](C:\Users\wind\AppData\Roaming\Typora\typora-user-images\image-20220528123127511.png)



## 第8章 “京东到家”项目首页开发

### 8-1 工程初始化

```
vue create shop
```

人工选择Babel、Router、Vuex、CSS Pre-processors、Linter/Formatter，选择N使用哈希路由，选择Sass/SCSS(with dark sass)安装预处理器，选择标准ESLint ,Lint on save,配置文件放在单独的文件里，不保存成未来项目。

### 8-2 工程目录代码简介及整理

安装ESLint、Vetur扩展插件

工程目录：

- node_modules 放工程需要的依赖包，误删了可以通过 `npm install` 重新安装package.json中需要的依赖

- public下存放整个项目默认的index.html模板、和页面tab栏的小图标，通过  `<link rel="icon" href="<%= BASE_URL %>favicon.ico"> `使用
- editorconfig配置编辑器的默认配置
- babel.config.js配置vue中用到的babel配置
- package.json 放项目的依赖包、ESLint的项目配置项等
- package-lock.json 锁版本文件，保证多人协作或反复安装依赖时安装的版本号固定
- README.md 项目描述文件
- src 源码文件
  - main.js 源代码入口文件，导入App.vue单文件组件
  - App.vue 最外层的组件
  - assets 目录下放静态文件
  - components 目录下放功能组件
  - router 目录下index.js放对应路由配置
  - store 目录下存放vuex的数据
  - views 目录下存放页面级别的组件

### 8-3 基础样式集成及开发模拟器的使用

1. 安装 normalize.css，统一设备样式差距

```
npm install normalize.css --save
```

2. main.js 引入

```
import 'normalize.css'
```

3. 新建style目录，新建base.scss文件

```
html {
  font-size: 100px;
}

// 1rem = 1 * html font-size
body {
  font-size: .12rem;
}
```



### 8-4 flex + iconfont 完成首页样式编写

#### 复制粘贴iconfont css样式至style目录下iconfont.css

```
/* Logo 字体 */
@font-face {
  font-family: "iconfont";
  /* Project id 3435551 */
  src: url('//at.alicdn.com/t/font_3435551_4x5updpdnh.woff2?t=1653743635919') format('woff2'),
    url('//at.alicdn.com/t/font_3435551_4x5updpdnh.woff?t=1653743635919') format('woff'),
    url('//at.alicdn.com/t/font_3435551_4x5updpdnh.ttf?t=1653743635919') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-gouwuche:before {
  content: "\e63f";
}

.icon-shouye:before {
  content: "\e64f";
}

.icon-wode:before {
  content: "\e8a0";
}

.icon-dingdan:before {
  content: "\e645";
}
```

#### main.js引入文件

```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/base.scss'
import './style/iconfont.css'

createApp(App).use(store).use(router).mount('#app')

```

注：可以在style中新建index.scss，然后引入样式的代码写在index.scss中，这样main.js只需要引入index.scss

#### 首页使用相应icon代码

```
<template>
  <div class="docker">
    <!-- BEM
    Block__Element--Modifier -->
    <span class="docker__item docker__item--active">
      <div class="iconfont">&#xe64f;</div>
      <div class="docker__title">首页</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe63f;</div>
      <div class="docker__title">购物车</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe645;</div>
      <div class="docker__title">订单</div>
    </span>
    <span class="docker__item">
      <div class="iconfont"> &#xe8a0;</div>
      <div class="docker__title">我的</div>
    </span>
  </div>
</template>
```

#### 编写底部样式

```
<style lang="scss">
.docker {
  padding: 0 0.18rem;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 49px;
  width: 100%;
  border-top: 1px solid #f1f1f1;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 20px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
```

- BEM 命名法：Block__Element--Modifier，表示Element为Block的子元素，当前状态为Modifier
- box-sizing: border-box 将border和padding数值包含在width和height之内，这样修改border和padding数值，盒子的大小不变。

### 8-5 使用 SCSS 组织地址区域布局

scroped

## 第9章 登陆功能开发

### 9-4 使用axios发送登录注册mock请求

1. 安装axios

```
npm install axios --save
```

2. 修改Content-Type

```
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
```

3. 发送请求

```
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
  name: 'login-page',
  setup () {
    const data = reactive({
      usernumber: '',
      password: ''
    })
    const router = useRouter()
    const handleLogin = () => {
      axios.post('https://www.fastmock.site/mock/399fa18dcb16395f9f4bd9ba42f75cb1/shop/api/user/login', {
        usernumber: data.usernumber,
        password: data.password
      }).then(response => {
        alert('成功')
        localStorage.isLogin = true
        router.push({ name: 'home' })
      }).catch(() => {
        alert('登录失败')
      })
    }
    return { handleLogin, data }
  }
}
</script>
```

- 优化1：使用async和await

```
const handleLogin = async () => {
      try {
        const result = await axios.post('https://www.fastmock1.site/mock/399fa18dcb16395f9f4bd9ba42f75cb1/shop/api/user/login', {
          usernumber: data.usernumber,
          password: data.password
        })
        console.log(result)
        if (result?.data?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'home' })
        } else {
          alert('登录失败')
        }
      } catch {
        alert('请求失败')
      }
    }
```

- 优化2：封装为函数

```
import axios from 'axios'
import { reject, resolve } from 'core-js/fn/promise'

export const post = (url, data = {}) => {
  return new Promise(() => {
    axios.post(url, data, {
      baseURL: 'https://www.fastmock1.site/mock/399fa18dcb16395f9f4bd9ba42f75cb1/shop',
      headers: {
        'Conntent-Type': 'application/json'
      }
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

```

```
const handleLogin = async () => {
      try {
        const result = await post('/api/user/login', {
          usernumber: data.usernumber,
          password: data.password
        })
        console.log(result)
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'home' })
        } else {
          alert('登录失败')
        }
      } catch {
        alert('请求失败')
      }
    }
```

### 9-6 弹窗组件的开发

子组件

```
<template>
  <div class="toast">提示信息</div>
</template>

<script>
export default {
  name: 'toast-part'
}
</script>

<style>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>

```

父组件

```
<template>
  ......
  <Toast v-if="data.showToast" />
</template>
```

```
import Toast from '../../components/Toast'
export default {
  name: 'login-page',
  components: { Toast },
  setup () {
    const data = reactive({
      ......
      showToast: false
    })
    const router = useRouter()
    const handleLogin = async () => {
      try {
        const result = await post('111/api/user/login', {
          usernumber: data.usernumber,
          password: data.password
        })
        console.log(result)
        if (result?.errno === 0) {
          localStorage.isLogin = true
          localStorage.usernumber = data.usernumber
          router.push({ name: 'home' })
        } else {
          data.showToast = true
          // alert('登录失败')
        }
      } catch (e) {
        data.showToast = true
        // alert('请求失败')
      }
    }
    const handleRegister = () => {
      router.push({ name: 'register' })
    }
    return { handleLogin, handleRegister, data }
  }
}
```

父子组件传值：

- 父：

```
<template>
  ......
  <Toast v-if="data.showToast"  :message="data.toastMessage"/>
</template>
```

```
const showToast = (messgae) => {
      data.toastMessage = messgae
      data.showToast = true
      setTimeout(() => {
        data.showToast = false
      }, 2000)
    }
    const handleLogin = async () => {
      try {
        const result = await post('111/api/user/login', {
          usernumber: data.usernumber,
          password: data.password
        })
        console.log(result)
        if (result?.errno === 0) {
          localStorage.isLogin = true
          localStorage.usernumber = data.usernumber
          router.push({ name: 'home' })
        } else {
          showToast('登录失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    }
```

- 子：

```
<template>
  <div class="toast">{{message}}</div>
</template>

<script>
export default {
  name: 'toast-part',
  props: ['message']
}
</script>
```

9-7 代码拆分

```
<Toast v-if="toastData.showToast" :message="toastData.toastMessage" />
```

```
const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const showToast = (messgae) => {
    toastData.toastMessage = messgae
    toastData.showToast = true
    setTimeout(() => {
      toastData.showToast = false
    }, 2000)
  }
  return { toastData, showToast }
}
export default {
  name: 'login-page',
  components: { Toast },
  setup () {
    const router = useRouter()
    const data = reactive({ usernumber: '', password: '' })
    const { toastData, showToast } = useToastEffect()
    const handleLogin = async () => {
      try {
        const result = await post('111/api/user/login', {
          usernumber: data.usernumber,
          password: data.password
        })
        console.log(result)
        if (result?.errno === 0) {
          localStorage.isLogin = true
          localStorage.usernumber = data.usernumber
          router.push({ name: 'home' })
        } else {
          showToast('登录失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    }
    const handleRegister = () => {
      router.push({ name: 'register' })
    }
    return { handleLogin, handleRegister, data, toastData }
  }
}
```

### 9-9 setup函数职责及注册功能实现

`placeholder="请输入密码"` 输入框提示

`autocomplete="new-password"`  使密码不自动填充

## 第10章 商家展示功能开发（上）

### 10-1 动态获取店铺列表

#### https://www.fastmock.site/ 新建接口，返回数据如下：

```
{
  errno:0,
  data:[{
    _id:'1',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    name: '沃尔玛',
    sales:10000,
    expressLimit:0,
    expressPrice:5,
    tags: ['月售一万+', '起送￥0', '基础运费￥5'],
    slogin: '6元无门槛红包'
  },
  {
    _id:'2',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    name: '永辉超市',
    sales:7000,
    expressLimit:0,
    expressPrice:5,
    tags: ['月售三万+', '起送￥0', '基础运费￥0'],
    slogin: '8元无门槛红包'
  },
  {
    _id:'3',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    name: '盒马生鲜',
    sales:2000,
    expressLimit:0,
    expressPrice:5,
    tags: ['月售一万+', '起送￥0', '基础运费￥5'],
    slogin: '8元无门槛红包'
  }]
}
```

#### utils/request.js 封装get请求

```

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }, {
      baseURL: 'https://www.fastmock.site/mock/399fa18dcb16395f9f4bd9ba42f75cb1/shop',
      headers: {
        'Conntent-Type': 'application/json'
      }
    }).then(response => {
      console.log('resolve')
      resolve(response.data)
    }, err => {
      console.log('reject')
      reject(err)
    })
  })
}
```

#### 用axios实例简写

```
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/399fa18dcb16395f9f4bd9ba42f75cb1/shop',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(response => {
      console.log('resolve')
      resolve(response.data)
    }, err => {
      console.log('reject')
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(response => {
      console.log('resolve')
      resolve(response.data)
    }, err => {
      console.log('reject')
      reject(err)
    })
  })
}

```

#### nearby组件请求数据

```
<script>
import { ref } from 'vue'
import { get } from '../../utils/request'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('api/shop/hot-list')
    console.log('result:', result, result?.errno === 0, result?.data?.length)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'nearby-part',
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>
```

#### 将数据展示到页面中

```
<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div v-for="(item,index) in nearbyList" :key="index" class="nearby__item">
      <img class="nearby__item__img" :src="item.imgUrl">
      <div class="nearby__item__content">
        <div class="nearby__item__title">{{item.name}}</div>
        <div class="nearby__item__tags">
          <span class="nearby__item__tag">月售{{item.sales}}</span>
          <span class="nearby__item__tag">起送￥{{item.expressLimit}}</span><span class="nearby__item__tag">基础运费￥{{item.expressPrice}}</span>
        </div>
        <div class="nearby__item__highlight">{{item.slogin}}</div>
      </div>
    </div>
  </div>
</template>
```

### 10-2 动态路由、异步路由

```
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import Shop from '../views/shop/Shop'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'login' || name === 'register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'login' })
  console.log(from, to)
  console.log(isLogin, isLoginOrRegister, isLogin || isLoginOrRegister)
})
export default router

```

加载首页的同时其他路由项也会加载，这样会拖慢首页加载速度，所以可以采用动态路由的方法，异步加载组件。

#### 动态路由

```
import { createRouter, createWebHashHistory } from 'vue-router'
// 无需引入
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName:'home_123123' */ '../views/home/Home')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName:'shop_123123' */ '../views/shop/Shop')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName:'register_123123' */ '../views/register/Register')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:'login_123123' */ '../views/login/Login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'login' || name === 'register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'login' })
  console.log(from, to)
  console.log(isLogin, isLoginOrRegister, isLogin || isLoginOrRegister)
})
export default router

```

无需全部引入，webpackChunkName是为了方便展示效果，这样不会加载全部页面，只会加载当前需要显示的组件

### 10-3 组件拆分复用

将店铺缩略行拆分为单独的组件

```
<template>
  <div class="shop">
    <img class="shop__img" :src="item.imgUrl">
    <div :class="{'shop__content':true,'shop__content--bordered':hideBorder?false:true}">
      <div class="shop__title">{{item.name}}</div>
      <div class="shop__tags">
        <span class="shop__tag">月售{{item.sales}}</span>
        <span class="shop__tag">起送￥{{item.expressLimit}}</span><span class="shop__tag">基础运费￥{{item.expressPrice}}</span>
      </div>
      <div class="shop__highlight">{{item.slogin}}</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'shop-info',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scroped>
@import "../style/viriables.scss";
.shop {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &__img {
    height: 0.56rem;
    width: 0.56rem;
    margin-right: 0.16rem;
  }
  &__content {
    flex: 1;
    padding: 0.12rem 0;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgColor;
    }
  }
  &__title {
    font-size: 0.16rem;
  }
  &__tags {
    margin-top: 0.08rem;
  }
  &__tag {
    margin-right: 0.16rem;
  }
  &__highlight {
    color: red;
    margin-top: 0.1rem;
    font-size: 0.13rem;
  }
}
</style>

```

然后Nearby.vue中使用

```
<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('api/shop/hot-list')
    console.log('result:', result, result?.errno === 0, result?.data?.length)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'nearby-part',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scroped>
@import "../../style/viriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.04rem;
    font-size: 0.18rem;
    color: #333333;
    font-weight: normal;
  }
}
</style>

```

Shop.vue 中使用

```
<template>
  <div class="wrapper">
    <ShopInfo :item="item" :hideBorder="true" />
  </div>

</template>

<script>
import { reactive } from 'vue'
import ShopInfo from '../../components/ShopInfo'
export default {
  name: 'shop-page',
  components: { ShopInfo },
  setup () {
    const item = reactive({
      _id: '1',
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      name: '沃尔玛',
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      tags: ['月售一万+', '起送￥0', '基础运费￥5'],
      slogin: '6元无门槛红包'
    })
    return { item }
  }
}
</script>

<style lang='scss' scroped>
.wrapper {
  padding: 0 0.18rem 0.2rem;
  overflow-y: auto;
}
</style>
 
```

### 10-4 搜索布局

```
<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6db;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xeafe;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" />
  </div>

</template>

<script>
import { reactive } from 'vue'
import ShopInfo from '../../components/ShopInfo'
import { useRouter } from 'vue-router'
export default {
  name: 'shop-page',
  components: { ShopInfo },
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    const item = reactive({
      _id: '1',
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      name: '沃尔玛',
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      tags: ['月售一万+', '起送￥0', '基础运费￥5'],
      slogin: '6元无门槛红包'
    })
    return { item, handleBackClick }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  padding: 0 0.18rem 0.2rem;
  overflow-y: auto;
}
.search {
  margin: 0.16rem 0;
  display: flex;
  text-align: center;
  &__back {
    width: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.25rem;
    color: #b6b6b6;
  }
  &__content {
    flex: 1;
    display: flex;
    border-radius: 0.16rem;
    background: #f5f5f5;
    &__icon {
      width: 0.4rem;
      line-height: 0.32rem;
      font-size: 0.2rem;
      color: #b6b6b6;
    }
    &__input {
      flex: 1;
      line-height: 0.32rem;
      border: none;
      background: none;
      padding-right: 0.2rem;
      font-size: 0.14rem;
      &::placeholder {
        color: #333;
      }
    }
  }
}
</style>

```

`router.back()` 返回

### 10-5 路由跳转

通过router-link完成主页点击店铺列表跳转至店铺详情

```
<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link to="/shop" v-for="item in nearbyList" :key="item._id">
      <ShopInfo :item="item" />
    </router-link>

  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('api/shop/hot-list')
    console.log('result:', result, result?.errno === 0, result?.data?.length)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'nearby-part',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.04rem;
    font-size: 0.18rem;
    color: #333333;
    font-weight: normal;
  }
  a {
    text-decoration: none;
    color: #333333;
  }
}
</style>

```

`<router-link to="/shop" v-for="item in nearbyList" :key="item._id"><ShopInfo :item="item" /> </router-link>` 设置路由跳转

`a {text-decoration: none;color: #333333;}` 重写a标签样式，去除下划线等效果

### 10-6 路由参数传递

#### 传参

修改router目录下index.js，在路径后添加:id，表示需要带一个id参数，访问时通过类似http://localhost:8080/#/shop/2才能跳转，2就是传过去的id

```
{
    path: '/shop/:id',
    name: 'shop',
    component: () => import(/* webpackChunkName:'shop_123123' */ '../views/shop/Shop')
  }
```

修改nearby.vue中的router-link

```
<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
      <ShopInfo :item="item" />
    </router-link>

  </div>
</template>
```

#### 取参

```
import { useRouter, useRoute } from 'vue-router'
......
const rout = useRoute()
console.log(rout.name, rout.params, rout.params.id )
```

可以通过rout.params取出所有的参数， rout.params.id 取出参数id对应的值

### 10-7 商家详情获取

用前面封装好的get方法向对应url发送请求，`get('/api/shop/' + rout.params.id)`

```
<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6db;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xeafe;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" />
  </div>

</template>

<script>
import { reactive, toRefs } from 'vue'
import ShopInfo from '../../components/ShopInfo'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
export default {
  name: 'shop-page',
  components: { ShopInfo },
  setup () {
    const router = useRouter()
    const rout = useRoute()
    const handleBackClick = () => {
      router.back()
    }
    const data = reactive({
      item: {}
    })
    const getItemData = async () => {
      const result = await get('/api/shop/' + rout.params.id)
      console.log(result)
      if (result?.errno === 0 && result?.data) {
        data.item = result.data
      }
    }
    getItemData()
    const { item } = toRefs(data)
    return { item, handleBackClick }
  }
}
</script>

<style lang='scss' scoped>
......
</style>

```

定义函数useShopInfoEffect拆分代码

```
<script>
import { reactive, toRefs } from 'vue'
import ShopInfo from '../../components/ShopInfo'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const rout = useRoute()
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    const result = await get('/api/shop/' + rout.params.id)
    console.log(result)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  getItemData()
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退逻辑
const useBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'shop-page',
  components: { ShopInfo },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackEffect()
    return { item, getItemData, handleBackClick }
  }
}
</script>
```

因为数据的请求需要时间，所有图片部分会闪烁一下，先显示裂图后显示正确图片。可以设置v-show或者v-if，当图片获取成功后再显示，而不会显示裂图过渡。

### 10-8 商家页面核心样式开发

#### 10-12 商家详情页分类及内容联动

```
<template>
  <div class="content">
    <div class="category">
      <div class="category__item category__item--active">
        全部商品
      </div>
      <div class="category__item">
        秒杀
      </div>
      <div class="category__item">
        新鲜水果
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item.name">
        <img class="product__item__img" src="http://www.dell-lee.com/imgs/vue3/near.png">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus">-</span>0
          <span class="product__number__plus">+</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { get } from '../../utils/request'
import { reactive, toRefs } from 'vue'
export default {
  name: 'content-part',
  setup () {
    const categories = [{
      name: '全部商品',
      tag: 'all'
    },
    {
      name: '秒杀',
      tag: 'seckill'
    },
    {
      name: '新鲜水果',
      tag: 'fruit'
    }]
    const data = reactive({ contentList: [] })
    const getContentData = async (tag) => {
      const result = await get('/api/shop/1/products', { tag })
      console.log(result)
      if (result?.errno === 0 && result?.data?.length) {
        data.contentList = result.data
      }
      return result.data
    }
    getContentData('all')
    const { contentList } = toRefs(data)
    console.log('contentList ', contentList)
    return { categories, contentList }
  }
}
</script>

<style lang="scss">
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
}
.category {
  width: 0.76rem;
  height: 100%;
  overflow-y: scroll;
  background: $search-bgColor;
  margin-right: 0.16rem;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid $content-bgColor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: red;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
      margin: 0 0.05rem;
    }
    .product__number {
      position: absolute;
      right: 0.18rem;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.18rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.08rem;
      }
      &__plus {
        color: $bgColor;
        background: $highlight-bgColor;
        margin-left: 0.07rem;
      }
    }
  }
}
</style>

```





## 第11章 商家展示功能开发（下）



## 第12章 核心购物链路开发



## 第13章 真机调试及工程发布流程

