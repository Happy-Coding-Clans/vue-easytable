import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";
import { cloneDeep } from "lodash";

describe("veTable contextmenu", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            number: "32",
            address: "No.1 Century Avenue, Shanghai",
            rowKey: 0,
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            number: "676",
            address: "No.1 Century Avenue, Beijing",
            rowKey: 1,
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            number: "76",
            address: "No.1 Century Avenue, Chongqing",
            rowKey: 2,
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            number: "7797",
            address: "No.1 Century Avenue, Xiamen",
            rowKey: 3,
        },
        {
            name: "Jami",
            date: "2020-09-20",
            number: "8978",
            address: "No.1 Century Avenue, Shenzhen",
            rowKey: 4,
        },
    ];

    const COLUMNS = [
        {
            field: "",
            key: "a",
            title: "",
            width: 50,
            align: "center",
            renderBodyCell: ({ row, column, rowIndex }, h) => {
                return ++rowIndex;
            },
        },
        {
            field: "name",
            key: "name",
            title: "Name",
            align: "left",
            width: "15%",
        },
        {
            field: "date",
            key: "date",
            title: "Date",
            align: "left",
            width: "15%",
        },
        {
            field: "number",
            key: "number",
            title: "Number",
            align: "right",
            width: "30%",
        },
        {
            field: "address",
            key: "address",
            title: "Address",
            align: "left",
            width: "40%",
        },
    ];

    const CONTEXTMENUS = [
        {
            type: "INSERT_ROW_ABOVE",
        },
        {
            type: "INSERT_ROW_BELOW",
        },
        {
            type: "SEPARATOR",
        },
        {
            type: "REMOVE_ROW",
        },
        {
            type: "HIDE_COLUMN",
        },
    ];

    afterEach(() => {
        return new Promise((resolve) => {
            const contextmenuPopper = document.querySelector(
                ".ve-contextmenu-popper",
            );
            contextmenuPopper && contextmenuPopper.remove();

            resolve();
        });
    });

    it("render", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
                contextmenuBodyOption: {
                    callback: ({ type, selection }) => {
                        console.log("type::", type);
                        console.log("selection::", selection);
                    },
                    contextmenus: CONTEXTMENUS,
                },
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("contextmenu INSERT_ROW_ABOVE", async () => {
        const mockFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-body-option={
                                    this.contextmenuBodyOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuBodyOption: {
                            callback: ({ type, selection }) => {
                                mockFn({ type, selection });
                            },
                            contextmenus: CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("click");

        await later();

        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        const bodyEl = WRAPPER.find(".ve-table-body");
        bodyEl.trigger("contextmenu");

        await later();

        const contextmenuPopper = document.querySelector(
            ".ve-contextmenu-popper",
        );

        const contextmenuNodes = contextmenuPopper.querySelectorAll(
            ".ve-contextmenu-node",
        );

        const event2 = new MouseEvent("click", {
            view: window, // window
            bubbles: true,
            cancelable: true,
        });

        contextmenuNodes[0].dispatchEvent(event2);

        await later();

        expect(tableData.length).toBe(6);

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith({
            selection: { colKey: "date", rowKey: 2 },
            type: "INSERT_ROW_ABOVE",
        });
    });

    it("contextmenu INSERT_ROW_BELOW", async () => {
        const mockFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-body-option={
                                    this.contextmenuBodyOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuBodyOption: {
                            callback: ({ type, selection }) => {
                                mockFn({ type, selection });
                            },
                            contextmenus: CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("click");

        await later();

        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        const bodyEl = WRAPPER.find(".ve-table-body");
        bodyEl.trigger("contextmenu");

        await later();

        const contextmenuPopper = document.querySelector(
            ".ve-contextmenu-popper",
        );

        const contextmenuNodes = contextmenuPopper.querySelectorAll(
            ".ve-contextmenu-node",
        );

        const event2 = new MouseEvent("click", {
            view: window, // window
            bubbles: true,
            cancelable: true,
        });

        contextmenuNodes[1].dispatchEvent(event2);

        await later();

        expect(tableData.length).toBe(6);

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith({
            selection: { colKey: "date", rowKey: 2 },
            type: "INSERT_ROW_BELOW",
        });
    });

    it("contextmenu REMOVE_ROW", async () => {
        const mockFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-body-option={
                                    this.contextmenuBodyOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuBodyOption: {
                            callback: ({ type, selection }) => {
                                mockFn({ type, selection });
                            },
                            contextmenus: CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("click");

        await later();

        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        const bodyEl = WRAPPER.find(".ve-table-body");
        bodyEl.trigger("contextmenu");

        await later();

        const contextmenuPopper = document.querySelector(
            ".ve-contextmenu-popper",
        );

        const contextmenuNodes = contextmenuPopper.querySelectorAll(
            ".ve-contextmenu-node",
        );

        const event2 = new MouseEvent("click", {
            view: window, // window
            bubbles: true,
            cancelable: true,
        });

        contextmenuNodes[2].dispatchEvent(event2);

        await later();

        expect(tableData.length).toBe(4);

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith({
            selection: { colKey: "date", rowKey: 2 },
            type: "REMOVE_ROW",
        });
    });

    it("contextmenu HIDE_COLUMN", async () => {
        const mockFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-body-option={
                                    this.contextmenuBodyOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuBodyOption: {
                            callback: ({ type, selection }) => {
                                mockFn({ type, selection });
                            },
                            contextmenus: CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("click");

        await later();

        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        const bodyEl = WRAPPER.find(".ve-table-body");
        bodyEl.trigger("contextmenu");

        await later();

        const DateTh = WRAPPER.findAll(
            ".ve-table-header-tr .ve-table-header-th",
        ).at(2);
        expect(DateTh.text()).toBe("Date");

        const contextmenuPopper = document.querySelector(
            ".ve-contextmenu-popper",
        );

        const contextmenuNodes = contextmenuPopper.querySelectorAll(
            ".ve-contextmenu-node",
        );

        const event2 = new MouseEvent("click", {
            view: window, // window
            bubbles: true,
            cancelable: true,
        });

        contextmenuNodes[3].dispatchEvent(event2);

        await later();

        const DateTh2 = WRAPPER.findAll(
            ".ve-table-header-tr .ve-table-header-th",
        ).at(2);
        expect(DateTh2.text()).toBe("Number");

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith({
            selection: { colKey: "date", rowKey: 2 },
            type: "HIDE_COLUMN",
        });
    });
});
