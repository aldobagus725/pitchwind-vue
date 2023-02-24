//state
export const state = () => ({
    carts: [],
    cartPrice: 0,
    cartWeight: 0
})
//mutations
export const mutations = {
    SET_CARTS_DATA(state, payload) {
        state.carts = payload
    },
    SET_CART_PRICE(state, payload) {
        state.cartPrice = payload
    },
    SET_CART_WEIGHT(state, payload) {
        state.cartWeight = payload
    },
}
//actions
export const actions = {
    getCartsData({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/v1/web/carts')
            .then((response) => {
                commit('SET_CARTS_DATA', response.data.data)
                dispatch('getCartPrice')
                dispatch('getCartWeight')
                resolve()
            })
        })
    },
    getCartPrice({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/v1/web/carts/total_price')
            .then((response) => {
                commit('SET_CART_PRICE', response.data.data)
                resolve()
            })
        })
    },
    getCartWeight({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/v1/web/carts/total_weight')
            .then((response) => {
                commit('SET_CART_WEIGHT', response.data.data)
                resolve()
            })
        })
    },
    storeCart({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/web/carts', payload)
            .then(() => {
                dispatch('getCartsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    plusCart({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put('/api/v1/web/carts/plus_qty', payload)
            .then(() => {
                dispatch('getCartsData')
                resolve()
            })
        })
    },
    minusCart({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put('/api/v1/web/carts/minus_qty', payload)
            .then(() => {
                dispatch('getCartsData')
                resolve()
            })
        })
    },
    removeCart({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/web/carts/remove', payload)
            .then(() => {
                dispatch('getCartsData')
                resolve()
            })
        })
    },
}