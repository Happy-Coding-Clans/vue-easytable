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
            col6: "6",
            col7: "7",
            col8: "8",
            "col9-1": "9-1",
            "col9-2": "9-2",
            "col10-1": "10-1"
        },
        {
            rowkey: 1,
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6",
            col7: "7",
            col8: "8",
            "col9-1": "9-1",
            "col9-2": "9-2",
            "col10-1": "10-1"
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

    it("width right column fixed section1", () => {
        /**
         * +------------------------------+
         * |        | Title2   | Title3   |
         * | Title1 |----------|----------|
         * |        | Title2-1 | Title3-1 |
         * +------------------------------+
         */

        const wrapper = mount(veTable, {
            propsData: {
                borderY: true,
                columns: [
                    { field: "col1", key: "a", title: "Title1" },
                    {
                        title: "Title2",
                        fixed: "right",
                        key: "b",
                        children: [
                            {
                                field: "col2-1",
                                key: "b-1",
                                title: "Title2-1",
                                width: 200
                            }
                        ]
                    },
                    {
                        title: "Title3",
                        fixed: "right",
                        key: "c",
                        children: [
                            {
                                field: "col10-1",
                                key: "c-1",
                                title: "Title3-1",
                                width: 200
                            }
                        ]
                    }
                ],
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey"
            }
        });

        const trEls = wrapper.findAll(".ve-table-header-tr");

        // first row first fixed column
        const firtRowFirstFixedColumn = trEls
            .at(0)
            .findAll(".ve-table-header-th")
            .at(1);

        expect(firtRowFirstFixedColumn.classes()).toEqual([
            "ve-table-header-th",
            "ve-table-fixed-right",
            "ve-table-first-right-fixed-column"
        ]);
        expect(firtRowFirstFixedColumn.attributes("style")).toContain(
            "right: 200px;"
        );

        // first row last fixed column
        const firstRowLastFixedColumn = trEls
            .at(0)
            .findAll(".ve-table-header-th")
            .at(2);

        expect(firstRowLastFixedColumn.classes()).toEqual([
            "ve-table-header-th",
            "ve-table-fixed-right",
            "ve-table-last-column"
        ]);
        expect(firstRowLastFixedColumn.attributes("style")).toContain(
            "right: 0px;"
        );

        // second row first fixed column
        const secondRowFirstFixedColumn = trEls
            .at(1)
            .findAll(".ve-table-header-th")
            .at(0);

        expect(secondRowFirstFixedColumn.classes()).toEqual([
            "ve-table-header-th",
            "ve-table-fixed-right",
            "ve-table-first-right-fixed-column"
        ]);
        expect(secondRowFirstFixedColumn.attributes("style")).toContain(
            "right: 200px;"
        );

        // second row last fixed column
        const secondRowLastFixedColumn = trEls
            .at(1)
            .findAll(".ve-table-header-th")
            .at(1);

        expect(secondRowLastFixedColumn.classes()).toEqual([
            "ve-table-header-th",
            "ve-table-fixed-right",
            "ve-table-last-column"
        ]);
        expect(secondRowLastFixedColumn.attributes("style")).toContain(
            "right: 0px;"
        );
    });

    it("width right column fixed section2", () => {
        /**
         * +------------------------------+
         * |        |       Title2        |
         * | Title1 |----------|----------|
         * |        | Title2-1 | Title2-2 |
         * +------------------------------+
         */

        const wrapper = mount(veTable, {
            propsData: {
                borderY: true,
                columns: [
                    { field: "col1", key: "a", title: "Title1" },
                    {
                        title: "Title2",
                        fixed: "right",
                        key: "b",
                        children: [
                            {
                                field: "col9-1",
                                key: "b-1",
                                title: "Title2-1",
                                width: 200
                            },
                            {
                                field: "col9-2",
                                key: "b-2",
                                title: "Title2-2",
                                width: 200
                            }
                        ]
                    }
                ],
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey"
            }
        });

        const trEls = wrapper.findAll(".ve-table-header-tr");

        // first row first fixed column
        const firtRowFirstFixedColumn = trEls
            .at(0)
            .findAll(".ve-table-header-th")
            .at(1);

        expect(firtRowFirstFixedColumn.classes()).toEqual([
            "ve-table-header-th",
            "ve-table-fixed-right",
            "ve-table-first-right-fixed-column",
            "ve-table-last-column"
        ]);
        expect(firtRowFirstFixedColumn.attributes("style")).toContain(
            "right: 0px;"
        );

        // second row first fixed column
        const secondRowFirstFixedColumn = trEls
            .at(1)
            .findAll(".ve-table-header-th")
            .at(0);

        expect(secondRowFirstFixedColumn.classes()).toEqual([
            "ve-table-header-th",
            "ve-table-fixed-right",
            "ve-table-first-right-fixed-column"
        ]);
        expect(secondRowFirstFixedColumn.attributes("style")).toContain(
            "right: 200px;"
        );

        // second row last fixed column
        const secondRowLastFixedColumn = trEls
            .at(1)
            .findAll(".ve-table-header-th")
            .at(1);

        expect(secondRowLastFixedColumn.classes()).toEqual([
            "ve-table-header-th",
            "ve-table-fixed-right",
            "ve-table-last-column"
        ]);
        expect(secondRowLastFixedColumn.attributes("style")).toContain(
            "right: 0px;"
        );
    });
});
