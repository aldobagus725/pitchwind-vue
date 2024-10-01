<template>
    <div class="container mt-custom mb-5">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card border-0 rounded shadow-sm">
              <div class="card-body">
                <template v-if="product.image == null || product.image == '' || product.image == 'http://localhost:8000/storage/products'  || product.image == 'https://pitchwind.dewatapartyshop.com/storage/products'">
                    <img src="/images/product_placeholder.png" alt="bali funn cheer" class="w-100 rounded"> 
                  </template>
                  <template v-else>
                    <img :src="product.image" alt="bali funn cheer" class="w-100 rounded"> 
                  </template>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card border-0 rounded shadow-sm">
              <div class="card-body">
                <h3>{{ product.title }}</h3>
                <hr>
                <h5 class="mb-0 font-weight-semibold" v-if="product.discount != 0">
                    <span class="badge badge-danger">
                      <strong>{{ product.discount }} %</strong>
                    </span>
                    <s class="text-red">Rp {{ formatPrice(product.price) }}</s>
                </h5>
                <!-- <h6 class="mb-0 font-weight-semibold"><s class="text-red">Rp. {{ formatPrice(product.price) }}</s> /
                  <strong>{{ product.discount }} %</strong></h6> -->
                  <h4 class="mb-0 font-weight-bold" style="color:black;">Rp. {{ formatPrice(calculateDiscount(product)) }}</h4>
                <!-- <h5 class="mb-0 font-weight-semibold mt-3 text-success">Rp. {{ formatPrice(calculateDiscount(product)) }}
                </h5> -->
                <div class="mt-3 py-2">
                  <div v-html="product.description"></div>
                </div>
                <div class="table-responsive">
                  <table class="table table-sm table-borderless mb-0">
                    <tbody>
                      <client-only>
                      <tr>
                        <th class="pl-0 w-25" scope="row"><strong>BERAT</strong></th>
                        <td><strong>{{ product.weight }}</strong> gram</td>
                      </tr>
                      <!-- <tr>
                        <th class="pl-0 w-25" scope="row"><strong>STOK</strong></th>
                        <td><strong>{{ product.stock }}</strong></td>
                      </tr> -->
                      </client-only>
                    </tbody>
                  </table>
                </div>
                <hr>
                <a :href="askOnWhatsApp(product.title)" target="_blank" class="btn btn-success text-white fw-bold"><i class="fab fa-whatsapp"></i>&nbsp;ASK ON WHATSAPP</a>
                <!-- <template v-if="product.stock == 0 || product.stock == null">
                    <button disabled class="btn btn-lg btn-warning border-0 shadow-sm"><i class="fa fa-shopping-cart"></i> TAMBAH KE
                        KERANJANG</button>
                </template>
                <template v-else>
                  <button @click="addToCart(product.id, calculateDiscount(product), product.weight)" class="btn btn-lg btn-warning border-0 shadow-sm"><i class="fa fa-shopping-cart"></i> TAMBAH KE
                    KERANJANG</button>
                </template> -->
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row mt-4">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow">
              <div class="card-body">
                <h4><i class="fa fa-comments"></i> ULASAN PRODUK ( <strong>{{ product.reviews_count }}</strong> ulasan )</h4>
                <hr>
                <div class="card bg-light shadow-sm rounded" v-for="review in product.reviews" :key="review.id">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-1">
                        <div class="review-avatar avatar-sm">
                          <img :src="`https://ui-avatars.com/api/?name=${review.customer.name}&amp;background=4e73df&amp;color=ffffff&amp;size=100`">
                        </div>
                      </div>
                      <div class="col-md-11">
                        <client-only>
                          <vue-star-rating class="mb-2" :rating="review.rating" :star-size="20" :read-only="true" :show-rating="false">
                          </vue-star-rating>
                        </client-only>
                        <strong>
                          <span class="text-dark">{{ review.customer.name }}</span>
                        </strong>
                        <div class="description mt-2">
                          <span style="color: rgb(119, 118, 118);font-size:15px;font-style:italic">
                            {{ review.review }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          title: `${this.product.title} - Bali Fun & Cheer BALI - Toko Menjual Alat Dekorasi Pesta, dll`,
          meta: [{
              hid: 'og:title',
              name: 'og:title',
              content: `${this.product.title} - Bali Fun & Cheer BALI - Toko Menjual Alat Dekorasi Pesta, dll`,
            },
            {
              hid: 'og:site_name',
              name: 'og:site_name',
              content: `${this.product.title} - Bali Fun & Cheer BALI - Toko Menjual Alat Dekorasi Pesta, dll`,
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: this.product.image
            },
            {
              hid: 'description',
              name: 'description',
              content: `${this.product.title.substr(0, 30)}...`,
            },
          ]
        }
      },
      //hook "asyncData"
      async asyncData({ store, route }) {
        await store.dispatch('web/product/getDetailProduct', route.params.slug)
        await store.dispatch('web/article/getRandomArticle')
      },
      //computed
      computed: {
        //product
        product() {
          return this.$store.state.web.product.product
        },
        articles() {
            return this.$store.state.web.article.random_article
          },
      },
      //method
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
        // askOnWhatsApp(productName = ""){
        //   let url = "https://web.whatsapp.com/send?phone=6281333267597&text=Hello%2C%20I%20want%20more%20info%20about%20"
        //   let productNameProcessed = productName.replace(" ","\%20")
        //   let urlProcessed = url+productNameProcessed
        //   return urlProcessed
        // },
        stripHtml(text){
            let regex = /(<([^>]+)>)/ig;
            return text.replace(regex, "");
        },
        //method "addToCart"
        async addToCart(productId, price, weight) {
          //check loggedIn "false"
          if (!this.$auth.loggedIn) {
            //redirect
            return this.$router.push({
              name: 'customer-login'
            })
          }
          //check customer role
          if (this.$auth.strategy.name != "customer") {
            //redirect
            return this.$router.push({
              name: 'customer-login'
            })
          }
          //dispatch to action "storeCart" vuex
          await this.$store.dispatch('web/cart/storeCart', {
              product_id: productId,
              price: price,
              qty: 1,
              weight: weight
            })
            //success add to cart
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Product Berhasil Ditambahkan di Keranjang!",
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              })
            })
        }
      }
    }
  </script>
  
  <style>
  
  </style>