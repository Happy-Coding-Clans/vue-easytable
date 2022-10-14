const emptyLayout = () => import("@/comp/layout/empty-layout.vue");

const config = [
    {
        path: "intro",
        component: () => import("@/docs/en/intro.md"),
        name: "Intro",
        meta: { keepAlive: true },
    },
    {
        path: "start",
        component: () => import("@/docs/en/start.md"),
        name: "Quick Start",
        meta: { keepAlive: true },
    },
    {
        path: "theme",
        component: () => import("@/docs/en/theme.md"),
        name: "Theme Custom",
        meta: { keepAlive: true },
    },
    {
        path: "locale",
        component: () => import("@/docs/en/locale.md"),
        name: "Internationalization",
        meta: { keepAlive: true },
    },
    {
        path: "qa",
        component: () => import("@/docs/en/QA.md"),
        name: "Q&A",
        meta: { keepAlive: true },
    },
    {
        path: "base",
        name: "Base Components",
        component: emptyLayout,
        children: [
            {
                path: "loading",
                component: () => import("@/docs/en/ve-loading/main.vue"),
                name: "Loading",
            },
            {
                path: "locale",
                component: () => import("@/docs/en/ve-locale/main.vue"),
                name: "Locale",
                meta: { keepAlive: true },
            },
            {
                path: "icon",
                component: () => import("@/docs/en/ve-icon/main.vue"),
                name: "Icon",
                meta: { keepAlive: true },
            },
            {
                path: "pagination",
                component: () => import("@/docs/en/ve-pagination/main.vue"),
                name: "Pagination",
                meta: { keepAlive: true },
            },
            {
                path: "contextmenu",
                component: () => import("@/docs/en/ve-contextmenu/main.vue"),
                name: "Contextmenu",
                meta: { keepAlive: true },
            },
        ],
    },
    {
        path: "table",
        name: "Table Component",
        component: emptyLayout,
        children: [
            /* {
                path: "test",
                component: () => import("@/docs/en/ve-table/test/main.vue"),
                name: "性能测试",
                meta: { keepAlive: true }
            }, */
            {
                path: "usage",
                component: () => import("@/docs/en/ve-table/usage/main.md"),
                name: "Usage",
                meta: { keepAlive: true },
            },
            {
                path: "table-width",
                component: () =>
                    import("@/docs/en/ve-table/table-width/main.vue"),
                name: "Table Width",
                meta: { keepAlive: true },
            },
            {
                path: "table-height",
                component: () =>
                    import("@/docs/en/ve-table/table-height/main.vue"),
                name: "Table Height",
                meta: { keepAlive: true },
            },
            {
                path: "table-border",
                component: () =>
                    import("@/docs/en/ve-table/table-border/main.vue"),
                name: "Table Border",
                meta: { keepAlive: true },
            },
            {
                path: "column-width",
                component: () =>
                    import("@/docs/en/ve-table/column-width/main.vue"),
                name: "Column Width",
                meta: { keepAlive: true },
            },
            {
                path: "column-resize",
                component: () =>
                    import("@/docs/en/ve-table/column-resize/main.vue"),
                name: "Column Resize",
                meta: { keepAlive: true },
            },
            {
                path: "column-fixed",
                component: () =>
                    import("@/docs/en/ve-table/column-fixed/main.vue"),
                name: "Column Fixed",
                meta: { keepAlive: true },
            },
            {
                path: "column-hidden",
                component: () =>
                    import("@/docs/en/ve-table/column-hidden/main.vue"),
                name: "Column Hidden",
                meta: { keepAlive: true },
            },
            {
                path: "header-fixed",
                component: () =>
                    import("@/docs/en/ve-table/header-fixed/main.vue"),
                name: "Header Fixed",
                meta: { keepAlive: true },
            },
            {
                path: "header-grouping",
                component: () =>
                    import("@/docs/en/ve-table/header-grouping/main.vue"),
                name: "Header Grouping",
                meta: { keepAlive: true },
            },
            {
                path: "header-hidden",
                component: () =>
                    import("@/docs/en/ve-table/header-hidden/main.vue"),
                name: "Header Hidden",
                meta: { keepAlive: true },
            },
            {
                path: "header-filter",
                component: () =>
                    import("@/docs/en/ve-table/header-filter/main.vue"),
                name: "Filter",
                meta: { keepAlive: true },
            },
            {
                path: "header-filter-custom",
                component: () =>
                    import("@/docs/en/ve-table/header-filter-custom/main.vue"),
                name: "Filter Custom",
                meta: { keepAlive: true },
            },
            {
                path: "header-sort",
                component: () =>
                    import("@/docs/en/ve-table/header-sort/main.vue"),
                name: "Sort",
                meta: { keepAlive: true },
            },
            {
                path: "cell-align",
                component: () =>
                    import("@/docs/en/ve-table/cell-align/main.vue"),
                name: "Cell Align",
                meta: { keepAlive: true },
            },
            {
                path: "cell-style",
                component: () =>
                    import("@/docs/en/ve-table/cell-style/main.vue"),
                name: "Cell Style",
                meta: { keepAlive: true },
            },
            {
                path: "cell-custom",
                component: () =>
                    import("@/docs/en/ve-table/cell-custom/main.vue"),
                name: "Cell Custom",
                meta: { keepAlive: true },
            },
            {
                path: "cell-span",
                component: () =>
                    import("@/docs/en/ve-table/cell-span/main.vue"),
                name: "Cell Span",
                meta: { keepAlive: true },
            },
            {
                path: "operation-column",
                component: () =>
                    import("@/docs/en/ve-table/operation-column/main.vue"),
                name: "Operation Column",
                meta: { keepAlive: true },
            },
            {
                path: "cell-selection",
                component: () =>
                    import("@/docs/en/ve-table/cell-selection/main.vue"),
                name: "Cell Selection",
                meta: { keepAlive: true },
            },
            {
                path: "cell-autofill",
                component: () =>
                    import("@/docs/en/ve-table/cell-autofill/main.vue"),
                name: "Cell Autofill",
                meta: { keepAlive: true },
            },
            {
                path: "cell-edit",
                component: () =>
                    import("@/docs/en/ve-table/cell-edit/main.vue"),
                name: "Cell Edit",
                meta: { keepAlive: true },
            },
            {
                path: "clipboard",
                component: () =>
                    import("@/docs/en/ve-table/clipboard/main.vue"),
                name: "Clipboard",
                meta: { keepAlive: true },
            },
            {
                path: "contextmenu",
                component: () =>
                    import("@/docs/en/ve-table/contextmenu/main.vue"),
                name: "Contextmenu",
                meta: { keepAlive: true },
            },
            {
                path: "cell-ellipsis",
                component: () =>
                    import("@/docs/en/ve-table/cell-ellipsis/main.vue"),
                name: "Cell Ellipsis",
                meta: { keepAlive: true },
            },
            {
                path: "row-index",
                component: () =>
                    import("@/docs/en/ve-table/row-index/main.vue"),
                name: "Row Index",
                meta: { keepAlive: true },
            },
            {
                path: "row-radio",
                component: () =>
                    import("@/docs/en/ve-table/row-radio/main.vue"),
                name: "Row Radio",
                meta: { keepAlive: true },
            },
            {
                path: "row-checkbox",
                component: () =>
                    import("@/docs/en/ve-table/row-checkbox/main.vue"),
                name: "Row Checkbox",
                meta: { keepAlive: true },
            },
            {
                path: "row-expand",
                component: () =>
                    import("@/docs/en/ve-table/row-expand/main.vue"),
                name: "Row Expand",
                meta: { keepAlive: true },
            },
            {
                path: "row-style",
                component: () =>
                    import("@/docs/en/ve-table/row-style/main.vue"),
                name: "Row Style",
                meta: { keepAlive: true },
            },
            {
                path: "footer-summary",
                component: () =>
                    import("@/docs/en/ve-table/footer-summary/main.vue"),
                name: "Footer Summary",
                meta: { keepAlive: true },
            },
            {
                path: "pagination",
                component: () =>
                    import("@/docs/en/ve-table/pagination/main.vue"),
                name: "Pagination",
                meta: { keepAlive: true },
            },
            {
                path: "loading",
                component: () => import("@/docs/en/ve-table/loading/main.vue"),
                name: "Enable Loading",
                meta: { keepAlive: true },
            },
            {
                path: "virtual-scroll",
                component: () =>
                    import("@/docs/en/ve-table/virtual-scroll/main.vue"),
                name: "Virtual Scroll",
                meta: { keepAlive: false },
            },
            {
                path: "event-custom",
                component: () =>
                    import("@/docs/en/ve-table/event-custom/main.vue"),
                name: "Event Custom",
                meta: { keepAlive: true },
            },
            {
                path: "data-empty",
                component: () =>
                    import("@/docs/en/ve-table/data-empty/main.vue"),
                name: "Data Empty",
                meta: { keepAlive: true },
            },
            {
                path: "instance-methods",
                component: () =>
                    import("@/docs/en/ve-table/instance-methods/main.vue"),
                name: "Instance methods",
                meta: { keepAlive: true },
            },
            {
                path: "api",
                component: () => import("@/docs/en/ve-table/api/main.vue"),
                name: "API",
                meta: { keepAlive: true },
            },
        ],
    },
    /*  {
        path: "other",
        name: "辅助组件",
        component: emptyLayout,
        children: [
            {
                path: "checkbox",
                component: () => import("@/docs/en/ve-checkbox/main.vue"),
                name: "checkbox"
            },
            {
                path: "radio",
                component: () => import("@/docs/en/ve-radio/main.vue"),
                name: "radio"
            },
            {
                path: "select",
                component: () => import("@/docs/en/ve-select/main.vue"),
                name: "select"
            },
            {
                path: "dropdown",
                component: () => import("@/docs/en/ve-dropdown/main.vue"),
                name: "dropdown"
            }
        ]
    } */
];

export default config;
