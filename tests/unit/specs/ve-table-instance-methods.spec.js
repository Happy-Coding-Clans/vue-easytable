import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later, mockScrollTo } from "../util";

describe("veTable instance methods", () => {
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

    it("scroll method", async () => {
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
});
