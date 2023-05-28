<template>
    <div class="container-fluid mt-custom">
      <div class="fade-in">
        <div class="row justify-content-center">
            <div class="col-md-2 mb-3" v-for="category in categories" :key="category.id">
                <div class="card border-0 rounded shadow">
                    <div class="card-body text-center">
                        <nuxt-link :to="{name: 'categories-slug', params: {slug: category.slug}}">
                            <template v-if="category.image == null || category.image == '' || category.image == 'http://localhost:8000/storage/products'  || category.image == 'https://pitchwind.dewatapartyshop.com/storage/products'">
                            <img src="/images/product_placeholder.png" alt="bali funn cheer" width="100"> 
                        </template>
                        <template v-else>
                            <img :src="category.image" alt="bali funn cheer" width="100"> 
                        </template>
                          <!-- <img :src="category.image" > -->
                          <hr>
                          {{ category.name }}
                        </nuxt-link>
                    </div>
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
    
  </template>
  
  <script>
  export default {
  
      //meta
      head() {
        return {
          title: 'Semua Kategori - Bali Fun & Cheer',
          meta: [{
              hid: 'og:title',
              name: 'og:title',
              content: 'Semua Kategori - Bali Fun & Cheer'
            },
            {
              hid: 'og:site_name',
              name: 'og:site_name',
              content: 'Semua Kategori - Bali Fun & Cheer'
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: '/images/logo.png'
            },
            {
              hid: 'description',
              name: 'description',
              content: 'Semua Kategori dari Produk Bali Fun & Cheer'
            },
          ]
        }
      },
  
      //hook "asyncData"
      async asyncData({ store }) {
        await store.dispatch('web/category/getCategoriesData')
        await store.dispatch('web/article/getRandomArticle')
      },
  
      //computed
      computed: {
  
        //categories
        categories() {
          return this.$store.state.web.category.categories
        },
        articles() {
            return this.$store.state.web.article.random_article
          },
      },

      methods: {
      subStrTitle(title){
          var title_length = title.length
          if (title_length > 30){
            var result = title.substr(0,30) + "..."
            return result
          } else {
            return title
          }
        },
        subStrText(title){
          var title_length = title.length
          if (title_length > 30){
            var result = title.substr(0,30) + "..."
            return result
          } else {
            return title
          }
        },
        stripHtml(text){
            let regex = /(<([^>]+)>)/ig;
            return text.replace(regex, "");
        },
      }
  
  }
  </script>
  
  <style>
  
  </style>
