const emptyLayout = () => import("@/comp/layout/empty-layout.vue");

const config = [
    {
        path: "intro",
        component: () => import("@/docs/zh/intro.md"),
        name: "简介",
        meta: { keepAlive: true },
    },
    {
        path: "start",
        component: () => import("@/docs/zh/start.md"),
        name: "快速开始",
        meta: { keepAlive: true },
    },
    {
        path: "theme",
        component: () => import("@/docs/zh/theme.md"),
        name: "主题定制",
        meta: { keepAlive: true },
    },
    {
        path: "locale",
        component: () => import("@/docs/zh/locale.md"),
        name: "国际化",
        meta: { keepAlive: true },
    },
    {
        path: "qa",
        component: () => import("@/docs/zh/QA.md"),
        name: "常见问题",
        meta: { keepAlive: true },
    },
    {
        path: "base",
        name: "基础组件",
        component: emptyLayout,
        children: [
            {
                path: "loading",
                component: () => import("@/docs/zh/ve-loading/main.vue"),
                name: "Loading 加载",
            },
            {
                path: "locale",
                component: () => import("@/docs/zh/ve-locale/main.vue"),
                name: "Locale 国际化",
                meta: { keepAlive: true },
            },
            {
                path: "icon",
                component: () => import("@/docs/zh/ve-icon/main.vue"),
                name: "Icon 图标",
                meta: { keepAlive: true },
            },
            {
                path: "pagination",
                component: () => import("@/docs/zh/ve-pagination/main.vue"),
                name: "Pagination 分页",
                meta: { keepAlive: true },
            },
            {
                path: "contextmenu",
                component: () => import("@/docs/zh/ve-contextmenu/main.vue"),
                name: "Contextmenu 右键菜单",
                meta: { keepAlive: true },
            },
        ],
    },
    {
        path: "table",
        name: "Table 组件",
        component: emptyLayout,
        children: [
            /*  {
                path: "test",
                component: () => import("@/docs/zh/ve-table/test/main.vue"),
                name: "性能测试",
                meta: { keepAlive: true }
            }, */
            {
                path: "usage",
                component: () => import("@/docs/zh/ve-table/usage/main.md"),
                name: "用法",
                meta: { keepAlive: true },
            },
            {
                path: "table-width",
                component: () =>
                    import("@/docs/zh/ve-table/table-width/main.vue"),
                name: "表格宽度",
                meta: { keepAlive: true },
            },
            {
                path: "table-height",
                component: () =>
                    import("@/docs/zh/ve-table/table-height/main.vue"),
                name: "表格高度",
                meta: { keepAlive: true },
            },
            {
                path: "border",
                component: () => import("@/docs/zh/ve-table/border/main.vue"),
                name: "边框",
                meta: { keepAlive: true },
            },
            {
                path: "column-width",
                component: () =>
                    import("@/docs/zh/ve-table/column-width/main.vue"),
                name: "列宽设置",
                meta: { keepAlive: true },
            },
            {
                path: "column-fixed",
                component: () =>
                    import("@/docs/zh/ve-table/column-fixed/main.vue"),
                name: "列固定",
                meta: { keepAlive: true },
            },
            {
                path: "column-hidden",
                component: () =>
                    import("@/docs/zh/ve-table/column-hidden/main.vue"),
                name: "列隐藏",
                meta: { keepAlive: true },
            },
            {
                path: "header-fixed",
                component: () =>
                    import("@/docs/zh/ve-table/header-fixed/main.vue"),
                name: "表头固定",
                meta: { keepAlive: true },
            },
            {
                path: "header-grouping",
                component: () =>
                    import("@/docs/zh/ve-table/header-grouping/main.vue"),
                name: "表头分组",
                meta: { keepAlive: true },
            },
            {
                path: "header-filter",
                component: () =>
                    import("@/docs/zh/ve-table/header-filter/main.vue"),
                name: "筛选",
                meta: { keepAlive: true },
            },
            {
                path: "header-filter-custom",
                component: () =>
                    import("@/docs/zh/ve-table/header-filter-custom/main.vue"),
                name: "筛选自定义",
                meta: { keepAlive: true },
            },
            {
                path: "header-sort",
                component: () =>
                    import("@/docs/zh/ve-table/header-sort/main.vue"),
                name: "排序",
                meta: { keepAlive: true },
            },
            {
                path: "cell-align",
                component: () =>
                    import("@/docs/zh/ve-table/cell-align/main.vue"),
                name: "单元格对齐",
                meta: { keepAlive: true },
            },
            {
                path: "cell-style",
                component: () =>
                    import("@/docs/zh/ve-table/cell-style/main.vue"),
                name: "单元格样式",
                meta: { keepAlive: true },
            },
            {
                path: "cell-custom",
                component: () =>
                    import("@/docs/zh/ve-table/cell-custom/main.vue"),
                name: "单元格自定义",
                meta: { keepAlive: true },
            },
            {
                path: "cell-span",
                component: () =>
                    import("@/docs/zh/ve-table/cell-span/main.vue"),
                name: "单元格合并",
                meta: { keepAlive: true },
            },
            {
                path: "operation-column",
                component: () =>
                    import("@/docs/zh/ve-table/operation-column/main.vue"),
                name: "操作列",
                meta: { keepAlive: true },
            },
            {
                path: "cell-selection",
                component: () =>
                    import("@/docs/zh/ve-table/cell-selection/main.vue"),
                name: "单元格选择",
                meta: { keepAlive: true },
            },
            {
                path: "cell-autofill",
                component: () =>
                    import("@/docs/zh/ve-table/cell-autofill/main.vue"),
                name: "单元格自动填充",
                meta: { keepAlive: true },
            },
            {
                path: "cell-edit",
                component: () =>
                    import("@/docs/zh/ve-table/cell-edit/main.vue"),
                name: "单元格编辑",
                meta: { keepAlive: true },
            },
            {
                path: "clipboard",
                component: () =>
                    import("@/docs/zh/ve-table/clipboard/main.vue"),
                name: "剪贴板",
                meta: { keepAlive: true },
            },
            {
                path: "contextmenu",
                component: () =>
                    import("@/docs/zh/ve-table/contextmenu/main.vue"),
                name: "右键菜单",
                meta: { keepAlive: true },
            },
            {
                path: "cell-ellipsis",
                component: () =>
                    import("@/docs/zh/ve-table/cell-ellipsis/main.vue"),
                name: "单元格省略",
                meta: { keepAlive: true },
            },
            {
                path: "row-index",
                component: () =>
                    import("@/docs/zh/ve-table/row-index/main.vue"),
                name: "行序号",
                meta: { keepAlive: true },
            },
            {
                path: "row-radio",
                component: () =>
                    import("@/docs/zh/ve-table/row-radio/main.vue"),
                name: "行单选",
                meta: { keepAlive: true },
            },
            {
                path: "row-checkbox",
                component: () =>
                    import("@/docs/zh/ve-table/row-checkbox/main.vue"),
                name: "行多选",
                meta: { keepAlive: true },
            },
            {
                path: "row-expand",
                component: () =>
                    import("@/docs/zh/ve-table/row-expand/main.vue"),
                name: "行展开",
                meta: { keepAlive: true },
            },
            {
                path: "row-style",
                component: () =>
                    import("@/docs/zh/ve-table/row-style/main.vue"),
                name: "行样式",
                meta: { keepAlive: true },
            },
            {
                path: "footer-summary",
                component: () =>
                    import("@/docs/zh/ve-table/footer-summary/main.vue"),
                name: "footer 汇总",
                meta: { keepAlive: true },
            },
            {
                path: "pagination",
                component: () =>
                    import("@/docs/zh/ve-table/pagination/main.vue"),
                name: "分页",
                meta: { keepAlive: true },
            },
            {
                path: "loading",
                component: () => import("@/docs/zh/ve-table/loading/main.vue"),
                name: "开启 loading",
                meta: { keepAlive: true },
            },
            {
                path: "virtual-scroll",
                component: () =>
                    import("@/docs/zh/ve-table/virtual-scroll/main.vue"),
                name: "虚拟滚动",
                meta: { keepAlive: false },
            },
            {
                path: "event-custom",
                component: () =>
                    import("@/docs/zh/ve-table/event-custom/main.vue"),
                name: "事件自定义",
                meta: { keepAlive: true },
            },
            {
                path: "data-empty",
                component: () =>
                    import("@/docs/zh/ve-table/data-empty/main.vue"),
                name: "空数据",
                meta: { keepAlive: true },
            },
            {
                path: "instance-methods",
                component: () =>
                    import("@/docs/zh/ve-table/instance-methods/main.vue"),
                name: "实例方法",
                meta: { keepAlive: true },
            },
            {
                path: "api",
                component: () => import("@/docs/zh/ve-table/api/main.vue"),
                name: "API",
                meta: { keepAlive: true },
            },
        ],
    },
    /* {
        path: "other",
        name: "辅助组件",
        component: emptyLayout,
        children: [
            {
                path: "checkbox",
                component: () => import("@/docs/zh/ve-checkbox/main.vue"),
                name: "checkbox"
            },
            {
                path: "radio",
                component: () => import("@/docs/zh/ve-radio/main.vue"),
                name: "radio"
            },
            {
                path: "select",
                component: () => import("@/docs/zh/ve-select/main.vue"),
                name: "select"
            },
            {
                path: "dropdown",
                component: () => import("@/docs/zh/ve-dropdown/main.vue"),
                name: "dropdown"
            }
        ]
    } */
];

export default config;
