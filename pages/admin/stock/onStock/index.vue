<template>
    
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-layer-group"></i> PRODUCT ON STOCKS</span>
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
          title: 'Product On Stock - Administrator',
        }
      },
  
      //data function
      data() {
        return {
          //table header
          fields: [
            {
              label: 'BARCODE',
              key: 'barcode',
              thClass:'text-center',
              tdClass: 'text-center'
            },
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
              label: 'Updated At',
              key: 'updated_at',
              thClass:'text-center',
              tdClass: 'text-center'
            },
          ],
  
          //state search
          search: ''
        }
      },
      //hook "asyncData"
      async asyncData({ store }) {
        await store.dispatch('admin/stock/getOnStockData')
      },
  
      //computed
      computed: {
          //products
          stocks() {
              return this.$store.state.admin.stock.custom_stock
          },
      },
      //method
      methods: {
        //method "changePage"
        changePage(page) {
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/stock/SET_PAGE', page)
            //dispatch on action "getProductsData"
            this.$store.dispatch('admin/stock/getOnStockData', this.search)
        },
      }
  
  }
  </script>
  
  <style>
  
  </style>