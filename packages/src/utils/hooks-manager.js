/* 
hook system

*/
export default class Hooks {
    constructor() {
        // ...

        this.hooks = {
            /* 
            table-scroll1:[
                function(){},
                function(){}
            ],
            table-scroll2:[
                function(){},
                function(){}
            ]
            
            */
        };
    }

    /**
     * Add listener to plugin hooks system.
     *
     * @param {string} hookName The hook name.
     * @param {Function} callback The listener function to add.
     */
    addHook(hookName, callback) {
        let hooks;

        if (!this.hooks[hookName]) {
            this.hooks[hookName] = [];
        }

        hooks = this.hooks[hookName];

        // exclude repeat hook
        let isRepeat = false;
        for (let i = 0; i < hooks.length; i++) {
            if (hooks[i] === callback) {
                isRepeat = true;
                break;
            }
        }

        if (isRepeat) {
            console.warn(`Repeat hook name:${hookName}`);
        } else {
            hooks.push(callback);
        }
    }

    /**
     * Trigger hook.
     *
     * @param {string} hookName The hook name.
     * @param {Argument} args
     */
    triggerHook(hookName) {
        const hooks = this.hooks[hookName];

        if (hooks && hooks.length) {
            const args = Array.prototype.slice.call(arguments);

            hooks.forEach((hook) => {
                // exclude hookName param
                hook.apply(null, args.slice(1));
            });
        }
        // else {
        //     console.warn(`Can't find hook name:${hookName}`);
        // }
    }
}
