<template>
    
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-layer-group"></i> STOCK HISTORY</span>
                </div>
                <div class="card-body">
                  <b-table responsive striped bordered hover :items="stock.data" :fields="fields" show-empty>
                    <template v-slot:cell(created_at)="row">
                      {{ formatProperDate(row.item.created_at) }}
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="stock.current_page" :total-rows="stock.total"
                    :per-page="stock.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
              label: 'ORDER/INV NO.',
              key: 'order_number',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Stock Opname',
              key: 'stock_opname',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Stock In',
              key: 'stock_in',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Stock Out',
              key: 'stock_out',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Final Stock',
              key: 'stock_final',
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
              label: 'Stock Tx Date',
              key: 'trans_date',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Created At',
              key: 'created_at',
              thClass:'text-center',
              tdClass: 'text-center'
            },
          ],
        }
      },
    async asyncData({ store, route }) {
        await store.dispatch('admin/stock/getHistoryStock', route.params.id)
    },
    computed: {
        stock() {
            return this.$store.state.admin.stock.stock_history
        },
    },
  }
  </script>