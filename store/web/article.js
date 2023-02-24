//state
export const state = () => ({
    articles: [],
    page: 1,
    article: {  
    },
    random_article:[],
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
    SET_RANDOM_ARTICLES_DATA(state, payload) {
        state.random_article = payload
    },
}
//actions
export const actions = {
    getArticlesData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/articles?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_ARTICLES_DATA', response.data.data)
                resolve()
            })
        })
    },
    getRandomArticle({ commit, state }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/articles/random`)
            .then((response) => {
                commit('SET_RANDOM_ARTICLES_DATA', response.data.data)
                resolve()
            })
        })
    },
    getDetailArticle({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/v1/web/articles/${payload}`)
            .then(response => {
                commit('SET_ARTICLE_DATA', response.data.data)
                resolve()
            })
        })
    },
}