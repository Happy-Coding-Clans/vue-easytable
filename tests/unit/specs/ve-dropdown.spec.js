import { mount } from "@vue/test-utils";
import veDropdown from "@/ve-dropdown";
import { later } from "../util";

describe("veDropdown", () => {
    // dropdown items
    const DROPDOWN_ITEMS = [
        { value: 0, label: "Apple" },
        { value: 1, label: "Orange", selected: true },
        { value: 2, label: "Banana" },
    ];

    it("render normal", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                showOperation: true,
                confirmFilterText: "filter",
                resetFilterText: "reset",
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render with radio", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                showRadio: true,
                showOperation: true,
                confirmFilterText: "filter",
                resetFilterText: "reset",
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render with checkbox", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                isMultiple: true,
                showOperation: true,
                confirmFilterText: "filter",
                resetFilterText: "reset",
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("value props", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.findAll(".ve-dropdown-items-li").length).toBe(3);
    });

    it("showOperation prop", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                showOperation: true,
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.find(".ve-dropdown-operation").exists()).toBe(true);
    });

    it("isMultiple prop", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                isMultiple: true,
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.find(".ve-dropdown-items-multiple").exists()).toBe(true);
    });

    it("placeholder prop", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                isMultiple: true,
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.find(".ve-dropdown-items-multiple").exists()).toBe(true);
    });

    it("textAlign prop", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                textAlign: "center",
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.find(".ve-dropdown-items-li-a-center").exists()).toBe(
            true,
        );
    });

    it("operation text prop", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                showOperation: true,
                confirmFilterText: "ok",
                resetFilterText: "cancel",
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.find(".ve-dropdown-operation").text()).toContain("ok");
        expect(wrapper.find(".ve-dropdown-operation").text()).toContain(
            "cancel",
        );
    });

    it("showRadio prop", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                showRadio: true,
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.findAll(".ve-radio").length).toBe(3);
    });

    it("isControlled prop", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                isControlled: true,
                visible: true,
            },
            slots: {
                default: `<div>click me</div>`,
            },
        });

        expect(wrapper.find(".ve-dropdown-dd-show").exists()).toBe(true);
    });

    it("hideByItemClick prop", async () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                hideByItemClick: false,
            },
            slots: {
                default: `<div class="btn">click me</div>`,
            },
        });

        wrapper.find(".btn").trigger("click");
        await later(100);
        expect(wrapper.find(".ve-dropdown-dd-show").exists()).toBe(true);

        wrapper.find(".ve-dropdown-items-li").trigger("click");
        await later(150);
        expect(wrapper.find(".ve-dropdown-dd-show").exists()).toBe(true);

        wrapper.setProps({ hideByItemClick: true });
        await later(100);
        wrapper.find(".ve-dropdown-items-li").trigger("click");
        await later(150);
        expect(wrapper.find(".ve-dropdown-dd-show").exists()).toBe(false);
    });

    it("custom-content slot", () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
                isCustomContent: true,
            },
            slots: {
                "custom-content": `<div class="custom-content-slot">this is custom content</div>`,
            },
        });

        expect(wrapper.find(".custom-content-slot").exists()).toBe(true);
    });

    it("on-item-select-change emit", async () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
            },
            slots: {
                default: `<div class="btn">click me</div>`,
            },
        });

        wrapper.find(".btn").trigger("click");
        await later(100);

        // 改变选项
        wrapper.findAll(".ve-dropdown-items-li").at(1).trigger("click");

        await later();

        let items = [
            { value: 0, label: "Apple", selected: false },
            { value: 1, label: "Orange", selected: true },
            { value: 2, label: "Banana", selected: false },
        ];

        expect(wrapper.emitted("on-item-select-change")[0]).toEqual([items]);
    });

    it("visible change emit", async () => {
        const wrapper = mount(veDropdown, {
            propsData: {
                value: DROPDOWN_ITEMS,
            },
            slots: {
                default: `<div class="btn">click me</div>`,
            },
        });

        wrapper.find(".btn").trigger("click");
        await later(100);

        wrapper.find(".btn").trigger("click");
        await later(100);

        expect(wrapper.emitted("on-dropdown-visible-change").length).toEqual(2);
        expect(wrapper.emitted("on-dropdown-visible-change")[0]).toEqual([
            true,
        ]);
        expect(wrapper.emitted("on-dropdown-visible-change")[1]).toEqual([
            false,
        ]);
    });

    it("single select filter confirm emit", async () => {
        let items = [
            { value: 0, label: "Apple", selected: false },
            { value: 1, label: "Orange", selected: true },
            { value: 2, label: "Banana", selected: false },
        ];

        const wrapper = mount(veDropdown, {
            propsData: {
                value: items,
                showOperation: true,
                confirmFilterText: "ok",
                resetFilterText: "cancel",
            },
            slots: {
                default: `<div class="btn">click me</div>`,
            },
        });

        await later();

        wrapper.find(".btn").trigger("click");
        await later();

        // 改变选项
        wrapper.findAll(".ve-dropdown-items-li").at(0).trigger("click");

        await later();

        // confirm btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(1).trigger("click");

        await later();

        expect(wrapper.emitted("on-filter-confirm").length).toEqual(1);
        expect(
            wrapper.emitted("on-filter-confirm")[0][0].find((x) => x.selected)
                .label,
        ).toEqual("Apple");
    });

    it("single select filter reset emit", async () => {
        let items = [
            { value: 0, label: "Apple", selected: false },
            { value: 1, label: "Orange", selected: true },
            { value: 2, label: "Banana", selected: false },
        ];

        const wrapper = mount(veDropdown, {
            propsData: {
                value: items,
                showOperation: true,
                confirmFilterText: "ok",
                resetFilterText: "cancel",
            },
            slots: {
                default: `<div class="btn">click me</div>`,
            },
        });

        await later();

        wrapper.find(".btn").trigger("click");
        await later();

        // reset btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(0).trigger("click");

        await later();

        expect(wrapper.emitted("on-filter-reset").length).toEqual(1);
        expect(
            wrapper.emitted("on-filter-reset")[0][0].filter((x) => x.selected)
                .length,
        ).toEqual(0);
    });

    it("multiple select filter confirm emit", async () => {
        let items = [
            { value: 0, label: "Apple", selected: true },
            { value: 1, label: "Orange", selected: true },
            { value: 2, label: "Banana", selected: false },
        ];

        const wrapper = mount(veDropdown, {
            propsData: {
                value: items,
                isMultiple: true,
                showOperation: true,
                confirmFilterText: "ok",
                resetFilterText: "cancel",
            },
            slots: {
                default: `<div class="btn">click me</div>`,
            },
        });

        await later();

        wrapper.find(".btn").trigger("click");
        await later();

        // 改变选项
        wrapper.findAll(".ve-checkbox").at(2).trigger("click");

        await later();

        // confirm btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(1).trigger("click");

        await later();

        expect(wrapper.emitted("on-filter-confirm").length).toEqual(1);
        expect(
            wrapper.emitted("on-filter-confirm")[0][0].filter((x) => x.selected)
                .length,
        ).toEqual(3);
    });

    it("multiple select filter reset emit", async () => {
        let items = [
            { value: 0, label: "Apple", selected: true },
            { value: 1, label: "Orange", selected: true },
            { value: 2, label: "Banana", selected: false },
        ];

        const wrapper = mount(veDropdown, {
            propsData: {
                value: items,
                isMultiple: true,
                showOperation: true,
                confirmFilterText: "ok",
                resetFilterText: "cancel",
            },
            slots: {
                default: `<div class="btn">click me</div>`,
            },
        });

        await later();

        wrapper.find(".btn").trigger("click");
        await later();

        // reset btn click
        wrapper.findAll(".ve-dropdown-operation-item").at(0).trigger("click");

        await later();

        expect(wrapper.emitted("on-filter-reset").length).toEqual(1);
        expect(
            wrapper.emitted("on-filter-reset")[0][0].filter((x) => x.selected)
                .length,
        ).toEqual(0);
    });
});
