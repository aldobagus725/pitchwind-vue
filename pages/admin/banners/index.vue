<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-3">
                      <span class="font-weight-bold"><i class="fa fa-laptop"></i> BANNERS</span>
                    </div>
                    <div class="col-sm-9 text-right">
                      <nuxt-link :to="{name: 'admin-banners-create'}" class="btn btn-primary btn-sm mb-3 p-2">
                      <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <b-table striped bordered hover :items="banners.data" :fields="fields" show-empty>
                    <template v-slot:cell(image)="data">
                        <img class="img-fluid" width="200" :src="data.item.image" />
                    </template>
                    <template v-slot:cell(actions)="row">
                        <b-button variant="danger" @click="destroyBanner(row.item.id)">DELETE</b-button>
                      </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="banners.current_page" :total-rows="banners.total"
                    :per-page="banners.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
    export default {
  
      //layout
      layout: 'admin',
  
      //meta
      head() {
        return {
          title: 'Banners - Administrator',
        }
      },
  
      //data function
      data() {
        return {
          //table header
          fields: [{
              label: 'Image',
              key: 'image',
              tdClass: 'text-center'
            },
            {
              label: 'Link Banner',
              key: 'link'
            },
            {
              label: 'Actions',
              key: 'actions',
              tdClass: 'text-center'
            }
          ],
        }
      },
  
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/banner/getBannersData')
      },
  
      //computed
      computed: {
  
          //banners
          banners() {
              return this.$store.state.admin.banner.banners
          },
      },
  
      //method
      methods: {
  
          //method "changePage"
          changePage(page) {
  
              //commit to mutation "SET_PAGE"
              this.$store.commit('admin/banner/SET_PAGE', page)
  
              //dispatch on action "getBannersData"
              this.$store.dispatch('admin/banner/getBannersData', this.search)
          },

          //method "destroySlider"
        destroyBanner(id) {
          this.$swal.fire({
            title: 'ARE YOU SURE ?',
            text: "TO ERASE THIS DATA !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YES!',
            cancelButtonText: 'NO',
          }).then((result) => {
            if (result.isConfirmed) {
              //dispatch to action "destroySlider" vuex
              this.$store.dispatch('admin/banner/destroyBanner', id)
                .then((e) => {
                  console.log(e)
                  //feresh data
                  this.$nuxt.refresh()
                  //alert
                  this.$swal.fire({
                    title: 'SUCCESS!',
                    text: "Data Erased Successfully!",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                  })

                })
            }
          })
        }
      }
  
    }
  </script>
  
  <style>
  
  </style>