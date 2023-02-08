//state
export const state = () => ({
    invoices: [],
    page: 1,
    invoice: {},
    lastInvoice:[]
})

//mutations
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
    SET_LAST_INVOICE(state, payload) {
        state.lastInvoice = payload
    },
}

//actions
export const actions = {
    getInvoicesData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/customer/invoices?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_INVOICES_DATA', response.data.data)
                resolve()
            })
        })
    },
    getDetailInvoice({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/customer/invoices/${payload}`)
            .then(response => {
                commit('SET_INVOICE_DATA', response.data.data)
                resolve()
            })
        })
    },
    getDetailManualInvoice({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/customer/invoices/manual/${payload}`)
            .then(response => {
                commit('SET_INVOICE_DATA', response.data.data)
                resolve()
            })
        })
    },
    getLastTransaction({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/customer/invoices_latest`)
            .then(response => {
                commit('SET_LAST_INVOICE', response.data.data)
                resolve()
            })
        })
    },
    getInvoiceByStatus({ commit, state }, payload) {
        let status = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/customer/invoices_by_status?status=${status}&page=${state.page}`)
            .then((response) => {
                commit('SET_INVOICES_DATA', response.data.data)
                resolve()
            })
        })
    },
    
}