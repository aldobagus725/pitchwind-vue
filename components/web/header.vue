<template>
    <!-- <Loading
      v-model:active="isLoading"
      :transition="fade"
      :is-full-page="fullPage"
    /> -->
    <header class="section-header sticky-top shadow-sm">
      <section class="header-main border-bottom">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-lg-3 col-sm-4 col-md-4 col-7"> 
                <nuxt-link to="/" data-abc="true">
                  <img src="/images/logo.png" alt="bali funn cheer" width="35" class="rounded shadow-sm">&nbsp;
                  <template v-if="resoDetect() == 'mobile'">
                    <span class="logo">BALI</span>
                  </template>
                  <template v-if="resoDetect() == 'tablet'">
                    <span class="logo">FUN & CHEER </span>
                  </template>
                  <template v-else>
                    <span class="logo">BALI FUN & CHEER</span>
                  </template>
                </nuxt-link>
            </div>
            <div class="col-lg-4 col-xl-5 col-sm-8 col-md-4 d-none d-md-block">
              <div class="search-wrap">
                <div class="input-group w-100"> 
                  <input type="text" @keypress.enter="searchData()" v-model="search" class="form-control search-form" style="width:55%;" placeholder="Search Product....">
                  <div class="input-group-append"> 
                    <button @click="searchData()" class="btn btn-info search-button"> <i class="fa fa-search"></i> </button>  
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-lg-5 col-xl-4 col-sm-8 col-md-4 col-5">
              <div class="d-flex justify-content-end">
                <nuxt-link :to="{name: 'carts'}" class="btn search-button btn-md d-md-block ml-4"><i class="fa fa-shopping-cart"></i> <span class="ml-2">{{ cartTotal }}</span> | Rp. {{ formatPrice(cartPrice) }}</nuxt-link>
              </div>
            </div> -->
          </div>
        </div>
      </section>
      <nav id="topNav" class="navbar navbar-expand-md navbar-main border-bottom p-2">
        <div class="container-fluid">
          <div class="d-md-none my-2">
            <div class="input-group"> 
              <input type="search" name="search" class="form-control" placeholder="mau belanja apa hari ini ?">
              <div class="input-group-append"> 
                <button class="btn btn-warning"> <i class="fa fa-search"></i></button> 
              </div>
            </div>
          </div> 
          <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#dropdown6"
            aria-expanded="false"> <span class="navbar-toggler-icon"></span> </button>
          <div class="navbar-collapse collapse " id="dropdown6">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown text-light"> <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
                  data-abc="true" aria-expanded="false"><i class="fa fa-list-ul"></i> CATEGORIES</a>
                <div class="dropdown-menu">
                  <nuxt-link :to="{name: 'categories-slug', params: {slug: category.slug}}" class="dropdown-item" v-for="category in categories" :key="category.id">
                    <img :src="category.image" width="50"> {{ category.name }}
                  </nuxt-link>
                  <div class="dropdown-divider"></div>
                  <nuxt-link :to="{name: 'categories'}" class="dropdown-item active text-center" href="" data-abc="true">
                    SEE ALL <i class="fa fa-long-arrow-alt-right"></i>
                  </nuxt-link>
                </div>
              </li>
              <li class="nav-item"> <nuxt-link :to="{name: 'products'}" class="nav-link" data-abc="true"><i class="fa fa-shopping-bag"></i> PRODUCTS</nuxt-link> </li>
              <!-- <li class="nav-item"> <nuxt-link :to="{name: 'about'}" class="nav-link" data-abc="true"> <i class="fa fa-info-circle"></i> ABOUT </nuxt-link></li> -->
              <!-- <li class="nav-item"> <nuxt-link :to="{name: 'contact'}" class="nav-link" data-abc="true"> <i class="fa fa-comments"></i> CONTACTS </nuxt-link> </li> -->
              <!-- <li class="nav-item"> <nuxt-link :to="{name: 'articles'}" class="nav-link" data-abc="true"> <i class="fa fa-bars "></i> BLOG </nuxt-link> </li> -->
              <!-- <li class="nav-item"> <nuxt-link :to="{name: 'privacy'}" class="nav-link" data-abc="true"> <i class="fa fa-user-secret "></i> PRIVACY </nuxt-link> </li> -->
              <!-- <li class="nav-item"> <nuxt-link :to="{name: 'tos'}" class="nav-link" data-abc="true"> <i class="fa fa-file-alt "></i> ToS </nuxt-link> </li> -->
            </ul>
            <!-- <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown" v-if="!$auth.loggedIn">
                <nuxt-link :to="{name: 'customer-login'}" class="nav-link" href="#" role="button" aria-expanded="false"> <i class="fa fa-sign-in-alt"></i>
                  LOGIN</nuxt-link>
              </li>
              <li v-if="$auth.loggedIn" class="nav-item dropdown text-light"> <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
                data-abc="true" aria-expanded="false"> <i class="fa fa-user-circle"></i> {{$auth.user.name}} </a>
                <div class="dropdown-menu">
                  <nuxt-link :to="{name: 'customer-dashboard'}" class="nav-link" role="button" aria-expanded="false"> <i class="fa fa-tachometer-alt"></i>
                    DASHBOARD</nuxt-link>
                  <nuxt-link :to="{name: 'customer-invoices'}" class="nav-link" role="button" aria-expanded="false">
                    <i class="fa fa-shopping-cart"></i> ORDERS
                  </nuxt-link>
                  <a @click="logout" class="nav-link" role="button" style="cursor: pointer;"> <i class="fa fa-sign-out-alt"></i> LOGOUT <div v-show="isLoading" class="spinner-border text-secondary" role="status">
                    
                  </div>
                  </a>
                </div>
              </li>
            </ul> -->
          </div>
        </div>
      </nav>
    </header>
  </template>
  <script>
    import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
    export default {
    data() {
        return {
          isLoading: false,
          search: ''
        }
      },
      async fetch() {
        await this.$store.dispatch('web/category/getCategoriesData')
        if(this.$auth.loggedIn && this.$auth.strategy.name == 'customer') {
          await this.$store.dispatch('web/cart/getCartsData')
          await this.$store.dispatch('web/cart/getCartPrice')
        }
      },
      mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
      jsonld() {
        return {
          // {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Bali Fun & Cheer",
            "image": "",
            "@id": "",
            "url": "https://balifunncheer.com",
            "telephone": "",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Blok CC 75, Jl. Perum Dalung Permai, Kerobokan Kaja, Kuta Utara, Badung Regency",
              "addressLocality": "Bali",
              "postalCode": "80361",
              "addressCountry": "ID"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -7.558887,
              "longitude": 110.851694
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://balifunncheer.com"
            ] 
        };
      },
      computed: {
        categories() {
          return this.$store.state.web.category.categories
        },
        cartPrice() {
          return this.$store.state.web.cart.cartPrice
        },
        cartTotal() {
          return this.$store.state.web.cart.carts.length
        },
      },
      methods: {
        searchData() {
          this.$router.push({
            name: 'search',
            query: {
              q: this.search
            }
          });
        },
        resoDetect(){
          if (this.$vssWidth <= 576){
            return 'mobile'
          } else if (this.$vssWidth <= 768)  {
            return 'tablet'
          } else {
            return 'pc'
          }
        },
        async logout() {
          this.isLoading = true
          await this.$auth.logout()
          this.$store.commit('web/cart/SET_CARTS_DATA', [])
          this.$store.commit('web/cart/SET_CART_PRICE', 0)
          this.isLoading = false
          this.$router.push({
            name: 'customer-login'
          })
        }

      },
    }
  </script>
  
  <style scoped>
    .btn {
      font-size: initial;
    }
    .dropdown-menu {
      max-height: 280px;
      overflow-y: auto;
    }
  </style>