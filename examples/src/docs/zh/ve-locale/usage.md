:::anchor 使用

```javascript
import Vue from "vue";
import { VeLocale } from "vue-easytable";
// 引入英文语言包
import enUS from "vue-easytable/libs/locale/lang/en-US.js";

VeLocale.use(enUS);
```

:::anchor 全局使用
将 veLocale 组件挂载到 Vue 的 prototype 原型上，便于全局调用

```javascript
import Vue from "vue";
import { VeLocale } from "vue-easytable";

Vue.prototype.$veLocale = VeLocale;
```

调用

```javascript
import enUS from "vue-easytable/libs/locale/lang/en-US.js";
this.$veLocale.use(enUS);
```
