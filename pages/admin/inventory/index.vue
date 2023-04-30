<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-6">
                      <span class="font-weight-bold"><i class="fa fa-layer-group"></i> INVENTORY / ASSETS </span>
                      <p style="font-size:0.8rem;">WORK TOOLS, NOT STOCKS!</p>
                    </div>
                    <div class="col-sm-6">
                      <div class="card border-0 rounded shadow-sm overflow-hidden">
                        <div class="card-body p-0 d-flex align-items-center">
                          <div class="bg-primary py-4 px-5 mfe-3">
                            <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                          </div>
                          <div>
                            <div class="text-value text-primary">{{ uangIndonesia(statistic.totalAsset) }}</div>
                            <div class="text-muted text-uppercase font-weight-bold small">Total Asset Value/Cost</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div class="card-body">
                  <div class="form-group">
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                              <nuxt-link :to="{name: 'admin-inventory-create'}" class="btn btn-primary" style="padding-top: 10px;">
                              <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                          </div>
                          <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="search">
                          <div class="input-group-append">
                              <button @click="searchData" class="btn btn-dark"><i class="fa fa-search"></i>
                              SEARCH
                              </button>
                          </div>
                      </div>
                  </div>
                  <b-table responsive striped bordered hover :items="inventories.data" :fields="fields" show-empty>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button :to="{name: 'admin-inventory-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <b-button variant="danger" @click="destroyInventory(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                    <template v-slot:cell(harga_beli)="row">
                      {{uangIndonesia(row.item.harga_beli)}}
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="inventories.current_page" :total-rows="inventories.total"
                    :per-page="inventories.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
      layout: 'admin',
      head() {
        return {
          title: 'Inventory - Administrator',
        }
      },
      data() {
        return {
          fields: [
            {
              label: 'Name',
              key: 'nama_barang',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Qty',
              key: 'qty',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Cost',
              key: 'harga_beli',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            // {
            //   label: 'Status',
            //   key: 'published',
            //   thClass:'text-center',
            //   tdClass: 'text-center'
            // },
            {
              label: 'Description',
              key: 'description',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Condition',
              key: 'kondisi',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Date Of Acquirement',
              key: 'tanggal_beli',
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
          search: ''
        }
      },
      //hook "asyncData"
      async asyncData({ $axios, store }) {
          const stat = await $axios.$get('/api/v1/admin/asset-stat')
          const statistic = {
            'totalAsset': parseInt(stat.data)
          }
          await store.dispatch('admin/inventory/getAllOfInventories')
          return {
            statistic,
        }
      },
      //computed
      computed: {
          inventories() {
              return this.$store.state.admin.inventory.inventories
          },
      },
      //method
      methods: {
        searchData() {
            this.$store.commit('admin/inventory/SET_PAGE', 1)
            this.$store.dispatch('admin/inventory/getAllOfInventories', this.search)
        },
        changePage(page) {
            this.$store.commit('admin/inventory/SET_PAGE', page)
            this.$store.dispatch('admin/inventory/getAllOfInventories', this.search)
        },
        destroyInventory(id) {
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
              this.$store.dispatch('admin/inventory/destroyInventory', id)
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
                .catch(error => {
                  var new_error = error.response.data.error
                  this.$swal.fire({
                    title: 'Failed!',
                    text: new_error,
                    icon: 'error',
                    showConfirmButton: true,
                  })
                })
            }
          })
        },
      }
  }
  </script>