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
                <h5><i class="fa fa-tachometer-alt"></i> UPDATE USER ADDRESS</h5>
                <div class="row py-3">
                  <div class="col-md-12">
                    <h6>Current Address</h6>
                    <div class="table">
                        <table class="table table-borderless table-responisve">
                            <tr>
                                <th>Address</th>
                                <td> : {{dataReturner(profile.alamat)}}</td>
                            </tr>
                        </table>
                    </div>
                    <hr />
                    <h6>Update Address</h6>
                    <form @submit.prevent="updateAddress">
                        <div class="row py-2 px-2">
                            <div class="col">
                                <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      Address
                                    </span>
                                  </div>
                                  <textarea class="form-control" v-model="usersUpdate.alamat" rows="5"></textarea>
                                </div>
                                <div v-if="validation.alamat" class="mt-2">
                                  <b-alert show variant="danger">{{ validation.alamat[0] }}</b-alert>
                                </div>
                              </div>
                        </div>
                        <div class="row py-2 px-2">
                            <div class="col-md-3">
                                <div class="form-group">
                                  <label class="font-weight-bold">PROVINCE</label>
                                  <select class="form-control" v-model="usersUpdate.id_provinsi" @change="getCities">
                                    <option v-for="province in provinces" :key="province.id" :value="province.province_id">
                                      {{ province.name }}</option>
                                  </select>
                                  <div v-if="validation.id_provinsi" class="mt-2">
                                    <b-alert show variant="danger">{{ validation.id_provinsi[0] }}</b-alert>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="font-weight-bold">CITY</label>
                                  <select class="form-control" v-model="usersUpdate.id_kabupaten">
                                    <option v-for="city in cities" :key="city.id" :value="city.city_id">{{ city.name }}</option>
                                  </select>
                                  <div v-if="validation.id_kabupaten" class="mt-2">
                                    <b-alert show variant="danger">{{ validation.id_kabupaten[0] }}</b-alert>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="font-weight-bold">AREA</label>
                                  <select class="form-control" v-model="usersUpdate.id_area">
                                    <option value="">-- CHOOSE AREA --</option>
                                    <option v-for="area in areas" :key="area.id" :value="area.id">{{ area.area }}</option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="row">
                                  <div class="col-sm-6">
                                    <label class="font-weight-bold">LOCATION</label>
                                    <button class="btn btn-info" @click.prevent="getLocation()">Get Location</button>
                                  </div>
                                  <div class="col-sm-6">
                                    <div v-if="validation.lat" class="mt-2">
                                      <b-alert show variant="danger">{{ "Location Required!" }}</b-alert>
                                    </div>
                                    <template v-if="locationLoading == true">
                                      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></div>
                                    </template>
                                    <template v-if="locationMessage != null || locationMessage != ''">
                                      {{ locationMessage }}
                                      <!-- <p style="font-size:0.82rem;padding:0.5rem;">Your Coordinates : {{usersUpdate.lat}} , {{usersUpdate.long}}</p> -->
                                    </template>
                                  </div>
                                </div>
                              </div>
                        </div>
                        <div class="row">
                          <div class="col text-right">
                            <p style="font-size:0.82rem;padding:0.5rem;">*We recommend (and require you) to get your location by GPS to ensure accurate delivery location. Please refer to our ToS and Privacy Policy about your data and location</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12 text-right">
                            <button class="btn btn-primary btn-lg shadow-sm" type="submit">UPDATE ADDRESS</button>
                          </div>
                        </div>
                      </form>
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
    import VueGeolocation from 'vue-browser-geolocation'
    export default {
      middleware: 'isCustomer',
      layout: 'default',
      components: {
        MenuHead,
      },
      //meta
      head() {
        return {
          title: 'Dashboard - Profile',
        }
      },
      data() {
        return {
          usersUpdate:{
            alamat:'',
            id_provinsi:'',
            id_kabupaten:'',
            lat:'',
            long:'',
            id_area:'',
          },
          validation: [],
          locationLoading:false,
          locationMessage:null
        }
      },
      async asyncData({ store }) {
        await store.dispatch('customer/customer/getProfile')
        await store.dispatch('web/rajaongkir/getProvincesData')
        await store.dispatch('web/fetchers/getAllShippingArea')        
      },
      //computed
      computed: {
        profile() {
          return this.$store.state.customer.customer.user_detail
        },
        provinces() {
            return this.$store.state.web.rajaongkir.provinces
        },
        cities() {
            return this.$store.state.web.rajaongkir.cities
        },
        areas() {
          return this.$store.state.web.fetchers.shippings
        },
      },
      methods:{
        getCities() {
          this.$store.dispatch('web/rajaongkir/getCitiesData', {
            province_id: this.usersUpdate.id_provinsi
          })
        },
        getLocation(){
          this.locationLoading = true
            VueGeolocation.getLocation({
                enableHighAccuracy: true, //defaults to false
                timeout: 5000, //defaults to Infinity
                maximumAge: 10000, //defaults to 0
            }).then((coordinates) => {
                // this.locationLoaded = false
                this.usersUpdate.lat = coordinates.lat
                this.usersUpdate.long = coordinates.lng
                this.locationLoading = false
                this.locationMessage = 'Location acquired successfully!'
            }).catch(e=>{
                this.locationLoading = false
                this.locationMessage = 'Location acquiring failed! Please try again!'
            })
        },
        //method "register"
        async updateAddress() {
          await this.$store.dispatch('customer/customer/updateAddress', {
              alamat: this.usersUpdate.alamat,
              id_provinsi: this.usersUpdate.id_provinsi,
              id_kabupaten: this.usersUpdate.id_kabupaten,
            //   id_kecamatan: this.usersUpdate.id_kecamatan,
            //   id_kelurahan: this.usersUpdate.id_kelurahan,
              lat: this.usersUpdate.lat,
              long: this.usersUpdate.long,
              id_area: this.usersUpdate.id_area,
            })
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "UPDATE SUCCESS! PLEASE RE-LOGIN TO TAKE EFFECT ON CHANGES!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.restart()
              //redirect
              // this.$router.push({
              //   name: 'customer-dashboard'
              // })
            })
            .catch(error => {
              //assign validation
              this.validation = error.response.data
            })
        },
        async restart(){
          //logout auth
          await this.$auth.logout()
          //set state
          this.$store.commit('web/cart/SET_CARTS_DATA', [])
          this.$store.commit('web/cart/SET_CART_PRICE', 0)
          //redirect route customer login
          this.$router.push({
            name: 'customer-login'
          })
        }
      },
      mounted(){
        this.usersUpdate.alamat = this.profile.alamat
        this.usersUpdate.id_provinsi = this.profile.id_provinsi
        this.usersUpdate.id_kabupaten = this.profile.id_kabupaten
        // this.usersUpdate.id_kecamatan = this.profile.id_kecamatan
        // this.usersUpdate.id_kelurahan = this.profile.id_kelurahan
        this.usersUpdate.lat = this.profile.lat
        this.usersUpdate.long = this.profile.long
        this.usersUpdate.id_area = this.profile.id_area
        console.log(this.usersUpdate.id_kabupaten)
        this.getCities()
      }
    }
  </script>
  
  <style>
  
  </style>