import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import veIcon from "@/ve-table";
import { later } from "../util";

describe("veTable header filter custom", () => {
    const mockFilterFn = jest.fn((closeFn) => closeFn());

    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
            rowkey: 0,
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
            rowkey: 1,
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
            rowkey: 2,
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
            rowkey: 3,
        },
        {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
            rowkey: 4,
        },
    ];

    it("render", () => {
        const wrapper = mount({
            render() {
                return (
                    <veTable
                        columns={this.columns}
                        tableData={this.tableData}
                    />
                );
            },
            data() {
                return {
                    searchValue: "",
                    columns: [
                        {
                            field: "name",
                            key: "a",
                            title: "Name",
                            align: "left",
                            width: "15%",
                            // filter custom
                            filterCustom: {
                                defaultVisible: true,
                                render: ({ showFn, closeFn }, h) => {
                                    return (
                                        <div class="custom-name-filter">
                                            <input
                                                value={this.searchValue}
                                                on-input={(e) =>
                                                    (this.searchValue =
                                                        e.target.value)
                                                }
                                                placeholder="Search name"
                                            />
                                            <div class="custom-name-filter-operation">
                                                <span
                                                    class="name-filter-cancel"
                                                    on-click={() =>
                                                        mockFilterFn(closeFn)
                                                    }
                                                >
                                                    取消
                                                </span>
                                                <span
                                                    class="name-filter-confirm"
                                                    on-click={() =>
                                                        mockFilterFn(closeFn)
                                                    }
                                                >
                                                    查询
                                                </span>
                                            </div>
                                        </div>
                                    );
                                },
                                // custom filter icon
                                filterIcon: (h) => {
                                    return <ve-icon name="search" />;
                                },
                            },
                        },
                        {
                            field: "date",
                            key: "b",
                            title: "Date",
                            align: "left",
                            width: "15%",
                        },
                        {
                            field: "hobby",
                            key: "c",
                            title: "Hobby",
                            align: "center",
                            width: "30%",
                        },
                        {
                            field: "address",
                            key: "d",
                            title: "Address",
                            align: "left",
                            width: "40%",
                        },
                    ],
                    tableData: TABLE_DATA,
                };
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("custom filter", async () => {
        const wrapper = mount({
            render() {
                return (
                    <veTable
                        columns={this.columns}
                        tableData={this.tableData}
                    />
                );
            },
            data() {
                return {
                    searchValue: "",
                    columns: [
                        {
                            field: "name",
                            key: "a",
                            title: "Name",
                            align: "left",
                            width: "15%",
                            // filter custom
                            filterCustom: {
                                defaultVisible: false,
                                render: ({ showFn, closeFn }, h) => {
                                    return (
                                        <div class="custom-name-filter">
                                            <input
                                                value={this.searchValue}
                                                on-input={(e) =>
                                                    (this.searchValue =
                                                        e.target.value)
                                                }
                                                placeholder="Search name"
                                            />
                                            <div class="custom-name-filter-operation">
                                                <span
                                                    class="name-filter-cancel"
                                                    on-click={() =>
                                                        mockFilterFn(closeFn)
                                                    }
                                                >
                                                    取消
                                                </span>
                                                <span
                                                    class="name-filter-confirm"
                                                    on-click={() =>
                                                        mockFilterFn(closeFn)
                                                    }
                                                >
                                                    查询
                                                </span>
                                            </div>
                                        </div>
                                    );
                                },
                            },
                        },
                        {
                            field: "date",
                            key: "b",
                            title: "Date",
                            align: "left",
                            width: "15%",
                        },
                        {
                            field: "hobby",
                            key: "c",
                            title: "Hobby",
                            align: "center",
                            width: "30%",
                        },
                        {
                            field: "address",
                            key: "d",
                            title: "Address",
                            align: "left",
                            width: "40%",
                        },
                    ],
                    tableData: TABLE_DATA,
                };
            },
        });

        // default icon
        expect(wrapper.find(".icon-vet-filter").exists()).toBe(true);

        wrapper.find(".ve-table-filter-icon").trigger("click");
        await later();
        expect(wrapper.find(".ve-dropdown-dd-show").exists()).toBe(true);

        wrapper.find(".name-filter-confirm").trigger("click");
        expect(mockFilterFn).toBeCalled();
        expect(mockFilterFn).toHaveBeenCalledWith(expect.any(Function));

        await later();
        expect(wrapper.find(".ve-dropdown-dd-show").exists()).toBe(false);
    });
});
