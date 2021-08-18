import { mount } from "@vue/test-utils";
import veIcon from "@/ve-icon";
import { later } from "../util";

describe("veIcon", () => {
    it("render by different props", () => {
        const wrapper = mount({
            template: `
            <div>
            <ve-icon name="double-right-arrow" />
            <ve-icon name="double-right-arrow" color="blue" />
            <ve-icon name="double-right-arrow" :size="40" />
          </div>`,
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("color prop", () => {
        const wrapper = mount(veIcon, {
            propsData: {
                name: "double-right-arrow",
                color: "red",
            },
        });

        expect(wrapper.attributes("style")).toBe("color: red;");
    });

    it("font-size prop", () => {
        const wrapper = mount(veIcon, {
            propsData: {
                name: "double-right-arrow",
                size: 50,
            },
        });
        expect(wrapper.attributes("style")).toBe("font-size: 50px;");
    });

    describe("warns", () => {
        let errorSpy;
        beforeEach(() => {
            errorSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {});
        });

        afterEach(() => {
            errorSpy.mockRestore();
        });

        const errorIconName = "double-right-arrow2";

        it("warning on error icon name", () => {
            const wrapper = mount(veIcon, {
                propsData: {
                    name: errorIconName,
                },
            });
            expect(errorSpy).toBeCalledWith(
                `${errorIconName} is not found in VeIcon.`,
            );
        });
    });
});
