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
                    <p>Now, Enter your new password!</p>
                    <form @submit.prevent="sendPasswordReset">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-key"></i>
                                </span>
                            </div>
                            <input class="form-control" v-model="password" type="password" placeholder="Your New Password!">
                        </div>
                        <div v-if="validation.length != 0" class="mt-2">
                            <b-alert show variant="danger">{{ validation }}</b-alert>
                        </div>
                        <div v-if="loading == true" class="mt-2">
                          <div class="text-center py-1">
                            <h6>Resetting ...</h6>
                            <b-spinner variant="primary" label="Spinning"></b-spinner>
                          </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-warning shadow-sm rounded-sm px-4 w-100" type="submit"><h4>UPDATE PASSWORD</h4></button>
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
          password:'',
          validation: [],
          loading:false,
        }
      },
      methods: {
        sendPasswordReset() {
          this.loading = true
          var data = {
            password: this.password,
            token: this.$route.params.id
          }
          this.$axios.$post('api/v1/customer/password_reset_token',data)
            .then((response) => {
              this.loading = false
              console.log(response)
              this.$swal.fire({
                title: 'SUCCESS!',
                text: response.data,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              })
              //redirect
              this.$router.push({
                name: 'customer-login'
              })
            })
            .catch(error => {
                this.validation = null
                // console.log(error)
                this.validation = !error.response.data.error ? "Email Not Found" : error.response.data.error
                this.loading = false
            })
          }
      },
      mounted(){
        if(!this.$route.params.id){
          this.$swal.fire({
            title: 'ERROR!',
            text: "NO TOKEN!",
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
          })
          //redirect
          this.$router.push({
            name: 'customer-login'
          })
        }
      }
    }
  </script>