<template>
    <div class="container mt-custom">
      <div id="mycarousel" class="carousel slide" data-ride="carousel" data-interval="5000">
        <div class="carousel-inner shadow">
          <template v-if="banners.length <= 0">
            <div class="carousel-item active shadow">
              <img src="/images/banner_temp/dps_banner_dev_1.png" class="d-block w-100 rounded shadow">
            </div>
            <div class="carousel-item shadow">
              <img src="/images/banner_temp/dps_banner_dev_2.png" class="d-block w-100 rounded shadow">
            </div>
            <div class="carousel-item shadow">
              <img src="/images/banner_temp/dps_banner_dev_3.png" class="d-block w-100 rounded shadow">
            </div>
          </template>
          <template v-else>
            <div class="carousel-item shadow" v-for="(banner, id) in banners" :class="{ active: id==0 }" :key='banner.id'>
              <a :href="banner.link" target="_blank">
                  <img :src="banner.image" alt="bali funn cheer" class="d-block w-100 rounded shadow">
              </a> 
            </div>
          </template>
        </div> 
        <a class="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
          <div class="banner-icons"> <span class="fa fa-angle-left"></span> </div> <span class="sr-only">Previous</span>
        </a> 
        <a class="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
          <div class="banner-icons"> <span class="fa fa-angle-right"></span> </div> <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      data(){
        return{
          mama: null
        }
      },
  
      //hook "fetch"
      async fetch() {
        //fething sliders on Rest API
        await this.$store.dispatch('web/banner/getBannersData')
  
      },
  
      //computed
      computed: {
        //sliders
        banners() {
          return this.$store.state.web.banner.banners
        }
      },

      methods: {
        imageLoadError () {
          return '/images/banner_temp/dps_banner_dev_1.png'
        },
        async testImageLoad(image_url){
            console.log('haha')
            const ip = await this.$axios.$get(image_url)
            console.log(ip)
            console.log(ip.status)
            console.log(ip.data)
            if (ip.status != 200){

              return '/images/banner_temp/dps_banner_dev_1.png'
            } else {
              return image_url
            }
          },
      }
  
    }
  </script>
  
  <style>
  
  </style>