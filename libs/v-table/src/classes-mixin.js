'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    computed: {
        vTableFooter: function vTableFooter() {

            return {

                'v-table-rightview-special-border': this.hasFrozenColumn
            };
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