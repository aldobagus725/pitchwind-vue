//state
export const state = () => ({
    bank_accs: [],
    page: 1,
    bank_acc: {},
})
//mutations
export const mutations = {
    SET_BANKACCS_DATA(state, payload) {
        state.bank_accs = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_BANKACC_DATA(state, payload) {
        state.bank_acc = payload
    },
}
//actions
export const actions = {
    getAllOfPaymentBankAccs({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/payment_bank_acc?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_BANKACCS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storePaymentBankAcc({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/payment_bank_acc', payload)
            .then(() => {
                dispatch('getAllOfPaymentBankAccs')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getOnePaymentBankAcc({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/payment_bank_acc/${payload}`)
            .then(response => {
                commit('SET_BANKACC_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updatePaymentBankAcc({ dispatch, commit }, { dataId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/payment_bank_acc/${dataId}`, payload)
            .then(() => {
                dispatch('getAllOfPaymentBankAccs')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyPaymentBankAcc({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/payment_bank_acc/${payload}`)
            .then(() => {
                dispatch('getAllOfPaymentBankAccs')
                resolve()
            }).catch(e=>{
                console.log(e)
                dispatch('getAllOfPaymentBankAccs')
                reject(e)
            })
        })
    },
}