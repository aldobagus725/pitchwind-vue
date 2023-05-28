<template>
    <div class="mt-custom mb-5">
      <div class="fade-in">
        <div class="container mt-4 mb-5">
          <div class="mb-4">
            <h5 class="text-uppercase">BLOG</h5>
            <!-- Solid divider -->
            <hr class="solid">
            <div class="row py-3">
                <div class="col">
                    <h2>{{article.title}}</h2><br />
                    <h4>{{article.created_at}}</h4>
                    <br />
                    <div class="py-3 text-center">
                        <img :src="article.image" alt="bali funn cheer" style="width:40%" />
                    </div>
                    <div class="mb-3">
                        <span v-html="article.body"></span>
                    </div>
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
          title: `BLOG - ${this.article.title} - Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!`,
          meta: [{
              hid: 'og:title',
              name: 'og:title',
              content: `BLOG - ${this.article.title} - Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!`
            },
            {
              hid: 'og:site_name',
              name: 'og:site_name',
              content: `BLOG - ${this.article.title} - Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!`
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: '/images/logo.png'
            },
            {
              hid: 'description',
              name: 'description',
              content: `BLOG - ${this.article.title} - Bali Fun & Cheer - PARTY ? NO WORRIES, WE GOT YOU COVERED!`
            },
          ]
        }
      },
      //hook "asyncData"
      async asyncData({ store, route }) {
          await store.dispatch('web/article/getDetailArticle', route.params.slug)
      },
      //computed
      computed: {
      //products
          article() {
            // console.log(this.$store.state.web.article.article)
            return this.$store.state.web.article.article
          },
      },
      
  }
  </script>
  