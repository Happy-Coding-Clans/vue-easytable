import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable cell align", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
        },
        {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
        },
    ];

    const columns = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "center",
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "right",
        },
        {
            field: "address",
            key: "d",
            title: "Address",
            align: "left",
        },
    ];

    it("render", () => {
        const wrapper = mount({
            render() {
                return (
                    <veTable
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
                };
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("align prop", () => {
        const wrapper = mount({
            render() {
                return (
                    <veTable
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
                };
            },
        });

        // th
        const thEls = wrapper.findAll(
            ".ve-table-header-tr .ve-table-header-th",
        );
        expect(thEls.at(0).attributes("style")).toContain(
            "text-align: center;",
        );
        expect(thEls.at(1).attributes("style")).toContain("text-align: left;");
        expect(thEls.at(2).attributes("style")).toContain("text-align: right;");

        // td
        const tdEls = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td");
        expect(tdEls.at(0).attributes("style")).toContain(
            "text-align: center;",
        );
        expect(tdEls.at(1).attributes("style")).toContain("text-align: left;");
        expect(tdEls.at(2).attributes("style")).toContain("text-align: right;");
    });
});
