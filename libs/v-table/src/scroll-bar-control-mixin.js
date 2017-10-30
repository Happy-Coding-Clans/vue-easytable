'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    methods: {
        controlScrollBar: function controlScrollBar() {

            if (this.hasTableFooter) {

                var body = this.$el.querySelector('.v-table-rightview .v-table-body');
                body.style.overflowX = 'hidden';
            }
        },
        hasBodyHorizontalScrollBar: function hasBodyHorizontalScrollBar() {

            return this.rightViewWidth < this.totalNoFrozenColumnsWidth;
        }
    }

};