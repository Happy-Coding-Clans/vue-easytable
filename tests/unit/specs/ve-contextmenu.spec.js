import { mount, createWrapper } from "@vue/test-utils";
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
                <div id="contextmenu-target">Right click this area</div>
                <ve-contextmenu eventTarget="#contextmenu-target" :options="options" />
            </div>`,
            data() {
                return {
                    options: OPTIONS,
                };
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("contextmenu event", async () => {
        const wrapper = mount(
            {
                render() {
                    return (
                        <div>
                            <div id="contextmenu-target">
                                Right click this area
                            </div>
                            <ve-contextmenu
                                eventTarget="#contextmenu-target"
                                options={this.options}
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        options: OPTIONS,
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const contextmenuTargetEl = wrapper.find("#contextmenu-target");

        expect(contextmenuTargetEl.exists()).toBe(true);

        contextmenuTargetEl.trigger("contextmenu");

        await later();

        const contextmenuPoppers = document.querySelectorAll(
            ".ve-contextmenu-popper",
        );
        expect(contextmenuPoppers.length).toBe(1);

        wrapper.destroy();
    });

    it("contextmenu node hover", async () => {
        const wrapper = mount(
            {
                render() {
                    return (
                        <div>
                            <div id="contextmenu-target">
                                Right click this area
                            </div>
                            <ve-contextmenu
                                eventTarget="#contextmenu-target"
                                options={this.options}
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        options: OPTIONS,
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const contextmenuTargetEl = wrapper.find("#contextmenu-target");

        expect(contextmenuTargetEl.exists()).toBe(true);

        contextmenuTargetEl.trigger("contextmenu");

        await later();

        const contextmenuPopper = document.querySelector(
            ".ve-contextmenu-popper",
        );

        const contextmenuNodes = contextmenuPopper.querySelectorAll(
            ".ve-contextmenu-node",
        );

        //trigger element hover
        const event = new MouseEvent("mouseover", {
            view: window, // window
            bubbles: true,
            cancelable: true,
        });

        contextmenuNodes[1].dispatchEvent(event);

        await later(500);

        const contextmenuPoppers = document.querySelectorAll(
            ".ve-contextmenu-popper",
        );
        expect(contextmenuPoppers.length).toBe(2);

        wrapper.destroy();
    });

    it("contextmenu destoryed", async () => {
        const wrapper = mount(
            {
                render() {
                    return (
                        <div>
                            <div id="contextmenu-target">
                                Right click this area
                            </div>
                            <ve-contextmenu
                                eventTarget="#contextmenu-target"
                                options={this.options}
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        options: OPTIONS,
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const contextmenuTargetEl = wrapper.find("#contextmenu-target");

        expect(contextmenuTargetEl.exists()).toBe(true);

        contextmenuTargetEl.trigger("contextmenu");

        await later();

        const contextmenuPoppers = document.querySelectorAll(
            ".ve-contextmenu-popper",
        );
        expect(contextmenuPoppers.length).toBe(1);

        wrapper.destroy();

        const contextmenuPoppers2 = document.querySelectorAll(
            ".ve-contextmenu-popper",
        );
        expect(contextmenuPoppers2.length).toBe(0);
    });
});
