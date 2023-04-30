<template>
    <div class="container mt-custom mb-3">
      <div class="fade-in">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card-group">
            <div class="card border-top-orange border-0 shadow-sm rounded">
              <div class="card-body">
                <h3>REGISTER NEW CUSTOMER</h3>
                <hr>
                <div v-if="validation.message" class="mt-2">
                  <b-alert show variant="danger">{{ validation.message }}</b-alert>
                </div>
                <form @submit.prevent="register">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-user"></i>
                          </span>
                        </div>
                        <input class="form-control" v-model="user.name" type="text" placeholder="Full name">
                      </div>
                      <div v-if="validation.name" class="mt-2">
                        <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-user"></i>
                          </span>
                        </div>
                        <input class="form-control" v-model="user.phone" type="text" placeholder="Phone Number">
                      </div>
                      <div v-if="validation.phone" class="mt-2">
                        <b-alert show variant="danger">{{ validation.phone[0] }}</b-alert>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-envelope"></i>
                          </span>
                        </div>
                        <input class="form-control" v-model="user.email" type="email" placeholder="Email Address">
                      </div>
                      <div v-if="validation.email" class="mt-2">
                        <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-home"></i>
                          </span>
                        </div>
                        <textarea class="form-control" v-model="user.alamat" placeholder="Your Address"></textarea>
                      </div>
                      <div v-if="validation.alamat" class="mt-2">
                        <b-alert show variant="danger">{{ validation.alamat[0] }}</b-alert>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="font-weight-bold">PROVINCE</label>
                        <select class="form-control" v-model="user.id_provinsi" @change="getCities">
                          <option value="">-- CHOOSE PROVINCE --</option>
                          <option v-for="province in provinces" :key="province.id" :value="province.province_id">
                            {{ province.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="font-weight-bold">CITY</label>
                        <select class="form-control" v-model="user.id_kabupaten">
                          <option value="">-- CHOOSE CITY --</option>
                          <option v-for="city in cities" :key="city.id" :value="city.city_id">{{ city.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="font-weight-bold">AREA</label>
                        <select class="form-control" v-model="user.id_area">
                          <option value="">-- CHOOSE AREA --</option>
                          <option v-for="area in areas" :key="area.id" :value="area.id">{{ area.area }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="row">
                        <div class="col">
                          <label class="font-weight-bold">LOCATION</label>
                          <button class="btn btn-info btn-sm" @click.prevent="getLocation()">Get Location</button>
                        </div>
                        <div class="col">
                          <template v-if="locationLoading == true">
                            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></div>
                          </template>
                          <template v-if="locationMessage != null || locationMessage != ''">
                            {{ locationMessage }}
                            <!-- <p style="font-size:0.82rem;padding:0.5rem;">Your Coordinates : {{user.lat}} , {{user.long}}</p> -->
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="input-group mb-4">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                        <input class="form-control" v-model="user.password" type="password" placeholder="Password">
                      </div>
                      <div v-if="validation.password" class="mt-2">
                        <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-group mb-4">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                        <input class="form-control" v-model="user.password_confirmation" type="password"
                          placeholder="Password Confirmation">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <ul style="font-size:0.85rem">
                        <li>All of the fields are required to be filled!</li>
                        <li>Please fill the data form with your real data, any false data provided may result in delivery problems, or even legal problem reagarding frauds! Please refer to our ToS and Privacy Policy abut your data. </li>
                        <li>We strongly required you to fill in your address in details, including giving your location, to make that we can delivery your orders as accurate as possible to your place. Please refer to our ToS and Privacy Policy about your location</li>
                      </ul>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-12 text-right">
                      <button class="btn btn-info shadow-sm rounded-sm px-4" type="submit">REGISTER</button>
                      <button class="btn btn-warning shadow-sm rounded-sm px-4" type="reset">RESET</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        Sudah punya akun? <nuxt-link :to="{name: 'customer-login'}" class="font-weight-bold"> Login Disini
        </nuxt-link>
      </div>
      </div>
    </div>
  </template>
  
  <script>
    import VueGeolocation from 'vue-browser-geolocation'
    export default {
      //middleware
      middleware: 'authenticated',
      //layout
      layout: 'default',
      //meta
      head() {
        return {
          title: 'Register - Customer',
        }
      },
      //data function
      data() {
        return {
          //state user
          user: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            id_provinsi:'',
            id_kabupaten:'',
            id_area:'',
            lat:'',
            long:'',
            alamat:'',
            phone:'',
          },
          //validation
          validation: [],
          locationLoading:false,
          locationMessage:null
        }
      },
      //hook asyncData
      async asyncData({ store }) {
        await store.dispatch('web/rajaongkir/getProvincesData')
        await store.dispatch('web/fetchers/getAllShippingArea')
      },
      computed:{
        //provinces
        provinces() {
          return this.$store.state.web.rajaongkir.provinces
        },
        //cities
        cities() {
          return this.$store.state.web.rajaongkir.cities
        },
        //areas
        areas() {
          return this.$store.state.web.fetchers.shippings
        },
      },
      //method
      methods: {
        getLocation(){
          this.locationLoading = true
            VueGeolocation.getLocation({
                enableHighAccuracy: true, //defaults to false
                timeout: 5000, //defaults to Infinity
                maximumAge: 10000, //defaults to 0
            }).then((coordinates) => {
                // this.locationLoaded = false
                this.user.lat = coordinates.lat
                this.user.long = coordinates.lng
                this.locationLoading = false
                this.locationMessage = 'Location acquired successfully!'
            }).catch(e=>{
                this.locationLoading = false
                this.locationMessage = 'Location acquiring failed! Please try again!'
            })
        },
        //method "register"
        async register() {
          //dispatch to action "storeRegister"
          await this.$store.dispatch('customer/customer/storeRegister', {
              name: this.user.name,
              email: this.user.email,
              password: this.user.password,
              password_confirmation: this.user.password_confirmation,
              alamat: this.user.alamat,
              id_provinsi: this.user.id_provinsi,
              id_kabupaten: this.user.id_kabupaten,
              id_area: this.user.id_area,
              lat: this.user.lat,
              long: this.user.lat,
              phone: this.user.phone,
            })
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'REGISTER SUCCESS!',
                text: "Proses Register Berhasil!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              //redirect
              this.$router.push({
                name: 'customer-login'
              })
            })
            .catch(error => {
              //assign validation
              this.validation = error.response.data
            })
        },
        //method "getCities"
        getCities() {
          this.$store.dispatch('web/rajaongkir/getCitiesData', {
            province_id: this.user.id_provinsi
          })
        },
      }
    }
  </script>
  
  <style>
  
  </style>