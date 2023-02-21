//state
export const state = () => ({
    decorations: [],
    page: 1,
    decoration: {},
})
//mutations
export const mutations = {
    SET_DECORATIONS_DATA(state, payload) {
        state.decorations = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_DECORATION_DATA(state, payload) {
        state.decoration = payload
    },
}

//actions
export const actions = {
    getDecorationsData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/decoration_cost?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_DECORATIONS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storeDecoration({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/decoration_cost', payload)
            .then(() => {
                dispatch('getDecorationsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailDecoration({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/decoration_cost/${payload}`)
            .then(response => {
                commit('SET_DECORATION_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateDecoration({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/decoration_cost/${productId}`, payload)
            .then(() => {
                dispatch('getDecorationsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyDecoration({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/decoration_cost/${payload}`)
            .then(() => {
                dispatch('getDecorationsData')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}