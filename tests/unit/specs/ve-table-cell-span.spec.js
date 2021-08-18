import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable cell span", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
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

    const FOOTER_DATA = [
        {
            rowkey: 0,
            name: "平均值",
            date: 213,
            hobby: 355,
            address: 189,
        },
        {
            rowkey: 1,
            name: "汇总值",
            date: 1780,
            hobby: 890,
            address: 2988,
        },
    ];

    const COLUMNS = [
        {
            field: "name",
            key: "a",
            title: "Name",
            width: 200,
            align: "center",
            renderBodyCell: ({ row, column, rowIndex }, h) => {
                if (column.field === "name") {
                    if (rowIndex === 1) {
                        return (
                            <span style="color:#1890ff;">
                                this is custom content
                            </span>
                        );
                    }
                }

                return row[column.field];
            },
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            width: 200,
            align: "left",
            renderBodyCell: ({ row, column, rowIndex }, h) => {
                if (rowIndex === 1) {
                    if (column.field === "date") {
                        return (
                            <span style="color:#1890ff;">
                                this is custom content
                            </span>
                        );
                    }
                }

                return row[column.field];
            },
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby",
            width: 200,
            align: "right",
        },
        { field: "address", key: "d", title: "Address", width: "" },
    ];

    const wrapper = mount({
        template: `
            <veTable
            :columns="columns"
            :tableData="tableData"
            :footerData="footerData"
            :cellSpanOption="cellSpanOption"
        />
        `,
        data() {
            return {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                footerData: FOOTER_DATA,
                cellSpanOption: {
                    bodyCellSpan: this.bodyCellSpan,
                    footerCellSpan: this.footerCellSpan,
                },
            };
        },
        methods: {
            // body cell span
            bodyCellSpan({ row, column, rowIndex }) {
                // colspan
                if (rowIndex === 1) {
                    if (column.field === "date") {
                        return {
                            rowspan: 1,
                            colspan: 2,
                        };
                    }
                    // does not need to be rendered
                    else if (column.field === "hobby") {
                        return {
                            rowspan: 0,
                            colspan: 0,
                        };
                    }
                }

                // rowspan
                if (column.field === "name") {
                    if (rowIndex === 1) {
                        return {
                            rowspan: 2,
                            colspan: 1,
                        };
                    }
                    // does not need to be rendered
                    else if (rowIndex === 2) {
                        return {
                            rowspan: 0,
                            colspan: 0,
                        };
                    }
                }
            },
            // footer cell span
            footerCellSpan({ row, column, rowIndex }) {
                if (rowIndex === 0) {
                    if (column.field === "date") {
                        return {
                            rowspan: 1,
                            colspan: 2,
                        };
                    }
                    // does not need to be rendered
                    else if (column.field === "hobby") {
                        return {
                            rowspan: 0,
                            colspan: 0,
                        };
                    }
                }
            },
        },
    });

    it("render", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("body cell span", () => {
        const spanTrEl = wrapper.findAll(".ve-table-body-tr").at(1);

        expect(
            spanTrEl.findAll(".ve-table-body-td").at(0).attributes("rowspan"),
        ).toBe("2");

        expect(
            spanTrEl.findAll(".ve-table-body-td").at(0).attributes("colspan"),
        ).toBe("1");

        expect(
            spanTrEl.findAll(".ve-table-body-td").at(1).attributes("rowspan"),
        ).toBe("1");

        expect(
            spanTrEl.findAll(".ve-table-body-td").at(1).attributes("colspan"),
        ).toBe("2");
    });

    it("footer cell span", () => {
        const spanTrEl = wrapper.findAll(".ve-table-footer-tr").at(0);

        expect(
            spanTrEl.findAll(".ve-table-footer-td").at(1).attributes("rowspan"),
        ).toBe("1");

        expect(
            spanTrEl.findAll(".ve-table-footer-td").at(1).attributes("colspan"),
        ).toBe("2");
    });
});
