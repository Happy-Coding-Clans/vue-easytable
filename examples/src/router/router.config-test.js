import routers from "./locale";

const emptyLayout = () => import("@/comp/layout/empty-layout.vue");

const docLayout = () => import("@/comp/layout/doc-layout.vue");

export default [
    {
        path: "/",
        meta: { keepAlive: true, hide: true },
        redirect: "/en/demo",
    }, // 默认路由
    /* {
        path: "/zh",
        component: emptyLayout,
        redirect: "/zh/doc/intro",
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
    }, */
    {
        path: "/en",
        component: emptyLayout,
        redirect: "/en/doc/intro",
        children: [
            {
                path: "demo",
                component: () => import("../demo/index.vue"),
                name: "示例",
                meta: { keepAlive: true, hide: true },
            },
            {
                path: "doc",
                component: docLayout,
                redirect: "/en/doc/intro",
                children: [
                    {
                        path: "intro",
                        component: () => import("@/docs/en/intro.md"),
                        name: "Intro",
                        meta: { keepAlive: true },
                    },
                    {
                        path: "install",
                        component: () => import("@/docs/en/install.md"),
                        name: "Install",
                        meta: { keepAlive: true },
                    },
                    {
                        path: "start",
                        component: () => import("@/docs/en/strart.md"),
                        name: "Start",
                        meta: { keepAlive: true },
                    },
                    {
                        path: "locale",
                        component: () => import("@/docs/en/locale.md"),
                        name: "Internationalization",
                        meta: { keepAlive: true },
                    },
                ],
            },
        ],
    },
];
