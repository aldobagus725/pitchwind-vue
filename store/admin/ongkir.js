//state
export const state = () => ({
    //products
    ongkirs: [],
    //page
    page: 1,
    //page
    ongkir: {
        
    },
})

//mutations
export const mutations = {
    SET_ONGKIRS_DATA(state, payload) {
        state.ongkirs = payload
    },
    //mutation "SET_PAGE"
    SET_PAGE(state, payload) {
        //set value state "page"
        state.page = payload
    },
    SET_ONGKIR_DATA(state, payload) {
        state.ongkir = payload
    },
}

//actions
export const actions = {
    //get products data
    getOngkirsData({ commit, state }, payload) {
        //search
        let search = payload ? payload : ''
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/ongkir?q=${search}&page=${state.page}`)
            //success
            .then((response) => {
                //commit ti mutation "SET_PRODUCTS_DATA"
                commit('SET_ONGKIRS_DATA', response.data.data)
                //resolve promise
                resolve()
            })

        })
    },
    storeOngkir({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/ongkir', payload)
            //success
            .then(() => {
                dispatch('getOngkirsData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailOngkir({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/ongkir/${payload}`)
            //success
            .then(response => {
                commit('SET_ONGKIR_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    updateOngkir({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/ongkir/${productId}`, payload)
            //success
            .then(() => {
                dispatch('getOngkirsData')
                //resolve promise
                resolve()

            })
            //error
            .catch(error => {
                reject(error)
            })

        })
    },
    destroyOngkir({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/ongkir/${payload}`)
            //success
            .then(() => {
                dispatch('getOngkirsData')
                //resolve promise
                resolve()
            })
        })
    },
}