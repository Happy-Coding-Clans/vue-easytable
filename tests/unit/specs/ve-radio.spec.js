import { mount } from "@vue/test-utils";
import veRadio from "@/ve-radio";
import { later } from "../util";

describe("veRadio", () => {
    it("render", () => {
        const wrapper = mount({
            render() {
                const { checked, unChecked } = this;
                return (
                    <div>
                        <div>
                            <veRadio value={checked}>normal</veRadio>
                        </div>
                        <div>
                            <veRadio disabled value={checked}>
                                disabled checked
                            </veRadio>
                        </div>
                        <div>
                            <veRadio disabled value={unChecked}>
                                disabled unChecked
                            </veRadio>
                        </div>
                        <div>
                            <veRadio isControlled isSelected={checked}>
                                controlled
                            </veRadio>
                        </div>
                    </div>
                );
            },
            data() {
                return {
                    checked: true,
                    unChecked: false
                };
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("value prop", async () => {
        const wrapper = mount(veRadio, {
            propsData: {
                value: false
            }
        });

        expect(wrapper.find(".ve-radio-checked").exists()).toBe(false);

        wrapper.setProps({ isSelected: true });

        await later();
        expect(wrapper.find(".ve-radio-checked").exists()).toBe(false);
    });

    it("disable prop", () => {
        const wrapper = mount(veRadio, {
            propsData: {
                value: true
            }
        });

        expect(wrapper.find(".ve-radio-checked").exists()).toBe(true);
    });

    it("label prop", () => {
        const wrapper = mount(veRadio, {
            propsData: {
                value: false,
                label: "test"
            }
        });

        expect(wrapper.find(".ve-radio-label").text()).toContain("test");
    });

    it("isControlled prop", async () => {
        const wrapper = mount(veRadio, {
            propsData: {
                isControlled: true,
                isSelected: false
            }
        });

        expect(wrapper.find(".ve-radio-checked").exists()).toBe(false);

        wrapper.setProps({ isSelected: true });

        await later();
        expect(wrapper.find(".ve-radio-checked").exists()).toBe(true);
    });

    /*   it("click event", async () => {
        const wrapper = mount(veRadio, {
            propsData: {
                value: false,
                label: "test"
            }
        });

        wrapper.trigger("click");

        await later();
        expect(wrapper.find(".ve-radio-checked").exists()).toBe(true);
    }); */

    it("on-radio-change event", async () => {
        const wrapper = mount(veRadio, {
            propsData: {
                value: false,
                label: "test"
            }
        });

        wrapper.trigger("click");

        await later();
        expect(wrapper.emitted("on-radio-change").length).toEqual(1);
        expect(wrapper.emitted("on-radio-change")[0]).toEqual([true]);
    });
});
