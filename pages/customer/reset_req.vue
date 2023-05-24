<template>
    <div class="container mt-custom mb-3">
      <div class="fade-in">
        <div class="row justify-content-center">
            <div class="col-md-7">
            <div class="card-group" style="margin:2rem;">
                <div class="card border-top-orange border-0 shadow rounded">
                <div class="card-body">
                    <h3 class="text-center">PASSWORD RESET</h3>
                    <hr>
                    <p>Enter your email to send password reset request to your email.</p>
                    <form @submit.prevent="checkEmailExist">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </div>
                            <input class="form-control" v-model="email" type="email" placeholder="Email Address">
                        </div>
                        <div v-if="validation.length != 0" class="mt-2">
                            <b-alert show variant="danger">{{ validation }}</b-alert>
                        </div>
                        <div v-if="loading == true" class="mt-2">
                          <div class="text-center py-1">
                            <h6>Checking ...</h6>
                            <b-spinner variant="primary" label="Spinning"></b-spinner>
                          </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-warning shadow-sm rounded-sm px-4 w-100" type="submit"><h4>SEND REQUEST</h4></button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="text-center mt-3" style="margin:2rem;">
            <h4>Not Registered yet? <nuxt-link :to="{name: 'customer-register'}" class="font-weight-bold">Sign Up Now!</nuxt-link></h4>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      middleware: 'authenticated',
      layout: 'default',
      head() {
        return {
          title: 'Reset Password - Customer',
        }
      },
      data() {
        return {
          email:'',
          validation: [],
          loading:false,
        }
      },
      methods: {
        async checkEmailExist() {
          this.loading = true
          var data = {
            email: this.email
          }
          await this.$axios.$post('api/v1/customer/password_reset/check_email_exist',data)
            .then((response) => {
              console.log(response)
              // Then we send request!
              var data_two = {
                email: this.email
              }
              this.$axios.$post('api/v1/customer/password_reset_request',data_two).then(res=>{
                var message = res.data
                this.loading = false
                this.$swal.fire({
                  title: 'SUCCESS!',
                  text: message,
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                })
                //redirect
                this.$router.push({
                  name: 'customer-login'
                })
              }).catch(error => {
                this.validation = null
                this.validation = !error.response.data.error || error.response.data.error.length == 0 ? "Email Not Found" : error.response.data.error
                this.loading = false
              })
              
            })
            .catch(error => {
                this.validation = null
                // console.log(error)
                this.validation = !error.response.data.error || error.response.data.error.length == 0 ? "Email Not Found" : error.response.data.error
                this.loading = false
            })
          }
        // checkEmailExist() {
        //   this.$axios.$get('api/v1/admin/export_last_stock')
        //     .then((response) => {
        //       let blob = new Blob([response.data], { type: 'application/xlsx' })
        //       let link = document.createElement('a')
        //       link.href = window.URL.createObjectURL(blob)
        //       var date = new Date()
        //       link.download = 'ListStock-' + date.toDateString() + '.xlsx'
        //       link.click()
        //     })
        //     .catch((e) => {
        //       console.log(e)
        //     })
        // },
      }
    }
  </script>