<template>
    <div class="mt-custom mb-5">
      <div class="fade-in">
        <div class="container mt-4 mb-5">
          <div class="mb-4">
            <h5 class="text-uppercase"><i class="fa fa-shopping-bag"></i> TENTANG KAMI</h5>
            <!-- Solid divider -->
            <hr class="solid">
            <div class="row py-3">
                <div class="col">
                    <span v-html="settings.value"></span>
                </div>
            </div>
          </div>
          <div class="container-fluid py-3">
            <div class="row">
              <div class="col">
                <h5 class="text-uppercase">BLOG</h5>
                <!-- Solid divider -->
                <hr class="solid">
                <template v-if="articles.length == 0 || articles == null">
                </template>
                <template v-else>
                  <div class="row row-cols-2 row-cols-md-4 g-1">
                    <div class="col py-2" v-for="artic in articles" :key="artic.id">
                      <div class="card h-100 shadow">
                        <template v-if="artic.image == null || artic.image == '' || artic.image == 'http://localhost:8000/storage/articles'  || artic.image == 'https://pitchwind.dewatapartyshop.com/storage/articles'">
                          <img src="/images/product_placeholder.png" alt="bali funn cheer" class="card-img-top"> 
                        </template>
                        <template v-else>
                          <img :src="artic.image" alt="bali funn cheer" class="card-img-top"> 
                        </template>
                        <div class="card-body">
                          <h4 class="font-weight-semibold"> 
                            <nuxt-link :to="{name: 'articles-slug', params: {slug: artic.slug}}" data-abc="true">
                              {{ subStrTitle(artic.title) }}
                            </nuxt-link> 
                          </h4> 
                          <h6 class="mb-0" style="color:black;">{{artic.created_at}}</h6>
                          <br />
                          <p class="mb-2" style="color:grey;">
                              <span v-html="subStrText(stripHtml(artic.body))"></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
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
      async asyncData({ store, route }) {
          await store.dispatch('web/setting/getDetailSetting', 'about_us')
          await store.dispatch('web/article/getRandomArticle')
      },
      //computed
      computed: {
      //products
          settings() {
            return this.$store.state.web.setting.setting
          },
          articles() {
            return this.$store.state.web.article.random_article
          },
      },
      methods: {
      },
  }
  </script>
  