import { COMPS_NAME } from "./util/constant";
import { clsName } from "./util/index";
import VeIcon from "vue-easytable/packages/ve-icon";
import { ICON_NAMES } from "../../src/utils/constant";
import { getMousePosition, getViewportOffset } from "../../src/utils/dom";
import { INIT_DATA, EMIT_EVENTS, CONTEXTMENU_TYPES } from "./util/constant";
import { getRandomId } from "../../src/utils/random";
import { debounce, cloneDeep } from "lodash";
import clickoutside from "../../src/directives/clickoutside";

export default {
    name: COMPS_NAME.VE_CONTEXTMENU,
    directives: {
        "click-outside": clickoutside,
    },
    props: {
        /*
         options(contextmenu)
            [
                {
                    
                    id: 1,
                    label: "菜单1",
                    disabled:true
                },
                {
                    id: 2,
                    label: "菜单2",
                    children: [
                        {
                            id: "2-1",
                            label: "菜单2-1",
                        },
                        {
                            id: "2-2",
                            label: "菜单2-2",
                        },
                    ],
                },
            ]
        */
        options: {
            type: Array,
            required: true,
        },
        /*
        event target
        contextmenu event will register on it
        */
        eventTarget: {
            type: [String, HTMLElement],
            required: true,
        },
    },
    data() {
        return {
            /* 
            internal options:
            [
                {
                    id: 1,
                    deep: 0,
                    hasChildren: false,
                    label: "菜单1",
                },
                {
                    id: 2,
                    label: "菜单2",
                    deep: 0,
                    hasChildren: true,
                    children: [
                        {
                            id: "2-1",
                            deep: 1,
                            hasChildren: false,
                            label: "菜单2-1",
                        },
                        {
                            id: "2-2",
                            deep: 1,
                            hasChildren: false,
                            label: "菜单2-2",
                        },
                    ],
                },
            ]
            */
            internalOptions: [],

            /*
            panels option
            {
                    id: 1,
                    menus: [
                        {
                            id: "",
                            deep: 0,
                            label: "菜单1",
                            hasChildren: true,
                        },
                        {
                            id: "",
                            deep: 0,
                            label: "菜单2",
                        },
                    ],
                },
                {
                    id: 2,
                    menus: [
                        {
                            id: "",
                            deep: 1,
                            label: "菜单1",
                            hasChildren: true,
                        },
                        {
                            id: "",
                            deep: 1,
                            label: "菜单2",
                        },
                    ],
                },
            */
            panelOptions: [],
            // event target element
            eventTargetEl: "",
            // root contextmenu id
            rootContextmenuId: "",
            /*
            is children panels clicked
            如果点击了则不关闭 panels
            */
            isChildrenPanelsClicked: false,
            /*
            is panel right direction
            决定了子 panel 默认展示方向
            */
            isPanelRightDirection: true,
            /*
            is panels remove
            防止hover后菜单被移除，仍然显示子集菜单的问题
            */
            isPanelsEmptyed: true,
        };
    },

    computed: {
        // active menus ids
        activeMenuIds() {
            const { panelOptions } = this;

            return panelOptions.map((x) => x.parentId);
        },
    },

    watch: {
        options: {
            handler: function (val) {
                if (Array.isArray(val) && val.length > 0) {
                    /* 
                    如果配置项修改,则重新销毁并创建
                    */
                    this.removeOrEmptyPanels(true);
                    this.rootContextmenuId = this.getRandomIdWithPrefix();
                    this.createInternalOptions();
                    this.createPanelOptions({ options: this.internalOptions });
                    this.resetContextmenu();
                    this.addRootContextmenuPanelToBody();
                }
            },
            immediate: true,
        },
        eventTarget: {
            handler: function (val) {
                if (val) {
                    this.registerContextmenuEvent();
                }
            },
            immediate: true,
        },
    },

    methods: {
        // get random id
        getRandomIdWithPrefix() {
            return clsName(getRandomId());
        },

        // has children
        hasChildren(option) {
            return Array.isArray(option.children) && option.children.length;
        },

        /*
        get panel option by menu id
        */
        getPanelOptionByMenuId(options, menuId) {
            for (let i = 0; i < options.length; i++) {
                if (options[i].id === menuId) {
                    return options[i].children;
                }

                if (options[i].children) {
                    const panelOption = this.getPanelOptionByMenuId(
                        options[i].children,
                        menuId,
                    );
                    if (panelOption) return panelOption;
                }
            }
        },

        // get parent contextmenu panel element
        getParentContextmenuPanelEl(contextmenuPanelId) {
            let result;

            const { panelOptions } = this;

            const panelIndex = panelOptions.findIndex(
                (x) => x.parentId === contextmenuPanelId,
            );
            if (panelIndex > 0) {
                // preview panel's panelId
                const parentPanelId = panelOptions[panelIndex - 1].parentId;
                result = document.querySelector(`#${parentPanelId}`);
            }
            return result;
        },

        // create panel by hover
        createPanelByHover({ event, menu }) {
            const { internalOptions, panelOptions } = this;

            // 如果被移除则不创建
            if (this.isPanelsEmptyed) {
                return false;
            }

            // has already exists
            if (panelOptions.findIndex((x) => x.parentId === menu.id) > -1) {
                return false;
            }

            /*
            移除 panel 深度大于等于当前悬浮菜单的。从后往前删除
            remove panels
            */
            const deletePanelDeeps = panelOptions
                .filter((x) => x.parentDeep >= menu.deep)
                .map((x) => x.parentDeep)
                .reverse();

            if (deletePanelDeeps.length) {
                for (let i = deletePanelDeeps.length - 1; i >= 0; i--) {
                    const delIndex = panelOptions.findIndex(
                        (x) => x.parentDeep === deletePanelDeeps[i],
                    );
                    if (delIndex > -1) {
                        this.panelOptions.splice(delIndex, 1);
                    }
                }
            }

            const panelOption = this.getPanelOptionByMenuId(
                internalOptions,
                menu.id,
            );

            if (panelOption) {
                this.createPanelOptions({
                    options: panelOption,
                    currentMenu: menu,
                });

                this.$nextTick(() => {
                    this.addContextmenuPanelToBody({
                        contextmenuId: menu.id,
                    });

                    this.showContextmenuPanel({
                        event,
                        contextmenuId: menu.id,
                    });
                });
            }
        },

        // create panels option
        createPanelOptions({ options, currentMenu }) {
            const { hasChildren, rootContextmenuId } = this;

            if (Array.isArray(options)) {
                //
                let menus = options.map((option) => {
                    return {
                        hasChildren: hasChildren(option),
                        ...option,
                    };
                });

                this.panelOptions.push({
                    parentId: currentMenu ? currentMenu.id : rootContextmenuId,
                    parentDeep: currentMenu
                        ? currentMenu.deep
                        : INIT_DATA.PARENT_DEEP,
                    menus: menus,
                });
            }
        },

        // create internal options recursion
        createInternalOptionsRecursion(options, deep = 0) {
            options.id = this.getRandomIdWithPrefix();
            options.deep = deep;
            deep++;
            if (Array.isArray(options.children)) {
                options.children.map((option) => {
                    return this.createInternalOptionsRecursion(option, deep);
                });
            }

            return options;
        },

        // create internal options
        createInternalOptions() {
            this.internalOptions = cloneDeep(this.options).map((option) => {
                return this.createInternalOptionsRecursion(option);
            });
        },

        // show root contextmenu panel
        showRootContextmenuPanel(event) {
            event.preventDefault();
            const { rootContextmenuId } = this;

            if (rootContextmenuId) {
                // refresh contextmenu
                this.resetContextmenu();
                this.showContextmenuPanel({
                    event,
                    contextmenuId: rootContextmenuId,
                    isRootContextmenu: true,
                });
                this.isPanelsEmptyed = false;
            }
        },

        // show contextmenu panel
        showContextmenuPanel({ event, contextmenuId, isRootContextmenu }) {
            const { getParentContextmenuPanelEl } = this;

            let contextmenuPanelEl = document.querySelector(
                `#${contextmenuId}`,
            );

            if (contextmenuPanelEl) {
                // remove first
                contextmenuPanelEl.innerHTML = "";

                contextmenuPanelEl.appendChild(this.$refs[contextmenuId]);

                contextmenuPanelEl.style.position = "absolute";
                contextmenuPanelEl.classList.add(clsName("popper"));

                const { width: currentPanelWidth, height: currentPanelHeight } =
                    contextmenuPanelEl.getBoundingClientRect();
                if (isRootContextmenu) {
                    const {
                        left: clickLeft,
                        top: clickTop,
                        right: clickRight,
                        bottom: clickBottom,
                    } = getMousePosition(event);

                    let panelX = 0;
                    let panelY = 0;

                    // 右方宽度够显示
                    if (clickRight >= currentPanelWidth) {
                        panelX = clickLeft;
                        this.isPanelRightDirection = true;
                    }
                    // 右方宽度不够显示在鼠标点击左方
                    else {
                        panelX = clickLeft - currentPanelWidth;
                        this.isPanelRightDirection = false;
                    }

                    // 下方高度够显示
                    if (clickBottom >= currentPanelHeight) {
                        panelY = clickTop;
                    }
                    // 下方高度不够显示在鼠标点击上方
                    else {
                        panelY = clickTop - currentPanelHeight;
                    }

                    contextmenuPanelEl.style.left = panelX + "px";
                    contextmenuPanelEl.style.top = panelY + "px";
                } else {
                    const parentContextmenuPanelEl =
                        getParentContextmenuPanelEl(contextmenuId);

                    if (parentContextmenuPanelEl) {
                        const {
                            left: parentPanelLeft,
                            right: parentPanelRight,
                        } = getViewportOffset(parentContextmenuPanelEl);

                        const { top: clickTop, bottom: clickBottom } =
                            getMousePosition(event);

                        const { width: parentPanelWidth } =
                            parentContextmenuPanelEl.getBoundingClientRect();

                        let panelX = 0;
                        let panelY = 0;

                        // 如果默认展示在右方向
                        if (this.isPanelRightDirection) {
                            // 右方宽度够显示
                            if (parentPanelRight >= currentPanelWidth) {
                                panelX = parentPanelLeft + parentPanelWidth;
                            }
                            // 右方宽度不够显示在鼠标点击左方
                            else {
                                panelX = parentPanelLeft - parentPanelWidth;
                            }
                        }
                        // 如果默认展示在左方向
                        else {
                            // 左方宽度够显示
                            if (parentPanelLeft >= currentPanelWidth) {
                                panelX = parentPanelLeft - parentPanelWidth;
                            }
                            // 左方宽度不够显示在鼠标点击右方
                            else {
                                panelX = parentPanelLeft + parentPanelWidth;
                            }
                        }

                        // 下方高度够显示
                        if (clickBottom >= currentPanelHeight) {
                            panelY = clickTop;
                        }
                        // 下方高度不够显示在鼠标点击上方
                        else {
                            panelY = clickTop - currentPanelHeight;
                        }

                        contextmenuPanelEl.style.left = panelX + "px";
                        contextmenuPanelEl.style.top = panelY + "px";
                    }
                }
            }
        },

        // empty contextmenu panels
        emptyContextmenuPanels() {
            this.isPanelsEmptyed = true;

            /*
            wait for children panel clicked by setTimeout
            如果点击的是非 root panel 不关闭
            */
            setTimeout(() => {
                if (this.isChildrenPanelsClicked) {
                    this.isChildrenPanelsClicked = false;
                } else {
                    this.removeOrEmptyPanels();
                }
            });
        },

        // remove or empty panels
        removeOrEmptyPanels(isRemove) {
            const { panelOptions } = this;

            panelOptions.forEach((panelOption) => {
                let contextmenuPanelEl = document.querySelector(
                    `#${panelOption.parentId}`,
                );
                if (contextmenuPanelEl) {
                    if (isRemove) {
                        contextmenuPanelEl.remove();
                    } else {
                        contextmenuPanelEl.innerHTML = "";
                    }
                }
            });
        },

        // reset contextmeny
        resetContextmenu() {
            this.panelOptions = [];
            this.createPanelOptions({ options: this.internalOptions });
        },

        // add context menu panel to body
        addContextmenuPanelToBody({ contextmenuId }) {
            let contextmenuPanelEl = document.querySelector(
                `#${contextmenuId}`,
            );

            if (contextmenuPanelEl) {
                return false;
            } else {
                let containerEl = document.createElement("div");

                containerEl.setAttribute("id", contextmenuId);

                document.body.appendChild(containerEl);
            }
        },

        // add root contextmenu panel to body
        addRootContextmenuPanelToBody() {
            if (this.rootContextmenuId) {
                this.addContextmenuPanelToBody({
                    contextmenuId: this.rootContextmenuId,
                });
            }
        },

        // register contextmenu event
        registerContextmenuEvent() {
            const { eventTarget } = this;

            if (typeof eventTarget === "string" && eventTarget.length > 0) {
                this.eventTargetEl = document.querySelector(eventTarget);
            } else {
                this.eventTargetEl = eventTarget;
            }

            if (this.eventTargetEl) {
                // contextmenu is on the current element
                this.eventTargetEl.addEventListener(
                    "contextmenu",
                    this.showRootContextmenuPanel,
                );
            }
        },

        // un register contextmen event
        removeContextmenuEvent() {
            if (this.eventTargetEl) {
                this.eventTargetEl.removeEventListener(
                    "contextmenu",
                    this.showRootContextmenuPanel,
                );
            }
        },
    },

    created() {
        // bug fixed #467
        this.debounceCreatePanelByHover = debounce(
            this.createPanelByHover,
            300,
        );
    },

    mounted() {
        this.addRootContextmenuPanelToBody();
    },

    destroyed() {
        this.removeContextmenuEvent();
        this.removeOrEmptyPanels(true);
    },

    render() {
        const {
            panelOptions,
            activeMenuIds,
            hasChildren,
            emptyContextmenuPanels,
            debounceCreatePanelByHover,
        } = this;

        const contextmenuProps = {
            class: ["ve-contextmenu"],
            style: {
                display: "none",
            },
        };

        return (
            <div {...contextmenuProps}>
                {panelOptions.map((panelOption, panelIndex) => {
                    const contextmenuPanelProps = {
                        ref: panelOption.parentId,
                        class: {
                            [clsName("panel")]: true,
                        },
                        directives: [
                            {
                                name: "click-outside",
                                value: () => {
                                    // only for root panel
                                    if (panelIndex === 0) {
                                        emptyContextmenuPanels();
                                    }
                                },
                            },
                        ],
                        on: {
                            click: () => {
                                if (panelIndex !== 0) {
                                    this.isChildrenPanelsClicked = true;
                                }
                            },
                        },
                    };
                    return (
                        <div {...contextmenuPanelProps}>
                            <ul class={clsName("list")}>
                                {panelOption.menus.map((menu) => {
                                    let contextmenuNodeProps;

                                    if (
                                        menu.type !==
                                        CONTEXTMENU_TYPES.SEPARATOR
                                    ) {
                                        contextmenuNodeProps = {
                                            class: {
                                                [clsName("node")]: true,
                                                [clsName("node-active")]:
                                                    activeMenuIds.includes(
                                                        menu.id,
                                                    ),
                                                [clsName("node-disabled")]:
                                                    menu.disabled,
                                            },
                                            on: {
                                                mouseover: (event) => {
                                                    // disable
                                                    if (!menu.disabled) {
                                                        debounceCreatePanelByHover(
                                                            {
                                                                event,
                                                                menu,
                                                            },
                                                        );
                                                    }
                                                },
                                                click: () => {
                                                    if (
                                                        !menu.disabled &&
                                                        !hasChildren(menu)
                                                    ) {
                                                        this.$emit(
                                                            EMIT_EVENTS.ON_NODE_CLICK,
                                                            menu.type,
                                                        );
                                                        setTimeout(() => {
                                                            emptyContextmenuPanels();
                                                        }, 50);
                                                    }
                                                },
                                            },
                                        };
                                    }
                                    // separator
                                    else {
                                        //
                                        contextmenuNodeProps = {
                                            class: {
                                                [clsName(
                                                    "node-separator",
                                                )]: true,
                                            },
                                        };
                                    }

                                    if (
                                        menu.type !==
                                        CONTEXTMENU_TYPES.SEPARATOR
                                    ) {
                                        return (
                                            <li {...contextmenuNodeProps}>
                                                <span
                                                    class={clsName(
                                                        "node-label",
                                                    )}
                                                >
                                                    {menu.label}
                                                </span>
                                                {menu.hasChildren && (
                                                    <VeIcon
                                                        class={clsName(
                                                            "node-icon-postfix",
                                                        )}
                                                        name={
                                                            ICON_NAMES.RIGHT_ARROW
                                                        }
                                                    />
                                                )}
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li {...contextmenuNodeProps}></li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    },
};
