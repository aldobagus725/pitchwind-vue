//state
export const state = () => ({
    banners: []
})
export const mutations = {
    SET_BANNERS_DATA(state, payload) {
        state.banners = payload
    }
}

export const actions = {
    getBannersData({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/v1/web/banners')
            .then((response) => {
                commit('SET_BANNERS_DATA', response.data.data)
                resolve()
            })
        })
    },
}