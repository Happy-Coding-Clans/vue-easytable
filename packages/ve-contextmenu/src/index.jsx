import { COMPS_NAME } from "./util/constant";
import { clsName } from "./util/index";
import VeIcon from "vue-easytable/packages/ve-icon";
import { ICON_NAMES } from "../../src/utils/constant";
import { INIT_DATA } from "./util/constant";
import { getRandomId } from "../../src/utils/random";

export default {
    name: COMPS_NAME.VE_CONTEXTMENU,
    props: {},
    data() {
        return {
            /* 
            options

            [
                {
                    id: 1,
                    label: "菜单1",
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
            options: [
                {
                    label: "菜单1",
                },
                {
                    label: "菜单2",
                    children: [
                        {
                            label: "菜单2-1",
                        },
                        {
                            label: "菜单2-2",
                        },
                    ],
                },
                {
                    label: "菜单3",
                },
                {
                    label: "菜单4",
                    children: [
                        {
                            label: "菜单4-1",
                            children: [
                                {
                                    label: "菜单4-1-1",
                                },
                                {
                                    label: "菜单4-2-2",
                                },
                            ],
                        },
                        {
                            label: "菜单4-2",
                        },
                    ],
                },
            ],
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

            // {
                //     id: 1,
                //     menus: [
                //         {
                //             id: "",
                //             deep: 0,
                //             label: "菜单1",
                //             hasChildren: true,
                //         },
                //         {
                //             id: "",
                //             deep: 0,
                //             label: "菜单2",
                //         },
                //     ],
                // },
                // {
                //     id: 2,
                //     menus: [
                //         {
                //             id: "",
                //             deep: 1,
                //             label: "菜单1",
                //             hasChildren: true,
                //         },
                //         {
                //             id: "",
                //             deep: 1,
                //             label: "菜单2",
                //         },
                //     ],
                // },
            */
            panelOptions: [],
        };
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
        0 is root id
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
        createPanelByHover({ menu }) {
            const { internalOptions, panelOptions } = this;

            // has already exists
            if (panelOptions.findIndex((x) => x.parentId === menu.id) > -1) {
                return false;
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
            } else {
                // remove current panel
                const panelIndex = panelOptions.findIndex(
                    (x) => x.parentDeep === menu.deep,
                );

                if (panelIndex > -1) {
                    panelOptions.splice(panelIndex, 1);
                }
            }

            console.log("panelOption::", panelOption);
        },

        // create panels option
        createPanelOptions({ options, currentMenu }) {
            const { hasChildren } = this;

            if (Array.isArray(options)) {
                //
                let menus = options.map((option) => {
                    return {
                        id: option.id,
                        deep: option.deep,
                        label: option.label,
                        hasChildren: hasChildren(option),
                        children: option.children,
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
            this.internalOptions = this.options.map((option) => {
                return this.createInternalOptionsRecursion(option);
            });
        },
    },

    render() {
        const { panelOptions } = this;
        return (
            <div class="ve-contextmenu">
                {panelOptions.map((panelOption) => {
                    return (
                        <div class="ve-contextmenu-panel">
                            <ul class="ve-contextmenu-list">
                                {panelOption.menus.map((menu) => {
                                    const contextmenuNodeProps = {
                                        on: {
                                            mouseover: () => {
                                                this.createPanelByHover({
                                                    menu,
                                                });
                                            },
                                        },
                                    };

                                    return (
                                        <li
                                            {...contextmenuNodeProps}
                                            class="ve-contextmenu-node"
                                        >
                                            <span class="ve-contextmenu-node-label">
                                                {menu.label}
                                            </span>
                                            {menu.hasChildren && (
                                                <VeIcon
                                                    class="ve-contextmenu-node-postfix"
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

                {/* <div class="ve-contextmenu-panel">
                    <ul class="ve-contextmenu-list">
                        <li class="ve-contextmenu-node">
                            <span class="ve-contextmenu-node-label">
                                测试这是一个长文本会什么情况文本会什么情况
                            </span>
                            <VeIcon
                                class="ve-contextmenu-node-postfix"
                                name={ICON_NAMES.RIGHT_ARROW}
                            />
                        </li>
                        <li class="ve-contextmenu-node">
                            <span class="ve-contextmenu-node-label">
                                dasdas
                            </span>
                            <VeIcon
                                class="ve-contextmenu-node-postfix"
                                name={ICON_NAMES.RIGHT_ARROW}
                            />
                        </li>
                    </ul>
                </div>
               */}
            </div>
        );
    },
};
