<template>
    
    <main class="c-main">
        <div class="container-fluid py-2">
            <div class="fade-in">
              <div class="row py-1">
                <div class="col-6 col-lg-3">
                    {{statistic.aha}}
                  <div class="card border-0 rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-primary py-4 px-5 mfe-3">
                        <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary">{{ statistic.total_product }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Total Product</div>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div class="col-6 col-lg-3">
                  <div class="card border-0 rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-success py-4 px-5 mfe-3">
                        <i class="fas fa-check-circle fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-success">{{ statistic.on_stock }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Product On Stock</div>
                        <nuxt-link :to="{name: 'admin-stock-onStock'}" class="btn btn-success btn-sm">
                          <i class="fas fa-list"></i> SEE
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div class="col-6 col-lg-3">
                  <div class="card border-0 rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-warning py-4 px-5 mfe-3">
                        <i class="fas fa-exclamation-triangle fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-warning">{{ statistic.low_stock }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Product Low On Stock</div>
                        <nuxt-link :to="{name: 'admin-stock-lowStock'}" class="btn btn-warning btn-sm">
                          <i class="fas fa-list"></i> SEE
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div class="col-6 col-lg-3">
                  <div class="card border-0 rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-danger py-4 px-5 mfe-3">
                        <i class="fas fa-times-circle fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-danger">{{ statistic.out_stock }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Product Out Of Stock</div>
                        <nuxt-link :to="{name: 'admin-stock-outStock'}" class="btn btn-danger btn-sm">
                          <i class="fas fa-list"></i> SEE
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-2">
                      <span class="font-weight-bold"><i class="fa fa-layer-group"></i> STOCKS</span>
                    </div>
                    <div class="col-sm-10">
                      <div class="form-group">
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <button @click.prevent="exportStockLastStat()" disabled class="btn btn-success">
                              <i class="fas fa-download"></i> EXPORT STOCK STAT
                            </button>
                          </div>
                          <div class="input-group-prepend">
                            <nuxt-link :to="{name: 'admin-stock-upload'}" class="btn btn-info btn-sm" style="padding-top: 10px;">
                              <i class="fas fa-upload"></i> IMPORT</nuxt-link>
                          </div>
                          <div class="input-group-prepend">
                            <a href="/templateStock.xlsx" download class="btn btn-dark">
                              <i class="fas fa-download"></i> TEMPLATE IMPORT
                            </a>
                        </div>
                          <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="Find by product name">
                          <div class="input-group-append">
                              <button @click="searchData" class="btn btn-primary"><i class="fa fa-search"></i>
                              SEARCH
                              </button>
                          </div>
                      </div>
                  </div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  
                  <b-table responsive striped bordered hover :items="stocks.data" :fields="fields" show-empty>
                    <template v-slot:cell(stock)="row">
                        <template v-if="row.item.stock == 0">
                            <h4><span class="badge bg-danger text-white">{{row.item.stock}}</span></h4>
                        </template>
                        <template v-else-if="(row.item.stock <= row.item.minimum_stock_alert) && (row.item.stock != 0 || row.item.stock != null) ">
                            <h4><span class="badge bg-warning text-white">{{row.item.stock}}</span></h4>
                        </template>
                        <template v-else>
                            <h4><span class="badge bg-success text-white">{{row.item.stock}}</span></h4>
                        </template>
                    </template>
                    <template v-slot:cell(created_at)="row">
                        {{ formatProperDate(row.item.created_at) }}
                    </template>
                    <template v-slot:cell(actions)="row">
                    <b-button-group>
                        <b-button :to="{name: 'admin-stock-history-id', params: {id: row.item.id}}" variant="primary">
                            <i class="fas fa-list"></i> HISTORY
                        </b-button>
                        <b-button :to="{name: 'admin-stock-minus-id', params: {id: row.item.id}}" variant="danger">
                        <i class="fas fa-minus-square"></i> 
                        </b-button>
                        <b-button :to="{name: 'admin-stock-plus-id', params: {id: row.item.id}}" variant="info">
                        <i class="fas fa-plus-square"></i> 
                        </b-button>
                    </b-button-group>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="stocks.current_page" :total-rows="stocks.total"
                    :per-page="stocks.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
  
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
          title: 'Stock - Administrator',
        }
      },
  
      //data function
      data() {
        return {
          //table header
          fields: [
            {
              label: 'Product Name',
              key: 'title',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Stock',
              key: 'stock',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Minimal Stock',
              key: 'minimum_stock_alert',
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
      async asyncData({ $axios, store }) {
        const stat = await $axios.$get('/api/v1/admin/stock-stat')
        const statistic = {
            'total_product': stat.data.total_product,
            'on_stock': stat.data.on_stock,
            'low_stock': stat.data.low_stock,
            'out_stock': stat.data.out_stock,
        }
        await store.dispatch('admin/stock/getStocksData')
        return {
            statistic,
        }
      },
      computed: {
          stocks() {
              return this.$store.state.admin.stock.stocks
          },
      },
      methods: {
        searchData() {
            this.$store.commit('admin/stock/SET_PAGE', 1)
            this.$store.dispatch('admin/stock/getStocksData', this.search)
        },
        changePage(page) {
            this.$store.commit('admin/stock/SET_PAGE', page)
            this.$store.dispatch('admin/stock/getStocksData', this.search)
        },
        exportStockLastStat() {
          this.$axios.$get('api/v1/admin/export_last_stock')
            .then((response) => {
              let blob = new Blob([response.data], { type: 'application/xlsx' })
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              var date = new Date()
              link.download = 'ListStock-' + date.toDateString() + '.xlsx'
              link.click()
            })
            .catch((e) => {
              console.log(e)
            })
        },
      }
  
  }
  </script>
  
  <style>
  
  </style>