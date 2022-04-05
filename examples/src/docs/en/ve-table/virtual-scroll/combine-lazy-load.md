:::anchor Combined lazy loading

In some scenes, due to the limitation of network bandwidth or request, you can only paging request at a time, but you want to use virtual scrolling to improve rendering performance,At this time, you can implement the feature of virtual scrolling and lazy loading by `scrolling` callback function. The following is the simulation data, which shall be subject to the actual request

:::demo

```html
<template>
    <div>
        <ve-table
            :max-height="500"
            :virtual-scroll-option="virtualScrollOption"
            :columns="columns"
            :table-data="tableData"
            row-key-field-name="rowKey"
        />
    </div>
</template>

<script>
    import { debounce } from "lodash";
    export default {
        data() {
            return {
                virtualScrollOption: {
                    enable: true,
                    scrolling: this.scrolling,
                },
                columns: [
                    {
                        field: "index",
                        key: "a",
                        title: "#",
                        width: 100,
                        align: "left",
                    },
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
                        width: 200,
                        align: "left",
                    },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby",
                        width: 300,
                        align: "left",
                    },
                    {
                        field: "address",
                        key: "d",
                        title: "Address",
                        width: "",
                        align: "left",
                    },
                ],
                tableData: [],
                remoteData: [],
                // pageing info by request
                pagingInfo: {
                    pageSize: 20,
                    totalPage: 500,
                    totalCount: 10000,
                },
                // scrolling event delay request event
                debounceTime: 150,
                debounceGetDataByPageIndex: null,
            };
        },
        methods: {
            initEmptyData() {
                let data = [];
                const totalCount = this.pagingInfo.totalCount;
                for (let i = 0; i < totalCount; i++) {
                    data.push({
                        rowKey: "prefix" + i,
                        index: i,
                        name: "",
                        hobby: "",
                        address: "",
                    });
                }

                this.tableData = data;
            },
            // get data by page index
            getDataByPageIndex(currentPageIndex, nextPageIndex) {
                const { remoteData, pagingInfo } = this;
                const { pageSize } = pagingInfo;

                const currentStartIndex = (currentPageIndex - 1) * pageSize;
                const nextStartIndex = (nextPageIndex - 1) * pageSize;

                if (
                    remoteData.find((x) => x.index === currentStartIndex) &&
                    remoteData.find((x) => x.index === nextStartIndex)
                ) {
                    return false;
                }

                // whether to request 2 pages of data at one time
                const isDouble = currentPageIndex !== nextPageIndex;

                this.getRemoteData(currentStartIndex, isDouble).then((resData) => {
                    if (Array.isArray(resData) && resData.length) {
                        this.remoteData = this.remoteData.concat(resData);
                        resData.forEach((item) => {
                            this.tableData.splice(item.index, 1, item);
                        });
                    }
                });
            },
            // get remote data
            getRemoteData(startIndex, isDouble) {
                console.log(
                    `send request by ${
                        isDouble ? "double" : "single"
                    } page. start index:${startIndex}`,
                );
                const { pagingInfo } = this;
                const { pageSize, totalCount } = pagingInfo;

                return new Promise((resolve, reject) => {
                    // mock your remote server
                    const realPageSize = isDouble ? pageSize * 2 : pageSize;
                    let pageData = [];
                    setTimeout(() => {
                        for (let i = 0; i < realPageSize; i++) {
                            const index = startIndex + i;

                            const dataItem = {
                                rowKey: "prefix" + index,
                                index: index,
                                name: "name" + index,
                                hobby: "hobby" + index,
                                address: "address" + index,
                            };
                            //
                            if (index < totalCount) {
                                pageData.push(dataItem);
                            }
                        }
                        resolve(pageData);
                    }, 200);
                });
            },
            scrolling({
                startRowIndex,
                visibleStartIndex,
                visibleEndIndex,
                visibleAboveCount,
                visibleBelowCount,
            }) {
                const { pageSize } = this.pagingInfo;
                const currentPageIndex = Math.floor(visibleStartIndex / pageSize) + 1;
                const nextPageIndex = Math.floor(visibleEndIndex / pageSize) + 1;
                this.debounceGetDataByPageIndex(currentPageIndex, nextPageIndex);
            },
        },
        created() {
            this.initEmptyData();
            this.debounceGetDataByPageIndex = debounce(this.getDataByPageIndex, this.debounceTime);
        },
    };
</script>
```

:::
