//state
export const state = () => ({

    //Banners
    banners: [],

    //page
    page: 1,

})

//mutations
export const mutations = {

    //mutation "SET_Banners_DATA"
    SET_BANNERS_DATA(state, payload) {

        //set value state "Banners"
        state.banners = payload
    },

    //mutation "SET_PAGE"
    SET_PAGE(state, payload) {

        //set value state "page"
        state.page = payload
    },

}

//actions
export const actions = {

    //get Banners data
    getBannersData({ commit, state }, payload) {

        //search
        let search = payload ? payload : ''

        //set promise
        return new Promise((resolve, reject) => {

            //fetching Rest API "/api/admin/Banners" with method "GET"
            this.$axios.get(`/api/v1/admin/banners?q=${search}&page=${state.page}`)
            
            //success
            .then((response) => {

                //commit ti mutation "SET_Banners_DATA"
                commit('SET_BANNERS_DATA', response.data.data)

                //resolve promise
                resolve()
            })

        })

    },

    //store slider
    storeBanner({ dispatch, commit }, payload) {

        //set promise
        return new Promise((resolve, reject) => {

            //store to Rest API "/api/admin/sliders" with method "POST"
            this.$axios.post('/api/v1/admin/banners', payload)

            //success
            .then(() => {

                //dispatch action "getSlidersData"
                dispatch('getBannersData')

                //resolve promise
                resolve()

            })

            //error
            .catch(error => {
                reject(error)
            })

        })
    },
    //destroy slider
    destroyBanner({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //delete to Rest API "/api/admin/sliders/:id" with method "DELETE"
            this.$axios.delete(`/api/v1/admin/banners/${payload}`)
            //success
            .then(() => {
                //dispatch action "getSlidersData"
                dispatch('getBannersData')
                //resolve promise
                resolve()
            })
        })
    }

}