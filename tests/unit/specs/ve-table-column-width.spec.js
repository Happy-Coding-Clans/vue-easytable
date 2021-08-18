import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";

describe("veTable clolum width", () => {
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

    // width percent
    const COLUMNS_PERCENT = [
        {
            field: "name",
            key: "a",
            title: "Name 40%",
            width: "40%",
        },
        {
            field: "date",
            key: "b",
            title: "Tel 20%",
            width: "20%",
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby 20%",
            width: "20%",
        },
        {
            field: "address",
            key: "d",
            title: "Address 20%",
            width: "20%",
        },
    ];

    // width px
    const COLUMNS_PX = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "center",
            width: 400,
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
            width: 200,
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "right",
            width: 200,
        },
        { field: "address", key: "d", title: "Address", width: 200 },
    ];

    it("renders normal", () => {
        const wrapper = mount({
            render() {
                return <veTable columns={COLUMNS_PX} tableData={TABLE_DATA} />;
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("width percent", () => {
        const wrapper = mount({
            render() {
                return (
                    <veTable columns={COLUMNS_PERCENT} tableData={TABLE_DATA} />
                );
            },
        });

        const colgroupEl = wrapper.find(".ve-table-content colgroup");

        expect(colgroupEl.findAll("col").length).toBe(4);
        expect(colgroupEl.findAll("col").at(0).attributes("style")).toBe(
            "width: 40%;",
        );
    });

    it("width px", () => {
        const wrapper = mount({
            render() {
                return <veTable columns={COLUMNS_PX} tableData={TABLE_DATA} />;
            },
        });

        const colgroupEl = wrapper.find(".ve-table-content colgroup");

        expect(colgroupEl.findAll("col").length).toBe(4);
        expect(colgroupEl.findAll("col").at(0).attributes("style")).toBe(
            "width: 400px;",
        );
    });
});
