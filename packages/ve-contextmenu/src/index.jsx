import { COMPS_NAME, INSTANCE_METHODS } from "./util/constant";
import { clsName } from "./util/index";
import VeIcon from "vue-easytable/packages/ve-icon";
import { ICON_NAMES } from "../../src/utils/constant";
import { INIT_DATA } from "./util/constant";
import { getRandomId } from "../../src/utils/random";
import { debounce, cloneDeep } from "lodash";

export default {
    name: COMPS_NAME.VE_CONTEXTMENU,
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
            // contextmenu id
            contextmenuId: "",
            // contextmenu ref
            contextmenuRef: "contextmenuRef",
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
                this.createInternalOptions();
                this.createPanelOptions({ options: this.internalOptions });
            },
            immediate: true,
        },
    },

    methods: {
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

        // create panel by hover
        createPanelByHover: debounce(function ({ menu }) {
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
            }
        }, 350),

        // create panels option
        createPanelOptions({ options, currentMenu }) {
            const { hasChildren } = this;

            if (Array.isArray(options)) {
                //
                let menus = options.map((option) => {
                    return {
                        hasChildren: hasChildren(option),
                        ...option,
                    };
                });

                this.panelOptions.push({
                    parentId: currentMenu
                        ? currentMenu.id
                        : INIT_DATA.PARENT_ID,
                    parentDeep: currentMenu
                        ? currentMenu.deep
                        : INIT_DATA.PARENT_DEEP,
                    menus: menus,
                });
            }
        },

        // create internal options recursion
        createInternalOptionsRecursion(options, deep = 0) {
            options.id = getRandomId();
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

        // show contextmenu panel
        showContextmenuPanel(event) {
            event.preventDefault();
            const { contextmenuId, contextmenuRef } = this;

            let contextmenuContainerEl = document.querySelector(
                `#${contextmenuId}`,
            );

            if (contextmenuContainerEl) {
                // refresh contextmenu
                this.resetContextmenu();

                // has already exists need remove
                contextmenuContainerEl.innerHTML = "";

                contextmenuContainerEl.appendChild(this.$refs[contextmenuRef]);

                contextmenuContainerEl.style.position = "absolute";
                contextmenuContainerEl.classList.add(clsName("popper"));
                contextmenuContainerEl.style.left = event.clientX + "px";
                contextmenuContainerEl.style.top = event.clientY + "px";
            }
        },

        // reset contextmeny
        resetContextmenu() {
            this.panelOptions = [];
            this.createPanelOptions({ options: this.internalOptions });
        },

        // add contextmenu to body
        addContextmenuToBody() {
            this.contextmenuId = clsName(getRandomId());

            let containerEl = document.createElement("div");

            containerEl.setAttribute("id", this.contextmenuId);

            document.body.appendChild(containerEl);
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
                this.eventTargetEl.addEventListener("contextmenu", (event) => {
                    // contextmenu is in on the current element
                    this.showContextmenuPanel(event);
                });
            }
        },

        // un register contextmen event
        removeContextmenuEvent() {
            if (this.eventTargetEl) {
                // 需要补充完整
                this.eventTargetEl.removeEventListener("contextmenu", () => {});
            }
        },
    },

    mounted() {
        this.addContextmenuToBody();
        this.registerContextmenuEvent();
    },

    destroyed() {},

    render() {
        const { panelOptions, activeMenuIds, contextmenuRef } = this;

        const contextmenuProps = {
            ref: contextmenuRef,
            class: ["ve-contextmenu"],
        };

        return (
            <div style={{ display: "none" }}>
                <div {...contextmenuProps}>
                    {panelOptions.map((panelOption) => {
                        return (
                            <div class={clsName("panel")}>
                                <ul class={clsName("list")}>
                                    {panelOption.menus.map((menu) => {
                                        const contextmenuNodeProps = {
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
                                                mouseover: () => {
                                                    if (!menu.disabled) {
                                                        this.createPanelByHover(
                                                            {
                                                                menu,
                                                            },
                                                        );
                                                    }
                                                },
                                            },
                                        };

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
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
};
