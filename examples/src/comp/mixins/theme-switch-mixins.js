import ThemeSwitcherTool from "theme-switcher-tool";

const styleLinkId = "theme_creator_cli_style_id";

const themeSwitcherTool = ThemeSwitcherTool({
    // Your theme list
    themeList: [
        {
            themeName: "theme-dark",
            themePath:
                "https://unpkg.com/vue-easytable/libs/theme-dark/index.css",
        },
        {
            themeName: "theme-default",
            themePath:
                "https://unpkg.com/vue-easytable/libs/theme-default/index.css",
        },
    ],
    // Your actual style id
    styleLinkId: styleLinkId,
    useStorage: false,
    storageKey: "theme_switcher_tool_theme",
});

export default {
    methods: {
        // switch theme mix
        switchThemeMix(themeName) {
            return new Promise((resolve, reject) => {
                themeSwitcherTool
                    .switcher({
                        themeName: themeName,
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch(reject);
            });
        },
    },
    mounted() {
        // 防止已发布的样式文件，对正在开发的样式有干扰
        if (process.env.NODE_ENV === "development") {
            let themeLink = document.getElementById(styleLinkId);
            if (themeLink) {
                themeLink.parentNode.removeChild(themeLink);
            }
        }
    },
};
