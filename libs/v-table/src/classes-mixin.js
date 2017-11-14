'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = require('../../src/settings/settings.js');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    computed: {
        vTableRightBody: function vTableRightBody() {

            var result = {
                'v-table-rightview-special-border': true
            };

            result[_settings2.default.scrollbarClass] = true;

            return result;
        },
        vTableFooter: function vTableFooter() {

            var result = {

                'v-table-rightview-special-border': true
            };

            result[_settings2.default.scrollbarClass] = true;

            return result;
        },
        vTableBodyInner: function vTableBodyInner() {

            return {
                'v-table-body-inner-pb': !this.hasTableFooter
            };
        },
        vTableBodyCell: function vTableBodyCell() {

            return {
                'vertical-border': this.showVerticalBorder,
                'horizontal-border': this.showHorizontalBorder
            };
        }
    }
};