'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    methods: {
        bodyMousewheel: function bodyMousewheel(e) {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');

            var e1 = e.originalEvent || window.event || e;
            var scrollHeight = e1.wheelDelta || e1.detail * -1;

            if (body1) {
                body1.scrollTop = body1.scrollTop - scrollHeight;
            }
            if (body2) {
                body2.scrollTop = body2.scrollTop - scrollHeight;
            }
            if (body3) {
                body3.scrollTop = body3.scrollTop - scrollHeight;
            }
        },
        bodyScrollTop: function bodyScrollTop() {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');

            if (body1) {
                body1.scrollTop = 0;
            }
            if (body2) {
                body2.scrollTop = 0;
            }
            if (body3) {
                body3.scrollTop = 0;
            }
        },
        body2Scroll: function body2Scroll(e) {

            var view2 = this.$el.querySelector('.v-table-rightview');
            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            if (body1) {
                body1.scrollTop = body2.scrollTop;
            }

            if (view2) {
                view2.querySelector('.v-table-header').scrollLeft = body2.scrollLeft;
            }
        },
        body3Scroll: function body3Scroll() {
            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');

            if (body1) {
                body1.scrollTop = body3.scrollTop;
            }
            if (body2) {
                body2.scrollTop = body3.scrollTop;
            }
        },
        body4Scroll: function body4Scroll() {
            var view2 = this.$el.querySelector('.v-table-rightview');
            var body4 = this.$el.querySelector('.v-table-empty-scroll');

            if (view2) {
                view2.querySelector('.v-table-header').scrollLeft = body4.scrollLeft;
            }
        },
        rightViewFooterScroll: function rightViewFooterScroll() {

            var view2 = this.$el.querySelector('.v-table-rightview');

            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            if (view2) {
                view2.querySelector('.v-table-header').scrollLeft = rightViewFooter.scrollLeft;
                view2.querySelector('.v-table-body').scrollLeft = rightViewFooter.scrollLeft;
            }
        },
        scrollControl: function scrollControl() {
            var _this = this;

            this.unbindEvents();

            setTimeout(function (x) {

                var body1 = _this.$el.querySelector('.v-table-leftview .v-table-body');
                var body2 = _this.$el.querySelector('.v-table-rightview .v-table-body');
                var rightViewFooter = _this.$el.querySelector('.v-table-rightview .v-table-footer');
                var body3 = _this.$el.querySelector('.v-table-actionview .v-table-body');
                var body4 = _this.$el.querySelector('.v-table-empty-scroll');

                body1 && _utils2.default.bind(body1, 'mousewheel', _this.bodyMousewheel);
                body2 && _utils2.default.bind(body2, 'mousewheel', _this.bodyMousewheel);
                body3 && _utils2.default.bind(body3, 'mousewheel', _this.bodyMousewheel);
                body2 && _utils2.default.bind(body2, 'scroll', _this.body2Scroll);
                rightViewFooter && _utils2.default.bind(rightViewFooter, 'scroll', _this.rightViewFooterScroll);
                body3 && _utils2.default.bind(body3, 'scroll', _this.body3Scroll);
                body4 && _utils2.default.bind(body4, 'scroll', _this.body4Scroll);
            });
        },
        unbindEvents: function unbindEvents() {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');
            var body4 = this.$el.querySelector('.v-table-empty-scroll');

            body1 && _utils2.default.unbind(body1, 'mousewheel', this.bodyMousewheel);
            body2 && _utils2.default.unbind(body2, 'mousewheel', this.bodyMousewheel);
            body3 && _utils2.default.unbind(body3, 'mousewheel', this.bodyMousewheel);
            body2 && _utils2.default.unbind(body2, 'scroll', this.body2Scroll);
            rightViewFooter && _utils2.default.unbind(rightViewFooter, 'scroll', this.rightViewFooterScroll);
            body3 && _utils2.default.unbind(body3, 'scroll', this.body3Scroll);
            body4 && _utils2.default.unbind(body4, 'scroll', this.body4Scroll);
        },
        scrollToTop: function scrollToTop() {

            this.bodyScrollTop();
        }
    },

    beforeDestroy: function beforeDestroy() {

        this.unbindEvents();
    }
};