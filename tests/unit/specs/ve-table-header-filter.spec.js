import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import veIcon from "@/ve-table";
import { later } from "../util";

describe("veTable header filter", () => {
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

    const mockFilterFn = jest.fn();
    const mockBeforeVisibleChangeFn = jest.fn();

    // filter single
    const TABLE_COLUMNS_FILTER_SINGLE = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "left",
            width: "15%",
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
            width: "15%",
            // filter
            filter: {
                beforeVisibleChange: ({ nextVisible }) => {
                    mockBeforeVisibleChangeFn({ nextVisible });
                },
                filterList: [
                    { value: 0, label: "1900-05-20", selected: false },
                    { value: 1, label: "1910-06-20", selected: false },
                    { value: 2, label: "2000-07-20", selected: false },
                    { value: 3, label: "2010-08-20", selected: false },
                    { value: 4, label: "2020-09-20", selected: false },
                ],
                // filter confirm hook
                filterConfirm: (filterList) => {
                    mockFilterFn(filterList);
                },
                // filter reset hook
                filterReset: (filterList) => {
                    mockFilterFn(filterList);
                },
            },
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
    ];

    // filter multiple
    const TABLE_COLUMNS_FILTER_MULTIPLE = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "left",
            width: "15%",
            // filter
            filter: {
                filterList: [
                    { value: 0, label: "John", selected: true },
                    { value: 1, label: "Dickerson", selected: false },
                    { value: 2, label: "Larsen", selected: false },
                    { value: 3, label: "Geneva", selected: false },
                    { value: 4, label: "Jami", selected: false },
                ],
                isMultiple: true,
                // filter confirm hook
                filterConfirm: (filterList) => {
                    mockFilterFn(filterList);
                },
                // filter reset hook
                filterReset: (filterList) => {
                    mockFilterFn(filterList);
                },
                // max height
                maxHeight: 120,
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
    ];

    // filter custom icon
    const TABLE_COLUMNS_CUSTOM_ICON = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "left",
            width: "15%",
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
            width: "15%",
            // filter
            filter: {
                filterList: [
                    { value: 0, label: "1900-05-20", selected: false },
                    { value: 1, label: "1910-06-20", selected: false },
                    { value: 2, label: "2000-07-20", selected: false },
                    { value: 3, label: "2010-08-20", selected: false },
                    { value: 4, label: "2020-09-20", selected: false },
                ],
                // filter confirm hook
                filterConfirm: (filterList) => {
                    const labels = filterList
                        .filter((x) => x.selected)
                        .map((x) => x.label);
                    this.searchByDateField(labels);
                },
                // filter reset hook
                filterReset: (filterList) => {
                    this.searchByDateField([]);
                },
                // custom filter icon
                filterIcon: (h) => {
                    return <veIcon name="search" />;
                },
            },
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
    ];

    it("render single filter", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: TABLE_COLUMNS_FILTER_SINGLE,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render multiple filter", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: TABLE_COLUMNS_FILTER_MULTIPLE,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render filter custom icon", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: TABLE_COLUMNS_CUSTOM_ICON,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("single filter", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: TABLE_COLUMNS_FILTER_SINGLE,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        const callBackConfirmData = [
            { value: 0, label: "1900-05-20", selected: true },
            { value: 1, label: "1910-06-20", selected: false },
            { value: 2, label: "2000-07-20", selected: false },
            { value: 3, label: "2010-08-20", selected: false },
            { value: 4, label: "2020-09-20", selected: false },
        ];

        const callBackResetData = [
            { value: 0, label: "1900-05-20", selected: false },
            { value: 1, label: "1910-06-20", selected: false },
            { value: 2, label: "2000-07-20", selected: false },
            { value: 3, label: "2010-08-20", selected: false },
            { value: 4, label: "2020-09-20", selected: false },
        ];

        // 改变选项
        wrapper.findAll(".ve-dropdown-items-li").at(0).trigger("click");

        await later();

        // confirm btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(1).trigger("click");

        await later();

        expect(mockFilterFn).toBeCalled();
        expect(mockFilterFn).toHaveBeenCalledWith(callBackConfirmData);

        // reset btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(0).trigger("click");

        await later();

        expect(mockFilterFn).toBeCalled();
        expect(mockFilterFn).toHaveBeenCalledWith(callBackResetData);
    });

    it("multiple filter", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: TABLE_COLUMNS_FILTER_MULTIPLE,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        const callBackConfirmData = [
            { value: 0, label: "John", selected: true },
            { value: 1, label: "Dickerson", selected: true },
            { value: 2, label: "Larsen", selected: false },
            { value: 3, label: "Geneva", selected: false },
            { value: 4, label: "Jami", selected: false },
        ];

        const callBackResetData = [
            { value: 0, label: "John", selected: false },
            { value: 1, label: "Dickerson", selected: false },
            { value: 2, label: "Larsen", selected: false },
            { value: 3, label: "Geneva", selected: false },
            { value: 4, label: "Jami", selected: false },
        ];

        // 改变选项
        wrapper.findAll(".ve-checkbox").at(1).trigger("click");

        await later();

        // confirm btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(1).trigger("click");

        await later();

        expect(mockFilterFn).toBeCalled();
        expect(mockFilterFn).toHaveBeenCalledWith(callBackConfirmData);

        // reset btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(0).trigger("click");

        await later();

        expect(mockFilterFn).toBeCalled();
        expect(mockFilterFn).toHaveBeenCalledWith(callBackResetData);
    });

    it("beforeVisibleChange callback method", async () => {
        const wrapper = mount({
            render() {
                return (
                    <ve-table
                        columns={this.columns}
                        tableData={this.tableData}
                    />
                );
            },
            data() {
                return {
                    columns: TABLE_COLUMNS_FILTER_SINGLE,
                    tableData: TABLE_DATA,
                };
            },
        });

        // icon-vet-filter
        wrapper.find(".icon-vet-filter").trigger("click");
        await later();

        expect(mockBeforeVisibleChangeFn).toBeCalled();
        expect(mockBeforeVisibleChangeFn).toHaveBeenCalledWith({
            nextVisible: true,
        });

        // 改变选项
        wrapper.findAll(".ve-dropdown-items-li").at(0).trigger("click");

        await later();

        // confirm btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(1).trigger("click");

        await later();

        expect(mockBeforeVisibleChangeFn).toBeCalled();
        expect(mockBeforeVisibleChangeFn).toHaveBeenCalledWith({
            nextVisible: false,
        });
    });
});
