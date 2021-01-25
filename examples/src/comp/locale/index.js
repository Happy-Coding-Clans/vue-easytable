import zhCN from "../../../../packages/src/locale/lang/zh-CN";
import enUS from "../../../../packages/src/locale/lang/en-US";

export default {
    zh: {
        menus: [
            {
                name: "文档",
                path: "/doc",
                isRouter: true
            },
            {
                name: "示例",
                path: "/demo",
                isRouter: true
            }
        ],
        anchorCatalogTitle: "目录",
        // 组件配置多语言跟着文档语言环境走
        compLang: zhCN,
        eidtDemoTitle: "在 Github 上编辑",
        eidtDemoUrlPrefix:"https://github.com/huangshuwei/vue-easytable/edit/dev/examples/src/docs/zh/",
        demo: {
            description: "功能描述",
            expandCode: "展开代码",
            foldCode: "收起代码",
            runInline: "在线运行"
        }
    },
    en: {
        menus: [
            {
                name: "Document",
                path: "/doc",
                isRouter: true
            },
            {
                name: "Demo",
                path: "/demo",
                isRouter: true
            }
        ],
        anchorCatalogTitle: "Contents",
        compLang: enUS,
        eidtDemoTitle: "Edit this on Github",
        eidtDemoUrlPrefix:"https://github.com/huangshuwei/vue-easytable/edit/dev/examples/src/docs/en/",
        demo: {
            description: "Code Description",
            expandCode: "Expand Code",
            foldCode: "Hide Code",
            runInline: "Open in CodePen"
        }
    }
};
