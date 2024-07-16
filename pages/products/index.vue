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
              <div class="card h-100 shadow-sm">
                <template v-if="product.image == null || product.image == '' || product.image == 'http://localhost:8000/storage/products'  || product.image == 'https://pitchwind.dewatapartyshop.com/storage/products'">
                  <img src="/images/product_placeholder.png" alt="bali funn cheer" class="card-img-top"> 
                </template>
                <template v-else>
                  <img :src="product.image" alt="bali funn cheer" class="card-img-top"> 
                </template>
                <div class="card-body">
                  <!-- <div class="row py-2">
                    <div class="col text-right">
                      <template v-if="product.stock == 0">
                        <h6 class="mb-0 font-weight-semibold">
                          <span class="badge badge-danger">
                            <strong>Out Of Stock!</strong>
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
                  </div> -->
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
                  <a :href="askOnWhatsApp(product.title)" target="_blank" class="btn btn-success text-white fw-bold"><i class="fab fa-whatsapp"></i>&nbsp;ASK </a>
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
      </div>
    </div>
  </template>
  <script>
  export default {
      //meta
      head() {
        return {
          title: 'Products - Bali Fun & Cheer',
          meta: [{
              hid: 'og:title',
              name: 'og:title',
              content: 'Bali Fun & Cheer'
            },
            {
              hid: 'og:site_name',
              name: 'og:site_name',
              content: 'Bali Fun & Cheer'
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: '/images/logo.png'
            },
            {
              hid: 'description',
              name: 'description',
              content: 'Bali Fun & Cheer - Menjual Kebutuhan Acara, Pesta, Dll!'
            },
          ]
        }
      },
      async asyncData({ store }) {
          await store.dispatch('web/product/getProductsData')
          await store.dispatch('web/article/getRandomArticle')
      },
      computed: {
          products() {
              return this.$store.state.web.product.products
          },
          articles() {
            return this.$store.state.web.article.random_article
          },
      },
      methods: {
        changePage(page) {
            this.$store.commit('web/product/SET_PAGE', page)
            this.$store.dispatch('web/product/getProductsData', this.$route.query.q)
        },
      },
  }
  </script>
  
  <style>
  
  </style>