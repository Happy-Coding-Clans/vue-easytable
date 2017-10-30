export default {

    computed: {

        vTableFooter(){

            return {

                'v-table-rightview-special-border': this.hasFrozenColumn
            }
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