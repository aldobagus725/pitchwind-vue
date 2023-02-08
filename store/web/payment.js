//state
export const state = () => ({
    methods: [],
    channels: [],
    acc_number:[],
})
//mutations
export const mutations = {
    SET_METHODS(state, payload) {
        state.methods = payload
    },
    SET_CHANNELS(state, payload) {
        state.channels = payload
    },
    SET_ACC_NUMBER(state, payload) {
        state.acc_number = payload
    },
}
//actions
export const actions = {
    getMethods({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/paymethod`)
            .then((response) => {
                commit('SET_METHODS', response.data.data)
                resolve()
            })
        })
    },
    getChannels({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/paychannel`)
            .then((response) => {
                commit('SET_CHANNELS', response.data.data)
                resolve()
            })
        })
    },
    getAccNumber({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/web/payacc', payload)
            .then(() => {
                // dispatch('getArticlesData')
                commit('SET_ACC_NUMBER', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
}