//state
export const state = () => ({
    //articles
    articles: [],
    //page
    page: 1,
    //page
    article: {
        
    },
})

//mutations
export const mutations = {
    //mutation "SET_ARTICLES_DATA"
    SET_ARTICLES_DATA(state, payload) {

        //set value state "articles"
        state.articles = payload
    },

    //mutation "SET_PAGE"
    SET_PAGE(state, payload) {

        //set value state "page"
        state.page = payload
    },

    //mutation "SET_ARTICLE_DATA"
    SET_ARTICLE_DATA(state, payload) {

        //set value state "article"
        state.article = payload
    },

}

//actions
export const actions = {
    //get articles data
    getArticlesData({ commit, state }, payload) {
        //search
        let search = payload ? payload : ''
        //set promise
        return new Promise((resolve, reject) => {
            //fetching Rest API "/api/admin/articles" with method "GET"
            this.$axios.get(`/api/v1/admin/articles?q=${search}&page=${state.page}`)
            //success
            .then((response) => {
                //commit ti mutation "SET_ARTICLES_DATA"
                commit('SET_ARTICLES_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    //store article
    storeArticle({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/admin/articles" with method "POST"
            this.$axios.post('/api/v1/admin/articles', payload)
            //success
            .then(() => {
                //dispatch action "getArticlesData"
                dispatch('getArticlesData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })

        })
    },
    //get detail article
    getDetailArticle({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //get to Rest API "/api/admin/articles/:id" with method "GET"
            this.$axios.get(`/api/v1/admin/articles/${payload}`)
            //success
            .then(response => {
                //commit to mutation "SET_ARTICLE_DATA"
                commit('SET_ARTICLE_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },
    //update article
    updateArticle({ dispatch, commit }, { productId, payload }) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/admin/articles/:id" with method "POST"
            this.$axios.post(`/api/v1/admin/articles/${productId}`, payload)
            //success
            .then(() => {
                //dispatch action "getArticlesData"
                dispatch('getArticlesData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })
        })
    },
    //destroy articles
    destroyArticle({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //delete to Rest API "/api/admin/articles/:id" with method "DELETE"
            this.$axios.delete(`/api/v1/admin/articles/${payload}`)
            //success
            .then(() => {
                //dispatch action "getArticlesData"
                dispatch('getArticlesData')
                //resolve promise
                resolve()
            })
        })
    },
}