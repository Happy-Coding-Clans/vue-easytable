import { mount } from "@vue/test-utils";
import veContextmenu from "@/ve-contextmenu";
import { later } from "../util";

describe("veContextmenu", () => {
    const OPTIONS = [
        {
            label: "menu1",
            type: "menu1-type",
        },
        {
            label: "menu2",
            type: "menu2-type",
            children: [
                {
                    label: "menu2-1",
                    type: "menu2-1-type",
                },
                {
                    label: "menu2-2",
                    type: "menu2-2",
                },
            ],
        },
        {
            type: "separator",
        },
        {
            label: "menu3",
            type: "menu3-type",
        },
        {
            label: "menu4",
            disabled: true,
            children: [
                {
                    label: "menu4-1",
                },
            ],
        },
        {
            label: "menu5",
            type: "menu5-type",
            children: [
                {
                    label: "menu5-1",
                    type: "menu5-1-type",
                    children: [
                        {
                            label: "menu5-1-1",
                        },
                        {
                            label: "menu5-2-2",
                            type: "menu5-2-2-type",
                        },
                    ],
                },
                {
                    label: "menu5-2",
                    disabled: true,
                },
                {
                    type: "separator",
                },
                {
                    label: "menu5-3",
                    type: "menu5-3-type",
                },
            ],
        },
    ];

    it("render", () => {
        const wrapper = mount({
            template: `
            <div>
                <div id="contextmenu-container">Right click this area</div>
                <ve-contextmenu eventTarget="#contextmenu-container" :options="options" />
            </div>`,
            data() {
                return {
                    options: OPTIONS,
                };
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
