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



### 4-5 父子组件间通过事件通信

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

