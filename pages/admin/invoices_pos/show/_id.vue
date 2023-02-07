<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-body">
                  <h5><i class="fa fa-shopping-cart"></i> DETAIL ORDER (FROM POS)</h5>
                  <hr>
                  <div class="row justify-content-center py-2">
                    <div class="col">
                      <div class="table table-responsive">
                        <table class="table table-borderless table-sm">
                          <client-only>
                            <tr>
                              <th>
                                NO. INVOICE
                              </th>
                              <td>
                                :
                                {{ invoice.invoice }}
                              </td>
                              <th>
                                PHONE
                              </th>
                              <td>
                                : {{ invoice.phone }}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                FULL NAME
                              </th>
                              <td>
                                : {{ invoice.name }}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                COURIER / SERVICE
                              </th>
                              <td class="text-uppercase">
                                :
                                {{ invoice.courier }} - {{ invoice.courier_service }}
                              </td>
                              <th>
                                ADDRESS
                              </th>
                              <td>
                                : {{ invoice.address }}
                              </td>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                              <th>
                                GRAND TOTAL
                              </th>
                              <td>
                               : Rp. {{ formatPrice(invoice.total)  }}
                              </td>
                              <th>
                                STATUS
                              </th>
                              <td>
                                <button v-if="invoice.status == 'pending'"
                                  class="btn btn-warning">UNPAID</button>
                                <button v-else-if="invoice.status == 'success'"
                                  class="btn btn-success"><i class="fa fa-check-circle"></i> {{ invoice.status }}</button>
                                <button v-else-if="invoice.status == 'expired'"
                                  class="btn btn-warning-2"><i class="fa fa-exclamation-triangle"></i> {{ invoice.status }}</button>
                                <button v-else-if="invoice.status == 'failed'"
                                  class="btn btn-danger"><i class="fa fa-times-circle"></i> {{ invoice.status }}</button>
                              </td>
                            </tr>
                          </client-only>
                        </table>
                      </div>
                    </div>
                  </div>
                  <h5><i class="fa fa-shopping-cart"></i> DETAIL ITEMS</h5>
                  <hr />
                  <div class="row">
                    <div class="col">
                      <div v-for="order in invoice.orders_pos" :key="order.id" class="row py-2 px-2 align-items-center justify-content-center">
                        <div class="col-sm-8 col-8 border-right">
                          <div class="row align-items-center">
                            <div class="col-sm-3 col-3">
                              <img :src="order.product.image" style="width: 60%;border-radius: .5rem">
                            </div>
                            <div class="col-sm-9 col-9">
                              <h5><b>{{ order.product.title }}</b></h5>
                              <table class="table-borderless" style="font-size: 14px">
                                <tr>
                                  <td style="padding: .20rem">QTY</td>
                                  <td style="padding: .20rem">:</td>
                                  <td style="padding: .20rem"><b>{{ order.qty }}</b></td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div class="border-left col-sm-4 col-4">
                          <h4 class="m-0 font-weight-bold">SUB TOTAL : Rp. {{ formatPrice(order.price) }}</h4>
                        </div>
                      </div>
                      <hr />
                      <div class="row justify-content-center">
                        <div class="col">
                          <div class="table">
                            <table class="table table-borderless table-sm">
                              <tbody>
                                <tr>
                                  <th colspan="4" class="text-right">Sub Total</th>
                                  <td class="text-right">Rp. {{ formatPrice(invoice.total - invoice.courier_cost) }}</td>
                                </tr>
                                <tr>
                                  <th colspan="4" class="text-right">Shipping Cost</th>
                                  <td class="text-right">Rp. {{ formatPrice(invoice.courier_cost) }}</td>
                                </tr>
                                <tr>
                                  <th colspan="4" class="text-right">Grand Total</th>
                                  <td class="text-right">Rp. {{ formatPrice(invoice.total) }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
          title: 'Detail Invoices Pos - Administrator',
        }
      },
      //hook "asyncData"
      async asyncData({ store, route }) {
        await store.dispatch('admin/invoice_pos/getDetailInvoice', route.params.id)
      },
      //computed
      computed: {
        invoice() {
          return this.$store.state.admin.invoice_pos.invoice
        }
      },
  
    }
  </script>
  
  <style>
  
  </style>