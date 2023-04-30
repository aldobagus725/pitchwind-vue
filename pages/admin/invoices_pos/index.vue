<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-2">
                      <span class="font-weight-bold"><i class="fa fa-shopping-cart"></i> INVOICE POS</span>
                    </div>
                    <div class="col-sm-10">
                      <div class="form-group">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="Find by invoice number">
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
                  <b-table striped bordered hover :items="invoices.data" :fields="fields" show-empty>
                    <template v-slot:cell(total)="row">
                     {{ uangIndonesia(row.item.total) }}
                    </template>
                    <template v-slot:cell(status)="row">
                      <button v-if="row.item.status == 'pending'" class="btn btn-sm btn-primary"><i class="fa fa-circle-notch fa-spin"></i> {{ row.item.status }}</button>
                      <button v-if="row.item.status == 'success'" class="btn btn-sm btn-success"><i class="fa fa-check-circle"></i> {{ row.item.status }}</button>
                      <button v-if="row.item.status == 'expired'" class="btn btn-sm btn-warning-2"><i class="fa fa-exclamation-triangle"></i> {{ row.item.status }}</button>
                      <button v-if="row.item.status == 'failed'" class="btn btn-sm btn-danger"><i class="fa fa-times-circle"></i> {{ row.item.status }}</button>
                    </template>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                            <b-button :to="{name: 'admin-invoices_pos-show-id', params: {id: row.item.id}}" variant="info">
                                <i class="fas fa-eye"></i> DETAIL
                            </b-button>
                        </b-button-group>
                    </template>
                    <template v-slot:cell(created_at)="row">
                      {{ formatProperDate(row.item.created_at) }}
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
    </main>
  </template>
  
  <script>
    export default {
  
      //layout
      layout: 'admin',
  
      //meta
      head() {
        return {
          title: 'Invoices POS - Administrator',
        }
      },
  
      //data function
      data() {
        return {
          //table header
          fields: [
            {
              label: 'No. Invoice',
              key: 'invoice'
            },
            {
              label: 'Grand Total',
              key: 'total'
            },
            {
              label: 'Status',
              key: 'status',
              tdClass: 'text-center'
            },
            {
              label: 'Tanggal',
              key: 'created_at',
              tdClass: 'text-center'
            },
            {
              label: 'Actions',
              key: 'actions',
              tdClass: 'text-center'
            }
          ],
  
          //state search
          search: ''
        }
      },
  
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/invoice_pos/getInvoicesData')
      },
  
      //computed
      computed: {
          //invoices
          invoices() {
              return this.$store.state.admin.invoice_pos.invoices
          },
      },
  
      //method
      methods: {
  
          //method "searchData"
          searchData() {
  
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/invoice_pos/SET_PAGE', 1)
  
            //dispatch on action "getInvoicesData"
            this.$store.dispatch('admin/invoice_pos/getInvoicesData', this.search)
          },
  
          //method "changePage"
          changePage(page) {
  
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/invoice_pos/SET_PAGE', page)
  
            //dispatch on action "getInvoicesData"
            this.$store.dispatch('admin/invoice_pos/getInvoicesData', this.search)
          },
  
      }
  
    }
  </script>
  
  <style>
  
  </style>