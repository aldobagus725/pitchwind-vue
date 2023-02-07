//state
export const state = () => ({
    banners: [],
    page: 1,
})
//mutations
export const mutations = {
    SET_BANNERS_DATA(state, payload) {
        state.banners = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
}
//actions
export const actions = {
    getBannersData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/banners?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_BANNERS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storeBanner({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/banners', payload)
            .then(() => {
                dispatch('getBannersData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })

        })
    },
    destroyBanner({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/banners/${payload}`)
            .then(() => {
                dispatch('getBannersData')
                resolve().catch(error => {
                    reject(error)
                })
            })
        })
    }

}