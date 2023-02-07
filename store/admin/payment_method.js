//state
export const state = () => ({
    payment_methods: [],
    page: 1,
    payment_method: {},
    list_payment_methods:[]
})
//mutations
export const mutations = {
    SET_PAYMETHODS_DATA(state, payload) {
        state.payment_methods = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_PAYMETHOD_DATA(state, payload) {
        state.payment_method = payload
    },
    SET_LIST_PAYMETHODS_DATA(state, payload) {
        state.list_payment_methods = payload
    },
}

//actions
export const actions = {
    getAllOfPaymentMethods({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/payment_method?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_PAYMETHODS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storePaymentMethod({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/payment_method', payload)
            .then(() => {
                dispatch('getAllOfPaymentMethods')
                resolve()
            })
            .catch(error => {
                reject(error)
            })

        })
    },
    getOnePaymentMethod({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/payment_method/${payload}`)
            .then(response => {
                commit('SET_PAYMETHOD_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updatePaymentMethod({ dispatch, commit }, { dataId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/payment_method/${dataId}`, payload)
            .then(() => {
                dispatch('getAllOfPaymentMethods')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyPaymentMethod({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/payment_method/${payload}`)
            .then(() => {
                dispatch('getAllOfPaymentMethods')
                resolve()
            }).catch(e=>{
                console.log(e)
                dispatch('getAllOfPaymentMethods')
                reject(e)
            })
        })
    },
    getListOfPaymentMethods({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/get_list_of_paymethod`)
            .then((response) => {
                commit('SET_LIST_PAYMETHODS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}