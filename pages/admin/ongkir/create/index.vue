<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD NEW ONGKIR</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="storeOngkir">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>JARAK AWAL</label>
                          <input type="text" v-model="ongkir.jarak_awal" placeholder="Masukkan JARAK AWAL (KM)"
                            class="form-control">
                          <div v-if="validation.jarak_awal" class="mt-2">
                            <b-alert show variant="danger">{{ validation.jarak_awal[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>JARAK AKHIR</label>
                          <input type="text" v-model="ongkir.jarak_akhir" placeholder="Masukkan JARAK AKHIR (KM)"
                            class="form-control">
                          <div v-if="validation.jarak_akhir" class="mt-2">
                            <b-alert show variant="danger">{{ validation.jarak_akhir[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>HARGA (RP)</label>
                          <input type="text" v-model="ongkir.harga" placeholder="Masukkan HARGA (RP)"
                            class="form-control">
                          <div v-if="validation.harga" class="mt-2">
                            <b-alert show variant="danger">{{ validation.harga[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                      SAVE</button>
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
          title: 'Add New Ongkir - Administrator',
        }
      },
  
      data() {
        return {
          //state ongkir
          ongkir: {
            jarak_awal: null,
            jarak_akhir: null,
            harga: null,
          },
          //state validation
          validation: [],
        }
      },
      methods: {
        //method "storeProduct"
        async storeOngkir() {
          //define formData
          let formData = new FormData();
          formData.append('jarak_awal', this.ongkir.jarak_awal)
          formData.append('jarak_akhir', this.ongkir.jarak_akhir)
          formData.append('harga', this.ongkir.harga)
          //sending data to action "storeProduct" vuex
          await this.$store.dispatch('admin/ongkir/storeOngkir', formData)
            //success
            .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Saved Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              //redirect route "admin-settings"
              this.$router.push({
                name: 'admin-ongkir'
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