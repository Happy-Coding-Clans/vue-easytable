:::tip
1、Set the columns to be sorted through the `sortBy` attribute. `sortBy="asc"`:By default, the current column is in ascending order;`sortBy="desc"`:By default, the current column is in descending order;`sortBy=""`:Sorting allowed without collation<br>
2、Set more sorting functions through the `sortOption` object. The sorting function needs to be implemented with the `sortChange(param)` callback function,The callback parameter contains the collation for the column
:::
