//state
export const state = () => ({
    //products
    settings: [],
    //page
    page: 1,
    //page
    setting: {
        
    },
})

//mutations
export const mutations = {
    SET_SETTINGS_DATA(state, payload) {
        state.settings = payload
    },
    //mutation "SET_PAGE"
    SET_PAGE(state, payload) {
        //set value state "page"
        state.page = payload
    },
    SET_SETTING_DATA(state, payload) {
        state.setting = payload
    },
}

//actions
export const actions = {
    //get products data
    getSettingsData({ commit, state }, payload) {
        //search
        let search = payload ? payload : ''
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/settings?q=${search}&page=${state.page}`)
            //success
            .then((response) => {
                //commit ti mutation "SET_PRODUCTS_DATA"
                commit('SET_SETTINGS_DATA', response.data.data)
                //resolve promise
                resolve()
            })

        })
    },
    storeSetting({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/settings', payload)
            //success
            .then(() => {
                dispatch('getSettingsData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailSetting({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/settings/${payload}`)
            //success
            .then(response => {
                commit('SET_SETTING_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    updateSetting({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/settings/${productId}`, payload)
            //success
            .then(() => {
                dispatch('getSettingsData')
                //resolve promise
                resolve()

            })
            //error
            .catch(error => {
                reject(error)
            })

        })
    },
    destroySetting({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/settings/${payload}`)
            //success
            .then(() => {
                dispatch('getSettingsData')
                //resolve promise
                resolve()
            })
        })
    },
}