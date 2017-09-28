export default {

    methods:{

        goAnchor(selector) {

            let anchor = this.$el.querySelector('#'+selector);

            window.scroll(0,anchor.offsetTop)

            this.$router.replace({path:this.$route.path, query: {anchor:selector}});

        }
    }

}