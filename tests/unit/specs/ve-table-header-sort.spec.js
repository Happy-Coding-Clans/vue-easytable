import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable header sort", () => {
    const TABLE_DATA = [
        {
            name: "John",
            age: 25,
            weight: 66,
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            name: "Dickerson",
            age: 20,
            weight: 70,
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
        },
        {
            name: "Larsen",
            age: 18,
            weight: 65,
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
        },
        {
            name: "Geneva",
            age: 17,
            weight: 80,
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
        },
        {
            name: "Jami",
            age: 26,
            weight: 72,
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
        },
    ];

    it("render single field sort", () => {
        const columns = [
            {
                field: "name",
                key: "a",
                title: "Name",
                align: "left",
            },
            {
                field: "age",
                key: "b",
                title: "Age",
                align: "center",
                sortBy: "",
            },
            {
                field: "weight",
                key: "c",
                title: "Weight(kg)",
                align: "center",
                sortBy: "asc",
            },
            {
                field: "hobby",
                key: "d",
                title: "Hobby",
                align: "center",
            },
            { field: "address", key: "e", title: "Address", align: "left" },
        ];

        const wrapper = mount({
            render() {
                return (
                    <veTable
                        sortOption={this.sortOption}
                        columns={this.columns}
                        tableData={this.tableData}
                        rowKeyFieldName="rowkey"
                    />
                );
            },
            data() {
                return {
                    columns: columns,
                    tableData: TABLE_DATA,
                    sortOption: {
                        sortChange: (params) => {},
                    },
                };
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render multiple field sort", () => {
        const columns = [
            {
                field: "name",
                key: "a",
                title: "Name",
                align: "left",
            },
            {
                field: "age",
                key: "b",
                title: "Age",
                align: "center",
                sortBy: "",
            },
            {
                field: "weight",
                key: "c",
                title: "Weight(kg)",
                align: "center",
                sortBy: "asc",
            },
            {
                field: "hobby",
                key: "d",
                title: "Hobby",
                align: "center",
            },
            { field: "address", key: "e", title: "Address", align: "left" },
        ];

        const wrapper = mount({
            render() {
                return (
                    <veTable
                        sortOption={this.sortOption}
                        columns={this.columns}
                        tableData={this.tableData}
                        rowKeyFieldName="rowkey"
                    />
                );
            },
            data() {
                return {
                    columns: columns,
                    tableData: TABLE_DATA,
                    sortOption: {
                        multipleSort: true,
                        sortChange: (params) => {},
                    },
                };
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("single field sort", async () => {
        const columns = [
            {
                field: "name",
                key: "a",
                title: "Name",
                align: "left",
                fixed: "left", // combine with column fixed issue #454
            },
            {
                field: "age",
                key: "b",
                title: "Age",
                align: "center",
                sortBy: "",
            },
            {
                field: "weight",
                key: "c",
                title: "Weight(kg)",
                align: "center",
                sortBy: "asc",
            },
            {
                field: "hobby",
                key: "d",
                title: "Hobby",
                align: "center",
            },
            { field: "address", key: "e", title: "Address", align: "left" },
        ];

        const mockFn = jest.fn();
        const callBackData = {
            age: "asc",
            weight: "",
        };

        const wrapper = mount(veTable, {
            propsData: {
                columns: columns,
                tableData: TABLE_DATA,
                sortOption: {
                    sortChange: (params) => {
                        mockFn(params);
                    },
                },
                rowKeyFieldName: "rowkey",
            },
        });

        const thEls = wrapper.findAll(".ve-table-header-tr th");
        expect(thEls.at(1).find(".ve-table-sort").exists()).toBe(true);

        expect(
            thEls
                .at(2)
                .findAll(".ve-table-sort .ve-table-sort-icon")
                .at(0)
                .find(".active")
                .exists(),
        ).toBe(true);

        thEls.at(1).find(".ve-table-sort").trigger("click");

        await later();

        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledWith(callBackData);

        expect(wrapper.vm.colgroups).toEqual([
            {
                _colspan: 1,
                _keys: "a",
                _level: 1,
                _realTimeWidth: undefined,
                _rowspan: 1,
                align: "left",
                field: "name",
                fixed: "left",
                key: "a",
                title: "Name",
            },
            {
                _colspan: 1,
                _keys: "b",
                _level: 1,
                _realTimeWidth: undefined,
                _rowspan: 1,
                align: "center",
                field: "age",
                key: "b",
                sortBy: "asc",
                title: "Age",
            },
            {
                _colspan: 1,
                _keys: "c",
                _level: 1,
                _realTimeWidth: undefined,
                _rowspan: 1,
                align: "center",
                field: "weight",
                key: "c",
                sortBy: "asc",
                title: "Weight(kg)",
            },
            {
                _colspan: 1,
                _keys: "d",
                _level: 1,
                _realTimeWidth: undefined,
                _rowspan: 1,
                align: "center",
                field: "hobby",
                key: "d",
                title: "Hobby",
            },
            {
                _colspan: 1,
                _keys: "e",
                _level: 1,
                _realTimeWidth: undefined,
                _rowspan: 1,
                align: "left",
                field: "address",
                key: "e",
                title: "Address",
            },
        ]);

        expect(
            thEls
                .at(1)
                .findAll(".ve-table-sort .ve-table-sort-icon")
                .at(0)
                .find(".active")
                .exists(),
        ).toBe(true);
    });

    it("multiple field sort", async () => {
        const columns = [
            {
                field: "name",
                key: "a",
                title: "Name",
                align: "left",
            },
            {
                field: "age",
                key: "b",
                title: "Age",
                align: "center",
                sortBy: "",
            },
            {
                field: "weight",
                key: "c",
                title: "Weight(kg)",
                align: "center",
                sortBy: "asc",
            },
            {
                field: "hobby",
                key: "d",
                title: "Hobby",
                align: "center",
            },
            { field: "address", key: "e", title: "Address", align: "left" },
        ];

        const mockFn = jest.fn();
        const callBackData = {
            age: "asc",
            weight: "asc",
        };

        const wrapper = mount(veTable, {
            propsData: {
                columns: columns,
                tableData: TABLE_DATA,
                sortOption: {
                    multipleSort: true,
                    sortChange: (params) => {
                        mockFn(params);
                    },
                },
                rowKeyFieldName: "rowkey",
            },
        });

        const thEls = wrapper.findAll(".ve-table-header-tr th");
        expect(thEls.at(1).find(".ve-table-sort").exists()).toBe(true);

        expect(
            thEls
                .at(2)
                .findAll(".ve-table-sort .ve-table-sort-icon")
                .at(0)
                .find(".active")
                .exists(),
        ).toBe(true);

        thEls.at(1).find(".ve-table-sort").trigger("click");

        await later();

        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledWith(callBackData);

        expect(
            wrapper.findAll(".ve-table-sort .ve-table-sort-icon.active").length,
        ).toBe(2);
    });

    it("sort always", async () => {
        const columns = [
            {
                field: "name",
                key: "a",
                title: "Name",
                align: "left",
            },
            {
                field: "age",
                key: "b",
                title: "Age",
                align: "center",
                sortBy: "",
            },
            {
                field: "weight",
                key: "c",
                title: "Weight(kg)",
                align: "center",
                sortBy: "asc",
            },
            {
                field: "hobby",
                key: "d",
                title: "Hobby",
                align: "center",
            },
            { field: "address", key: "e", title: "Address", align: "left" },
        ];

        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: columns,
                tableData: TABLE_DATA,
                sortOption: {
                    sortAlways: true,
                    sortChange: (params) => {
                        mockFn(params);
                    },
                },
                rowKeyFieldName: "rowkey",
            },
        });

        const thEls = wrapper.findAll(".ve-table-header-tr th");

        thEls.at(1).find(".ve-table-sort").trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalledWith({
            age: "asc",
            weight: "",
        });

        thEls.at(1).find(".ve-table-sort").trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalledWith({
            age: "desc",
            weight: "",
        });
    });
});
