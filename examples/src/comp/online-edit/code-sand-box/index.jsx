import LZString from "lz-string";

export default {
    props: {
        btnName: {
            type: String,
            required: true,
        },
        // vue-easytable version
        version: {
            type: String,
            required: true,
        },
        // vue tpl
        exampleTpl: {
            type: String,
            required: true,
        },
        // scripts
        exampleScript: {
            type: String,
            default: "",
        },
        // style
        exampleStyle: {
            type: String,
            required: true,
        },
    },
    methods: {
        // get main js content
        getMainjsContent() {
            return `
import Vue from "vue";
import Example from "./Example.vue";

// import default theme
import "vue-easytable/libs/theme-default/index.css";

// import vue-easytable library
import VueEasytable from "vue-easytable";

// for online edit
import "vue-easytable/libs/font/iconfont.css";

// only used by examples
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueEasytable);

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Example)
}).$mount("#app");
            `;
        },

        // get example.vue content
        getExampleContent() {
            return `
            ${this.exampleTpl}

            <script>
             ${this.exampleScript}
            </script>

            <style>
            ${this.exampleStyle}
            </style>
            `;
        },

        // get babel content
        getbabelContent() {
            return `
{
    "presets": [
        "@vue/cli-plugin-babel/preset"
    ]
}
            `;
        },

        getCodesanboxPrefillConfig() {
            const {
                version,
                getExampleContent,
                getMainjsContent,
                getbabelContent,
            } = this;

            const codesandboxPackage = {
                title: `vue-easytable@${version} example`,
                main: "main.js",
                dependencies: {
                    vue: "^2.6.11",
                    "vue-template-compiler": "^2.6.11",
                    "vue-easytable": version,
                    "element-ui": "^2.15.0",
                    mockjs: "^1.1.0",
                    "@vue/cli-service": "4.1.1",
                    "@vue/cli-plugin-babel": "4.5.11",
                    "@vue/babel-preset-jsx": "1.2.4",
                },
                // codesandbox 更新后不支持了
                // devDependencies: {
                //     "@vue/cli-plugin-babel": "4.5.11",
                //     "@vue/cli-plugin-eslint": "4.1.1",
                //     "@vue/cli-service": "4.1.1",
                // },
                scripts: {
                    serve: "vue-cli-service serve",
                    build: "vue-cli-service build",
                    lint: "vue-cli-service lint",
                },
                browserslist: ["> 1%", "last 2 versions", "not ie <= 8"],
            };

            const codesanboxPrefillConfig = {
                files: {
                    "package.json": { content: codesandboxPackage },
                    "Example.vue": { content: getExampleContent() },
                    "main.js": { content: getMainjsContent() },
                    ".babelrc": { content: getbabelContent() },
                },
            };

            return codesanboxPrefillConfig;
        },
    },
    render() {
        const { getCodesanboxPrefillConfig, btnName } = this;

        function compress(string) {
            return LZString.compressToBase64(string)
                .replace(/\+/g, "-") // Convert '+' to '-'
                .replace(/\//g, "_") // Convert '/' to '_'
                .replace(/=+$/, ""); // Remove ending '='
        }

        const fromProps = {
            ref: "form",
        };

        return (
            <div>
                <form
                    {...fromProps}
                    action="https://codesandbox.io/api/v1/sandboxes/define"
                    method="POST"
                    target="_blank"
                    onClick={() => {
                        this.$refs[fromProps.ref].submit();
                    }}
                >
                    <input
                        type="hidden"
                        name="parameters"
                        value={compress(
                            JSON.stringify(getCodesanboxPrefillConfig()),
                        )}
                    />
                    {btnName}
                </form>
            </div>
        );
    },
};
