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
            theme: "暗黑主题：",
            columnFixed: "列固定：",
            loading: "Loading：",
            expand: "行展开：",
            radio: "行单选：",
            checkbox: "行多选：",
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
            theme: "Dark Theme:",
            columnFixed: "Fixed Columns:",
            loading: "Loading:",
            expand: "Row Expand:",
            radio: "Row Radio:",
            checkbox: "Row Checkbox:",
        },
    },
};
