'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {

        return {

            scrollbarWidth: 0
        };
    },


    methods: {
        controlScrollBar: function controlScrollBar() {

            if (this.hasTableFooter) {

                var body = this.$el.querySelector('.v-table-rightview .v-table-body');
                body.style.overflowX = 'hidden';
            }
        },
        setScrollbarWidth: function setScrollbarWidth() {

            this.scrollbarWidth = _utils2.default.getScrollbarWidth();
        }
    }

};