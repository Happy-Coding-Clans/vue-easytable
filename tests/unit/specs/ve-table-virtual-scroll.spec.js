import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable virtual scroll", () => {
    // same row height
    let TABLE_DATA_SAME_ROW_HEIGHT = [];
    for (var i = 0; i < 1000; i++) {
        TABLE_DATA_SAME_ROW_HEIGHT.push({
            rowKey: i,
            name: i,
            date: i,
            hobby: i,
            address: i,
        });
    }

    // different row height
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    let TABLE_DATA_DIFFERENT_ROW_HEIGHT = [];

    for (var i = 0; i < 1000; i++) {
        let value = i;
        if (i % 2 === 0) {
            const rowCount = getRandom(3, 5);

            for (let i = 0; i < rowCount; i++) {
                value += `this is the long word.<br />`;
            }
        }

        TABLE_DATA_DIFFERENT_ROW_HEIGHT.push({
            rowKey: i,
            name: value,
            date: i,
            hobby: i,
            address: i,
        });
    }

    //
    const MAX_HEIGHT = 500;
    const MIN_ROW_HEIGHT = 42;
    const MIN_TABLE_ROW_COUNT = (MAX_HEIGHT / MIN_ROW_HEIGHT) * 2;
    const MAX_TABLE_ROW_COUNT = (MAX_HEIGHT / MIN_ROW_HEIGHT) * 2 + 5;

    it("render same row height", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
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
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("virtualScrollOption disbale enable", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
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
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: false,
                },
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.find(".ve-table-virtual-scroll").exists()).toBe(false);

        wrapper.setProps({
            virtualScrollOption: {
                // 是否开启
                enable: true,
            },
        });

        await later();

        const tableContainerEl = wrapper.find(".ve-table-container");

        expect(tableContainerEl.attributes("style")).toBe(
            "max-height: 500px; height: 500px;",
        );

        expect(wrapper.find(".ve-table-virtual-scroll").exists()).toBe(true);
        expect(wrapper.find(".ve-table-virtual-phantom").exists()).toBe(true);
    });

    it("same row height", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
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
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        // default buffer=1
        expect(wrapper.findAll(".ve-table-body-tr").length).toBeGreaterThan(
            MIN_TABLE_ROW_COUNT,
        );

        expect(wrapper.findAll(".ve-table-body-tr").length).toBeLessThan(
            MAX_TABLE_ROW_COUNT,
        );
    });

    it("different row height", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
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
                tableData: TABLE_DATA_DIFFERENT_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        // default buffer=1
        expect(wrapper.findAll(".ve-table-body-tr").length).toBeGreaterThan(
            MIN_TABLE_ROW_COUNT,
        );

        expect(wrapper.findAll(".ve-table-body-tr").length).toBeLessThan(
            MAX_TABLE_ROW_COUNT,
        );
    });

    it("with row checkbox", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
                        width: 200,
                        align: "left",
                        // type=checkbox
                        type: "checkbox",
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
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                checkboxOption: {},
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        expect(wrapper.find(".ve-checkbox").exists()).toBe(true);

        // default buffer=1
        expect(wrapper.findAll(".ve-table-body-tr").length).toBeGreaterThan(
            MIN_TABLE_ROW_COUNT,
        );

        expect(wrapper.findAll(".ve-table-body-tr").length).toBeLessThan(
            MAX_TABLE_ROW_COUNT,
        );
    });

    it("with row radio", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
                        width: 200,
                        align: "left",
                        // type=radio
                        type: "radio",
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
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                radioOption: {},
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        expect(wrapper.find(".ve-radio").exists()).toBe(true);

        // default buffer=1
        expect(wrapper.findAll(".ve-table-body-tr").length).toBeGreaterThan(
            MIN_TABLE_ROW_COUNT,
        );

        expect(wrapper.findAll(".ve-table-body-tr").length).toBeLessThan(
            MAX_TABLE_ROW_COUNT,
        );
    });

    it("with row expand", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
                        width: 200,
                        align: "left",
                        // type=expand
                        type: "expand",
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
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                expandOption: {
                    render: ({ row, column, rowIndex }, h) => {
                        return (
                            <p>
                                My name is{" "}
                                <span style="color:#1890ff;">{row.name}</span>
                                ,I'm living in {row.address}
                            </p>
                        );
                    },
                },
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        expect(wrapper.find(".ve-table-row-expand-icon").exists()).toBe(true);

        // default buffer=1
        expect(wrapper.findAll(".ve-table-body-tr").length).toBeGreaterThan(
            MIN_TABLE_ROW_COUNT,
        );

        expect(wrapper.findAll(".ve-table-body-tr").length).toBeLessThan(
            MAX_TABLE_ROW_COUNT,
        );
    });

    it("with column fixed", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
                        width: 200,
                        align: "left",
                        fixed: "left",
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
                        fixed: "right",
                    },
                ],
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        const thEls = wrapper.findAll(
            ".ve-table-header .ve-table-header-tr .ve-table-header-th",
        );

        expect(thEls.at(0).classes()).toContain("ve-table-fixed-left");
        expect(thEls.at(0).classes()).toContain(
            "ve-table-last-left-fixed-column",
        );

        expect(thEls.at(2).classes()).toContain("ve-table-fixed-right");
        expect(thEls.at(2).classes()).toContain(
            "ve-table-first-right-fixed-column",
        );

        const tdEls = wrapper.findAll(
            ".ve-table-header .ve-table-header-tr .ve-table-header-th",
        );

        expect(tdEls.at(0).classes()).toContain("ve-table-fixed-left");
        expect(tdEls.at(0).classes()).toContain(
            "ve-table-last-left-fixed-column",
        );

        expect(tdEls.at(2).classes()).toContain("ve-table-fixed-right");
        expect(tdEls.at(2).classes()).toContain(
            "ve-table-first-right-fixed-column",
        );

        // default buffer=1
        expect(wrapper.findAll(".ve-table-body-tr").length).toBeGreaterThan(
            MIN_TABLE_ROW_COUNT,
        );

        expect(wrapper.findAll(".ve-table-body-tr").length).toBeLessThan(
            MAX_TABLE_ROW_COUNT,
        );
    });

    it("with column footer", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: [
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
                        width: 200,
                        align: "left",
                        fixed: "left",
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
                        fixed: "right",
                    },
                ],
                tableData: TABLE_DATA_SAME_ROW_HEIGHT,
                footerData: [
                    {
                        rowKey: 0,
                        name: "平均值",
                        date: 1100,
                        hobby: 1200,
                        address: 1300,
                    },
                    {
                        rowKey: 1,
                        name: "汇总值",
                        date: 701000,
                        hobby: 801000,
                        address: 801000,
                    },
                ],
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                maxHeight: MAX_HEIGHT,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        expect(
            wrapper.findAll(".ve-table-footer-tr .ve-table-footer-td").length,
        ).toBe(6);

        // default buffer=1
        expect(wrapper.findAll(".ve-table-body-tr").length).toBeGreaterThan(
            MIN_TABLE_ROW_COUNT,
        );

        expect(wrapper.findAll(".ve-table-body-tr").length).toBeLessThan(
            MAX_TABLE_ROW_COUNT,
        );
    });
});
