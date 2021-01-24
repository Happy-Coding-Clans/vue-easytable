import { mount } from "@vue/test-utils";
import veLoading from "@/ve-loading";
import { later } from "../util";

describe("veLoading", () => {
    // spin names
    const SPIN_NAMES = {
        PLANE: "plane",
        GRID: "grid",
        WAVE: "wave",
        FLOW: "flow",
        BOUNCE: "bounce",
        PULSE: "pulse"
    };

    it("render normal", () => {
        const wrapper = mount({
            render() {
                return (
                    <div>
                        {Object.values(SPIN_NAMES).map(name => {
                            return <div id={"loading-" + name} />;
                        })}
                    </div>
                );
            }
        });

        Object.values(SPIN_NAMES).forEach(spinName => {
            veLoading({
                target: wrapper.vm.$el.querySelector(`#loading-${spinName}`),
                name: spinName
            }).show();
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("fullscreen prop", async () => {
        const instance = veLoading({
            fullscreen: true,
            name: "bounce",
            lock: true
        });

        await later();

        // body
        expect(
            document.body.classList.contains("ve-loading-parent-relative")
        ).toBe(true);

        const loadingEl = document.querySelector(".ve-loading");

        expect(loadingEl).not.toBeNull();

        expect(loadingEl.classList.contains("ve-loading-hide")).toBe(true);

        instance.show();
        await later();
        expect(loadingEl.classList.contains("ve-loading-hide")).toBe(false);
    });

    it("lock prop", async () => {
        const instance = veLoading({
            fullscreen: true,
            name: "bounce",
            lock: true
        });

        await later();

        const loadingEl = document.querySelector(".ve-loading");

        expect(loadingEl.classList.contains("ve-loading-fixed")).toBe(true);
    });

    it("tip prop", async () => {
        const wrapper = mount({
            render() {
                return (
                    <div>
                        <div class="loading-item"></div>
                    </div>
                );
            }
        });

        const tip = "loading...";
        const instance = veLoading({
            target: wrapper.vm.$el.querySelector(".loading-item"),
            name: "pulse",
            tip: tip
        });

        expect(wrapper.find(".ve-loading-spin-tip").text()).toBe(tip);
    });

    it("overlayBackgroundColor prop", async () => {
        const wrapper = mount({
            render() {
                return (
                    <div>
                        <div class="loading-item"></div>
                    </div>
                );
            }
        });

        const bgColor = "rgba(255, 255, 255, 0.1)";
        const instance = veLoading({
            target: wrapper.vm.$el.querySelector(".loading-item"),
            name: "pulse",
            overlayBackgroundColor: bgColor
        });

        expect(wrapper.find(".ve-loading").attributes("style")).toBe(
            `background-color: ${bgColor};`
        );
    });

    it("show and close method", async () => {
        const wrapper = mount({
            render() {
                return (
                    <div>
                        <div class="loading-item"></div>
                    </div>
                );
            }
        });

        const instance = veLoading({
            target: wrapper.vm.$el.querySelector(".loading-item"),
            name: "pulse"
        });

        await later();
        expect(wrapper.find(".ve-loading-hide").exists()).toBe(true);

        instance.show();
        await later();
        expect(wrapper.find(".ve-loading-hide").exists()).toBe(false);

        instance.close();
        await later();
        expect(wrapper.find(".ve-loading-hide").exists()).toBe(true);
    });

    it("destory method", async () => {
        const wrapper = mount({
            render() {
                return (
                    <div>
                        <div class="loading-item"></div>
                    </div>
                );
            }
        });

        const instance = veLoading({
            target: wrapper.vm.$el.querySelector(".loading-item"),
            name: "pulse"
        });

        expect(wrapper.find(".ve-loading-spin").exists()).toBe(true);

        instance.destroy();
        await later();
        expect(wrapper.find(".ve-loading-spin").exists()).toBe(false);
    });
});
