'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    methods: {
        body1Mousewheel: function body1Mousewheel(e) {
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            var e1 = e.originalEvent || window.event || e;
            var scrollHeight = e1.wheelDelta || e1.detail * -1;
            body2.scrollTop = body2.scrollTop - scrollHeight;
        },
        body2Scroll: function body2Scroll(e) {

            var view2 = this.$el.querySelector('.v-table-rightview');
            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            if (body1) {
                body1.scrollTop = body2.scrollTop;
            }

            view2.querySelector('.v-table-header').scrollLeft = body2.scrollLeft;
        },
        scrollControl: function scrollControl() {
            var _this = this;

            this.$nextTick(function (x) {

                var body1 = _this.$el.querySelector('.v-table-leftview .v-table-body');
                var body2 = _this.$el.querySelector('.v-table-rightview .v-table-body');

                _utils2.default.bind(body1, 'mousewheel', _this.body1Mousewheel);
                _utils2.default.bind(body2, 'scroll', _this.body2Scroll);
            });
        }
    },

    beforeDestroy: function beforeDestroy() {
        var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
        var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

        _utils2.default.unbind(body1, 'mousewheel', this.body1Mousewheel);
        _utils2.default.unbind(body2, 'scroll', this.body2Scroll);
    }
};