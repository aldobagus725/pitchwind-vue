//state
export const state = () => ({
    stocks: [],
    page: 1,
    stock: {},
    stock_history:[],
    custom_stock:[],
})
//mutations
export const mutations = {
    SET_STOCKS_DATA(state, payload) {
        state.stocks = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_STOCK_DATA(state, payload) {
        state.stock = payload
    },
    SET_HISTORY_DATA(state, payload) {
        state.stock_history = payload
    },
    SET_CUSTOM_DATA(state, payload) {
        state.custom_stock = payload
    },
}
//actions
export const actions = {
    getStocksData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_STOCKS_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getOnStockData({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock-on?page=${state.page}`)
            .then((response) => {
                commit('SET_CUSTOM_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getLowStockData({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock-low?page=${state.page}`)
            .then((response) => {
                commit('SET_CUSTOM_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getOutStockData({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock-out?page=${state.page}`)
            .then((response) => {
                commit('SET_CUSTOM_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    storeMinusStock({ dispatch, commit }, { id, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/stock/min-stock/${id}`, payload)
            .then(() => {
                dispatch('getStocksData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    storePlusStock({ dispatch, commit }, { id, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/stock/add-stock/${id}`, payload)
            .then(() => {
                dispatch('getStocksData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailStock({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/stock/${payload}`)
            .then(response => {
                commit('SET_STOCK_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    uploadStock({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/import-stock', payload)
            .then(() => {
                dispatch('getStocksData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })

        })
    },
    getHistoryStock({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/stock/history/${payload}`)
            .then(response => {
                commit('SET_HISTORY_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
}