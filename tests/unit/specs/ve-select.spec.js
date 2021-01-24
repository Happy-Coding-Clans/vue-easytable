import { mount } from "@vue/test-utils";
import veSelect from "@/ve-select";
import { later } from "../util";

describe("veSelect", () => {
    // select items
    const SELECT_ITEMS = [
        { value: 0, label: "Apple" },
        { value: 1, label: "Orange", selected: true },
        { value: 2, label: "Banana" }
    ];

    it("render by value prop", () => {
        const wrapper = mount({
            render() {
                return <veSelect value={SELECT_ITEMS} placeholder="姓名" />;
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render by isMultiple prop", () => {
        const wrapper = mount({
            render() {
                return (
                    <veSelect
                        value={SELECT_ITEMS}
                        placeholder="姓名"
                        isMultiple
                    />
                );
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render by isInput prop", () => {
        const wrapper = mount({
            render() {
                return (
                    <veSelect value={SELECT_ITEMS} placeholder="姓名" isInput />
                );
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("width prop", () => {
        const wrapper = mount(veSelect, {
            propsData: {
                value: SELECT_ITEMS,
                width: 120
            }
        });

        expect(
            wrapper.find(".ve-dropdown-dt-selected").attributes("style")
        ).toBe("width: 120px;");
    });

    it("isMultiple prop", () => {
        const wrapper = mount(veSelect, {
            propsData: {
                value: SELECT_ITEMS,
                isMultiple: true
            }
        });

        expect(wrapper.findAll(".ve-dropdown-items-multiple").length).toBe(3);
    });

    it("isInput prop", () => {
        const wrapper = mount(veSelect, {
            propsData: {
                value: SELECT_ITEMS,
                isInput: true
            }
        });

        expect(wrapper.find(".ve-select-input").exists()).toBe(true);
    });

    it("on-select-change emit event", async () => {
        const wrapper = mount(veSelect, {
            propsData: {
                value: SELECT_ITEMS
            }
        });

        wrapper
            .findAll(".ve-dropdown-items-li")
            .at(1)
            .trigger("click");

        expect(wrapper.emitted("on-select-change").length).toEqual(1);
        expect(
            wrapper.emitted("on-select-change")[0][0].find(x => x.selected)
                .label
        ).toBe("Orange");
    });
});
