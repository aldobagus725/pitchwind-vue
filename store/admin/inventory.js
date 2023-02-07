//state
export const state = () => ({
    inventories: [],
    page: 1,
    inventory: {}
})
//mutations
export const mutations = {
    SET_INVENTORIES_DATA(state, payload) {
        state.inventories = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_INVENTORY_DATA(state, payload) {
        state.inventory = payload
    },
}
//actions
export const actions = {
    getAllOfInventories({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/inventory?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_INVENTORIES_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storeInventory({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/inventory', payload)
            .then(() => {
                dispatch('getAllOfInventories')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getOneInventory({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/inventory/${payload}`)
            .then(response => {
                commit('SET_INVENTORY_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateInventory({ dispatch, commit }, { dataId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/inventory/${dataId}`, payload)
            .then(() => {
                dispatch('getAllOfInventories')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyInventory({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/inventory/${payload}`)
            .then(() => {
                dispatch('getAllOfInventories')
                resolve()
            }).catch(e=>{
                console.log(e)
                dispatch('getAllOfInventories')
                reject(e)
            })
        })
    },
}