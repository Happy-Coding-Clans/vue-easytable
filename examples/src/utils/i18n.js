import Cookies from "js-cookie";
import { DOC_LANG_COOKIE, DOC_LANG } from "./constant";

/*
 * @createI18N
 * @desc create i18n
 * @param {object} locale
 * @return {object}
 */
/* export function createI18N(locale) {
    return function(path, ...args) {
        let result = "";

        const lang = getDocLang();

        if (locale[lang]) {
            const message = locale[lang][path];
            result = isFunction(message) ? message(...args) : message;
        } else {
            console.error(`can't find ${lang} in ${JSON.stringify(locale)}`);
        }

        return result;
    };
} */

// set doc lang cookie
/* export function setDocLang(value) {
    return Cookies.set(DOC_LANG_COOKIE, value);
}

// get doc lang cookie
export function getDocLang() {
    let result = Cookies.get(DOC_LANG_COOKIE);

    if (!result) {
        result = DOC_LANG.EN;
    }
    return result;
} */
