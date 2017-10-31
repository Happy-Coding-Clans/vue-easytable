
## 安装

### CDN 方式使用

通过 [https://unpkg.com/vue-easytable/](https://unpkg.com/vue-easytable/) 可以看到 vue-easytable 最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 和 css 文件即可开始使用：

```css
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/vue-easytable/umd/css/index.css">
<!-- 引入Vue -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- 引入组件库 -->
<script src="https://unpkg.com/vue-easytable/umd/js/index.js"></script>
```

### 示例
``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://unpkg.com/vue-easytable/umd/css/index.css">
</head>
<body>
<div id="app">
    <v-table
            :width="1000"
            :columns="columns"
            :table-data="tableData"
            :show-vertical-border="false"
    ></v-table>
</div>
</body>
<!-- 先引入 Vue -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- 引入组件库 -->
<script src="https://unpkg.com/vue-easytable/umd/js/index.js"></script>
<script>
    new Vue({
        el: '#app',
        data: function() {
            return {
                tableData: [
                    {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                    {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                    {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                    {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                    {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                ],
                columns: [
                    {field: 'name', title:'姓名', width: 100, titleAlign: 'center',columnAlign:'center'},
                    {field: 'tel', title: '手机号码', width: 260, titleAlign: 'center',columnAlign:'center'},
                    {field: 'hobby', title: '爱好', width: 330, titleAlign: 'center',columnAlign:'center'},
                    {field: 'address', title: '地址', titleAlign: 'center',columnAlign:'left'}
                ]
            }
        }
    })
</script>
</html>
```

### NPM 方式使用

```javascript
npm install vue-easytable --save-dev
```

### 使用

```javascript
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
```
