//state
export const state = () => ({
    //stocks
    stocks: [],
    //page
    page: 1,

    stock: {},
    stock_history:[],
    custom_stock:[],

})

//mutations
export const mutations = {
    //mutation "SET_PRODUCTS_DATA"
    SET_STOCKS_DATA(state, payload) {
        //set value state "products"
        state.stocks = payload
    },

    //mutation "SET_PAGE"
    SET_PAGE(state, payload) {

        //set value state "page"
        state.page = payload
    },

    //mutation "SET_PRODUCT_DATA"
    SET_STOCK_DATA(state, payload) {

        //set value state "product"
        state.stock = payload
    },
    //mutation "SET_PRODUCT_DATA"
    SET_HISTORY_DATA(state, payload) {

        //set value state "product"
        state.stock_history = payload
    },
    //mutation "SET_PRODUCT_DATA"
    SET_CUSTOM_DATA(state, payload) {

        //set value state "product"
        state.custom_stock = payload
    },

}

//actions
export const actions = {
    //get products data
    getStocksData({ commit, state }, payload) {
        //search
        let search = payload ? payload : ''
        //set promise
        return new Promise((resolve, reject) => {
            //fetching Rest API "/api/admin/stock" with method "GET"
            this.$axios.get(`/api/v1/admin/stock?q=${search}&page=${state.page}`)
            //success
            .then((response) => {
                //commit ti mutation "SET_PRODUCTS_DATA"
                commit('SET_STOCKS_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    //get products data
    getOnStockData({ commit, state }) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock-on?page=${state.page}`)
            //success
            .then((response) => {
                //commit ti mutation "SET_PRODUCTS_DATA"
                commit('SET_CUSTOM_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    //get products data
    getLowStockData({ commit, state }) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock-low?page=${state.page}`)
            //success
            .then((response) => {
                //commit ti mutation "SET_PRODUCTS_DATA"
                commit('SET_CUSTOM_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    //get products data
    getOutStockData({ commit, state }) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock-out?page=${state.page}`)
            //success
            .then((response) => {
                //commit ti mutation "SET_PRODUCTS_DATA"
                commit('SET_CUSTOM_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    //store product
    storeMinusStock({ dispatch, commit }, { id, payload }) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/admin/products" with method "POST"
            this.$axios.post(`/api/v1/admin/stock/min-stock/${id}`, payload)
            //success
            .then(() => {
                //dispatch action "getProductsData"
                dispatch('getStocksData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })
        })
    },
    //store product
    storePlusStock({ dispatch, commit }, { id, payload }) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/admin/products" with method "POST"
            this.$axios.post(`/api/v1/admin/stock/add-stock/${id}`, payload)
            //success
            .then(() => {
                //dispatch action "getProductsData"
                dispatch('getStocksData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })
        })
    },
    //get detail product
    getDetailStock({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //get to Rest API "/api/admin/products/:id" with method "GET"
            this.$axios.get(`/api/v1/admin/stock/${payload}`)
            //success
            .then(response => {
                //commit to mutation "SET_PRODUCT_DATA"
                commit('SET_STOCK_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    //upload product
    uploadStock({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/admin/categories" with method "POST"
            this.$axios.post('/api/v1/admin/import-stock', payload)
            //success
            .then(() => {
                //dispatch action "getCategoriesData"
                dispatch('getStocksData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })

        })
    },
    //get detail product
    getHistoryStock({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //get to Rest API "/api/admin/products/:id" with method "GET"
            this.$axios.post(`/api/v1/admin/stock/history/${payload}`)
            //success
            .then(response => {
                //commit to mutation "SET_PRODUCT_DATA"
                commit('SET_HISTORY_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
}