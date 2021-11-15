import { mount } from "@vue/test-utils";
import { later } from "../util";
import veTable from "@/ve-table";

describe("veTable column hidden", () => {
    const TABLE_DATA = [
        {
            col1: "col1-1",
            col2: "col2-1",
            col3: "col3-1",
            col4: "col4-1",
            col5: "col5-1",
            col6: "col6-1",
            col7: "col7-1",
            col8: "col8-1",
        },
    ];

    const COLUMNS = [
        { field: "col1", key: "col1", title: "col1", width: "10%" },
        {
            title: "col2-col3",
            children: [
                {
                    field: "col2",
                    key: "col2",
                    title: "col2",
                    width: 100,
                },
                {
                    field: "col3",
                    key: "col3",
                    title: "col3",
                    width: 110,
                },
            ],
        },
        {
            title: "col4-col5-col6",
            children: [
                {
                    title: "col4-col5",
                    children: [
                        {
                            field: "col4",
                            key: "col4",
                            title: "col4",
                            width: 130,
                        },
                        {
                            field: "col5",
                            key: "col5",
                            title: "col5",
                            width: 140,
                        },
                    ],
                },
                {
                    title: "col6",
                    field: "col6",
                    key: "col6",
                    width: 140,
                },
            ],
        },
        { field: "col7", key: "col7", title: "col7", width: 150 },
        { field: "col8", key: "col8", title: "col8", width: 160 },
    ];

    it("columnHiddenOption defaultHiddenColumnKeys prop", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                columnHiddenOption: {
                    // default hidden column keys
                    defaultHiddenColumnKeys: ["col8"],
                },
            },
        });

        expect(wrapper.vm.hiddenColumns).toEqual(["col8"]);

        const firstHeaderTr = wrapper.findAll(
            ".ve-table-header .ve-table-header-tr",
        );

        const Ths = firstHeaderTr.at(0).findAll(".ve-table-header-th");

        expect(Ths.at(Ths.length - 1).text()).toEqual("col7");
    });

    it("instance method hideColumnsByKeys", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                columnHiddenOption: {
                    // default hidden column keys
                    defaultHiddenColumnKeys: ["col8"],
                },
            },
        });

        wrapper.vm.hideColumnsByKeys(["col1", "col2"]);

        expect(wrapper.vm.hiddenColumns).toEqual(["col8", "col1", "col2"]);
    });

    it("instance method showColumnsByKeys", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                columnHiddenOption: {
                    // default hidden column keys
                    defaultHiddenColumnKeys: ["col8", "col1", "col2"],
                },
            },
        });

        wrapper.vm.showColumnsByKeys(["col1", "col2"]);

        expect(wrapper.vm.hiddenColumns).toEqual(["col8"]);
    });
});
