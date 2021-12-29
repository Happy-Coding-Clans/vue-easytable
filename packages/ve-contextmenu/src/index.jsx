import { COMPS_NAME } from "./util/constant";
import { clsName } from "./util/index";
import VeIcon from "vue-easytable/packages/ve-icon";
import { ICON_NAMES } from "../../src/utils/constant";
import { INIT_DATA } from "./util/constant";
import { getRandomId } from "../../src/utils/random";
import { debounce } from "lodash";

export default {
    name: COMPS_NAME.VE_CONTEXTMENU,
    props: {
        /*
         options(contextmenu)
            [
                {
                    
                    id: 1,
                    label: "菜单1",
                    disbaled:true
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
        }, 500),

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
        const { panelOptions, activeMenuIds } = this;
        return (
            <div class="ve-contextmenu">
                {panelOptions.map((panelOption) => {
                    return (
                        <div class={clsName("panel")}>
                            <ul class={clsName("list")}>
                                {panelOption.menus.map((menu) => {
                                    const contextmenuNodeProps = {
                                        class: {
                                            [clsName("node")]: true,
                                            [clsName("node-active")]:
                                                activeMenuIds.includes(menu.id),
                                            [clsName("node-disabled")]:
                                                menu.disbaled,
                                        },
                                        on: {
                                            mouseover: () => {
                                                this.createPanelByHover({
                                                    menu,
                                                });
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
                                                        "node-postfix",
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
