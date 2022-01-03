import { COMPS_NAME } from "./util/constant";
import { clsName } from "./util/index";
import VeIcon from "vue-easytable/packages/ve-icon";
import { ICON_NAMES } from "../../src/utils/constant";
import { INIT_DATA } from "./util/constant";
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
            type: [Object, String],
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
            handler: function () {
                this.rootContextmenuId = this.getRandomIdWithPrefix();
                this.createInternalOptions();
                this.createPanelOptions({ options: this.internalOptions });
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
        createPanelByHover: debounce(function ({ event, menu }) {
            const { internalOptions, panelOptions } = this;

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
        }, 350),

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

            // refresh contextmenu
            this.resetContextmenu();
            this.showContextmenuPanel({
                event,
                contextmenuId: rootContextmenuId,
                isRootContextmenu: true,
            });
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

                if (isRootContextmenu) {
                    contextmenuPanelEl.style.left = event.clientX + "px";
                } else {
                    const parentContextmenuPanelEl =
                        getParentContextmenuPanelEl(contextmenuId);

                    if (parentContextmenuPanelEl) {
                        const { left, width } =
                            parentContextmenuPanelEl.getBoundingClientRect();

                        console.log(
                            "parentContextmenuPanelEl.getBoundingClientRect()::",
                            parentContextmenuPanelEl.getBoundingClientRect(),
                        );

                        contextmenuPanelEl.style.left = left + width + "px";
                    }
                }
                contextmenuPanelEl.style.top = event.clientY + "px";
                console.log("event.clientY::", event.clientY);
            }
        },

        // remove contextmenu panels
        removeContextmenuPanels() {
            const { panelOptions } = this;

            /*
            wait for children panel clicked by setTimeout
            如果点击的是非 root panel 不关闭
            */
            setTimeout(() => {
                if (this.isChildrenPanelsClicked) {
                    this.isChildrenPanelsClicked = false;
                } else {
                    panelOptions.forEach((panelOption) => {
                        let contextmenuPanelEl = document.querySelector(
                            `#${panelOption.parentId}`,
                        );
                        if (contextmenuPanelEl) {
                            contextmenuPanelEl.innerHTML = "";
                        }
                    });
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
            this.addContextmenuPanelToBody({
                contextmenuId: this.rootContextmenuId,
            });
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

    mounted() {
        this.addRootContextmenuPanelToBody();
        this.registerContextmenuEvent();
    },

    destroyed() {
        this.removeContextmenuEvent();
    },

    render() {
        const { panelOptions, activeMenuIds } = this;

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
                        /*  attrs: {
                            id: panelOption.parentId,
                        }, */
                        class: {
                            [clsName("panel")]: true,
                        },
                        directives: [
                            {
                                name: "click-outside",
                                value: () => {
                                    // only for root panel
                                    if (panelIndex === 0) {
                                        this.removeContextmenuPanels();
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
                                    const contextmenuNodeProps = {
                                        class: {
                                            [clsName("node")]: true,
                                            [clsName("node-active")]:
                                                activeMenuIds.includes(menu.id),
                                            [clsName("node-disabled")]:
                                                menu.disabled,
                                        },
                                        on: {
                                            mouseover: (event) => {
                                                if (!menu.disabled) {
                                                    this.createPanelByHover({
                                                        event,
                                                        menu,
                                                    });
                                                }
                                            },
                                        },
                                    };

                                    return (
                                        <li {...contextmenuNodeProps}>
                                            <span class={clsName("node-label")}>
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
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    },
};
