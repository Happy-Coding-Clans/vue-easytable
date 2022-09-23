import { clsName } from "../util";
import {
    COMPS_NAME,
    EMIT_EVENTS,
    HOOKS_NAME,
    AUTOFILLING_DIRECTION,
    CURRENT_CELL_SELECTION_TYPES,
    COLUMN_FIXED_TYPE,
} from "../util/constant";

export default {
    props: {
        parentRendered: {
            type: Boolean,
            required: true,
        },
        hooks: {
            type: Object,
            required: true,
        },
        isColumnResizerHover: {
            type: Boolean,
            required: true,
        },
        isColumnResizing: {
            type: Boolean,
            required: true,
        },
        setIsColumnResizerHover: {
            type: Function,
            required: true,
        },
        setIsColumnResizing: {
            type: Function,
            required: true,
        },
    },
    watch: {
        parentRendered: {
            handler: function (val) {
                if (val) {
                    console.log(1);
                    // header cell mousedown
                    this.hooks.addHook(
                        HOOKS_NAME.HEADER_CELL_MOUSEDOWN,
                        ({ event, column }) => {
                            this.headerCellMousedown({ event, column });
                        },
                    );

                    // header cell mousemove
                    this.hooks.addHook(
                        HOOKS_NAME.HEADER_CELL_MOUSEMOVE,
                        ({ event, column }) => {
                            this.headerCellMousemove({ event, column });
                        },
                    );
                }
            },
            immediate: true,
        },
    },
    methods: {
        // header cell mousedown
        headerCellMousedown({ event, column }) {
            if (this.isColumnResizerHover) {
                this.setIsColumnResizing(true);

                // stop text select when reszing
                document.onselectstart = function () {
                    return false;
                };
                document.ondragstart = function () {
                    return false;
                };
            }
        },

        // header cell mousemove
        headerCellMousemove({ event, column }) {
            const { isColumnResizing, setIsColumnResizerHover } = this;
            if (isColumnResizing) {
                //
                console.log("resizing");

                return false;
            }

            const target = event.target;

            const rect = target.getBoundingClientRect();

            if (rect && rect.right - event.pageX < 10) {
                setIsColumnResizerHover(true);
            } else {
                setIsColumnResizerHover(false);
            }
        },

        // set column resizer position
        setColumnResizerPosition(event) {
            //
        },
    },

    render() {
        const { isColumnResizerHover, isColumnResizing } = this;

        const columnResizeHandlerProps = {
            class: [clsName("column-resizer-handler")],
            style: {
                display: isColumnResizerHover ? "block" : "none",
            },
        };

        const columnResizeLineProps = {
            class: [clsName("column-resizer-line")],
            style: {
                display: isColumnResizing ? "block" : "none",
            },
        };

        return (
            <div class={clsName("column-resizer")}>
                <div {...columnResizeHandlerProps} />
                <div {...columnResizeLineProps} />
            </div>
        );
    },
};
