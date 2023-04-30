<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT ONGKIR</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updateShipping">
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>AREA</label>
                          <input type="text" v-model="shipping.area" placeholder="Nama Area"
                            class="form-control">
                          <div v-if="validation.area" class="mt-2">
                            <b-alert show variant="danger">{{ validation.area[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>KODE</label>
                          <input type="text" v-model="shipping.code" placeholder="Kode Area"
                            class="form-control">
                          <div v-if="validation.code" class="mt-2">
                            <b-alert show variant="danger">{{ validation.code[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>Harga - Motor</label>
                          <input type="number" v-model="shipping.price_motor" placeholder="Harga Ongkir - Motor"
                            class="form-control">
                          <div v-if="validation.price_motor" class="mt-2">
                            <b-alert show variant="danger">{{ validation.price_motor[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>Harga - Mobil</label>
                          <input type="number" v-model="shipping.price_car" placeholder="Harga Ongkir - Mobil"
                            class="form-control">
                          <div v-if="validation.price_car" class="mt-2">
                            <b-alert show variant="danger">{{ validation.price_car[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>CAR ONLY</label>
                          <select class="form-control" v-model="shipping.car_only">
                            <option :value="1">YES</option>
                            <option :value="0">NO</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>Keterangan</label>
                          <input type="text" v-model="shipping.description" placeholder="Keterangan"
                            class="form-control">
                          <div v-if="validation.description" class="mt-2">
                            <b-alert show variant="danger">{{ validation.description[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                      UPDATE</button>
                    <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
                      RESET</button>
                  </form>
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
          title: 'Edit Shipping - Administrator',
        }
      },
  
      data() {
        return {
          //state product
          shipping: {
            area: null,
            code: null,
            price_motor: null,
            price_car: null,
            car_only: null,
            description: null,
          },
          //state validation
          validation: [],
        }
      },
      //hook "asyncData"
      async asyncData({ store, route }) {
          await store.dispatch('admin/shipping/getDetailShipping', route.params.id)
      },
      //mounted
      mounted() {
          this.shipping.area       = this.$store.state.admin.shipping.shipping.area
          this.shipping.code        = this.$store.state.admin.shipping.shipping.code
          this.shipping.price_motor        = this.$store.state.admin.shipping.shipping.price_motor
          this.shipping.price_car       = this.$store.state.admin.shipping.shipping.price_car
          this.shipping.car_only        = this.$store.state.admin.shipping.shipping.car_only
          this.shipping.description        = this.$store.state.admin.shipping.shipping.description
      },
      methods: {
        //method "updateShipping"
        async updateShipping() {
          //define formData
          let formData = new FormData();
          formData.append('area', this.shipping.area)
          formData.append('code', this.shipping.code)
          formData.append('price_motor', this.shipping.price_motor)
          formData.append('price_car', this.shipping.price_car)
          formData.append('car_only', this.shipping.car_only)
          formData.append('description', this.shipping.description)
          formData.append("_method", "PUT")
          //sending data to action "updateShipping" vuex
          await this.$store.dispatch('admin/shipping/updateShipping', {
              productId: this.$route.params.id,
              payload: formData
          })
            //success
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Updated Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-shipping'
              })
            })
            //error
            .catch(error => {
              //assign error to state "validation"
              this.validation = error.response.data
            })
        }
      }
    }
  </script>