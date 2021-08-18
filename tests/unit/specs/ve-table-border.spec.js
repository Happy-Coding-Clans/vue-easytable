import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";

describe("veTable border", () => {
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

    it("renders border default", () => {
        const wrapper = mount({
            render() {
                return <veTable columns={COLUMNS} tableData={TABLE_DATA} />;
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("border default prop", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
            },
        });

        expect(wrapper.find(".ve-table-border-around").exists()).toBe(true);
        expect(wrapper.find(".ve-table-border-x").exists()).toBe(true);
    });

    it("border-x prop", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                borderX: true,
            },
        });

        expect(wrapper.find(".ve-table-border-x").exists()).toBe(true);
    });

    it("border-y prop", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                borderY: true,
            },
        });

        expect(wrapper.find(".ve-table-border-y").exists()).toBe(true);
    });

    it("border-around prop", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                borderAround: true,
            },
        });

        expect(wrapper.find(".ve-table-border-around").exists()).toBe(true);
    });
});
