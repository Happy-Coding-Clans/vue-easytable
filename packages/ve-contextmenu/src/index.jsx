import { COMPS_NAME } from "./util/constant";
import { clsName } from "./util/index";
import VeIcon from "vue-easytable/packages/ve-icon";
import { ICON_NAMES } from "../../src/utils/constant";

export default {
    name: COMPS_NAME.VE_CONTEXTMENU,
    props: {},
    data() {
        return {
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
            // panels
            panelsOption: [
                [
                    {
                        label: "菜单1",
                        hasChildren: true,
                    },
                    {
                        label: "菜单2",
                    },
                    {
                        label: "菜单3",
                    },
                    {
                        label: "菜单4",
                    },
                ],
                [
                    {
                        label: "菜单1-1",
                    },
                    {
                        label: "菜单2",
                        hasChildren: true,
                    },
                    {
                        label: "菜单3",
                    },
                    {
                        label: "菜单4",
                    },
                ],
            ],
        };
    },

    methods: {
        // has children
        hasChildren(option) {
            return Array.isArray(option.children) && option.children.length;
        },

        // init panels
        initPanels() {
            let result = [];

            let panelOption = [];

            const { options } = this;

            if (Array.isArray(options.children) && options.children.length) {
                //
            }
        },
    },

    created() {
        //this.initPanels();
    },

    render() {
        const { panelsOption, hasChildren } = this;
        return (
            <div class="ve-contextmenu">
                {panelsOption.map((menus) => {
                    return (
                        <div class="ve-contextmenu-panel">
                            <ul class="ve-contextmenu-list">
                                {menus.map((menu) => {
                                    return (
                                        <li class="ve-contextmenu-node">
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

                <div class="ve-contextmenu-panel">
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
                <div class="ve-contextmenu-panel">
                    <ul class="ve-contextmenu-list">
                        <li class="ve-contextmenu-node">
                            <span class="ve-contextmenu-node-label">
                                dasdas
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
                        </li>
                    </ul>
                </div>
            </div>
        );
    },
};
