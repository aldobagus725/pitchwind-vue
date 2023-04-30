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
                <h5><i class="fa fa-shopping-cart"></i> DETAIL ORDER</h5>
                <hr>
                <div class="row justify-content-center">
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
                              : {{ invoice.address }}, {{ invoice.city.name }}, {{ invoice.province.name }}
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
                              <button @click="payment(invoice.snap_token)" v-if="invoice.status == 'pending'"
                                class="btn btn-info">PAY NOW</button>
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
                            <!-- modal button -->
                            <button v-if="invoice.status == 'success'" type="button" class="btn btn-warning-2 mt-4" data-toggle="modal"
                            :data-target="'#modal-'+order.id">
                              BERIKAN ULASAN
                            </button>
                            <!-- Modal -->
                            <div class="modal fade" ref="modal" :id="'modal-'+order.id" tabindex="-1" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">ULASAN PRODUK</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <div class="row justify-content-center">
                                      <div class="col-md-7">
                                        <vue-star-rating v-model="rating.star" :show-rating="false">
                                        </vue-star-rating>
                                      </div>
                                    </div>
                                    <div class="row mt-4">
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <label class="font-weight-bold">ULASAN</label>
                                          <textarea class="form-control" id="alamat" rows="3" placeholder="Masukkan Ulasan Produk"
                                            v-model="rating.review"></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">TUTUP</button>
                                      <button v-if="rating.star && rating.review" @click.prevent="storeReview(order.id, order.product.id)" type="button"
                                      class="btn btn-warning" data-dismiss="modal">KIRIM</button>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                <th style="font-size:1.2rem;" colspan="4" class="text-right">Sub Total</th>
                                <td style="font-size:1.2rem;" class="text-right">Rp. {{ formatPrice(invoice.grand_total - invoice.courier_cost) }}</td>
                              </tr>
                              <tr>
                                <th style="font-size:1.2rem;" colspan="4" class="text-right">Shipping Cost</th>
                                <td style="font-size:1.2rem;" class="text-right">Rp. {{ formatPrice(invoice.courier_cost) }}</td>
                              </tr>
                              <tr>
                                <th style="font-size:1.2rem;" colspan="4" class="text-right">Decoration Cost</th>
                                <td style="font-size:1.2rem;" class="text-right">Rp. {{ formatPrice(invoice.decoration_cost) }}</td>
                              </tr>
                              <tr>
                                <th style="font-size:1.5rem;" colspan="4" class="text-right">Grand Total</th>
                                <td style="font-size:1.5rem;" class="text-right">Rp. {{ formatPrice(invoice.grand_total) }}</td>
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
          title: 'Detail Order - Customer',
        }
      },
      async asyncData({ store, route }) {
        await store.dispatch('customer/invoice/getDetailInvoice', route.params.snap_token)
      },
      computed: {
        invoice() {
          return this.$store.state.customer.invoice.invoice
        }
      },
      data() {
        return {
          //state rating
          rating: {
            star: 0,
            review: ''
          },
        }
      },
      methods: {
        payment(snap_token) {
          window.snap.pay(snap_token, {
  
            onSuccess: function () {
              router.push({
                name: 'invoices-show-snap_token',
                params: {
                  snap_token: snap_token
                }
              })
            },
            onPending: function () {
              router.push({
                name: 'invoices-show-snap_token',
                params: {
                  snap_token: snap_token
                }
              })
            },
            onError: function () {
              router.push({
                name: 'invoices-show-snap_token',
                params: {
                  snap_token: snap_token
                }
              })
            }
          })
        },
  
        //method "storeReview"
        async storeReview(orderId, productId) {
  
          //define formData
          let formData = new FormData();
  
          formData.append('rating', this.rating.star)
          formData.append('review', this.rating.review)
          formData.append('order_id', orderId)
          formData.append('product_id', productId)
  
          //sending data to action "storeReview" vuex
          await this.$store.dispatch('customer/review/storeReview', formData)
              
          //success
          .then(() => {
  
              //feresh data
            this.$nuxt.refresh()
  
            //clear state
            this.rating.star = 0
            this.rating.review = ''
  
            //sweet alert
            this.$swal.fire({
              title: 'SUCCESS!',
              text: "Ulasan Berhasil Disimpan!",
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            })
  
            //redirect route same page
            this.$router.push({ path: this.$route.path });
  
          })
  
          .catch(() => {
                
            //sweet alert
            this.$swal.fire({
              title: 'Failed!',
              text: "Anda sudah membuat ulasan untuk produk ini!",
              icon: 'error',
              showConfirmButton: false,
              timer: 3000
            })
  
          })
  
        }
      }
  
    }
  </script>
  
  <style>
  
  </style>