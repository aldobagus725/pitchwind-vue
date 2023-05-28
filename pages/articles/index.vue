<template>
    <div class="mt-custom mb-5">
      <div class="fade-in">
        <div class="container mt-4 mb-5">
          <div class="mb-4">
            <h5 class="text-uppercase"><i class="fa fa-shopping-bag"></i> ARTICLE</h5>
            <!-- Solid divider -->
            <hr class="solid">
            <template v-if="articles.data.length == 0 || articles.data == null">
                <div class="row py-2">
                  <div class="col">
                    <div class="alert alert-warning" role="alert">
                      Belum Ada Article!
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="row row-cols-2 row-cols-md-4 g-1">
                  <div class="col py-2" v-for="art in articles.data" :key="art.id">
                    <div class="card h-100 shadow">
                      <template v-if="art.image == null || art.image == '' || art.image == 'http://localhost:8000/storage/articles'  || art.image == 'https://pitchwind.dewatapartyshop.com/storage/articles'">
                        <img src="/images/product_placeholder.png" alt="bali funn cheer" class="card-img-top"> 
                      </template>
                      <template v-else>
                        <img :src="art.image" alt="bali funn cheer" class="card-img-top"> 
                      </template>
                      <div class="card-body">
                        <h4 class="font-weight-semibold"> 
                          <nuxt-link :to="{name: 'articles-slug', params: {slug: art.slug}}" data-abc="true">
                            {{ subStrTitle(art.title) }}
                          </nuxt-link> 
                        </h4> 
                        <h6 class="mb-0" style="color:black;">{{art.created_at}}</h6>
                        <br />
                        <p class="mb-2" style="color:grey;">
                            <span v-html="subStrText(stripHtml(art.body))"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
          <!-- pagination -->
              <div class="row justify-content-center mt-4 mb-4">
                  <div class="text-center">
                      <b-pagination align="center" :value="articles.current_page" :total-rows="articles.total"
                          :per-page="articles.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
      //meta
      head() {
        return {
          title: 'Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!',
          meta: [{
              hid: 'og:title',
              name: 'og:title',
              content: 'Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!'
            },
            {
              hid: 'og:site_name',
              name: 'og:site_name',
              content: 'Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!'
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: '/images/logo.png'
            },
            {
              hid: 'description',
              name: 'description',
              content: 'Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!'
            },
          ]
        }
      },
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('web/article/getArticlesData')
      },
      //computed
      computed: {
      //articles
          articles() {
            return this.$store.state.web.article.articles
          },
      },
      methods: {
        changePage(page) {
            this.$store.commit('web/article/SET_PAGE', page)
            this.$store.dispatch('web/article/getArticlesData', this.$route.query.q)
        },
      },

  }
  </script>
  