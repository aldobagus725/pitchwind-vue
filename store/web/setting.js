//state
export const state = () => ({
    //products
    settings: [],
    //page
    setting: {
    },
})

//mutations
export const mutations = {
    SET_SETTINGS_DATA(state, payload) {
        state.settings = payload
    },
    SET_SETTING_DATA(state, payload) {
        state.setting = payload
    },
}

//actions
export const actions = {
    // //get products data
    // getSettingsData({ commit, state }, payload) {
    //     //search
    //     let search = payload ? payload : ''
    //     //set promise
    //     return new Promise((resolve, reject) => {
    //         this.$axios.get(`/api/v1/web/settings?q=${search}&page=${state.page}`)
    //         //success
    //         .then((response) => {
    //             //commit ti mutation "SET_PRODUCTS_DATA"
    //             commit('SET_SETTINGS_DATA', response.data.data)
    //             //resolve promise
    //             resolve()
    //         })

    //     })
    // },
    getDetailSetting({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/web/settings/${payload}`)
            //success
            .then(response => {
                commit('SET_SETTING_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
}