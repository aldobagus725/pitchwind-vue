<template>
    <div class="container mt-custom py-3">
      <div class="fade-in">
       <div class="row">
            <div class="col-md-12">
                <h3>PENCARIAN DENGAN KATA KUNCI : <strong>{{ $route.query.q }}</strong></h3>
                <!-- Solid divider -->
                <hr class="solid">
            </div>
        </div>  
        <div class="row row-cols-2 row-cols-md-5" v-if="products.data.length > 0">
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
                  <!-- <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted" style="font-size:0.8rem;" data-abc="true">
                    {{ product.category.name }}
                  </nuxt-link> -->
                  <h5 class="mb-0 font-weight-bold" style="color:black;">Rp. {{ formatPrice(calculateDiscount(product)) }}</h5>
                  <h6 class="mb-0 font-weight-semibold" v-if="product.discount != 0">
                    <span class="badge badge-danger">
                      <strong>{{ product.discount }} %</strong>
                    </span>
                    <s class="text-red">Rp {{ formatPrice(product.price) }}</s>
                  </h6>
                  <div class="row">
                    <div class="col text-right">
                      <a :href="askOnWhatsApp(product.title)" target="_blank" class="btn btn-sm btn-success text-white fw-bold"><i class="fab fa-whatsapp"></i>&nbsp;ASK </a>
                    </div>
                  </div>
                  <!-- <client-only>
                    <div class="row py-2 align-items-center">
                      <div class="col-sm-7">
                        <i class="fas fa-star text-danger"></i> <strong>{{parseFloat(product.reviews_avg_rating == null ? 0 : product.reviews_avg_rating)}}</strong>
                        &nbsp;
                        |
                        &nbsp;
                        <i class="fas fa-comment-alt text-secondary"></i> {{ product.reviews_count }}
                        <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="14" :read-only="true" :show-rating="true" :inline="true"></vue-star-rating> 
                      </div>
                    </div>
                  </client-only> -->
                </div>
              </div>
            </div>
          </div>
        <div class="row justify-content-center" v-else>
          <div class="col-md-12">
            <b-alert show variant="danger">PRODUCT DATA NOT FOUND!</b-alert>
          </div>
        </div>
        <!--pagination -->
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
          title: `Pencarian untuk : ${this.$route.query.q} - Bali Fun & Cheer BALI`,
        }
      },
      //watch query URL
      watchQuery: ["q"],
      //hook "asyncData"
      async asyncData({ store, query }) {
        await store.dispatch('web/product/getProductsData', query.q)
      },
      //computed
      computed: {
        products() {
          return this.$store.state.web.product.products
        },
      },
      methods: {
        changePage(page) {
          this.$store.commit('web/product/SET_PAGE', page)
          this.$store.dispatch('web/product/getProductsData', this.$route.query.q)
        },
      }
    }
  </script>
  
  <style>
  
  </style>