import { clsName } from "../util";
import { COMPS_NAME, EMIT_EVENTS } from "../util/constant";
import emitter from "../../../src/mixins/emitter";
import focus from "../../../src/directives/focus.js";
import { isInputKeyCode } from "../../../src/utils/event-key-codes";
import { getParentCompByName } from "../../../src/utils/index";

export default {
    name: COMPS_NAME.VE_TABLE_EDIT_INPUT,
    directives: {
        focus: focus,
    },
    mixins: [emitter],
    props: {
        value: {
            type: [String, Number],
            required: true,
        },

        // cellSelectionKeyData: {
        //     type: Object,
        //     required: true,
        // },

        // is editing focus cell
        // isEditingFocusCell: {
        //     type: Boolean,
        //     required: true,
        // },
    },
    data() {
        return {
            // opacity
            opacity: 0,
        };
    },
    computed: {
        // container style
        containerStyle() {
            return null;
        },

        // textarea class
        textareaClass() {
            let result = null;

            result = {
                [clsName("edit-input")]: true,
            };

            return result;
        },

        // textarea style
        textareaStyle() {
            let result = null;

            const { opacity } = this;

            const tdEl = getParentCompByName(this, COMPS_NAME.VE_TABLE_BODY_TD);

            let textareaHeight;
            let textareaWidth;

            if (tdEl) {
                const { width, height } = tdEl.$el.getBoundingClientRect();
                textareaHeight = height;
                textareaWidth = width;
            }

            console.log(tdEl.$el);

            result = {
                opacity: opacity,
                height: textareaHeight + "px",
                width: textareaWidth + "px",
            };

            return result;
        },
    },

    methods: {
        // deal key down event
        dealKeydownEvent(event) {
            // event.stopPropagation();
            // event.preventDefault();

            const { keyCode } = event;

            if (isInputKeyCode(keyCode)) {
                this.showTextarea();
            }
        },

        // show textarea
        showTextarea() {
            this.opacity = 1;
        },

        // hide textarea
        hideTextarea() {
            this.opacity = 0;
        },
    },

    mounted() {
        // add key down event listener
        this.$el.addEventListener("keydown", this.dealKeydownEvent);
    },

    destroyed() {
        // remove key down event listener
        this.$el.removeEventListener("keydown", this.dealKeydownEvent);
    },

    render() {
        const { value, opacity } = this;

        const textHolderProps = {
            class: {
                [clsName("edit-input-text-holder")]: true,
            },
            style: {
                display: opacity ? "none" : "",
            },
        };

        const containerProps = {
            class: {
                [clsName("edit-input-container")]: true,
            },
        };

        const textareaProps = {
            class: this.textareaClass,
            style: this.textareaStyle,
            directives: [
                {
                    name: "focus",
                    value: {
                        focus: opacity === 1,
                    },
                },
            ],
            domProps: { value },
            on: {
                input: (e) => {
                    this.$emit("on-value-change", e.target.value);
                },
                click: () => {
                    this.dispatch(
                        COMPS_NAME.VE_TABLE,
                        EMIT_EVENTS.BODY_TD_EDIT_CELL_INPUT_VALUE_CLICK,
                    );
                },
                dblclick: () => {
                    this.showTextarea();
                },
                blur: () => {
                    this.hideTextarea();

                    this.dispatch(
                        COMPS_NAME.VE_TABLE,
                        EMIT_EVENTS.BODY_TD_EDIT_CELL_INPUT_BLUR,
                    );
                },
            },
        };

        return (
            <div>
                <div {...textHolderProps}>{this.$slots.default}</div>
                <div {...containerProps}>
                    <textarea {...textareaProps}></textarea>
                </div>
            </div>
        );
    },
};
