<template>
    <div class="container py-1 px-3">
      <div class="fade-in">
        <div class="row py-2">
          <div class="col">
            <MenuHead />
          </div>
        </div>
        <div class="row py-2">
          <div class="col-md-12 py-3">
            <div class="card border-0 rounded shadow border-top-orange">
              <div class="card-body">
                <h5><i class="fa fa-tachometer-alt"></i> DASHBOARD</h5>
                <hr>
                <div class="row py-3">
                  <div class="col-md-12">
                    <h4>
                      WELCOME <strong>{{ $auth.user.name }}</strong> !
                    </h4>
                  </div>
                </div>
                <div class="row">
                  <!-- PENDING -->
                  <div class="col-6 col-lg-3">
                    <div class="card bg-primary rounded shadow-sm  overflow-hidden">
                      <div class="card-body">
                        <div class="row align-items-center">
                          <div class="col-sm-3">
                            <h4 class="text-white font-weight-bold ">{{ pending }} </h4>
                          </div>
                          <div class="col-sm-9">
                            <div class="text-uppercase text-white ">ORDERS PENDING</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- SUCCESS -->
                  <div class="col-6 col-lg-3">
                    <div class="card bg-success rounded shadow-sm  overflow-hidden">
                      <div class="card-body">
                        <div class="row align-items-center">
                          <div class="col-sm-3">
                            <h4 class="text-white font-weight-bold ">{{ success }} </h4>
                          </div>
                          <div class="col-sm-9">
                            <div class="text-uppercase text-white ">ORDERS SUCCESS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- EXPIRED -->
                  <div class="col-6 col-lg-3">
                    <div class="card bg-warning rounded shadow-sm  overflow-hidden">
                      <div class="card-body">
                        <div class="row align-items-center">
                          <div class="col-sm-3">
                            <h4 class="text-white font-weight-bold ">{{ expired }} </h4>
                          </div>
                          <div class="col-sm-9">
                            <div class="text-uppercase text-white ">ORDERS EXPIRED</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- CANCELED! -->
                  <div class="col-6 col-lg-3">
                    <div class="card bg-danger rounded shadow-sm overflow-hidden">
                      <div class="card-body">
                        <div class="row align-items-center">
                          <div class="col-sm-3">
                            <h4 class="text-white font-weight-bold ">{{ failed }} </h4>
                          </div>
                          <div class="col-sm-9">
                            <div class="text-uppercase text-white ">ORDERS FAILED</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <!-- {{ invoices.data }} -->
                <h5>Last Transaction</h5>
                <b-table striped bordered hover responsive :items="invoices.data" :fields="fields" show-empty>
                  <template v-slot:cell(grand_total)="row">
                    Rp. {{ formatPrice(row.item.grand_total) }}
                  </template>
                <template v-slot:cell(created_at)="row">
                  {{formatProperDate(row.item.created_at)}}
                </template>
                  <template v-slot:cell(status)="row">
                    <button v-if="row.item.status == 'pending'" class="btn text-uppercase btn-sm btn-primary"><i class="fa fa-circle-notch fa-spin"></i> {{ row.item.status }}</button>
                    <button v-if="row.item.status == 'success'" class="btn text-uppercase btn-sm btn-success"><i class="fa fa-check-circle"></i> {{ row.item.status }}</button>
                    <button v-if="row.item.status == 'expired'" class="btn text-uppercase btn-sm btn-warning-2"><i class="fa fa-exclamation-triangle"></i> {{ row.item.status }}</button>
                    <button v-if="row.item.status == 'failed'" class="btn text-uppercase btn-sm btn-danger"><i class="fa fa-times-circle"></i> {{ row.item.status }}</button>
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
      //meta
      head() {
        return {
          title: 'Dashboard - Customer',
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
        }
      },
      async asyncData({ $axios, store }) {
        await store.dispatch('customer/invoice/getLastTransaction')
        const dashboard = await $axios.$get('/api/v1/customer/dashboard')
        return {
          'pending': dashboard.data.count.pending,
          'success': dashboard.data.count.success,
          'expired': dashboard.data.count.expired,
          'failed': dashboard.data.count.failed,
        }
      },
      //computed
      computed: {
        invoices() {
          return this.$store.state.customer.invoice.lastInvoice
        },
      },
  
    }
  </script>
  
  <style>
  
  </style>