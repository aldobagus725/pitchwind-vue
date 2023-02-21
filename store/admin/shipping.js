//state
export const state = () => ({
    shippings: [],
    page: 1,
    shipping: {},
})
//mutations
export const mutations = {
    SET_SHIPPINGS_DATA(state, payload) {
        state.shippings = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_SHIPPING_DATA(state, payload) {
        state.shipping = payload
    },
}

//actions
export const actions = {
    getShippingsData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/shipping_area?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_SHIPPINGS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storeShipping({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/shipping_area', payload)
            .then(() => {
                dispatch('getShippingsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailShipping({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/shipping_area/${payload}`)
            .then(response => {
                commit('SET_SHIPPING_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateShipping({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/shipping_area/${productId}`, payload)
            .then(() => {
                dispatch('getShippingsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyShipping({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/shipping_area/${payload}`)
            .then(() => {
                dispatch('getShippingsData')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}