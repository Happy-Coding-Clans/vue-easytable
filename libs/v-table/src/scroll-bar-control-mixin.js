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

            if (this.$el) {

                var rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                    rightColumnsWidth = Math.round(this.totalNoFrozenColumnsWidth);

                return rightViewBody.clientWidth + 2 < rightColumnsWidth;
            }

            return false;
        }
    }

};