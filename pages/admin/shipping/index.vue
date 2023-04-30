<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-layer-group"></i> SHIPPING COST</span>
                </div>
                <div class="card-body">
                  <div class="form-group">
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                              <nuxt-link :to="{name: 'admin-shipping-create'}" class="btn btn-primary" style="padding-top: 10px;">
                              <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                          </div>
                          <input type="text" class="form-control" placeholder="search by area" v-model="search" @keypress.enter="searchData">
                          <div class="input-group-append">
                              <button @click="searchData" class="btn btn-dark"><i class="fa fa-search"></i>
                              SEARCH
                              </button>
                          </div>
                      </div>
                  </div>
                  <b-table responsive striped bordered hover :items="shippings.data" :fields="fields" show-empty>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button :to="{name: 'admin-shipping-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <!-- <b-button variant="danger" size="sm" @click="destroyShipping(row.item.id)">DELETE</b-button> -->
                          <b-button variant="danger" @click="destroyShipping(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                    <template v-slot:cell(car_only)="row">
                      <template v-if="row.item.car_only == 0">
                          <h4><span class="badge bg-primary text-white">NO</span></h4>
                      </template>
                      <template v-else>
                          <h4><span class="badge bg-success text-white">YES</span></h4>
                      </template>
                    </template>
                    <template v-slot:cell(price_car)="row">
                      {{ uangIndonesia(row.item.price_car)  }}
                    </template>
                    <template v-slot:cell(price_motor)="row">
                      {{ uangIndonesia(row.item.price_motor)  }}
                    </template>
                    <template v-slot:cell(created_at)="row">
                      {{ formatProperDate(row.item.created_at)  }}
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="shippings.current_page" :total-rows="shippings.total"
                    :per-page="shippings.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
          title: 'Shipping - Administrator',
        }
      },
      //data function
      data() {
        return {
          //table header
          fields: [
            {
              label: 'Area',
              key: 'area',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Code',
              key: 'code',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Price (Motor)',
              key: 'price_motor',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Price (Car)',
              key: 'price_car',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Car Only',
              key: 'car_only',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Description',
              key: 'description',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Created At',
              key: 'created_at',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Actions',
              key: 'actions',
              thClass:'text-center',
              tdClass: 'text-center'
            }
          ],
          //state search
          search: ''
        }
      },
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/shipping/getShippingsData')
      },
  
      //computed
      computed: {
          //shippings
          shippings() {
              console.log(this.$store.state.admin.shipping.shippings)
              return this.$store.state.admin.shipping.shippings
          },
      },
      //method
      methods: {
        //method "searchData"
        searchData() {
            this.$store.commit('admin/shipping/SET_PAGE', 1)
            this.$store.dispatch('admin/shipping/getShippingsData', this.search)
        },
        //method "changePage"
        changePage(page) {
            this.$store.commit('admin/shipping/SET_PAGE', page)
            this.$store.dispatch('admin/shipping/getShippingsData', this.search)
        },
        //method "destroyShipping"
        destroyShipping(id) {
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
              //dispatch to action "deleteCategory" vuex
              this.$store.dispatch('admin/shipping/destroyShipping', id)
                .then((response) => {
                  console.log(response)
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
        },
      }
  }
  </script>
  
  <style>
  
  </style>