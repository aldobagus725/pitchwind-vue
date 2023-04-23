//state
export const state = () => ({
    user_detail:{}
})
//mutations
export const mutations = {
    SET_PROFILE(state, payload) {
        state.user_detail = payload
    },
}
//actions
export const actions = {
    storeRegister({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/customer/register', payload)
            .then(() => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getProfile({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/customer/profile`)
            .then(response => {
                commit('SET_PROFILE', response.data.user)
                resolve()
            })
        })
    },
    updateProfile({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put('/api/v1/customer/update_profile', payload)
            .then(() => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    updateAddress({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put('/api/v1/customer/update_address', payload)
            .then(() => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    updatePassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put('/api/v1/customer/update_password', payload)
            .then(() => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    checkEmailExist(payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/customer/password_reset/check_email_exist', payload)
            .then(() => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
}