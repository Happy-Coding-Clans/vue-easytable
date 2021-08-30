/* 
表格通用单元测试
*/

import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import {
    later,
    mockElementMeasurement,
    clearMockElementMeasurement,
} from "../util";

describe("veTable common", () => {
    afterEach(() => {
        clearMockElementMeasurement("scrollWidth");
        clearMockElementMeasurement("clientWidth");
    });

    it("horizontal scroll effect", async () => {
        mockElementMeasurement("scrollWidth", 1200);
        mockElementMeasurement("clientWidth", 900);

        const COLUMNS = [
            { field: "col1", key: "a", title: "Title1" },
            { field: "col2", key: "b", title: "Title2" },
            { field: "col3", key: "c", title: "Title3" },
            { field: "col4", key: "d", title: "Title4" },
            { field: "col5", key: "e", title: "Title5" },
            { field: "col6", key: "f", title: "Title6" },
            { field: "col7", key: "g", title: "Title7" },
            { field: "col8", key: "h", title: "Title8" },
            { field: "col9", key: "i", title: "Title9" },
            { field: "col10", key: "j", title: "Title10" },
        ];

        const COLUMNS2 = [
            { field: "col1", key: "a", title: "Title1", fixed: "left" },
            { field: "col2", key: "b", title: "Title2", fixed: "left" },
            { field: "col3", key: "c", title: "Title3" },
            { field: "col4", key: "d", title: "Title4" },
            { field: "col5", key: "e", title: "Title5" },
            { field: "col6", key: "f", title: "Title6" },
            { field: "col7", key: "g", title: "Title7" },
            { field: "col8", key: "h", title: "Title8" },
            { field: "col9", key: "i", title: "Title9" },
            { field: "col10", key: "j", title: "Title10", fixed: "right" },
        ];

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
        ];

        const ParentComp = {
            template: `
                <veTable
                    style="width:900px"
                    :scrollWidth="1200"
                    :columns="columns"
                    :tableData="tableData"
                />
            `,
            props: {
                columns: {
                    type: Array,
                    required: true,
                },
            },
            data() {
                return {
                    tableData: TABLE_DATA,
                };
            },
            components: {
                veTable,
            },
        };

        await later();

        const parentWrapper = mount(ParentComp, {
            propsData: {
                columns: COLUMNS,
            },
        });

        const wrapper = parentWrapper.findComponent(veTable);

        expect(wrapper.vm.isRightScrolling).toBe(false);

        // 只能通过父组件设置
        await parentWrapper.setProps({ columns: COLUMNS2 });
        expect(wrapper.vm.isRightScrolling).toBe(true);
    });
});
