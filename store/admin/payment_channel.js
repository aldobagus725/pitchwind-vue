//state
export const state = () => ({
    payment_channels: [],
    page: 1,
    payment_channel: {},
    list_payment_channels:[]
})
//mutations
export const mutations = {
    SET_PAYCHANNELS_DATA(state, payload) {
        state.payment_channels = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_PAYCHANNEL_DATA(state, payload) {
        state.payment_channel = payload
    },
    SET_LIST_PAYCHANNELS_DATA(state, payload) {
        state.list_payment_channels = payload
    },
}

//actions
export const actions = {
    getAllOfPaymentChannels({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/payment_channel?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_PAYCHANNELS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storePaymentChannel({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/payment_channel', payload)
            .then(() => {
                dispatch('getAllOfPaymentChannels')
                resolve()
            })
            .catch(error => {
                reject(error)
            })

        })
    },
    getOnePaymentChannel({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/payment_channel/${payload}`)
            .then(response => {
                commit('SET_PAYCHANNEL_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updatePaymentChannel({ dispatch, commit }, { dataId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/payment_channel/${dataId}`, payload)
            .then(() => {
                dispatch('getAllOfPaymentChannels')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyPaymentChannel({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/payment_channel/${payload}`)
            .then(() => {
                dispatch('getAllOfPaymentChannels')
                resolve()
            }).catch(e=>{
                console.log(e)
                dispatch('getAllOfPaymentChannels')
                reject(e)
            })
        })
    },
    getListOfPaymentChannels({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/get_list_of_paychannel`)
            .then((response) => {
                commit('SET_LIST_PAYCHANNELS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}