<template>
    <div class="container mt-custom">
      <div class="fade-in">
        <!-- List Produk -->
        <template v-if="products.data.length == 0 || products.data == null">
          <div class="row py-2">
            <div class="col">
              <div class="alert alert-warning" role="alert">
                Belum Ada Produk!
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row row-cols-2 row-cols-md-5 g-1">
            <div class="col py-2" v-for="product in products.data" :key="product.id">
              <div class="card h-100 shadow">
                <template v-if="product.image == null || product.image == '' || product.image == 'http://localhost:8000/storage/products'  || product.image == 'https://pitchwind.dewatapartyshop.com/storage/products'">
                  <img src="/images/product_placeholder.png" class="card-img-top"> 
                </template>
                <template v-else>
                  <img :src="product.image" class="card-img-top"> 
                </template>
                <div class="card-body">
                  <div class="row py-2">
                    <div class="col text-right">
                      <template v-if="product.stock == 0">
                        <h6 class="mb-0 font-weight-semibold">
                          <span class="badge badge-danger">
                            <strong>Stok Habis</strong>
                          </span>
                        </h6>
                      </template>
                      <template v-else-if="product.stock <= product.minimum_stock_alert && product.stock != 0">
                          <h6 class="mb-0 font-weight-semibold">
                            <span class="badge badge-warning">
                              <strong>Hampir Habis</strong>
                            </span>
                          </h6>
                      </template>
                      <template v-else-if="product.stock > product.minimum_stock_alert">
                          <h6 class="mb-0 font-weight-semibold">
                            <span class="badge badge-success">
                              <strong>On Stock</strong>
                            </span>
                          </h6>
                      </template>
                    </div>
                  </div>
                  <h6 class="font-weight-semibold"> 
                    <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" data-abc="true">
                      {{ subStrTitle(product.title) }}
                    </nuxt-link> 
                  </h6> 
                  <h5 class="mb-0 font-weight-bold" style="color:black;">Rp. {{ formatPrice(calculateDiscount(product)) }}</h5>
                  <h6 class="mb-0 font-weight-semibold" v-if="product.discount != 0">
                    <span class="badge badge-danger">
                      <strong>{{ product.discount }} %</strong>
                    </span>
                    <s class="text-red">Rp {{ formatPrice(product.price) }}</s>
                  </h6>
                  <client-only>
                    <div class="row py-2 align-items-center">
                      <div class="col">
                        <i class="fas fa-star text-danger"></i> <strong>{{parseFloat(product.reviews_avg_rating == null ? 0 : product.reviews_avg_rating)}}</strong>
                        &nbsp;
                        |
                        &nbsp;
                        <i class="fas fa-comment-alt text-secondary"></i> {{ product.reviews_count }}
                        <!-- <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="14" :read-only="true" :show-rating="true" :inline="true"></vue-star-rating>  -->
                      </div>
                    </div>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </template>
          <!-- pagination -->
        <div class="row justify-content-center mt-4 mb-4">
            <div class="text-center">
                <b-pagination align="center" :value="products.current_page" :total-rows="products.total"
                    :per-page="products.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
                        <img src="/images/product_placeholder.png" class="card-img-top"> 
                      </template>
                      <template v-else>
                        <img :src="artic.image" class="card-img-top"> 
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
        title: 'Products - DEWATA PARTY SHOP BALI',
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: 'DEWATA PARTY SHOP BALI'
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'DEWATA PARTY SHOP BALI'
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: '/images/logo.png'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'DEWATA PARTY SHOP BALI - Menjual Kebutuhan Acara, Pesta, Dll!'
          },
        ]
      }
    },
    //hook "asyncData"
    async asyncData({ store }) {
        await store.dispatch('web/product/getProductsData')
        await store.dispatch('web/article/getRandomArticle')
    },
    //computed
    computed: {
        //products
        products() {
            return this.$store.state.web.product.products
        },
        articles() {
          return this.$store.state.web.article.random_article
        },
    },
    methods: {
      //method "changePage"
      changePage(page) {
          //commit to mutation "SET_PAGE"
          this.$store.commit('web/product/SET_PAGE', page)
          //dispatch on action "getProductsData"
          this.$store.dispatch('web/product/getProductsData', this.$route.query.q)
      },
    },
    }
  </script>
  
  <style>
  
  </style>