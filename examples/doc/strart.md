## 快速上手



### 全局配置表格字体等样式

表格内的字体以及字体大小默认是依赖于全局设置的字体，如果需要设置可以通过开放的class 即可：

提示：下面样式放到全局中起到全局配置的作用，如果放到每个组件中，只会影响到当前组件内的表格样式

**整个表格设置字体：**
```css
.v-table-class{
   /*font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;*/
}
```

**表格表头设置**
```css
.v-table-title-class {
   /*font-weight: normal;
    color: #333333;
    text-shadow: 0 0 0 #333333;*/
}
```

**表格表体设置**
```css
.v-table-body-class {
  /*font-weight: normal;
    color: #333333;
    text-shadow: 0 0 0 #333333;*/
}
```

**表格footer设置**
```css
.v-table-footer-class {
  /*font-weight: normal;
    color: #333333;
    text-shadow: 0 0 0 #333333;*/
}
```







