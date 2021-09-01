import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later, mockScrollTo } from "../util";

describe("veTable instance methods", () => {
    const TABLE_DATA = [
        {
            rowkey: 0,
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            rowkey: 1,
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
        },
        {
            rowkey: 2,
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
        },
        {
            rowkey: 3,
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
        },
        {
            rowkey: 4,
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
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

    it("scrollTo method", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                maxHeight: 50,
            },
        });

        await later();

        const scrollToFn = mockScrollTo();

        const option = { top: 100 };

        wrapper.vm.scrollTo(option);

        expect(scrollToFn).toBeCalled();
        expect(scrollToFn).toHaveBeenCalledWith(option);
    });

    it("scrollToRowKey method", async () => {
        let warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                maxHeight: 50,
                rowKeyFieldName: "rowkey",
            },
        });

        await later();

        const scrollToFn = mockScrollTo();

        const option = { top: 100 };

        wrapper.vm.scrollToRowKey({ rowKey: "" });
        expect(warnSpy).toBeCalledWith(`Row key can't be empty!`);

        wrapper.vm.scrollToRowKey({ rowKey: 2 });
        expect(scrollToFn).toBeCalled();

        warnSpy.mockRestore();
    });
});
