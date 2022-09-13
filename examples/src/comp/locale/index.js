import zhCN from "../../../../packages/src/locale/lang/zh-CN";
import enUS from "../../../../packages/src/locale/lang/en-US";

export default {
    zh: {
        menus: [
            {
                name: "文档",
                path: "/doc",
                isRouter: true,
            },
            {
                name: "示例",
                path: "/demo",
                isRouter: true,
            },
            {
                name: "更新日志",
                path: "https://github.com/Happy-Coding-Clans/vue-easytable/releases",
                isRouter: false,
            },
        ],
        docTheme: "组件主题",
        // 主题切换配置
        switchDocThemeOptions: [
            { value: "default", label: "默认" },
            { value: "dark", label: "暗黑" },
        ],
        anchorCatalogTitle: "目录",
        // 组件配置多语言跟着文档语言环境走
        compLang: zhCN,
        eidtDemoTitle: "在 Github 上编辑",
        eidtDemoUrlPrefix:
            "https://github.com/huangshuwei/vue-easytable/edit/master/examples/src/docs/zh/",
        demo: {
            description: "功能描述",
            expandCode: "展开代码",
            foldCode: "收起代码",
            openInCodepen: "在 Codepen 中编辑",
            openInCodeSandBox: "在 CodeSandBox 中编辑",
        },
        completeDemo: {
            demo1: {
                selection: "这是数据表格的应用场景",
                dataRowsOption: [
                    {
                        value: 5000,
                        label: "5000 行",
                    },
                    {
                        value: 10000,
                        label: "10,000 行",
                    },
                    {
                        value: 100000,
                        label: "100,000 行",
                    },
                    {
                        value: 150000,
                        label: "150,000 行",
                    },
                ],
                dataRows: "数据量：",
                columnFixed: "列固定：",
                loading: "Loading：",
                expand: "行展开：",
                radio: "行单选：",
                checkbox: "行多选：",
            },
            demo2: {
                selection: "当然，你也可以把它当做 Excel 来用",
                description:
                    "在这个案例中，你可以尝试右键菜单、行和列多选、即时输入、单元格自动填充等功能...",
            },
        },
    },
    en: {
        menus: [
            {
                name: "Document",
                path: "/doc",
                isRouter: true,
            },
            {
                name: "Demo",
                path: "/demo",
                isRouter: true,
            },
            {
                name: "Changelog",
                path: "https://github.com/Happy-Coding-Clans/vue-easytable/releases",
                isRouter: false,
            },
        ],
        docTheme: "Component Theme",
        // 主题切换配置
        switchDocThemeOptions: [
            { value: "default", label: "default" },
            { value: "dark", label: "dark" },
        ],
        anchorCatalogTitle: "Contents",
        compLang: enUS,
        eidtDemoTitle: "Edit this on Github",
        eidtDemoUrlPrefix:
            "https://github.com/huangshuwei/vue-easytable/edit/master/examples/src/docs/en/",
        demo: {
            description: "Code Description",
            expandCode: "Expand Code",
            foldCode: "Hide Code",
            openInCodepen: "Edit in Codepen",
            openInCodeSandBox: "Edit in CodeSandBox",
        },
        completeDemo: {
            demo1: {
                selection: "Here is a data grid .",
                dataRowsOption: [
                    {
                        value: 5000,
                        label: "5000 Rows",
                    },
                    {
                        value: 10000,
                        label: "10,000 Rows",
                    },
                    {
                        value: 100000,
                        label: "100,000 Rows",
                    },
                    {
                        value: 150000,
                        label: "150,000 Rows",
                    },
                ],
                dataRows: "Data Rows:",
                columnFixed: "Fixed Columns:",
                loading: "Loading:",
                expand: "Row Expand:",
                radio: "Row Radio:",
                checkbox: "Row Checkbox:",
            },
            demo2: {
                selection:
                    "Of course, you can use it like Excel or Google Sheets .",
                description:
                    "In this case, you can try features such as right-click menu, multiple selection of rows and columns, real-time input, and cell autofilling, etc.",
            },
        },
    },
};
