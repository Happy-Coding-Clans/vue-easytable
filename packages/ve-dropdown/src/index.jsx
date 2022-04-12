import clickoutside from "../../src/directives/clickoutside.js";
import VeCheckbox from "vue-easytable/packages/ve-checkbox";
import VeRadio from "vue-easytable/packages/ve-radio";
import { COMPS_NAME, EMIT_EVENTS } from "./util/constant";
import { clsName } from "./util/index";
import { getRandomId } from "../../src/utils/random";
import {
    getViewportOffset,
    getViewportOffsetWithinContainer,
} from "../../src/utils/dom";

export default {
    name: COMPS_NAME.VE_DROPDOWN,
    directives: {
        "click-outside": clickoutside,
    },
    props: {
        // 如果是select 组件将特殊处理
        isSelect: {
            type: Boolean,
            default: false,
        },
        showOperation: {
            type: Boolean,
            default: false,
        },

        width: {
            type: Number,
            default: 90,
        },

        // select的最大宽度(超出隐藏)
        maxWidth: {
            type: Number,
            default: 0,
        },
        // max height
        maxHeight: {
            type: Number,
            default: 1000,
        },

        // 如果为true 会包含 checkbox
        isMultiple: {
            type: Boolean,
            default: false,
        },

        // 用户传入v-model 的值 [{value/label/selected}]
        value: {
            type: [Array],
            default: null,
        },

        // 文本居中方式 left|center|right
        textAlign: {
            type: String,
            default: "left",
        },

        // 是否支持输入input
        isInput: {
            type: Boolean,
            default: false,
        },
        // confirm filter text
        confirmFilterText: {
            type: String,
            default: "",
        },
        // confirm filter text
        resetFilterText: {
            type: String,
            default: "",
        },
        // hide by single selection item click
        hideByItemClick: {
            type: Boolean,
            default: false,
        },
        // is show radio when single selection
        showRadio: {
            type: Boolean,
            default: false,
        },
        // 当 isControlled=true ,visible 生效
        visible: {
            type: Boolean,
            default: false,
        },
        // is controlled
        isControlled: {
            type: Boolean,
            default: false,
        },
        // is custom content
        isCustomContent: {
            type: Boolean,
            default: false,
        },
        // instance between dropdown items and trigger element
        defaultInstance: {
            type: Number,
            default: 5,
        },
        // popper append to element
        popperAppendTo: {
            type: [String, HTMLElement],
            default: function () {
                return document.body;
            },
        },
    },
    data() {
        return {
            internalVisible: false,
            internalOptions: [],
            inputValue: "",
            // 是否显示触发器被点击了（被点击将忽略 clickOutside 事件）
            isDropdownShowTriggerClicked: false,
            // root id
            rootId: "",
            // dropdown items panel id
            dropdownItemsPanelId: "",
            // 弹出被添加到的目标元素
            popperAppendToEl: null,
            // 弹出被添加到的目标元素标签名称
            appendToElTagName: null,
        };
    },
    computed: {
        // is dropdown visible
        isDropdownVisible() {
            return this.isControlled ? this.visible : this.internalVisible;
        },

        // 获取最大宽度(不设置则是无穷大)
        getMaxWidth() {
            var result = Infinity,
                maxWidth = this.maxWidth,
                width = this.width;

            if (maxWidth && maxWidth > 0 && maxWidth > width) {
                result = maxWidth;
            }

            return result;
        },
        // selected labels
        selectedLabels() {
            return this.internalOptions
                .filter((x) => x.selected)
                .map((x) => {
                    if (x.selected) {
                        return x.label;
                    }
                });
        },
        // operation buttons class
        operationFilterClass() {
            let result = null;
            result = {
                [clsName("filter-disable")]: this.selectedLabels.length === 0,
            };

            return result;
        },
        // dropdown items class
        dropdownItemsClass() {
            return {
                [clsName("dd")]: true,
                [clsName("dd-show")]: this.isDropdownVisible,
            };
        },
    },
    watch: {
        value: function () {
            this.init();
        },
        visible: {
            handler(visible) {
                const { isControlled, showDropDown, hideDropDown } = this;
                // deal after mounted hook
                setTimeout(() => {
                    if (isControlled) {
                        if (visible) {
                            showDropDown();
                        } else {
                            hideDropDown();
                        }
                    }
                });
            },
            immediate: true,
        },
    },
    methods: {
        // 初始化
        init() {
            this.internalOptions = Object.assign([], this.value);

            if (this.isInput) {
                this.setInputValue();
            }
        },

        // operation filter confirm
        confirm() {
            // 使用户传入的v-model 生效
            this.$emit("input", this.internalOptions);
            this.$emit(EMIT_EVENTS.FILTER_CONFIRM, this.internalOptions);
            this.hideDropDown();
        },

        // operation filter reset
        reset() {
            if (this.internalOptions.some((x) => x.selected)) {
                this.internalOptions.map((x) => {
                    if (x.selected) {
                        x.selected = false;
                    }
                    return x;
                });

                // 使用户传入的v-model 生效
                this.$emit("input", this.internalOptions);

                this.$emit(EMIT_EVENTS.FILTER_RESET, this.internalOptions);
            }

            this.hideDropDown();
        },

        // hide dropdown
        hideDropDown() {
            this.$emit(EMIT_EVENTS.VISIBLE_CHANGE, false);

            setTimeout(() => {
                this.internalVisible = false;
                this.removeOrEmptyRootPanel();
            }, 150);
        },

        // remove or emoty root panel
        removeOrEmptyRootPanel() {
            const { rootId } = this;

            let rootEl = document.querySelector(`#${rootId}`);
            if (rootEl) {
                rootEl.innerHTML = "";
            }
        },

        // show dropdown
        showDropDown() {
            const { rootId, dropdownItemsPanelId } = this;

            let rootEl = document.querySelector(`#${rootId}`);

            if (rootEl) {
                // remove first
                rootEl.innerHTML = "";
                rootEl.appendChild(this.$refs[dropdownItemsPanelId]);

                rootEl.style.position = "absolute";
                rootEl.classList.add(clsName("popper"));

                this.changDropdownPanelPosition();
            }

            this.internalVisible = true;

            this.$emit(EMIT_EVENTS.VISIBLE_CHANGE, true);
        },

        // change dropdown panel position
        changDropdownPanelPosition() {
            const {
                defaultInstance,
                rootId,
                popperAppendToEl,
                appendToElTagName,
            } = this;

            let rootEl = document.querySelector(`#${rootId}`);

            if (rootEl) {
                const { width: currentPanelWidth, height: currentPanelHeight } =
                    rootEl.getBoundingClientRect();

                const triggerEl = this.$el.querySelector(".ve-dropdown-dt");
                const { height: triggerElHeight } =
                    triggerEl.getBoundingClientRect();

                if (!popperAppendToEl) {
                    return false;
                }

                // is append to body
                const isAppendToBody = appendToElTagName === "BODY";

                const {
                    offsetLeft: triggerElLeft,
                    offsetTop: triggerElTop,
                    right: triggerElRight,
                    bottom: triggerElBottom,
                } = isAppendToBody
                    ? getViewportOffset(triggerEl)
                    : getViewportOffsetWithinContainer(
                          triggerEl,
                          popperAppendToEl,
                      );

                let panelX = 0;
                let panelY = 0;

                // 如果不是添加到body 需要考虑外层容器滚动调的影响
                let scrollLeft = 0;
                let scrollTop = 0;
                if (!isAppendToBody) {
                    scrollLeft = popperAppendToEl.scrollLeft;
                    scrollTop = popperAppendToEl.scrollTop;
                }

                // 右方宽度够显示
                if (triggerElRight >= currentPanelWidth) {
                    panelX = triggerElLeft + scrollLeft;
                }
                // 右方宽度不够显示在鼠标点击左方
                else {
                    panelX = triggerElLeft - currentPanelWidth + scrollLeft;
                }

                // 下方高度够显示
                if (triggerElBottom >= currentPanelHeight) {
                    panelY =
                        triggerElTop +
                        triggerElHeight +
                        defaultInstance +
                        scrollTop;
                }
                // 下方高度不够显示在鼠标点击上方
                else {
                    panelY =
                        triggerElTop -
                        currentPanelHeight -
                        defaultInstance +
                        scrollTop;
                }

                rootEl.style.left = panelX + "px";
                rootEl.style.top = panelY + "px";
            }
        },

        // 设置文本框的值
        setInputValue() {
            var result, labels;

            labels = this.selectedLabels;
            if (Array.isArray(labels) && labels.length > 0) {
                result = labels.join();
            }

            this.inputValue = result;
        },

        // dropdown show toggle
        dropdownShowToggle() {
            this.isDropdownShowTriggerClicked = true;

            if (this.isDropdownVisible) {
                this.hideDropDown();
            } else {
                this.showDropDown();
            }
        },

        // single select option click
        singleSelectOptionClick(e, item) {
            this.internalOptions = this.internalOptions.map((x) => {
                if (item.label === x.label) {
                    x.selected = true;
                } else {
                    x.selected = false;
                }
                return x;
            });

            if (this.hideByItemClick) {
                this.hideDropDown();
            }

            if (this.isInput) {
                this.setInputValue();
            }

            // 使用户传入的v-model 生效
            this.$emit("input", this.internalOptions);

            this.$emit(EMIT_EVENTS.ITEM_SELECT_CHANGE, this.internalOptions);
        },

        // 获取样式名称
        getTextAlignClass() {
            return clsName(`items-li-a-${this.textAlign}`);
        },

        // dropdown click outSide
        dropdownClickOutside() {
            /*
            是否显示触发器被点击了（被点击将忽略 clickOutside 事件）
            */
            setTimeout(() => {
                if (this.isDropdownShowTriggerClicked) {
                    this.isDropdownShowTriggerClicked = false;
                } else {
                    this.hideDropDown();
                }
            });
        },

        // checbox 受控属性管理
        checkedChangeControl(item, isChecked) {
            this.internalOptions = this.internalOptions.map((i) => {
                if (i.label === item.label) {
                    i.selected = isChecked;
                }
                return i;
            });

            this.$emit(EMIT_EVENTS.ITEM_SELECT_CHANGE, this.internalOptions);
        },

        // get random id
        getRandomIdWithPrefix() {
            return clsName(getRandomId());
        },

        /*
        add root element to element
        如果不指定则添加到 body
        */
        addRootElementToElement() {
            const { popperAppendTo } = this;

            this.rootId = this.getRandomIdWithPrefix();
            this.dropdownItemsPanelId = this.getRandomIdWithPrefix();

            let rootEl = document.querySelector(`#${this.rootId}`);

            if (rootEl) {
                return false;
            } else {
                // fixed unit test error: [Vue warn]: Error in v-on handler: "TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'."
                this.$nextTick(() => {
                    let containerEl = document.createElement("div");

                    containerEl.setAttribute("id", this.rootId);

                    if (
                        typeof popperAppendTo === "string" &&
                        popperAppendTo.length > 0
                    ) {
                        this.popperAppendToEl =
                            document.querySelector(popperAppendTo);
                    } else {
                        this.popperAppendToEl = popperAppendTo;
                    }

                    this.appendToElTagName = this.popperAppendToEl.tagName;

                    this.popperAppendToEl.appendChild(containerEl);
                });
            }
        },
    },

    created() {
        this.init();
    },
    mounted() {
        this.addRootElementToElement();

        this.$nextTick(() => {
            const targetEl =
                this.appendToElTagName === "BODY"
                    ? document
                    : this.popperAppendToEl;
            targetEl.addEventListener(
                "scroll",
                this.changDropdownPanelPosition,
            );
        });
        window.addEventListener("resize", this.changDropdownPanelPosition);
    },

    destroyed() {
        this.removeOrEmptyRootPanel();

        this.$nextTick(() => {
            const targetEl =
                this.appendToElTagName === "BODY"
                    ? document
                    : this.popperAppendToEl;
            targetEl.removeEventListener(
                "scroll",
                this.changDropdownPanelPosition,
            );
        });
        window.removeEventListener("resize", this.changDropdownPanelPosition);
    },

    render() {
        const {
            isMultiple,
            getTextAlignClass,
            internalOptions,
            isSelect,
            width,
            maxHeight,
            dropdownShowToggle,
            getMaxWidth,
            reset,
            singleSelectOptionClick,
            showOperation,
            isCustomContent,
            dropdownItemsClass,
            dropdownItemsPanelId,
        } = this;

        let content = "";

        if (isMultiple) {
            content = internalOptions.map((item, index) => {
                const checkboxProps = {
                    key: item.label,
                    props: {
                        isControlled: true,
                        label: item.label,
                        showLine: item.showLine,
                        isSelected: item.selected,
                    },
                    on: {
                        "on-checked-change": (isChecked) =>
                            this.checkedChangeControl(item, isChecked),
                    },
                };

                return (
                    <li
                        key={index}
                        class={[
                            clsName("items-multiple"),
                            clsName("items-li"),
                            getTextAlignClass(),
                        ]}
                    >
                        <VeCheckbox {...checkboxProps} />
                    </li>
                );
            });
        } else {
            content = internalOptions.map((item, index) => {
                const radioProps = {
                    props: {
                        isControlled: true,
                        isSelected: item.selected,
                    },
                    on: {
                        "on-radio-change": () => {},
                    },
                };

                return (
                    <li
                        key={index}
                        class={[
                            clsName("items-li"),
                            item.selected ? "active" : "",
                        ]}
                        on-click={(e) => singleSelectOptionClick(e, item)}
                    >
                        <a
                            class={[clsName("items-li-a"), getTextAlignClass()]}
                            href="javascript:void(0);"
                        >
                            {this.showRadio ? (
                                <VeRadio {...radioProps}>{item.label}</VeRadio>
                            ) : (
                                item.label
                            )}
                        </a>
                    </li>
                );
            });
        }

        const dropdownProps = {
            class: ["ve-dropdown"],
        };

        const dropdownItemsProps = {
            ref: dropdownItemsPanelId,
            class: dropdownItemsClass,
            directives: [
                {
                    name: "click-outside",
                    value: this.dropdownClickOutside,
                },
            ],
        };

        return (
            <dl {...dropdownProps}>
                <dt class="ve-dropdown-dt" on-click={dropdownShowToggle}>
                    <a
                        class={[isSelect ? clsName("dt-selected") : ""]}
                        style={{ width: width + "px" }}
                    >
                        {this.$slots.default}
                    </a>
                </dt>
                <div style={{ display: "none" }}>
                    <dd {...dropdownItemsProps}>
                        <ul
                            class={clsName("items")}
                            style={{
                                "min-width": width + "px",
                                "max-width": getMaxWidth + "px",
                            }}
                        >
                            {/* custome content */}
                            {isCustomContent && this.$slots["custom-content"]}
                            {/* not custom content */}
                            {!isCustomContent && (
                                <div>
                                    <div
                                        style={{
                                            "max-height": maxHeight + "px",
                                        }}
                                        class={clsName("items-warpper")}
                                    >
                                        {content}
                                    </div>
                                    {showOperation && (
                                        <li class={clsName("operation")}>
                                            <a
                                                class={[
                                                    clsName("operation-item"),
                                                    this.operationFilterClass,
                                                ]}
                                                href="javascript:void(0)"
                                                on-click={reset}
                                            >
                                                {this.resetFilterText}
                                            </a>
                                            <a
                                                class={clsName(
                                                    "operation-item",
                                                )}
                                                href="javascript:void(0)"
                                                on-click={this.confirm}
                                            >
                                                {this.confirmFilterText}
                                            </a>
                                        </li>
                                    )}
                                </div>
                            )}
                        </ul>
                    </dd>
                </div>
            </dl>
        );
    },
};
