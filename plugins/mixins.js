import Vue from 'vue'

const mixin = {
  
    methods: {
        //format price
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price *(product.discount)/100)
        },
        subStrTitle(title){
            var title_length = title.length
            if (title_length > 40){
                var result = title.substr(0,40) + "..."
                return result
            } else {
                return title
            }
        },
        subStrText(title){
            var title_length = title.length
            if (title_length > 30){
                var result = title.substr(0,30) + "..."
                return result
            } else {
                return title
            }
        },
        stripHtml(text){
            let regex = /(<([^>]+)>)/ig;
            return text.replace(regex, "");
        },
    },
}
Vue.mixin(mixin)