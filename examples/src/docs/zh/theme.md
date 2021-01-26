## 主题定制

:::anchor 内置主题
默认提供了两套主题，蓝色主题和暗黑主题

#### 使用蓝色主题

引入蓝色主题样式

```
import "vue-easytable/libs/theme-default/index.css";
```

示例：

#### 使用暗黑主题

```
import "vue-easytable/libs/theme-dark/index.css";
```

示例：

:::anchor 主题定制

vue-easytable 的样式使用了 Less 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。

#### 选择蓝色主题定制

如果你需要的主题和蓝色主题接近，你可以选择按照蓝色主题定制。所有蓝色主题样式变量可以在 **[这里找到](https://github.com/huangshuwei/vue-easytable/blob/master/packages/theme-default/var.less)**。

建创建一个单独的 less 变量文件，例如 vue-easytable-variables.less，引入这个文件覆盖 var.less 里的变量。

```
@import '~vue-easytable/libs/theme-default/var.less'; // 引入官方提供的 less 样式入口文件
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 vue-easytable 编译好的 CSS 文件）：

```
import Vue from 'vue'
import VueEasytable from 'vue-easytable'
import './vue-easytable-variables.less'

Vue.use(VueEasytable)
```

#### 选择暗黑主题定制

如果你需要的主题和暗黑主题接近，你可以选择按照暗黑主题定制。所有暗黑主题样式变量可以在 **[这里找到](https://github.com/huangshuwei/vue-easytable/blob/master/packages/theme-dark/var.less)**。

建创建一个单独的 less 变量文件，例如 vue-easytable-variables.less，引入这个文件覆盖 var.less 里的变量。

```
@import '~vue-easytable/libs/theme-dark/var.less'; // 引入官方提供的 less 样式入口文件
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 vue-easytable 编译好的 CSS 文件）：

```
import Vue from 'vue'
import VueEasytable from 'vue-easytable'
import './vue-easytable-variables.less'

Vue.use(VueEasytable)
```
