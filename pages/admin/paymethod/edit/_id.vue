<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT PAYMENT METHOD</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updatePayMethod">
                    <div class="row py-3">
                        <div class="col">
                          <div class="form-group">
                            <label>NAMA PAYMENT METHOD</label>
                            <input type="text" v-model="payment_method.method" placeholder="NAMA PAYMENT METHOD"
                              class="form-control">
                            <div v-if="validation.method" class="mt-2">
                              <b-alert show variant="danger">{{ validation.method[0] }}</b-alert>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row py-3">
                        <div class="col">
                          <div class="form-group">
                            <label>CODE</label>
                            <input type="text" v-model="payment_method.code" placeholder="KODED"
                              class="form-control">
                            <div v-if="validation.method" class="mt-2">
                              <b-alert show variant="danger">{{ validation.code[0] }}</b-alert>
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
          title: 'Edit Payment Method - Administrator',
        }
      },
      data() {
        return {
          payment_method: {
            method: '',
            code:''
          },
          validation: [],
        }
      },
      async asyncData({ store, route }) {
          await store.dispatch('admin/payment_method/getOnePaymentMethod', route.params.id)
      },
      //mounted
      mounted() {
          this.payment_method.method = this.$store.state.admin.payment_method.payment_method.method
          this.payment_method.code = this.$store.state.admin.payment_method.payment_method.code
      },
      methods: {
        async updatePayMethod() {
          let formData = new FormData();
          formData.append('code', this.payment_method.code)
          formData.append('method', this.payment_method.method)
          formData.append("_method", "PATCH")
          await this.$store.dispatch('admin/payment_method/updatePaymentMethod', {
              dataId: this.$route.params.id,
              payload: formData
          })
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Updated Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-paymethod'
              })
  
            })
            .catch(error => {
              console.log(error)
              console.log(error.response.data.error)
              this.validation = JSON.parse(error.response.data.error)
              var new_error = ''
              for(let x in this.validation){
                new_error += this.validation[x][0]+'\n'
                // console.log(new_error)
              }
              this.$swal.fire({
                title: 'Failed!',
                text: new_error,
                icon: 'error',
                showConfirmButton: true,
              })
            })
        }
      }
    }
</script>