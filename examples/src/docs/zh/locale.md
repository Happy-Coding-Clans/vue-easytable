## 国际化

:::anchor 语言切换

你可以通过 `VeLocal` 组件实现多语言支持，使用 `VeLocal.use` 方法可以切换当前使用的语言。

```javascript
import { VeLocale } from "vue-easytable";
// 引入英文语言包
import enUS from "vue-easytable/libs/locale/lang/en-US.js";

VeLocale.use(enUS);
```

:::anchor 修改语言包

通过 `VeLocale.update` 方法可以实现文案的修改和扩展。

```javascript
import { VeLocale } from "vue-easytable";

const lang = {
  pagination: {
    goto: "跳转到",
  },
};

VeLocale.update(lang);
```

:::anchor CDN 方式加载语言文件

:::tip
1、从目录 “//unpkg.com/vue-easytable/libs/locale/lang/” 目录下引用需要的语言包<br>
2、使用 `VETable.VeLocale.use` 方法使用和切换语言包<br>
3、语言包固定格式为 `VETable.lang.[语言包名称]`，[语言包名称] 不包含‘-’符号，具体见下面示例<br>
:::

```
<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/vue-easytable"></script>
<script src="//unpkg.com/vue-easytable/libs/locale/lang/en-US.js"></script>
<script src="//unpkg.com/vue-easytable/libs/locale/lang/zh-CN.js"></script>

<script>
  // 切换到英文
  VETable.VeLocale.use(VETable.lang.enUS);

  /*
  切换中文
  VETable.VeLocale.use(VETable.lang.zhCN);
  */
</script>
```

:::anchor 语言包

目前支持以下语言：
| 语言 | 文件名 |
| -------- | ------ |
| 简体中文 | zh-CN |
| 繁體中文（中国台湾） | zh-TW |
| 英语 | en-US |
| 南非（荷兰语） | af-ZA |
| 南非（Zulu） | zu-ZA |

如果你需要使用其他的语言，欢迎贡献 PR：只需在 [这里](https://github.com/huangshuwei/vue-easytable/tree/master/packages/src/locale/lang) 添加一个语言配置文件即可。
