import { COMPS_NAME } from "./util/constant";
import { clsName } from "./util/index";

export default {
    name: COMPS_NAME.VE_CONTEXTMENU,
    props: {},
    data() {
        return {};
    },

    render() {
        return (
            <div class="ve-contextmenu">
                <div class="ve-contextmenu-panel">
                    <div>1abc</div>
                    <div>2abc</div>
                </div>
                <div class="ve-contextmenu-panel">
                    <div>11abc</div>
                    <div>22abc</div>
                </div>
            </div>
        );
    },
};
