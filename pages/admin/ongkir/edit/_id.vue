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
                  <form @submit.prevent="updateOngkir">
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
          title: 'Edit Ongkir - Administrator',
        }
      },
  
      data() {
        return {
          //state product
          ongkir: {
            jarak_awal: null,
            jarak_akhir: null,
            harga: null,
          },
          //state validation
          validation: [],
        }
      },
      //hook "asyncData"
      async asyncData({ store, route }) {
          await store.dispatch('admin/ongkir/getDetailOngkir', route.params.id)
      },
      //mounted
      mounted() {
          this.ongkir.jarak_awal       = this.$store.state.admin.ongkir.ongkir.jarak_awal
          this.ongkir.jarak_akhir        = this.$store.state.admin.ongkir.ongkir.jarak_akhir
          this.ongkir.harga        = this.$store.state.admin.ongkir.ongkir.harga
      },
      methods: {
        //method "updateOngkir"
        async updateOngkir() {
          //define formData
          let formData = new FormData();
          formData.append('jarak_awal', this.ongkir.jarak_awal)
          formData.append('jarak_akhir', this.ongkir.jarak_akhir)
          formData.append('harga', this.ongkir.harga)
          formData.append("_method", "PUT")
          //sending data to action "updateOngkir" vuex
          await this.$store.dispatch('admin/ongkir/updateOngkir', {
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