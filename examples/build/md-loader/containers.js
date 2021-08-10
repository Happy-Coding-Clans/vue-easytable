const mdContainer = require("markdown-it-container");

module.exports = (md, options) => {
    md.use(mdContainer, "demo", {
        validate(params) {
            return params.trim().match(/^demo\s*(.*)$/);
        },
        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            if (tokens[idx].nesting === 1) {
                const description = m && m.length > 1 ? m[1] : "";
                const content =
                    tokens[idx + 1].type === "fence"
                        ? tokens[idx + 1].content
                        : "";
                return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ""}
        <!--element-demo: ${content}:element-demo-->
        `;
            }
            return "</demo-block>";
        },
    });

    md.use(mdContainer, "anchor", {
        validate(params) {
            return params.trim().match(/^anchor\s*(.*)$/);
        },
        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^anchor\s*(.*)$/);
            if (tokens[idx].nesting === 1) {
                const label = m && m.length > 1 ? m[1] : "";

                return `<anchor is-edit label="${label}" fileName="${options.resourceFileName}" />
        `;
            }
            return "";
        },
    });

    md.use(mdContainer, "tip");
    md.use(mdContainer, "warning");
};
