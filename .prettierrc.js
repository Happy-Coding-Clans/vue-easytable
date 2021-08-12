module.exports = {
    printWidth: 80, // 单行输出（不折行）的（最大）长度
    useTabs: false, // 不使用缩进符，而使用空格
    tabWidth: 4, // 每个缩进的空格数
    semi: true, // 是否在语句末尾打印分号
    singleQuote: false, // 是否使用单引号
    quoteProps: "as-needed", // 尽在需要时在对象属性周围添加引号
    trailingComma: "all", // 去除对象最末尾元素跟随的逗号
    arrowParens: "always", // 箭头函数，只有一个参数的时候，也需要括号
    rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
    proseWrap: "preserve", // 文本超出换行规则。当超出print width（上面有这个参数）时就折行
    endOfLine: "lf", // 换行符使用 lf
    bracketSpacing: true, // 是否在对象属性添加空格
    jsxBracketSameLine: false, // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）,默认false,这里选择>不另起一行
    htmlWhitespaceSensitivity: "ignore", // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
    jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
    trailingComma: "all", // 在多行逗号分隔的语法结构中，尽可能打印尾随逗号(例如，单行数组从来不使用尾随逗号)
};
