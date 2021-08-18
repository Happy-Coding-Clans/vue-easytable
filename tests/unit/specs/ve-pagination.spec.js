import { mount } from "@vue/test-utils";
import vePagination from "@/ve-pagination";
import { later } from "../util";
import { KEY_CODES } from "../constant";

describe("vePagination", () => {
    it("render by different props", () => {
        const wrapper = mount({
            render() {
                return (
                    <div>
                        <vePagination total={600} />
                        <vePagination total={600} pageIndex={2} />
                        <vePagination total={600} pageIndex={30} />
                        <vePagination
                            total={600}
                            layout={[
                                "total",
                                "prev",
                                "next",
                                "sizer",
                                "jumper",
                            ]}
                        />
                        <vePagination
                            total={600}
                            layout={[
                                "total",
                                "sizer",
                                "prev",
                                "pager",
                                "next",
                                "jumper",
                            ]}
                        />
                    </div>
                );
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("layout prop", () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 300,
                layout: ["total", "prev", "next", "sizer", "jumper"],
            },
        });

        // except pager
        expect(wrapper.find(".ve-pagination-pager").exists()).toBe(false);
    });

    it("total prop", () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 300,
            },
        });
        expect(wrapper.find(".ve-pagination-total").text()).toContain("300");
    });

    it("pageIndex prop", () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pageIndex: 5,
            },
        });

        expect(wrapper.find(".ve-pagination-li-active").text()).toBe("5");
    });

    it("pageSizeOption prop", () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pageSizeOption: [5, 10, 15],
                pageSize: 15,
            },
        });

        const pageSizeOptionEl = wrapper.findAll(".ve-dropdown-items-li");

        expect(pageSizeOptionEl.at(0).text()).toContain("5");
        expect(pageSizeOptionEl.at(1).text()).toContain("10");
        expect(pageSizeOptionEl.at(2).text()).toContain("15");
    });

    it("pagingCount prop", () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pagingCount: 7,
                pageIndex: 10,
            },
        });

        expect(
            wrapper.findAll(".ve-pagination-pager .ve-pagination-li").length,
        ).toBe(11);
    });

    it("pageSize prop", () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pageSizeOption: [5, 10, 15],
                pageSize: 15,
            },
        });

        expect(wrapper.find(".ve-dropdown-items-li.active").text()).toContain(
            "15",
        );
    });

    it("pageIndex change", async () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
            },
        });

        await wrapper.setProps({ pageIndex: 2 });

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("2");
    });

    it("page number btn click operation", async () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
            },
        });

        wrapper
            .findAll(".ve-pagination-pager .ve-pagination-li")
            .at(5)
            .trigger("click");

        await later();

        expect(wrapper.emitted("on-page-number-change").length).toEqual(1);
        expect(wrapper.emitted("on-page-number-change")[0]).toEqual([6]);

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("6");

        expect(wrapper.find(".ve-pagination-goto-input").element.value).toBe(
            "6",
        );
    });

    it("next page number btn click operation", async () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
            },
        });

        wrapper.find(".ve-pagination-next").trigger("click");

        await later();

        expect(wrapper.emitted("on-page-number-change").length).toEqual(1);
        expect(wrapper.emitted("on-page-number-change")[0]).toEqual([2]);

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("2");
    });

    it("pre page number btn click operation", async () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pageIndex: 10,
            },
        });

        wrapper.find(".ve-pagination-prev").trigger("click");

        await later();

        expect(wrapper.emitted("on-page-number-change").length).toEqual(1);
        expect(wrapper.emitted("on-page-number-change")[0]).toEqual([9]);

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("9");
    });

    it("next5 click operation", async () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
            },
        });

        wrapper.find(".ve-pagination-jump-next").trigger("click");

        await later();

        expect(wrapper.emitted("on-page-number-change").length).toEqual(1);
        expect(wrapper.emitted("on-page-number-change")[0]).toEqual([6]);

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("6");
    });

    it("prev5 click operation", async () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pageIndex: 10,
            },
        });

        wrapper.find(".ve-pagination-jump-prev").trigger("click");

        await later();

        expect(wrapper.emitted("on-page-number-change").length).toEqual(1);
        expect(wrapper.emitted("on-page-number-change")[0]).toEqual([5]);

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("5");
    });

    it("on-page-size-change emit", () => {
        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pageSizeOption: [5, 10, 15],
                pageSize: 5,
            },
        });

        wrapper.findAll(".ve-dropdown-items-li").at(1).trigger("click");

        expect(wrapper.emitted("on-page-size-change").length).toEqual(1);
        expect(wrapper.emitted("on-page-size-change")[0]).toEqual([10]);

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("1");
    });

    it("enter keyboard event ", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(vePagination, {
            propsData: {
                total: 600,
                pageSize: 5,
            },
        });

        const textInput = wrapper.find(".ve-pagination-goto-input");
        await textInput.setValue(2);

        expect(textInput.element.value).toBe("2");

        textInput.element.addEventListener("keyup", mockFn);
        textInput.element.dispatchEvent(
            new KeyboardEvent("keyup", { keyCode: KEY_CODES.ENTER }),
        );
        /* textInput.trigger("keyup", {
            keyCode: 13
        }); */

        await later();

        expect(mockFn).toBeCalled();

        expect(
            wrapper.find(".ve-pagination-li-active.ve-pagination-li").text(),
        ).toBe("2");

        expect(wrapper.emitted("on-page-number-change").length).toEqual(1);
        expect(wrapper.emitted("on-page-number-change")[0]).toEqual([2]);
    });
});
