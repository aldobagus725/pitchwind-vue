//state
export const state = () => ({
    products: [],
    page: 1,
    product: {},
})
//mutations
export const mutations = {
    SET_PRODUCTS_DATA(state, payload) {
        state.products = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_PRODUCT_DATA(state, payload) {
        state.product = payload
    },
}
//actions
export const actions = {
    getProductsData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/products?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_PRODUCTS_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    storeProduct({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/products', payload)
            .then(() => {
                dispatch('getProductsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailProduct({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/products/${payload}`)
            .then(response => {
                commit('SET_PRODUCT_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    updateProduct({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/products/${productId}`, payload)
            .then(() => {
                dispatch('getProductsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyProduct({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/products/${payload}`)
            .then(() => {
                dispatch('getProductsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    uploadProduct({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/import-product-new', payload)
            .then(() => {
                dispatch('getProductsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    uploadProductUpdate({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/import-product-update', payload)
            .then(() => {
                dispatch('getProductsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
}