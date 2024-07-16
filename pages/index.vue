<template>
  <div class="mt-custom mb-5">
    <div class="fade-in">
      <!-- Banner -->
      <Banner />
      <div class="container mt-4 mb-5">
        <div class="mb-4">
          <h5 class="text-uppercase"><i class="fa fa-shopping-bag"></i> LATEST PRODUCT</h5>
          <!-- Solid divider -->
          <hr class="solid">
        </div>
        <template v-if="products.data.length == 0 || products.data == null || !products">
          <div class="row py-2">
            <div class="col">
              <div class="alert alert-warning" role="alert">
                NO AVAILABLE PRODUCT YET!
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row row-cols-2 row-cols-md-5">
            <div class="col mb-4" v-for="product in products.data" :key="product.id">
              <div class="card h-100 shadow-sm">
                <template v-if="product.image == null || product.image == '' || product.image == 'http://localhost:8000/storage/products'  || product.image == 'https://pitchwind.dewatapartyshop.com/storage/products'">
                  <img src="/images/product_placeholder.png" alt="bali funn cheer" class="card-img-top"> 
                </template>
                <template v-else>
                  <img :src="product.image" alt="bali funn cheer" class="card-img-top"> 
                </template>
                <div class="card-body">
                  <div class="row align-items-top py-2">
                    <template v-if="product.promo_id != '' && product.promo_id != null">
                      <div class="col">
                        <h6 class="mb-0 font-weight-semibold">
                          <span class="badge badge-primary">
                            <strong>{{product.promo.title}}</strong>
                          </span>
                        </h6>
                      </div>
                    </template>
                    <!-- <div class="col text-right">
                      <template v-if="product.stock == 0">
                        <h6 class="mb-0 font-weight-semibold">
                          <span class="badge badge-danger">
                            <strong>Sold Out!</strong>
                          </span>
                        </h6>
                      </template>
                      <template v-else-if="product.stock <= product.minimum_stock_alert && product.stock != 0">
                          <h6 class="mb-0 font-weight-semibold">
                            <span class="badge badge-warning">
                              <strong>Low On Stock</strong>
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
                    </div> -->
                  </div>
                  <h6 style="font-size:0.8rem;" class="font-weight-semibold"> 
                    <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" data-abc="true">
                      {{ subStrTitle(product.title) }}
                    </nuxt-link> 
                  </h6> 
                  <h5 class="font-weight-bold" style="color:black;">Rp. {{ formatPrice(calculateDiscount(product)) }}</h5>
                  <h6 class="font-weight-semibold" v-if="product.discount != 0">
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
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-4">
            <div class="text-center">
              <nuxt-link :to="{name: 'products'}" class="btn btn-lg btn-primary border-0 rounded shadow"><h4>SEE MORE</h4></nuxt-link>
            </div>
          </div>
        </template>
        <!-- <div class="container-fluid py-3">
          <div class="row">
            <div class="col">
              <h5 class="text-uppercase">BLOG</h5>
              <hr class="solid">
              <template v-if="articles.length == 0 || articles == null">
              </template>
              <template v-else>
                <div class="row row-cols-2 row-cols-md-5 g-1">
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
                        <h6 class="mb-0" style="color:black;">{{formatProperDate(artic.created_at)}}</h6>
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
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Banner from '@/components/web/banner.vue'

export default {
    //register components
    components: {
      Banner,
    },
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
    },
  name: 'IndexPage'
}
</script>
