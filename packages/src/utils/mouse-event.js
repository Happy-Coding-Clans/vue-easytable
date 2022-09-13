import { MOUSE_EVENT_CLICK_TYPE } from "./constant";

/* 
get mouse event key type by mousedown\mouseup\... event
*/
export function getMouseEventClickType(event) {
    let result = null;

    if (!event) {
        return result;
    }

    const button =
        typeof event.which != "undefined" ? event.which : event.button;
    if (button == 1) {
        result = MOUSE_EVENT_CLICK_TYPE.LEFT_MOUSE;
    } else if (button == 2) {
        result = MOUSE_EVENT_CLICK_TYPE.MIDDLE_MOUSE;
    } else if (button == 3) {
        result = MOUSE_EVENT_CLICK_TYPE.RIGHT_MOUSE;
    }

    return result;
}
