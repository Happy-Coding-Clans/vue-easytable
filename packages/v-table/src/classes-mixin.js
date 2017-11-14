import settings from '../../src/settings/settings.js'

export default {

    computed: {

        vTableRightBody(){

            let result = {
                'v-table-rightview-special-border': true
            }

            result[settings.scrollbarClass] = true;

            return result;
        },

        vTableFooter(){

            let result = {

                'v-table-rightview-special-border': true,
            }

            result[settings.scrollbarClass] = true;

            return result;
        },

        vTableBodyInner(){

            return {
                'v-table-body-inner-pb': !this.hasTableFooter
            }
        },

        vTableBodyCell(){

            return {
                'vertical-border': this.showVerticalBorder,
                'horizontal-border': this.showHorizontalBorder
            }
        }

    }
}