:::tip
1、`eventCustomOption` 配置自定义事件<br>
2、支持 body、header、footer 行和列 事件自定义<br>
3、支持以下事件自定义

-   click
-   dblclick
-   contextmen
-   mouseenter
-   mouseleave
    :::

配置代码速览

```
eventCustomOption: {
  // body 行事件自定义
  bodyRowEvents: ({ row, rowIndex }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // body 列事件自定义
  bodyCellEvents: ({ row,column,rowIndx }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // header 行事件自定义
  headerRowEvents: ({ rowIndx }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // header 列事件自定义
  headerCellEvents: ({ column,rowIndx }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // footer 行事件自定义
  footerRowEvents: ({ row, rowIndex }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // footer 列事件自定义
  footerCellEvents: ({ row,column,rowIndx }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
},
```
