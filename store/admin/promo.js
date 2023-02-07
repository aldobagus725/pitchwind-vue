//state
export const state = () => ({
    promos: [],
    page: 1,
    promo: {},
    list_promos:[]
})
//mutations
export const mutations = {
    SET_PROMOS_DATA(state, payload) {
        state.promos = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_PROMO_DATA(state, payload) {
        state.promo = payload
    },
    SET_LIST_PROMOS_DATA(state, payload) {
        state.list_promos = payload
    },
}

//actions
export const actions = {
    getAllOfPromos({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/promo?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_PROMOS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storePromo({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/promo', payload)
            .then(() => {
                dispatch('getAllOfPromos')
                resolve()
            })
            .catch(error => {
                reject(error)
            })

        })
    },
    getOnePromo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/promo/${payload}`)
            .then(response => {
                commit('SET_PROMO_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updatePromo({ dispatch, commit }, { dataId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/promo/${dataId}`, payload)
            .then(() => {
                dispatch('getAllOfPromos')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyPromo({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/promo/${payload}`)
            .then(() => {
                dispatch('getAllOfPromos')
                resolve()
            }).catch(e=>{
                console.log(e)
                dispatch('getAllOfPromos')
                reject(e)
            })
        })
    },
    getListOfPromos({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/get_list_of_promos`)
            .then((response) => {
                commit('SET_LIST_PROMOS_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}