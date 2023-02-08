<template>
    <div class="container py-1 px-3">
      <div class="fade-in">
        <div class="row py-2">
          <div class="col">
            <MenuHead />
          </div>
        </div>
      <div class="row">
        <div class="col-md-12 py-3">
          <div class="card border-0 rounded shadow border-top-orange">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-sm-3">
                  <h5><i class="fa fa-shopping-cart"></i> MY ORDERS</h5>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="search by invoice number">
                      <div class="input-group-append">
                        <button @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>
                          SEARCH
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-5 text-right">
                  Filter Order By:
                  <div class="btn-group">
                    <button type="button" @click.prevent="searchData()" class="btn btn-sm btn-info">All</button>
                    <button type="button" @click.prevent="getInvoiceByStatus('pending')"  class="btn btn-sm btn-primary">Pending</button>
                    <button type="button" @click.prevent="getInvoiceByStatus('success')"  class="btn btn-sm btn-success">Success</button>
                    <button type="button" @click.prevent="getInvoiceByStatus('expired')"  class="btn btn-sm btn-warning">Expired</button>
                    <button type="button" @click.prevent="getInvoiceByStatus('failed')"  class="btn btn-sm btn-danger">Failed</button>
                  </div>
                </div>
              </div>
              <hr>
              <b-table striped bordered responsive hover :items="invoices.data" :fields="fields" show-empty>
                <template v-slot:cell(grand_total)="row">
                  Rp. {{ formatPrice(row.item.grand_total) }}
                </template>
                <template v-slot:cell(status)="row">
                  <button v-if="row.item.status == 'pending'" class="btn text-uppercase btn-sm btn-primary"><i class="fa fa-circle-notch fa-spin"></i> {{ row.item.status }}</button>
                  <button v-if="row.item.status == 'success'" class="btn text-uppercase  btn-sm btn-success"><i class="fa fa-check-circle"></i> {{ row.item.status }}</button>
                  <button v-if="row.item.status == 'expired'" class="btn text-uppercase  btn-sm btn-warning-2"><i class="fa fa-exclamation-triangle"></i> {{ row.item.status }}</button>
                  <button v-if="row.item.status == 'failed'" class="btn text-uppercase  btn-sm btn-danger"><i class="fa fa-times-circle"></i> {{ row.item.status }}</button>
                </template>
                <template v-slot:cell(created_at)="row">
                  {{formatProperDate(row.item.created_at)}}
                </template>
                <template v-slot:cell(actions)="row">
                    <div v-if="row.item.snap_token != null">
                      <b-button :to="{name: 'customer-invoices-show-snap_token', params: {snap_token: row.item.snap_token}}" variant="info" size="sm">
                          DETAIL
                      </b-button>
                    </div>
                    <div v-else>
                      <b-button :to="{name: 'customer-invoices-manual-id', params: {id: row.item.id}}" variant="primary" size="sm">
                          DETAIL
                      </b-button>
                    </div>
                  </template>
              </b-table>
  
              <!-- pagination -->
              <b-pagination align="right" :value="invoices.current_page" :total-rows="invoices.total"
                :per-page="invoices.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
  
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
    import MenuHead from '~/components/web/MenuHead.vue'
    export default {
      middleware: 'isCustomer',
      layout: 'default',
      components: {
        MenuHead
      },
      head() {
        return {
          title: 'Invoices - Customer',
        }
      },
      data() {
        return {
          fields: [{
              label: 'No. Invoice',
              key: 'invoice'
            },
            {
              label: 'Grand Total',
              key: 'grand_total'
            },
            {
              label: 'Status Payment',
              key: 'status',
              tdClass: 'text-center'
            },
            {
              label: 'Order Date',
              key: 'created_at',
              tdClass: 'text-center'
            },
            {
              label: 'Options',
              key: 'actions',
              tdClass: 'text-center'
            }
          ],
          search: ''
        }
      },
      async asyncData({ store }) {
        await store.dispatch('customer/invoice/getInvoicesData')
      },
      computed: {
        invoices() {
          return this.$store.state.customer.invoice.invoices
        },
      },
      methods: {
          searchData() {
              this.$store.commit('customer/invoice/SET_PAGE', 1)
              this.$store.dispatch('customer/invoice/getInvoicesData', this.search)
          },
          changePage(page) {
              this.$store.commit('customer/invoice/SET_PAGE', page)
              this.$store.dispatch('customer/invoice/getInvoicesData', this.search)
          },
          getInvoiceByStatus(status){
            this.$store.commit('customer/invoice/SET_PAGE', 1)
            this.$store.dispatch('customer/invoice/getInvoiceByStatus', status)
          }
      }
    }
  </script>
  
  <style>
  
  </style>