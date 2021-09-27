/* 
element focus
*/
export default {
    bind: function (el, { value }, vnode) {
        if (value) {
            const { focus } = value;
            if (focus) {
                vnode.context.$nextTick(() => {
                    el.focus();
                });
            }
        }
    },
    update: function (el, { value }) {
        if (value) {
            const { focus } = value;
            if (focus) {
                el.focus();
            }
        }
    },
};
