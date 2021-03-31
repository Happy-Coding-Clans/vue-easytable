import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable header group", () => {
    const TABLE_DATA = [
        {
            rowkey: 0,
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6"
            /* col7: "7",
            col8: "8" */
        },
        {
            rowkey: 1,
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6"
            /*  col7: "7",
            col8: "8" */
        }
    ];

    const TABLE_COLUMNS = [
        {
            field: "col1",
            key: "a",
            title: "col1",
            width: "10%"
        },
        {
            title: "col2-col3",
            children: [
                {
                    field: "col2",
                    key: "b",
                    title: "col2",
                    width: 100
                },
                {
                    field: "col3",
                    key: "c",
                    title: "col3",
                    width: 110
                }
            ]
        },
        {
            title: "col4-col5-col6",
            children: [
                {
                    title: "col4-col5",
                    children: [
                        {
                            field: "col4",
                            key: "d",
                            title: "col4",
                            width: 130
                        },
                        {
                            field: "col5",
                            key: "e",
                            title: "col5",
                            width: 140
                        }
                    ]
                },
                {
                    title: "col6",
                    field: "col6",
                    key: "f",
                    width: 140
                }
            ]
        }
        /*  {
            field: "col7",
            key: "g",
            title: "col7",
            width: 150
        },
        {
            field: "col8",
            key: "h",
            title: "col8",
            width: 160
        } */
    ];

    it("render", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: TABLE_COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey"
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("row last column", () => {
        const wrapper = mount(veTable, {
            propsData: {
                borderY: true,
                columns: TABLE_COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey"
            }
        });

        const trEls = wrapper.findAll(".ve-table-header-tr");

        // first row last column
        expect(
            trEls
                .at(0)
                .findAll(".ve-table-header-th")
                .at(2)
                .classes()
        ).toContain("ve-table-last-column");

        // second row last column
        expect(
            trEls
                .at(1)
                .findAll(".ve-table-header-th")
                .at(3)
                .classes()
        ).toContain("ve-table-last-column");
    });

    it("colspan and rowspan", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: TABLE_COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey"
            }
        });

        const trEls = wrapper.findAll(".ve-table-header-tr");
        expect(trEls.length).toBe(3);

        /* first tr ths */
        const firstTrThEls = trEls.at(0).findAll(".ve-table-header-th");
        expect(firstTrThEls.length).toBe(3);
        expect(firstTrThEls.at(0).attributes("rowspan")).toBe("3");
        expect(firstTrThEls.at(0).attributes("colspan")).toBe("1");

        expect(firstTrThEls.at(1).attributes("rowspan")).toBe("1");
        expect(firstTrThEls.at(1).attributes("colspan")).toBe("2");

        expect(firstTrThEls.at(2).attributes("rowspan")).toBe("1");
        expect(firstTrThEls.at(2).attributes("colspan")).toBe("3");

        /* second tr ths */
        const secondTrThEls = trEls.at(1).findAll(".ve-table-header-th");
        expect(secondTrThEls.length).toBe(4);
        expect(secondTrThEls.at(0).attributes("rowspan")).toBe("2");
        expect(secondTrThEls.at(0).attributes("colspan")).toBe("1");

        expect(secondTrThEls.at(1).attributes("rowspan")).toBe("2");
        expect(secondTrThEls.at(1).attributes("colspan")).toBe("1");

        expect(secondTrThEls.at(2).attributes("rowspan")).toBe("1");
        expect(secondTrThEls.at(2).attributes("colspan")).toBe("2");

        expect(secondTrThEls.at(3).attributes("rowspan")).toBe("2");
        expect(secondTrThEls.at(3).attributes("colspan")).toBe("1");

        /* third tr ths */
        const thirdTrThEls = trEls.at(2).findAll(".ve-table-header-th");
        expect(thirdTrThEls.length).toBe(2);
        expect(thirdTrThEls.at(0).attributes("rowspan")).toBe("1");
        expect(thirdTrThEls.at(0).attributes("colspan")).toBe("1");

        expect(thirdTrThEls.at(1).attributes("rowspan")).toBe("1");
        expect(thirdTrThEls.at(1).attributes("colspan")).toBe("1");
    });
});
