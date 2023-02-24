//state
export const state = () => ({
    shippings: [],
    decorations: [],
})
//mutations
export const mutations = {
    SET_SHIPPINGS(state, payload) {
        state.shippings = payload
    },
    SET_DECORATIONS(state, payload) {
        state.decorations = payload
    },
}
//actions
export const actions = {
    getShippings({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/shipping_area/${payload}`)
            .then((response) => {
                commit('SET_SHIPPINGS', response.data.data)
                resolve()
            })
        })
    },
    getDecorations({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/decoration_cost`)
            .then((response) => {
                commit('SET_DECORATIONS', response.data.data)
                resolve()
            })
        })
    },
    getAllShippingArea({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/all_shipping_area`)
            .then((response) => {
                commit('SET_SHIPPINGS', response.data.data)
                resolve()
            })
        })
    },
}