:::tip
1、`eventCustomOption` Configure custom events<br>
2、Support body, header, footer row and column event customization<br>
3、The following event customization is supported

-   click
-   dblclick
-   contextmen
-   mouseenter
-   mouseleave
-   mousemove
-   mouseover
-   mousedown
-   mouseup

:::

Quick view of option code

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
      mousemove: (event) => {},
      mouseover: (event) => {},
      mousedown: (event) => {},
      mouseup: (event) => {},
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
      mousemove: (event) => {},
      mouseover: (event) => {},
      mousedown: (event) => {},
      mouseup: (event) => {},
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
      mousemove: (event) => {},
      mouseover: (event) => {},
      mousedown: (event) => {},
      mouseup: (event) => {},
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
      mousemove: (event) => {},
      mouseover: (event) => {},
      mousedown: (event) => {},
      mouseup: (event) => {},
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
      mousemove: (event) => {},
      mouseover: (event) => {},
      mousedown: (event) => {},
      mouseup: (event) => {},
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
      mousemove: (event) => {},
      mouseover: (event) => {},
      mousedown: (event) => {},
      mouseup: (event) => {},
    };
  },
},
```
