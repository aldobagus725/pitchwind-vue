//state
export const state = () => ({
    articles: [],
    page: 1,
    article: {},
})
//mutations
export const mutations = {
    SET_ARTICLES_DATA(state, payload) {
        state.articles = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_ARTICLE_DATA(state, payload) {
        state.article = payload
    },
}

//actions
export const actions = {
    getArticlesData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/articles?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_ARTICLES_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    storeArticle({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/v1/admin/articles', payload)
            .then(() => {
                dispatch('getArticlesData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    getDetailArticle({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/admin/articles/${payload}`)
            .then(response => {
                commit('SET_ARTICLE_DATA', response.data.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateArticle({ dispatch, commit }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/v1/admin/articles/${productId}`, payload)
            .then(() => {
                dispatch('getArticlesData')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    destroyArticle({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/v1/admin/articles/${payload}`)
            .then(() => {
                dispatch('getArticlesData')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}