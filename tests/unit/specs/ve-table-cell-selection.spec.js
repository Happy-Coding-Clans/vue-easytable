import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";
import { KEY_CODES } from "../constant";

describe("veTable cell selection", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
            rowKey: "1",
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Beijing",
            rowKey: "2",
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
            rowKey: "3",
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
            rowKey: "4",
        },
        {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
            rowKey: "5",
        },
    ];

    const COLUMNS = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "left",
            width: "20%",
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
            width: "20%",
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "center",
            width: "30%",
        },
        { field: "address", key: "d", title: "Address", width: "30%" },
    ];

    it("render", () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        expect(WRAPPER.html()).toMatchSnapshot();
    });

    it("key code up event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_UP }),
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(2)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("key code right event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_RIGHT }),
        );
        /* WRAPPER.trigger("keydown", {
            keyCode: 40
        }); */

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(2)
                .findAll(".ve-table-body-td")
                .at(3)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("key code down event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_DOWN }),
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(3)
                .findAll(".ve-table-body-td")
                .at(2)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("key code left event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_LEFT }),
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(2)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("key code enter event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ENTER }),
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(3)
                .findAll(".ve-table-body-td")
                .at(2)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("key code shift+enter event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                keyCode: KEY_CODES.ENTER,
                shiftKey: true,
            }),
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(2)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("key code tab event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.TAB }),
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(2)
                .findAll(".ve-table-body-td")
                .at(3)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("key code shift+tab event", async () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        const mockFn = jest.fn();

        expect(WRAPPER.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown");

        await later();
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                keyCode: KEY_CODES.TAB,
                shiftKey: true,
            }),
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false,
        );

        expect(
            WRAPPER.findAll(".ve-table-body-tr")
                .at(2)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");
    });

    it("cell selection effect", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });

        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-cell-selection").exists()).toBe(false);

        firstCell.trigger("mousedown");

        await later();

        expect(firstCell.find(".ve-table-cell-selection").exists()).toBe(true);
    });

    it("disable cell selection", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: false,
                },
                rowKeyFieldName: "rowKey",
            },
        });

        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-cell-selection").exists()).toBe(false);

        firstCell.trigger("mousedown");

        await later();

        expect(firstCell.find(".ve-table-cell-selection").exists()).toBe(false);
    });

    // table clickoutside
    it("table clickoutside width cell editing", async () => {
        const mockFn = jest.fn();

        const ParentComp = {
            template: `
                <div>
                    <button id="outsideButton">outside table</button>
                    <veTable
                        :columns="columns"
                        :tableData="tableData"
                        rowKeyFieldName="rowKey"
                    />
                </div>
               
            `,
            data() {
                return {
                    columns: COLUMNS,
                    tableData: TABLE_DATA,
                };
            },
            // veTable is in global
            // components: {
            //     veTable,
            // },
        };

        await later();

        const div = document.createElement("div");
        document.body.appendChild(div);

        // need attach to documnet
        const wrapper = mount(ParentComp, { attachTo: div });

        // td
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        // set cell selection
        firstCell.trigger("mousedown");

        await later();

        expect(firstCell.find(".ve-table-cell-selection").exists()).toBe(true);

        // click outside
        wrapper.find("#outsideButton").trigger("click");

        await later();

        expect(firstCell.find(".ve-table-cell-selection").exists()).toBe(false);
    });

    it("table instance: setCellSelection method", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
            },
        });

        wrapper.vm.setCellSelection({ rowKey: "2", colKey: "a" });

        await later();

        const selectionTd = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(selectionTd.classes()).toContain("ve-table-cell-selection");
    });

    /* it("virtual scroll keyboard events", async () => {
        const mockFn = jest.fn();

        let tableData = [];

        for (let i = 0; i < 500; i++) {
            tableData.push({
                rowKey: i,
                col1: i,
                col2: i,
                col3: i,
                col4: i,
                col5: i,
                col6: i,
                col7: i,
                col8: i,
                col9: i,
                col10: i
            });
        }

        const wrapper = mount(veTable, {
            propsData: {
                columns: [
                    {
                        field: "col1",
                        key: "a",
                        title: "col1",
                        width: 50,
                        fixed: "left"
                    },
                    {
                        title: "col2-col3",
                        fixed: "left",
                        children: [
                            {
                                field: "col2",
                                key: "b",
                                title: "col2",
                                width: 50
                            },
                            {
                                field: "col3",
                                key: "c",
                                title: "col3",
                                width: 50
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
                    },
                    {
                        field: "col7",
                        key: "g",
                        title: "col7",
                        width: 50,
                        fixed: "right"
                    },
                    {
                        field: "col8",
                        key: "h",
                        title: "col8",
                        width: 50,
                        fixed: "right"
                    }
                ],
                tableData: tableData,
                virtualScrollOption: {
                    enable: true
                },
                cellSelectionOption: {
                    // default true
                    enable: true
                },
                maxHeight: 500,
                rowKeyFieldName: "rowKey"
            }
        });

        expect(wrapper.html()).toMatchSnapshot();

        await later();

        expect(wrapper.find(".ve-table-cell-selection").exists()).toBe(false);

        const firstTrTdEl = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("click");

        await later(3000);
        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        document.addEventListener("keydown", mockFn);
        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.DOWN })
        );

        await later();
        expect(mockFn).toBeCalled();
        expect(firstTrTdEl.find(".ve-table-cell-selection").exists()).toBe(
            false
        );
    }); */
});
