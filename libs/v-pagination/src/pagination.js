"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pager = require("./pager.vue");

var _pager2 = _interopRequireDefault(_pager);

var _index = require("../../v-select/index");

var _index2 = _interopRequireDefault(_index);

var _settings = require("../../src/settings/settings.js");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'v-pagination',
    props: {
        layout: {
            type: Array,
            default: function _default() {
                return ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'];
            }
        },

        size: {
            type: String
        },

        total: {
            type: Number,
            require: true
        },

        pageIndex: {
            type: Number
        },

        showPagingCount: {
            type: Number,
            default: 5
        },

        pageSize: {
            type: Number,
            default: 10
        },

        pageSizeOption: {
            type: Array,
            default: function _default() {
                return [10, 20, 30];
            }
        }
    },
    data: function data() {
        return {
            newPageIndex: this.pageIndex && this.pageIndex > 0 ? parseInt(this.pageIndex) : 1,

            newPageSize: this.pageSize,

            newPageSizeOption: []
        };
    },


    computed: {
        pageCount: function pageCount() {
            return Math.ceil(this.total / this.newPageSize);
        }
    },

    render: function render(h) {
        var template = h(
            "ul",
            { "class": "v-page-ul" },
            []
        );

        var comps = {
            'total': h(
                "total",
                null,
                []
            ),
            'prev': h(
                "prev",
                null,
                []
            ),
            'pager': h(
                "pager",
                {
                    attrs: { pageCount: this.pageCount, pageIndex: this.newPageIndex,
                        showPagingCount: this.showPagingCount
                    },
                    on: {
                        "jumpPageHandler": this.jumpPageHandler
                    }
                },
                []
            ),
            'next': h(
                "next",
                null,
                []
            ),
            'sizer': h(
                "sizer",
                null,
                []
            ),
            'jumper': h(
                "jumper",
                {
                    on: {
                        "jumpPageHandler": this.jumpPageHandler
                    }
                },
                []
            )
        };

        this.layout.forEach(function (item) {
            template.children.push(comps[item]);
        });

        var size = _settings2.default.sizeMaps[this.size] || _settings2.default.sizeMapDefault;
        var sizeClass = size === _settings2.default.sizeMaps['large'] ? ' v-page--large' : size === _settings2.default.sizeMaps['middle'] ? ' v-page--middle' : ' v-page--small';

        template.data.class += sizeClass;

        return template;
    },


    components: {

        Total: {
            render: function render(h) {
                return h(
                    "span",
                    { "class": "v-page-total" },
                    ["\xA0\u5171\xA0", this.$parent.total, "\xA0\u6761\xA0"]
                );
            }
        },

        Prev: {
            render: function render(h) {
                return h(
                    "li",
                    {
                        on: {
                            "click": this.$parent.prevPage
                        },

                        "class": [this.$parent.newPageIndex === 1 ? 'v-page-disabled' : '', 'v-page-li', 'v-page-prev']
                    },
                    [h(
                        "a",
                        null,
                        [h(
                            "i",
                            { "class": "v-icon-angle-left" },
                            []
                        )]
                    )]
                );
            }
        },

        pager: _pager2.default,

        Next: {
            render: function render(h) {
                return h(
                    "li",
                    {
                        on: {
                            "click": this.$parent.nextPage
                        },

                        "class": [this.$parent.newPageIndex === this.$parent.pageCount ? 'v-page-disabled' : '', 'v-page-li', 'v-page-next']
                    },
                    [h(
                        "a",
                        null,
                        [h(
                            "i",
                            { "class": "v-icon-angle-right" },
                            []
                        )]
                    )]
                );
            }
        },

        Sizer: {
            components: {
                VSelect: _index2.default
            },

            render: function render(h) {
                return h(
                    "v-select",
                    {
                        attrs: { size: this.$parent.size,
                            value: this.$parent.newPageSizeOption
                        },
                        "class": "v-page-select", on: {
                            "input": this.handleChange
                        },
                        directives: [{
                            name: "model",
                            value: this.$parent.newPageSizeOption
                        }]
                    },
                    []
                );
            },


            methods: {
                handleChange: function handleChange(items) {

                    if (Array.isArray(items) && items.length > 0) {
                        var item = items.find(function (x) {
                            return x.selected;
                        });
                        if (item) {
                            this.$parent.pageSizeChangeHandler(item.value);
                        }
                    }
                }
            },

            created: function created() {}
        },

        Jumper: {
            methods: {
                jumperEnter: function jumperEnter(event) {
                    if (event.keyCode !== 13) return;

                    var val = this.$parent.getValidNum(event.target.value);

                    this.$parent.newPageIndex = val;

                    this.$emit('jumpPageHandler', val);
                }
            },
            render: function render(h) {
                return h(
                    "span",
                    { "class": "v-page-goto" },
                    ["\xA0\u524D\u5F80\xA0", h(
                        "input",
                        {
                            "class": "v-page-goto-input",
                            domProps: {
                                "value": this.$parent.newPageIndex
                            },
                            on: {
                                "keyup": this.jumperEnter
                            },
                            attrs: {
                                type: "input"
                            }
                        },
                        []
                    ), "\xA0\u9875\xA0"]
                );
            }
        }
    },

    methods: {
        getValidNum: function getValidNum(value) {
            var result = 1;

            value = parseInt(value, 10);

            if (isNaN(value) || value < 1) {
                result = 1;
            } else {
                if (value < 1) {
                    result = 1;
                } else if (value > this.pageCount) {
                    result = this.pageCount;
                } else {
                    result = value;
                }
            }
            return result;
        },
        jumpPageHandler: function jumpPageHandler(newPageIndex) {
            this.newPageIndex = newPageIndex;
            this.$emit('page-change', this.newPageIndex);
        },
        prevPage: function prevPage() {
            if (this.newPageIndex > 1) {
                this.newPageIndex = this.newPageIndex - 1;
                this.$emit('page-change', this.newPageIndex);
            }
        },
        nextPage: function nextPage() {
            if (this.newPageIndex < this.pageCount) {
                this.newPageIndex = this.newPageIndex + 1;
                this.$emit('page-change', this.newPageIndex);
            }
        },
        pageSizeChangeHandler: function pageSizeChangeHandler() {
            var item = this.newPageSizeOption.find(function (x) {
                return x.selected;
            });

            if (item) {
                this.newPageSize = item.value;
                this.newPageIndex = 1;
                this.$emit('page-size-change', this.newPageSize);
            }
        },
        initSelectOption: function initSelectOption() {
            var _this = this;

            this.newPageSizeOption = this.pageSizeOption.map(function (x) {
                var temp = {};

                temp.value = x;
                temp.label = x + ' 条/页';
                if (_this.newPageSize == x) {
                    temp.selected = true;
                }

                return temp;
            });
        },
        goBackPageIndex: function goBackPageIndex() {

            this.newPageIndex = this.pageIndex && this.pageIndex > 0 ? parseInt(this.pageIndex) : 1;
        },
        goBackPageSize: function goBackPageSize() {

            if (this.pageSize > 0) {

                this.newPageSize = this.pageSize;
                this.initSelectOption();
            }
        }
    },
    watch: {
        pageIndex: function pageIndex(newVal, oldVal) {
            this.newPageIndex = newVal;
        },

        pageSize: function pageSize(newVal, oldVal) {
            this.newPageSize = newVal;
            this.initSelectOption();
        }
    },
    created: function created() {
        this.initSelectOption();
    }
};