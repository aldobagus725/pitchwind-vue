//state
export const state = () => ({
    categories: [],
    page: 1,
    category: {}
})
//mutations
export const mutations = {
    SET_CATEGORIES_DATA(state, payload) {
        state.categories = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_CATEGORY_DATA(state, payload) {
        state.category = payload
    },
}
//actions
export const actions = {
    getCategoriesData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/categories?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_CATEGORIES_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storeCategory({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/categories', payload)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    uploadCategory({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/import-category', payload)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailCategory({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/categories/${payload}`)
            .then(response => {
                commit('SET_CATEGORY_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateCategory({ dispatch, commit }, { categoryId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/categories/${categoryId}`, payload)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyCategory({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/categories/${payload}`)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getListAllCategories({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/v1/web/categories')
            .then((response) => {
                commit('SET_CATEGORIES_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}