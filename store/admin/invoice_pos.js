//state
export const state = () => ({
    invoices: [],
    page: 1,
    invoice:{},
})
export const mutations = {
    SET_INVOICES_DATA(state, payload) {
        state.invoices = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_INVOICE_DATA(state, payload) {
        state.invoice = payload
    },
}
//actions
export const actions = {
    getInvoicesData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/invoices_pos?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_INVOICES_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDetailInvoice({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/invoices_pos/${payload}`)
            .then(response => {
                commit('SET_INVOICE_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
}