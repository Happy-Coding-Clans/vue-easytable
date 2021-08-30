import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";

describe("veTable column fixed", () => {
    const TABLE_DATA = [
        {
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6",
            col7: "7",
            col8: "8",
            col9: "9",
            col10: "10",
        },
        {
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6",
            col7: "7",
            col8: "8",
            col9: "9",
            col10: "10",
        },
        {
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6",
            col7: "7",
            col8: "8",
            col9: "9",
            col10: "10",
        },
        {
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6",
            col7: "7",
            col8: "8",
            col9: "9",
            col10: "10",
        },
        {
            col1: "1",
            col2: "2",
            col3: "3",
            col4: "4",
            col5: "5",
            col6: "6",
            col7: "7",
            col8: "8",
            col9: "9",
            col10: "10",
        },
    ];

    const COLUMNS = [
        {
            field: "col1",
            key: "a",
            title: "Title1",
            fixed: "left",
        },
        {
            field: "col2",
            key: "b",
            title: "Title2",
            fixed: "left",
        },
        {
            field: "col3",
            key: "c",
            title: "Title3",
        },
        { field: "col4", key: "d", title: "Title4" },
        { field: "col5", key: "e", title: "Title5" },
        { field: "col6", key: "f", title: "Title6" },
        {
            field: "col7",
            key: "g",
            title: "Title7",
        },
        {
            field: "col8",
            key: "h",
            title: "Title8",
        },
        {
            field: "col9",
            key: "i",
            title: "Title9",
            fixed: "right",
        },
        {
            field: "col10",
            key: "j",
            title: "Title10",
            fixed: "right",
        },
    ];

    // 固定列改变
    const COLUMNS_FIXED_CHANGE = [
        {
            field: "col1",
            key: "a",
            title: "Title1",
            fixed: "left",
        },
        {
            field: "col2",
            key: "b",
            title: "Title2",
        },
        {
            field: "col3",
            key: "c",
            title: "Title3",
        },
        { field: "col4", key: "d", title: "Title4" },
        { field: "col5", key: "e", title: "Title5" },
        { field: "col6", key: "f", title: "Title6" },
        {
            field: "col7",
            key: "g",
            title: "Title7",
        },
        {
            field: "col8",
            key: "h",
            title: "Title8",
        },
        {
            field: "col9",
            key: "i",
            title: "Title9",
        },
        {
            field: "col10",
            key: "j",
            title: "Title10",
            fixed: "right",
        },
    ];

    it("renders normal", () => {
        const wrapper = mount({
            render() {
                return <veTable columns={COLUMNS} tableData={TABLE_DATA} />;
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("header fixed left", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
            },
        });

        const thEls = wrapper.findAll(
            ".ve-table-header .ve-table-header-tr .ve-table-header-th",
        );

        expect(thEls.at(0).classes()).toContain("ve-table-fixed-left");
        expect(thEls.at(1).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-fixed-left",
                "ve-table-last-left-fixed-column",
            ]),
        );

        await wrapper.setProps({ columns: COLUMNS_FIXED_CHANGE });

        const thEls2 = wrapper.findAll(
            ".ve-table-header .ve-table-header-tr .ve-table-header-th",
        );

        expect(thEls2.at(0).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-fixed-left",
                "ve-table-last-left-fixed-column",
            ]),
        );
    });

    it("header fixed right", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
            },
        });

        const thEls = wrapper.findAll(
            ".ve-table-header .ve-table-header-tr .ve-table-header-th",
        );

        expect(thEls.at(9 - 1).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-first-right-fixed-column",
                "ve-table-fixed-right",
            ]),
        );
        expect(thEls.at(9 - 0).classes()).toContain("ve-table-fixed-right");

        await wrapper.setProps({ columns: COLUMNS_FIXED_CHANGE });

        const thEls2 = wrapper.findAll(
            ".ve-table-header .ve-table-header-tr .ve-table-header-th",
        );

        expect(thEls2.at(9 - 0).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-first-right-fixed-column",
                "ve-table-fixed-right",
            ]),
        );
    });

    it("column fixed left", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
            },
        });

        const tdEls = wrapper
            .findAll(".ve-table-body .ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td");

        expect(tdEls.at(0).classes()).toContain("ve-table-fixed-left");
        expect(tdEls.at(1).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-last-left-fixed-column",
                "ve-table-fixed-left",
            ]),
        );

        await wrapper.setProps({ columns: COLUMNS_FIXED_CHANGE });

        const tdEls2 = wrapper
            .findAll(".ve-table-body .ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td");

        expect(tdEls2.at(0).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-last-left-fixed-column",
                "ve-table-fixed-left",
            ]),
        );
    });

    it("column fixed right", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
            },
        });

        const tdEls = wrapper
            .findAll(".ve-table-body .ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td");

        expect(tdEls.at(9 - 1).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-first-right-fixed-column",
                "ve-table-fixed-right",
            ]),
        );
        expect(tdEls.at(9 - 0).classes()).toContain("ve-table-fixed-right");

        await wrapper.setProps({ columns: COLUMNS_FIXED_CHANGE });

        const tdEls2 = wrapper
            .findAll(".ve-table-body .ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td");

        expect(tdEls.at(9 - 0).classes()).toEqual(
            expect.arrayContaining([
                "ve-table-first-right-fixed-column",
                "ve-table-fixed-right",
            ]),
        );
    });
});
