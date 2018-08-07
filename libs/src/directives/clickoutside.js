export default {
    bind: function (el, binding, vNode) {
        if (typeof binding.value !== 'function') {

            let msg = `in [clickoutside] directives, provided expression '${binding.expression}' is not a function `

            const compName = vNode.context.name

            if (compName) {
                msg += `in ${compName}`
            }
            console.error(msg)
        }

        var handler = (e) => {
            if (!el.contains(e.target) && el !== e.target) {
                binding.value(e)
            } else {
                return false
            }
        }

        el.__clickOutSide__ = handler

        document.addEventListener('click', handler, true)
    },

    unbind: function (el) {
        document.removeEventListener('click', el.__clickOutSide__, true)
        el.__clickOutSide__ = null

    }
};