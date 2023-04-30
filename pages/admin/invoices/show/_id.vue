<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12 py-3">
              <div class="card border-0 rounded shadow border-top-orange">
                <div class="card-body">
                  <h5><i class="fa fa-shopping-cart"></i> DETAIL ORDER</h5>
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
                              <th>
                                EMAIL
                              </th>
                              <td>
                                : {{ invoice.customer.email }}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                COURIER / SERVICE
                              </th>
                              <td class="text-uppercase">
                                :
                                <!-- {{ invoice.courier }} / {{ invoice.courier_service }} / Rp.
                                {{ formatPrice(invoice.courier_cost)  }} -->
      
                                {{ invoice.courier }} - {{ invoice.courier_service }}
                              </td>
                              <th>
                                ADDRESS
                              </th>
                              <td>
                                : {{ invoice.address }}, {{ invoice.city.name }}, {{ invoice.province.name }} <br />
                                <button
                                  class="btn btn-primary text-white btn-sm p-2"
                                  style="border-radius: 0.5rem"
                                  @click="directionMaps([invoice.customer.lat,invoice.customer.long])"
                                >
                                  <i class="fa fa-map"></i> DIRECTION
                                </button>
                              </td>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                              <th>
                                GRAND TOTAL
                              </th>
                              <td>
                               : Rp. {{ formatPrice(invoice.grand_total)  }}
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
                                  <button v-if="invoice.status == 'pending'" class="btn btn-primary" @click="succeedOrder(id_invoice)">CONFIRM</button>
                                  <button v-if="invoice.status == 'pending'" class="btn btn-danger" @click="cancelOrder(id_invoice)">CANCEL ORDER</button>
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
                      <div v-for="order in invoice.orders" :key="order.id" class="row py-2 px-2 align-items-center justify-content-center">
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
                                  <td class="text-right">Rp. {{ formatPrice(invoice.grand_total - invoice.courier_cost) }}</td>
                                </tr>
                                <tr>
                                  <th colspan="4" class="text-right">Shipping Cost</th>
                                  <td class="text-right">Rp. {{ formatPrice(invoice.courier_cost) }}</td>
                                </tr>
                                <tr>
                                  <th colspan="4" class="text-right">Decoration Cost</th>
                                  <td class="text-right">Rp. {{ formatPrice(invoice.decoration_cost) }}</td>
                                </tr>
                                <tr>
                                  <th colspan="4" class="text-right">Grand Total</th>
                                  <td class="text-right font-weight-bold">Rp. {{ formatPrice(invoice.grand_total) }}</td>
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
      layout: 'admin',
      head() {
        return {
          title: 'Detail Invoices - Administrator',
        }
      },
      data(){
        return{
          id_invoice : null
        }
      },
      async asyncData({ store, route }) {
        await store.dispatch('admin/invoice/getDetailInvoice', route.params.id)
      },
      computed: {
        invoice() {
          return this.$store.state.admin.invoice.invoice
        }
      },
      methods:{
        succeedOrder(id){
          this.$swal.fire({
            title: 'ARE YOU SURE ?',
            text: "INGIN CONFIRM PEMBAYARAN ORDER INI !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YA!',
            cancelButtonText: 'NO',
          }).then((result) => {
            if (result.isConfirmed) {
              console.log(id)
              this.$store.dispatch('admin/invoice/succeedOrder', id)
                .then((response) => {
                  console.log(response)
                  // this.$nuxt.refresh()
                  this.$swal.fire({
                    title: 'SUCCESS!',
                    text: "Order confirmed!! Silakan untuk menyiapkan barang untuk diantar ke customer",
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  this.$router.push({
                    name: 'admin-invoices'
                  })
                })
            }
          })
        },
        cancelOrder(id) {
          this.$swal.fire({
            title: 'ARE YOU SURE ?',
            text: "INGIN CANCEL ORDER INI !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YA!',
            cancelButtonText: 'NO',
          }).then((result) => {
            if (result.isConfirmed) {
              console.log(id)
              this.$store.dispatch('admin/invoice/cancelOrder', id)
                .then((response) => {
                  console.log(response)
                  // this.$nuxt.refresh()
                  this.$swal.fire({
                    title: 'SUCCESS!',
                    text: "Order canceled!",
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  this.$router.push({
                    name: 'admin-invoices'
                  })

                })
            }
          })
        },
        directionMaps(position) {
          var ground_zero_lat = '-8.626516'
          var ground_zero_long = '115.170122'
          var link =
            'https://www.google.com/maps/dir/?api=1&origin=' +
            ground_zero_lat +
            ',' +
            ground_zero_long +
            '&destination=' +
            position[0] +
            ',' +
            position[1] +
            '&travelmode=driving&dir_action=navigate'
          window.open(link)
        },
      },
      mounted(){
        this.id_invoice = this.$route.params.id
      }
  
    }
  </script>
  
  <style>
  
  </style>