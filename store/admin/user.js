//state
export const state = () => ({
    users: [],
    page: 1,
})
//mutations
export const mutations = {
    SET_USERS_DATA(state, payload) {
        state.users = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_USER_DATA(state, payload) {
        state.user = payload
    },
}
//actions
export const actions = {
    getUsersData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/users?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_USERS_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    storeUser({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/users', payload)
            .then(() => {
                dispatch('getUsersData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/users/${payload}`)
            .then(response => {
                commit('SET_USER_DATA', response.data.data)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },

    updateUser({ dispatch, commit }, { userId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/users/${userId}`, payload)
            .then(() => {
                dispatch('getUsersData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyUser({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/users/${payload}`)
            .then(() => {
                dispatch('getUsersData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    }
}