import { COMPS_NAME } from "./util/constant";
import { clsName } from "./util/index";
import VeIcon from "vue-easytable/packages/ve-icon";
import { ICON_NAMES } from "../../src/utils/constant";
import { getRandomId } from "../../src/utils/random";

export default {
    name: COMPS_NAME.VE_CONTEXTMENU,
    props: {},
    data() {
        return {
            options: [
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
                {
                    id: 3,
                    label: "菜单3",
                },
                {
                    id: 4,
                    label: "菜单4",
                    children: [
                        {
                            id: "4-1",
                            label: "菜单4-1",
                            children: [
                                {
                                    id: "4-1-1",
                                    label: "菜单4-1-1",
                                },
                                {
                                    id: "4-2-2",
                                    label: "菜单4-2-2",
                                },
                            ],
                        },
                        {
                            id: "4-2",
                            label: "菜单4-2",
                        },
                    ],
                },
            ],
            internalOptions: [
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
                {
                    id: 3,
                    label: "菜单3",
                },
                {
                    id: 4,
                    label: "菜单4",
                    children: [
                        {
                            id: "4-1",
                            label: "菜单4-1",
                            children: [
                                {
                                    id: "4-1-1",
                                    label: "菜单4-1-1",
                                },
                                {
                                    id: "4-2-2",
                                    label: "菜单4-2-2",
                                },
                            ],
                        },
                        {
                            id: "4-2",
                            label: "菜单4-2",
                        },
                    ],
                },
            ],
            // panels option
            panelOptions: [
                // {
                //     id: 1,
                //     menus: [],
                // },
                // {
                //     id: 2,
                //     menus: [],
                // },
                // [
                //     {
                //         label: "菜单1",
                //         hasChildren: true,
                //     },
                //     {
                //         label: "菜单2",
                //     },
                //     {
                //         label: "菜单3",
                //     },
                //     {
                //         label: "菜单4",
                //     },
                // ],
                // [
                //     {
                //         label: "菜单1-1",
                //     },
                //     {
                //         label: "菜单2",
                //         hasChildren: true,
                //     },
                //     {
                //         label: "菜单3",
                //     },
                //     {
                //         label: "菜单4",
                //     },
                // ],
            ],
        };
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
        createPanelByHover({ panelIndex, menu }) {
            const { options, panelOptions } = this;

            // has already exists
            if (panelOptions.findIndex((x) => x.parentId === menu.id) > -1) {
                return false;
            }

            const panelOption = this.getPanelOptionByMenuId(options, menu.id);
            this.createPanelOptions({
                options: panelOption,
                parentId: menu.id,
            });
            console.log("panelOption::", panelOption);
        },

        // create panels option
        createPanelOptions({ options, parentId = 0 }) {
            const { hasChildren } = this;

            if (Array.isArray(options)) {
                //
                let menus = options.map((option) => {
                    return {
                        id: option.id,
                        label: option.label,
                        hasChildren: hasChildren(option),
                        children: option.children,
                    };
                });

                this.panelOptions.push({
                    parentId: parentId,
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

    created() {
        this.createInternalOptions();
        this.createPanelOptions({ options: this.options });
    },

    render() {
        const { panelOptions } = this;
        return (
            <div class="ve-contextmenu">
                {panelOptions.map((panelOption, panelIndex) => {
                    return (
                        <div class="ve-contextmenu-panel">
                            <ul class="ve-contextmenu-list">
                                {panelOption.menus.map((menu) => {
                                    const contextmenuNodeProps = {
                                        on: {
                                            mouseover: () => {
                                                this.createPanelByHover({
                                                    panelIndex,
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
