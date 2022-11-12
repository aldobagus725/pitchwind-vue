//state
export const state = () => ({

    //sliders
    banners: []

})

//mutations
export const mutations = {

    //mutation "SET_SLIDERS_DATA"
    SET_BANNERS_DATA(state, payload) {

        //set value state "sliders"
        state.banners = payload
    }

}

//actions
export const actions = {

    //get sliders data
    getBannersData({ commit }) {

        //set promise
        return new Promise((resolve, reject) => {

            //fetching Rest API "/api/web/sliders" with method "GET"
            this.$axios.get('/api/v1/web/banners')
            
            //success
            .then((response) => {

                //commit ti mutation "SET_SLIDERS_DATA"
                commit('SET_BANNERS_DATA', response.data.data)

                //resolve promise
                resolve()
            })

        })

    },

}