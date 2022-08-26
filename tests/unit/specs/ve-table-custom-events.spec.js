import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable custom events", () => {
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

    const FOOTER_DATA = [
        {
            rowKey: 0,
            name: "平均值",
            date: 213,
            hobby: 355,
            address: 189,
        },
    ];

    const COLUMNS = [
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
        { field: "address", key: "d", title: "Address" },
    ];

    it("header custom row events", () => {
        const mockClickFn = jest.fn();
        const mockDblclickFn = jest.fn();
        const mockContextmenuFn = jest.fn();
        const mockMouseenterFn = jest.fn();
        const mockMouseleaveFn = jest.fn();

        const mockMousemoveFn = jest.fn();
        const mockMouseoverFn = jest.fn();
        const mockMousedownFn = jest.fn();
        const mockMouseupFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
                eventCustomOption: {
                    headerRowEvents: ({ rowIndex }) => {
                        return {
                            click: (event) => {
                                mockClickFn(rowIndex, event);
                            },
                            dblclick: (event) => {
                                mockDblclickFn(rowIndex, event);
                            },
                            contextmenu: (event) => {
                                mockContextmenuFn(rowIndex, event);
                            },
                            mouseenter: (event) => {
                                mockMouseenterFn(rowIndex, event);
                            },
                            mouseleave: (event) => {
                                mockMouseleaveFn(rowIndex, event);
                            },
                            mousemove: (event) => {
                                mockMousemoveFn(rowIndex, event);
                            },
                            mouseover: (event) => {
                                mockMouseoverFn(rowIndex, event);
                            },
                            mousedown: (event) => {
                                mockMousedownFn(rowIndex, event);
                            },
                            mouseup: (event) => {
                                mockMouseupFn(rowIndex, event);
                            },
                        };
                    },
                },
            },
        });

        const firstTrEl = wrapper.findAll(".ve-table-header-tr").at(0);

        firstTrEl.trigger("click");
        expect(mockClickFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("dblclick");
        expect(mockDblclickFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("contextmenu");
        expect(mockContextmenuFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("mouseenter");
        expect(mockMouseenterFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("mouseleave");
        expect(mockMouseleaveFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("mousemove");
        expect(mockMousemoveFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("mouseover");
        expect(mockMouseoverFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("mousedown");
        expect(mockMousedownFn).toBeCalledWith(0, expect.any(Object));

        firstTrEl.trigger("mouseup");
        expect(mockMouseupFn).toBeCalledWith(0, expect.any(Object));
    });

    it("header custom cell events", async () => {
        const mockClickFn = jest.fn();
        const mockDblclickFn = jest.fn();
        const mockContextmenuFn = jest.fn();
        const mockMouseenterFn = jest.fn();
        const mockMouseleaveFn = jest.fn();

        const mockMousemoveFn = jest.fn();
        const mockMouseoverFn = jest.fn();
        const mockMousedownFn = jest.fn();
        const mockMouseupFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
                eventCustomOption: {
                    headerCellEvents: ({ column, rowIndex }) => {
                        return {
                            click: (event) => {
                                mockClickFn(column, rowIndex, event);
                            },
                            dblclick: (event) => {
                                mockDblclickFn(column, rowIndex, event);
                            },
                            contextmenu: (event) => {
                                mockContextmenuFn(column, rowIndex, event);
                            },
                            mouseenter: (event) => {
                                mockMouseenterFn(column, rowIndex, event);
                            },
                            mouseleave: (event) => {
                                mockMouseleaveFn(column, rowIndex, event);
                            },
                            mousemove: (event) => {
                                mockMousemoveFn(column, rowIndex, event);
                            },
                            mouseover: (event) => {
                                mockMouseoverFn(column, rowIndex, event);
                            },
                            mousedown: (event) => {
                                mockMousedownFn(column, rowIndex, event);
                            },
                            mouseup: (event) => {
                                mockMouseupFn(column, rowIndex, event);
                            },
                        };
                    },
                },
            },
        });

        const firstTrThEl = wrapper
            .findAll(".ve-table-header-tr")
            .at(0)
            .findAll(".ve-table-header-th")
            .at(0);

        await later();

        firstTrThEl.trigger("click");
        expect(mockClickFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("dblclick");
        expect(mockDblclickFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("contextmenu");
        expect(mockContextmenuFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("mouseenter");
        expect(mockMouseenterFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("mouseleave");
        expect(mockMouseleaveFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("mousemove");
        expect(mockMousemoveFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("mouseover");
        expect(mockMouseoverFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("mousedown");
        expect(mockMousedownFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrThEl.trigger("mouseup");
        expect(mockMouseupFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );
    });

    it("body custom row events", () => {
        const mockClickFn = jest.fn();
        const mockDblclickFn = jest.fn();
        const mockContextmenuFn = jest.fn();
        const mockMouseenterFn = jest.fn();
        const mockMouseleaveFn = jest.fn();

        const mockMousemoveFn = jest.fn();
        const mockMouseoverFn = jest.fn();
        const mockMousedownFn = jest.fn();
        const mockMouseupFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
                eventCustomOption: {
                    bodyRowEvents: ({ row, rowIndex }) => {
                        return {
                            click: (event) => {
                                mockClickFn(row, rowIndex, event);
                            },
                            dblclick: (event) => {
                                mockDblclickFn(row, rowIndex, event);
                            },
                            contextmenu: (event) => {
                                mockContextmenuFn(row, rowIndex, event);
                            },
                            mouseenter: (event) => {
                                mockMouseenterFn(row, rowIndex, event);
                            },
                            mouseleave: (event) => {
                                mockMouseleaveFn(row, rowIndex, event);
                            },
                            mousemove: (event) => {
                                mockMousemoveFn(row, rowIndex, event);
                            },
                            mouseover: (event) => {
                                mockMouseoverFn(row, rowIndex, event);
                            },
                            mousedown: (event) => {
                                mockMousedownFn(row, rowIndex, event);
                            },
                            mouseup: (event) => {
                                mockMouseupFn(row, rowIndex, event);
                            },
                        };
                    },
                },
            },
        });

        const firstTrEl = wrapper.findAll(".ve-table-body-tr").at(0);

        firstTrEl.trigger("click");
        expect(mockClickFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("dblclick");
        expect(mockDblclickFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("contextmenu");
        expect(mockContextmenuFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseenter");
        expect(mockMouseenterFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseleave");
        expect(mockMouseleaveFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mousemove");
        expect(mockMousemoveFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseover");
        expect(mockMouseoverFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mousedown");
        expect(mockMousedownFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseup");
        expect(mockMouseupFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );
    });

    it("body custom cell events", async () => {
        const mockClickFn = jest.fn();
        const mockDblclickFn = jest.fn();
        const mockContextmenuFn = jest.fn();
        const mockMouseenterFn = jest.fn();
        const mockMouseleaveFn = jest.fn();

        const mockMousemoveFn = jest.fn();
        const mockMouseoverFn = jest.fn();
        const mockMousedownFn = jest.fn();
        const mockMouseupFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
                eventCustomOption: {
                    bodyCellEvents: ({ row, column, rowIndex }) => {
                        return {
                            click: (event) => {
                                mockClickFn(row, column, rowIndex, event);
                            },
                            dblclick: (event) => {
                                mockDblclickFn(row, column, rowIndex, event);
                            },
                            contextmenu: (event) => {
                                mockContextmenuFn(row, column, rowIndex, event);
                            },
                            mouseenter: (event) => {
                                mockMouseenterFn(row, column, rowIndex, event);
                            },
                            mouseleave: (event) => {
                                mockMouseleaveFn(row, column, rowIndex, event);
                            },
                            mousemove: (event) => {
                                mockMousemoveFn(row, column, rowIndex, event);
                            },
                            mouseover: (event) => {
                                mockMouseoverFn(row, column, rowIndex, event);
                            },
                            mousedown: (event) => {
                                mockMousedownFn(row, column, rowIndex, event);
                            },
                            mouseup: (event) => {
                                mockMouseupFn(row, column, rowIndex, event);
                            },
                        };
                    },
                },
            },
        });

        const firstTrTdEl = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        await later();

        firstTrTdEl.trigger("click");
        expect(mockClickFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("dblclick");
        expect(mockDblclickFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("contextmenu");
        expect(mockContextmenuFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseenter");
        expect(mockMouseenterFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseleave");
        expect(mockMouseleaveFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mousemove");
        expect(mockMousemoveFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseover");
        expect(mockMouseoverFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mousedown");
        expect(mockMousedownFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseup");
        expect(mockMouseupFn).toBeCalledWith(
            TABLE_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );
    });

    it("footer custom row events", () => {
        const mockClickFn = jest.fn();
        const mockDblclickFn = jest.fn();
        const mockContextmenuFn = jest.fn();
        const mockMouseenterFn = jest.fn();
        const mockMouseleaveFn = jest.fn();

        const mockMousemoveFn = jest.fn();
        const mockMouseoverFn = jest.fn();
        const mockMousedownFn = jest.fn();
        const mockMouseupFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                footerData: FOOTER_DATA,
                rowKeyFieldName: "rowKey",
                eventCustomOption: {
                    footerRowEvents: ({ row, rowIndex }) => {
                        return {
                            click: (event) => {
                                mockClickFn(row, rowIndex, event);
                            },
                            dblclick: (event) => {
                                mockDblclickFn(row, rowIndex, event);
                            },
                            contextmenu: (event) => {
                                mockContextmenuFn(row, rowIndex, event);
                            },
                            mouseenter: (event) => {
                                mockMouseenterFn(row, rowIndex, event);
                            },
                            mouseleave: (event) => {
                                mockMouseleaveFn(row, rowIndex, event);
                            },
                            mousemove: (event) => {
                                mockMousemoveFn(row, rowIndex, event);
                            },
                            mouseover: (event) => {
                                mockMouseoverFn(row, rowIndex, event);
                            },
                            mousedown: (event) => {
                                mockMousedownFn(row, rowIndex, event);
                            },
                            mouseup: (event) => {
                                mockMouseupFn(row, rowIndex, event);
                            },
                        };
                    },
                },
            },
        });

        const firstTrEl = wrapper.findAll(".ve-table-footer-tr").at(0);

        firstTrEl.trigger("click");
        expect(mockClickFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("dblclick");
        expect(mockDblclickFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("contextmenu");
        expect(mockContextmenuFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseenter");
        expect(mockMouseenterFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseleave");
        expect(mockMouseleaveFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mousemove");
        expect(mockMousemoveFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseover");
        expect(mockMouseoverFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mousedown");
        expect(mockMousedownFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrEl.trigger("mouseup");
        expect(mockMouseupFn).toBeCalledWith(
            expect.any(Object),
            0,
            expect.any(Object),
        );
    });

    it("footer custom cell events", async () => {
        const mockClickFn = jest.fn();
        const mockDblclickFn = jest.fn();
        const mockContextmenuFn = jest.fn();
        const mockMouseenterFn = jest.fn();
        const mockMouseleaveFn = jest.fn();

        const mockMousemoveFn = jest.fn();
        const mockMouseoverFn = jest.fn();
        const mockMousedownFn = jest.fn();
        const mockMouseupFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                footerData: FOOTER_DATA,
                rowKeyFieldName: "rowKey",
                eventCustomOption: {
                    footerCellEvents: ({ row, column, rowIndex }) => {
                        return {
                            click: (event) => {
                                mockClickFn(row, column, rowIndex, event);
                            },
                            dblclick: (event) => {
                                mockDblclickFn(row, column, rowIndex, event);
                            },
                            contextmenu: (event) => {
                                mockContextmenuFn(row, column, rowIndex, event);
                            },
                            mouseenter: (event) => {
                                mockMouseenterFn(row, column, rowIndex, event);
                            },
                            mouseleave: (event) => {
                                mockMouseleaveFn(row, column, rowIndex, event);
                            },
                            mousemove: (event) => {
                                mockMousemoveFn(row, column, rowIndex, event);
                            },
                            mouseover: (event) => {
                                mockMouseoverFn(row, column, rowIndex, event);
                            },
                            mousedown: (event) => {
                                mockMousedownFn(row, column, rowIndex, event);
                            },
                            mouseup: (event) => {
                                mockMouseupFn(row, column, rowIndex, event);
                            },
                        };
                    },
                },
            },
        });

        const firstTrTdEl = wrapper
            .findAll(".ve-table-footer-tr")
            .at(0)
            .findAll(".ve-table-footer-td")
            .at(0);

        await later();

        firstTrTdEl.trigger("click");
        expect(mockClickFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("dblclick");
        expect(mockDblclickFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("contextmenu");
        expect(mockContextmenuFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseenter");
        expect(mockMouseenterFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseleave");
        expect(mockMouseleaveFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mousemove");
        expect(mockMousemoveFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseover");
        expect(mockMouseoverFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mousedown");
        expect(mockMousedownFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );

        firstTrTdEl.trigger("mouseup");
        expect(mockMouseupFn).toBeCalledWith(
            FOOTER_DATA[0],
            expect.any(Object),
            0,
            expect.any(Object),
        );
    });
});
