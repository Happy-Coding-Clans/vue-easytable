:::anchor 使用方法
在你需要的地方引用

```javascript
import Vue from "vue";
import { veLoading } from "vue-easytable";
```

调用

```javascript
veLoading({
    target: "#loading-1",
    name: "grid",
    tip: "loading...",
});
```

:::anchor 全局使用
将 veLoading 组件挂载到 Vue 的 prototype 原型上，便于全局调用

```javascript
import Vue from "vue";
import { veLoading } from "vue-easytable";

Vue.prototype.$veLoading = veLoading;
```

调用

```javascript
this.$veLoading({
    target: "#loading-1",
    name: "grid",
    tip: "loading...",
});
```
