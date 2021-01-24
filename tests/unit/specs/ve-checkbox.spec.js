import { mount } from "@vue/test-utils";
import veCheckbox from "@/ve-checkbox";
import { later } from "../util";

describe("veCheckbox", () => {
    it("render normal", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                value: true,
                label: "orange"
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render with indeterminate", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                value: true,
                label: "orange",
                disabled: true
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("render with disabled", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                value: true,
                label: "orange",
                indeterminate: true
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("value prop", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                value: true,
                label: "orange"
            }
        });

        expect(wrapper.find(".ve-checkbox-checked").exists()).toBe(true);
    });

    it("label prop", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                value: true,
                label: "orange"
            }
        });

        expect(wrapper.find(".ve-checkbox-label").text()).toBe("orange");
    });

    it("label content slot", () => {
        const wrapper = mount(veCheckbox, {
            slots: {
                default: "orange"
            }
        });

        expect(wrapper.find(".ve-checkbox-label").text()).toBe("orange");
    });

    it("disbled prop", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                disabled: true,
                label: "orange"
            }
        });

        expect(wrapper.find(".ve-checkbox-disabled").exists()).toBe(true);
    });

    it("disbled selected", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                value: true,
                disabled: true,
                label: "orange"
            }
        });
        expect(wrapper.find(".ve-checkbox-checked").exists()).toBe(true);
    });

    it("indeterminate prop", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                indeterminate: true,
                label: "orange"
            }
        });
        expect(wrapper.find(".ve-checkbox-indeterminate").exists()).toBe(true);
    });

    it("isControlled prop", async () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                isControlled: true,
                label: "orange"
            }
        });

        await wrapper.setProps({ isSelected: true });
        expect(wrapper.find(".ve-checkbox-checked").exists()).toBe(true);

        await wrapper.setProps({ isSelected: false });
        expect(wrapper.find(".ve-checkbox-checked").exists()).toBe(false);
    });

    it("isSelected prop", () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                isControlled: true,
                isSelected: true,
                label: "orange"
            }
        });

        expect(wrapper.find(".ve-checkbox-checked").exists()).toBe(true);
    });

    it("click event", async () => {
        const wrapper = mount({
            template: `
            <ve-checkbox v-model="checkboxValue">orange</ve-checkbox>`,
            data() {
                return {
                    checkboxValue: false
                };
            }
        });

        wrapper.find(".ve-checkbox").trigger("click");
        await later();
        expect(wrapper.find(".ve-checkbox-checked").exists()).toBe(true);
    });

    it("checked change emit", async () => {
        const wrapper = mount(veCheckbox, {
            propsData: {
                value: false,
                label: "orange"
            }
        });

        wrapper.find(".ve-checkbox").trigger("click");
        wrapper.find(".ve-checkbox").trigger("click");

        await later();

        expect(wrapper.emitted("on-checked-change").length).toEqual(2);
        expect(wrapper.emitted("on-checked-change")[0]).toEqual([true]);
        expect(wrapper.emitted("on-checked-change")[1]).toEqual([false]);
    });
});
