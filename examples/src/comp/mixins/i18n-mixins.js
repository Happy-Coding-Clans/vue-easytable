import { DOC_LANG } from "@/utils/constant.js";

export default {
    computed: {
        // current doc lang
        currentDocLang() {
            return this.$route.path.split("/")[1] || DOC_LANG.EN;
        }
    }
};
