:::tip
1、`eventCustomOption` Configure custom events<br>
2、Support body, header, footer row and column event customization<br>
3、The following event customization is supported

- click
- dblclick
- contextmen
- mouseenter
- mouseleave
  :::

Quick view of configuration code

```
eventCustomOption: {
  // body row event custom
  bodyRowEvents: ({ row, rowIndex }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // body column event custom
  bodyCellEvents: ({ row,column,rowIndx }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // header row event custom
  headerRowEvents: ({ rowIndx }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // header column event custom
  headerCellEvents: ({ column,rowIndx }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // footer row event custom
  footerRowEvents: ({ row, rowIndex }) => {
    return {
      click: (event) => {},
      dblclick: (event) => {},
      contextmenu: (event) => {},
      mouseenter: (event) => {},
      mouseleave: (event) => {},
    };
  },
  // footer column event custom
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
