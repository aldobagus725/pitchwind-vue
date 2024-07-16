import Vue from 'vue'
import moment from "moment";
const mixin = {
  
    methods: {
        //format price
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        uangIndonesia: function (value) {
            if (typeof value !== "number") {
              return value;
            }
            var formatter = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            });
            return formatter.format(value);
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
        subStrProductTitle(title){
            var title_length = title.length
            if (title_length >= 10){
                const noVowels = title.replace(/[aeiou]/gi, '');
                // console.log(noVowels)
                var result = noVowels.substr(0,20)
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
        formatProperDate(date){
            return moment(date).utc().utcOffset("+07:00").format('DD-MM-YYYY HH:mm:ss')
        },
        dataReturner(data){
            if (data == null || data.length == 0){
                return 'N/A'
            } else {
                return data
            }
        },
        askOnWhatsApp(productName = ""){
            let url = "https://web.whatsapp.com/send?phone=6281333267597&text=Hello%2C%20I%20want%20more%20info%20about%20"
            let productNameProcessed = productName.replace(" ","\%20")
            let urlProcessed = url+productNameProcessed
            return urlProcessed
        },
    },
}
Vue.mixin(mixin)