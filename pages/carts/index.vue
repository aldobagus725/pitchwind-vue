<template>
    <div class="container py-2 px-2 mt-4 mb-4">
      <div class="fade-in">
      <div class="row py-2 px-2 mt-3" v-if="carts.length > 0">
        <!-- jika data carts ada, maka tampilkan -->
        <div class="col-md-7">
          <div class="card border-0 rounded border-top-orange shadow">
            <div class="card-body">
              <h5 class="font-weight-bold">CUSTOMER</h5>
              <hr>
              <div class="table table-sm table-borderless">
                <table class="table">
                  <tr>
                    <th>Send To</th>
                    <td>: {{ $auth.user.name }}</td>
                    <th>Phone Number</th>
                    <td>: {{ $auth.user.phone }}</td>
                  </tr>
                  <tr>
                    <th colspan="1">Address</th>
                    <td colspan="3">: {{ $auth.user.alamat }}</td>
                  </tr>
                </table>
              </div>
              <h5 class="font-weight-bold">ITEMS</h5>
              <hr>
              <client-only>
                <!-- {{ carts }} -->
              <div v-for="cart in carts" :key="cart.id" class="row py-2 px-2 align-items-center justify-content-center">
                <div class="col" v-if="!cart.product">
                error occured
                </div>
                  <div v-else class="col-sm-8 col-8 border-right">
                    <div class="row align-items-center">
                      <div class="col-sm-3 col-3">
                        <img :src="cart.product.image" @error="$event.target.src = '/images/product_placeholder.png'" style="width: 60%;border-radius: .5rem">
                      </div>
                      <div class="col-sm-9 col-9">
                        <h5><b>{{ cart.product.title }}</b></h5>
                        <table class="table-borderless" style="font-size: 14px">
                          <tr>
                            <td style="padding: .20rem">QTY</td>
                            <td style="padding: .20rem">:</td>
                            <td style="padding: .20rem"><b>{{ cart.qty }}</b></td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col" v-if="!cart.product">
                    <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-outline-danger">
                        <i class="fa fa-trash"></i>
                      </button>
                  </div>
                  <div v-else class="col-sm-4 col-4">
                    <h5 class="m-0 font-weight-bold">SUB TOTAL : <br />Rp. {{ formatPrice(cart.price) }}</h5>
                    <div class="text-right py-2">
                      <button v-show="cart.qty <= 1 ? false : true" @click.prevent="minusCart(cart.id)" class="btn btn-sm btn-outline-dark">
                        <i class="fa fa-minus"></i>
                      </button>
                      <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-outline-danger">
                        <i class="fa fa-trash"></i>
                      </button>
                      <button v-show="cart.product.stock == cart.qty ? false : true" @click.prevent="plusCart(cart.id)" class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </client-only>
              <hr />
              <!-- Some things -->
              <div class="row py-4">
                <div class="col">
                  <label class="font-weight-bold">Decoration Cost</label>
                  <select class="form-control" v-model="decoration_cost">
                      <option v-for="d in decoration" :key="d.id" :value="d.cost">
                        {{ d.decoration +  " - " + uangIndonesia(d.cost) + ' - ' + d.description}}</option>
                    </select>
                </div>
              </div>
              <br />
              <h5 class="font-weight-bold">CHECKOUTS</h5>
                <hr>
                <div class="row py-2">
                  <div class="col">
                    <label class="font-weight-bold">Payment Method</label>
                    <select class="form-control" v-model="customer.payment_method">
                        <option value="">-- Choose --</option>
                        <option v-for="m in payment_methods" :key="m.id" :value="m.id">
                          {{ m.method }}</option>
                      </select>
                  </div>
                  <div v-if="customer.payment_method == 3" class="col">
                    <label class="font-weight-bold">Payment Channel</label>
                    <select class="form-control" v-model="customer.payment_channel">
                        <option value="">-- Choose --</option>
                        <option v-for="c in payment_channels" :key="c.id" :value="c.id">
                          {{ c.channel }}</option>
                    </select>
                  </div>
                </div>
              <template v-if="customer.payment_method == 1 || customer.payment_method == 2">
                <div class="row py-2">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="font-weight-bold">SHIPMENT <i class="fa fa-truck"></i></label>
                      <br>
                      <div class="form-check form-check-inline">
                        <!-- SAMEDAY -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-sameday"
                          value="sameday" v-model="courier.courier_name" @change="showService()">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-sameday">
                          SAMEDAY</label>
                        <!-- JNE -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-jne"
                          value="jne" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jne">
                          JNE</label>
                        <!-- TIKI -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-tiki"
                          value="tiki" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jnt">TIKI</label>
                        <!-- POS -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-pos"
                          value="pos" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold" for="ongkos_kirim-jnt">POS</label>
                      </div>
                      <!-- <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div> -->
                    </div>
                  </div>
                  <template v-if="courierLoading == true">
                    <div class="row">
                      <div class="col text-center">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="col-md-12">
                      <div class="form-group" v-if="courier.showService">
                        <hr>
                        <label class="font-weight-bold">SERVICE</label>
                        <br>
                        <div v-if="courier.courier_name == 'sameday'">
                          <div class="form-check form-check-inline">
                            <template v-if="shippings_area.car_only == 0">
                              <input class="form-check-input" type="radio" name="cost" :id="shippings_area.price_motor"
                              :value="shippings_area.price_motor+'|'+'MOTOR'" v-model="courier.courier_service_cost"
                              @change="getServiceCost">
                              <label class="form-check-label font-weight-bold mr-5" :for="shippings_area.price_motor">
                                MOTOR - Rp. {{ formatPrice(shippings_area.price_motor) }}</label>
                            </template>
                            <input class="form-check-input" type="radio" name="cost" :id="shippings_area.price_car"
                              :value="shippings_area.price_car+'|'+'MOBIL'" v-model="courier.courier_service_cost"
                              @change="getServiceCost">
                              <label class="form-check-label font-weight-bold mr-5" :for="shippings_area.price_car">
                                CAR - Rp. {{ formatPrice(shippings_area.price_car) }}</label>
                          </div>
                        </div>
                        <div v-else>
                          <div v-for="value in costs" :key="value.service" class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="cost" :id="value.service"
                              :value="value.cost[0].value+'|'+value.service" v-model="courier.courier_service_cost"
                              @change="getServiceCost">
                              <label class="form-check-label font-weight-normal mr-5" :for="value.service">
                              {{ value.service }} {{value.cost[0].etd}} day(s) - Rp. {{ formatPrice(value.cost[0].value) }} </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else-if="customer.payment_method == 3 && (customer.payment_channel != '' && customer.payment_channel != null)">
                <div class="row py-2">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="font-weight-bold">SHIPMENT <i class="fa fa-truck"></i></label>
                      <br>
                      <div class="form-check form-check-inline">
                        <!-- SAMEDAY -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-sameday"
                          value="sameday" v-model="courier.courier_name" @change="showService()">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-sameday">
                          SAMEDAY</label>
                        <!-- JNE -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-jne"
                          value="jne" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jne">
                          JNE</label>
                        <!-- TIKI -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-tiki"
                          value="tiki" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jnt">TIKI</label>
                        <!-- POS -->
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-pos"
                          value="pos" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold" for="ongkos_kirim-jnt">POS</label>
                      </div>
                      <!-- <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div> -->
                    </div>
                  </div>
                  <template v-if="courierLoading == true">
                    <div class="row">
                      <div class="col text-center">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="col-md-12">
                      <div class="form-group" v-if="courier.showService">
                        <hr>
                        <label class="font-weight-bold">SERVICE</label>
                        <br>
                        <div v-if="courier.courier_name == 'sameday'">
                          <div class="form-check form-check-inline">
                            <template v-if="shippings_area.car_only == 0">
                              <input class="form-check-input" type="radio" name="cost" :id="shippings_area.price_motor"
                              :value="shippings_area.price_motor+'|'+'MOTOR'" v-model="courier.courier_service_cost"
                              @change="getServiceCost">
                              <label class="form-check-label font-weight-bold mr-5" :for="shippings_area.price_motor">
                                MOTOR - Rp. {{ formatPrice(shippings_area.price_motor) }}</label>
                            </template>
                            <input class="form-check-input" type="radio" name="cost" :id="shippings_area.price_car"
                              :value="shippings_area.price_car+'|'+'MOBIL'" v-model="courier.courier_service_cost"
                              @change="getServiceCost">
                              <label class="form-check-label font-weight-bold mr-5" :for="shippings_area.price_car">
                                CAR - Rp. {{ formatPrice(shippings_area.price_car) }}</label>
                          </div>
                        </div>
                        <div v-else>
                          <div v-for="value in costs" :key="value.service" class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="cost" :id="value.service"
                              :value="value.cost[0].value+'|'+value.service" v-model="courier.courier_service_cost"
                              @change="getServiceCost">
                            <label class="form-check-label font-weight-normal mr-5" :for="value.service">
                              {{ value.service }} {{value.cost[0].etd}} day(s) - Rp. {{ formatPrice(value.cost[0].value) }}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card border-0 rounded border-top-orange shadow">
            <div class="card-body">
              <h4>SHOPPING DETAIL</h4>
              <br />
              <table class="table border-0 table-default">
                <tbody>
                  <tr>
                    <th class="text-left" width="60%">
                      <p class="m-0">SUB TOTAL </p>
                    </th>
                    <td class="set-td  text-right" width="30%">&nbsp; : Rp.</td>
                    <td class="text-right set-td ">
                      <p class="m-0" id="subtotal"> {{ formatPrice(cartPrice) }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left border-0">
                      <p class="m-0">SHIPPING COST (<strong>{{ cartWeight }}</strong> gram)</p>
                    </th>
                    <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                    <td class="set-td border-0 text-right">
                      <p class="m-0" id="ongkir-cart">
                        {{ formatPrice(courier.courier_cost) }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left border-0">
                      <p class="m-0">DECORATION COST</p>
                    </th>
                    <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                    <td class="set-td border-0 text-right">
                      <p class="m-0" id="ongkir-cart">
                        {{ formatPrice(decoration_cost) }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class=" text-left border-0">
                      <p class="font-weight-bold m-0 h5 text-uppercase">GRAND TOTAL </p>
                    </td>
                    <td class=" border-0 text-right">&nbsp; : Rp.</td>
                    <td class=" border-0 text-right">
                      <p class="font-weight-bold m-0 h5" align="right">
                        {{ formatPrice(grandTotal) }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <div class="card-footer" v-if="btnCheckout">
              <button @click.prevent="checkout" class="btn btn-warning btn-lg btn-block">CHECKOUT</button>
            </div> -->
            <div class="card-footer" v-if="((customer.payment_method == 1 || customer.payment_method == 2) || (customer.payment_method == 3 && (customer.payment_channel != '' && customer.payment_channel != null))) && courier
            .courier_cost != '' ">
              <button @click.prevent="checkout" class="btn btn-warning btn-lg btn-block">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
        <!-- data carts tidak tersedia -->
        <div class="col-md-10">
          <div class="card border-0 rounded border-top-orange shadow">
            <div class="card-body">
              <div class="col-sm-12 empty-cart-cls text-center">
                <img src="/images/shopping-cart.png" width="150" height="150" class="img-fluid mb-4 mr-3">
                <h3><strong>Keranjang Belanja Kosong :)</strong></h3>
                <nuxt-link :to="{name: 'products'}" class="btn btn-warning btn-lg mt-4" data-abc="true">LANJUTKAN BELANJA
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
  
      //middleware
      middleware: 'isCustomer',
  
      //meta
      head() {
        return {
          title: 'Cart - Bali Fun & Cheer - Toko perlengkapan / alat pesta, dekorasi, dll',
          meta: [{
              hid: 'og:title',
              name: 'og:title',
              content: 'Cart - Bali Fun & Cheer - Toko perlengkapan / alat pesta, dekorasi, dll'
            },
            {
              hid: 'og:site_name',
              name: 'og:site_name',
              content: 'Cart - Bali Fun & Cheer - Toko perlengkapan / alat pesta, dekorasi, dll'
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: '/images/shopping-cart.png'
            },
            {
              hid: 'description',
              name: 'description',
              content: 'Cart - Official Toko Online Bali Fun & Cheer'
            },
          ]
        }
      },
      //hook asyncData
      async asyncData({ store }) {
        await store.dispatch('web/cart/getCartsData')
        await store.dispatch('web/rajaongkir/getProvincesData')
        await store.dispatch('web/payment/getMethods')
        await store.dispatch('web/payment/getChannels')
        await store.dispatch('web/fetchers/getShippings')
        await store.dispatch('web/fetchers/getDecorations')
      },
      //computed
      computed: {
        //cart data
        carts() {
          return this.$store.state.web.cart.carts
        },
        //cart weight
        cartWeight() {
          return this.$store.state.web.cart.cartWeight
        },
        //cart price
        cartPrice() {
          return this.$store.state.web.cart.cartPrice
        },
        //provinces
        provinces() {
          return this.$store.state.web.rajaongkir.provinces
        },
        //cities
        cities() {
          return this.$store.state.web.rajaongkir.cities
        },
        //costs
        costs() {
          return this.$store.state.web.rajaongkir.costs
        },
        payment_methods(){
          return this.$store.state.web.payment.methods
        },
        payment_channels(){
          return this.$store.state.web.payment.channels
        },
        shippings_area(){
          return this.$store.state.web.fetchers.shippings
        },
        decoration(){
          return this.$store.state.web.fetchers.decorations
        }
        // payment_acc_number(){
        //   return this.$store.state.web.payment.channels
        // }
      },
  
      //data function
      data() {
        return {
          //state customer
          customer: {
            name: '',
            phone: '',
            address: '',
            payment_method:'',
            payment_channel:'',
            id_area:'',
          },
          //state validation
          validation: {
            name: false,
            phone: false,
            address: false
          },
          //state rajaongkir
          rajaongkir: {
            province_id: '',
            city_id: ''
          },
          //state courier
          courier: {
            showCourier: false,
            showService: false,
            courier_name: '',
            courier_service_cost: '',
            courier_service: '',
            courier_cost: ''
          },
          //grandTotal
          grandTotal: 0,
          decoration_cost: 0,
          shipping_areas:null,
          courierLoading:false,
          //state button checkout
          btnCheckout: false
        }
      },
      //method
      methods: {
        //method "removeCart"  
        async removeCart(cartId) {
          await this.$swal.fire({
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
                this.$store.dispatch('web/cart/removeCart', {
                    cart_id: cartId
                 })
                .then(async () => {
                    await this.$store.dispatch('web/cart/getCartPrice')
                    this.grandTotal = parseInt(this.cartPrice) + parseInt(this.courier.courier_cost)
                    this.$swal.fire({
                        title: 'SUCCESS!',
                        text: "Product Berhasil Dihapus dari Keranjang!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                })
            }
          })
        },
        //method "getCities"
        getCities() {
          this.$store.dispatch('web/rajaongkir/getCitiesData', {
            province_id: this.rajaongkir.province_id
          })
        },
        //method "showCourier"
        showCourier() {
          this.courier.showCourier = true
        },
        //method "showService"
        async showService() {
          this.courier.courier_cost = ''
          this.courierLoading = true
          if (this.courier.courier_name != 'sameday'){
            //check weight product
            if (this.cartWeight == 0) {
              alert('silahkan pilih produk terlebih dahulu!')
              return
            }
            await this.$store.dispatch('web/rajaongkir/getOngkirData', {
                destination: this.rajaongkir.city_id,
                weight: this.cartWeight,
                courier: this.courier.courier_name
              })
              .then(() => {
                this.courier.showService = true
              })
          } else{
            await this.$store.dispatch('web/fetchers/getShippings',this.customer.id_area)
              .then(() => {
                this.courier.showService = true
              })
            // this.courier.courier_cost = 30000
          }
          this.courierLoading = false
        },
        // getShippingArea(){
        //   this.$store.dispatch('web/fetchers/getShippings',this.customer.id_area)
        // },
        //method "getServiceCost"
        // The Pucuk Of all methods
        getServiceCost() {
          if (this.courier.courier_name != 'sameday'){
            //split value dengan menghapus string -> | 
            let shipping = this.courier.courier_service_cost.split("|")
            //set state cost dan service
            this.courier.courier_cost = shipping[0]
            this.courier.courier_service = shipping[1]
            //sum grandTotal
            this.grandTotal = parseInt(this.cartPrice) + parseInt(this.courier.courier_cost)+ parseInt(this.decoration_cost)
            //show button checkout
          } else {
            //split value dengan menghapus string -> | 
            let shipping = this.courier.courier_service_cost.split("|")
            //set state cost dan service
            this.courier.courier_cost = shipping[0]
            this.courier.courier_service = shipping[1]
            //sum grandTotal
            this.grandTotal = parseInt(this.cartPrice) + parseInt(this.courier.courier_cost)+ parseInt(this.decoration_cost)
            //show button checkout
            //sum grandTotal
            this.grandTotal = parseInt(this.cartPrice) + parseInt(this.courier.courier_cost) + parseInt(this.decoration_cost)
          }
          this.btnCheckout = true
        },
        async plusCart(cartId){
          await this.$store.dispatch('web/cart/plusCart', {
            cartId: cartId,
            })
        },
        async minusCart(cartId){
          await this.$store.dispatch('web/cart/minusCart', {
              cartId: cartId,
            })
        },
        //method "checkout"
        async checkout() {
          if (this.customer.name && this.customer.phone && this.customer.address && this.cartWeight && this.customer.payment_method) {
            //define formData
            let formData = new FormData();
            formData.append('courier', this.courier.courier_name)
            formData.append('courier_service', this.courier.courier_service)
            formData.append('courier_cost', this.courier.courier_cost)
            formData.append('weight', this.cartWeight)
            formData.append('name', this.customer.name)
            formData.append('phone', this.customer.phone)
            formData.append('address', this.customer.address)
            formData.append('city_id', this.rajaongkir.city_id)
            formData.append('province_id', this.rajaongkir.province_id)
            formData.append('payment_method', this.customer.payment_method)
            formData.append('decoration_cost', this.decoration_cost)
            formData.append('payment_channel', this.customer.payment_method == 3 ? this.customer.payment_channel : this.customer.payment_method )
            formData.append('grand_total', this.grandTotal)
            await this.$store.dispatch('web/checkout/storeCheckout', formData)
              //success
              .then(response => {
                var text = null
                if(this.customer.payment_method == 3){
                  text = 'Checkout done successfully! Please check the order detail for payment steps! Our admin will make contact to you through your phone number / Whatsapp.'
                } else {
                  text = 'Checkout done successfully! Our admin will make contact to you through your phone number / Whatsapp. Please check the order detail for more information!'
                }
                //sweet alert
                this.$swal.fire({
                  title: 'SUCCESS!',
                  text: text,
                  icon: 'success',
                  showConfirmButton: false,
                })
                this.$store.dispatch('web/cart/getCartsData')
                if (this.customer.payment_method == 1){
                  this.$router.push({
                    name: 'customer-invoices-show-snap_token',
                    params: {
                      snap_token: response.snap_token
                    }
                  })
                } else {
                  this.$router.push({
                    name: 'customer-invoices-manual-id',
                    params: {
                      id: response.id
                    }
                  })
                }
              })
          }
          //check validasi name
          if (!this.customer.name) {
            this.validation.name = true
          }
          //check validasi phone
          if (!this.customer.phone) {
            this.validation.phone = true
          }
          //check validasi address
          if (!this.customer.address) {
            this.validation.address = true
          }
        }
      },
      mounted(){
        this.customer.name = this.$auth.user.name
        this.customer.address = this.$auth.user.alamat
        this.customer.phone = this.$auth.user.phone
        this.customer.id_area = this.$auth.user.id_area
        this.rajaongkir.province_id = this.$auth.user.id_provinsi
        this.rajaongkir.city_id = this.$auth.user.id_kabupaten
      }
    }
  </script>
  
  <style scoped>
    .table-cart {
      border-style: solid !important;
      border-color: rgb(198, 206, 214) !important;
    }
  
    .table-font {
      font-size: 14px;
    }
  </style>