//state
export const state = () => ({
    ongkirs: [],
    page: 1,
    ongkir: {},
})
//mutations
export const mutations = {
    SET_ONGKIRS_DATA(state, payload) {
        state.ongkirs = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_ONGKIR_DATA(state, payload) {
        state.ongkir = payload
    },
}
//actions
export const actions = {
    getOngkirsData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/ongkir?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_ONGKIRS_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    storeOngkir({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/ongkir', payload)
            .then(() => {
                dispatch('getOngkirsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailOngkir({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/ongkir/${payload}`)
            .then(response => {
                commit('SET_ONGKIR_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    updateOngkir({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/ongkir/${productId}`, payload)
            .then(() => {
                dispatch('getOngkirsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyOngkir({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/ongkir/${payload}`)
            .then(() => {
                dispatch('getOngkirsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
}