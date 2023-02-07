//state
export const state = () => ({
    settings: [],
    page: 1,
    setting: {},
})

//mutations
export const mutations = {
    SET_SETTINGS_DATA(state, payload) {
        state.settings = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_SETTING_DATA(state, payload) {
        state.setting = payload
    },
}
//actions
export const actions = {
    getSettingsData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/settings?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_SETTINGS_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    storeSetting({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/settings', payload)
            .then(() => {
                dispatch('getSettingsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailSetting({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/settings/${payload}`)
            .then(response => {
                commit('SET_SETTING_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    updateSetting({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/settings/${productId}`, payload)
            .then(() => {
                dispatch('getSettingsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })

        })
    },
    destroySetting({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/settings/${payload}`)
            .then(() => {
                dispatch('getSettingsData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
}