import routers from "./locale";

const emptyLayout = () => import("@/comp/layout/empty-layout.vue");

const docLayout = () => import("@/comp/layout/doc-layout.vue");

export default [
    {
        path: "/",
        meta: { keepAlive: true, hide: true },
        redirect: "/en"
    }, // 默认路由
    {
        path: "/zh",
        component: emptyLayout,
        redirect: "/zh/demo",
        children: [
            {
                path: "demo",
                component: () => import("../demo/index.vue"),
                name: "示例",
                meta: { keepAlive: true, hide: true }
            },
            {
                path: "doc",
                component: docLayout,
                redirect: "/zh/doc/intro",
                children: routers.zh
            }
        ]
    },
    {
        path: "/en",
        component: emptyLayout,
        redirect: "/en/demo",
        children: [
            {
                path: "demo",
                component: () => import("../demo/index.vue"),
                name: "示例",
                meta: { keepAlive: true, hide: true }
            },
            {
                path: "doc",
                component: docLayout,
                redirect: "/en/doc/intro",
                children: routers.en
            }
        ]
    }
];
