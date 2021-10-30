/* 
element focus
*/
export default {
    bind: function (el, { value }, vnode) {
        if (value) {
            const { focus, select } = value;

            vnode.context.$nextTick(() => {
                if (focus) {
                    el.focus();
                }

                if (select) {
                    el.select();
                }
            });
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
