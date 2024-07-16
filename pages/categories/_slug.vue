<template>
    <div class="container mt-custom py-3">
      <div class="fade-in">
        <div class="row">
            <div class="col-md-12">
                <h3>CATEGORY : <strong>{{ category.name.toUpperCase() }}</strong></h3>
                <!-- Solid divider -->
                <hr class="solid">
            </div>
        </div>
        <template v-if="category.products.length == 0 || category.products == null || !category.products">
          <div class="row py-2">
            <div class="col">
              <div class="alert alert-warning" role="alert">
                Belum Ada Produk!
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row row-cols-2 row-cols-md-6 g-1">
            <div class="col py-2" v-for="product in category.products" :key="product.id">
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
                      <div class="col">
                        <i class="fas fa-star text-danger"></i> <strong>{{parseFloat(product.reviews_avg_rating == null ? 0 : product.reviews_avg_rating)}}</strong>
                        &nbsp;
                        |
                        &nbsp;
                        <i class="fas fa-comment-alt text-secondary"></i> {{ product.reviews_count }}
                      </div>
                    </div>
                  </client-only> -->
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- <div class="container-fluid py-3">
          <div class="row">
            <div class="col">
              <h5 class="text-uppercase">BLOG</h5>
              Solid divider
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
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
  
      //meta
      head() {
        return {
          title: `Category : ${this.category.name}  - Bali Fun & Cheer`,
          meta: [{
              hid: 'og:title',
              name: 'og:title',
              content: `Category : ${this.category.name}  - Bali Fun & Cheer`
            },
            {
              hid: 'og:site_name',
              name: 'og:site_name',
              content: `Category : ${this.category.name}  - Bali Fun & Cheer`
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: `${this.category.image}`
            },
            {
              hid: 'description',
              name: 'description',
              content: `Category : ${this.category.name}  - Bali Fun & Cheer`
            },
          ]
        }
      },
  
      //hook "asyncData"
      async asyncData({ store , route}) {
        await store.dispatch('web/category/getDetailCategory', route.params.slug)
        await store.dispatch('web/article/getRandomArticle')
      },
  
      //computed
      computed: {
  
        //category
        category() {
          return this.$store.state.web.category.category
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
    },
  
  }
  </script>
  
  <style>
  
  </style>